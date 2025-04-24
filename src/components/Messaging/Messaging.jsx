import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Messaging.module.css';
import { AuthContext } from '../../context/AuthContext';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useLocation } from 'react-router-dom';

export const Messaging = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  /* ────────── local state ────────── */
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listing, setListing] = useState(null);      // ⬅️ listing card data
  const [userNames, setUserNames] = useState({});    // uid → displayName cache
  const bottomRef = useRef(null);

  const getConversationId = (uid1, uid2) => [uid1, uid2].sort().join('_');

  /* ────────── arrive via “Message User” button ────────── */
  useEffect(() => {
    if (!currentUser || !location.state?.otherUserId) return;

    const listingFromNav = location.state?.listing ?? null;
    const convId = getConversationId(currentUser.uid, location.state.otherUserId);
    const convRef = doc(firestore, 'conversations', convId);

    (async () => {
      const snap = await getDoc(convRef);

      if (!snap.exists()) {
        // First-ever conversation → create with listing
        await setDoc(convRef, {
          participants: [currentUser.uid, location.state.otherUserId],
          lastMessage : '',
          updatedAt   : serverTimestamp(),
          ...(listingFromNav ? { listing: listingFromNav } : {}),
        });
      } else if (listingFromNav) {
        // Conversation exists → merge / overwrite listing field
        await setDoc(convRef, { listing: listingFromNav }, { merge: true });
      }
      setActiveConvId(convId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, currentUser]);

  /* ────────── sidebar: all my conversations ────────── */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(firestore, 'conversations'));
    const unsub = onSnapshot(q, (snap) => {
      const convs = [];
      snap.forEach((d) => {
        const data = d.data();
        if (data.participants.includes(currentUser.uid)) convs.push({ id: d.id, ...data });
      });
      convs.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0));
      setConversations(convs);
    });

    return unsub;
  }, [currentUser]);

  /* ────────── chat pane: messages + listing header ────────── */
  useEffect(() => {
    if (!activeConvId) {
      setMessages([]);
      setListing(null);
      return;
    }

    const msgsQ  = query(
      collection(firestore, 'conversations', activeConvId, 'messages'),
      orderBy('createdAt')
    );
    const convRef = doc(firestore, 'conversations', activeConvId);

    const unsubMsgs = onSnapshot(msgsQ, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    const unsubConv = onSnapshot(convRef, (snap) => {
      setListing(snap.data()?.listing || null);
    });

    return () => { unsubMsgs(); unsubConv(); };
  }, [activeConvId]);

  /* ────────── util: get displayName once ────────── */
  const ensureDisplayName = async (uid) => {
    if (userNames[uid] || uid === currentUser.uid) return;

    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      if (userDoc.exists()) {
        setUserNames((prev) => ({ ...prev, [uid]: userDoc.data().displayName }));
      }
    } catch (err) {
      console.error('Could not fetch username:', err);
    }
  };

  /* ────────── send message ────────── */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !activeConvId) return;

    const newMsg = {
      senderId: currentUser.uid,
      text    : input.trim(),
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(firestore, 'conversations', activeConvId, 'messages'), newMsg);
    await setDoc(
      doc(firestore, 'conversations', activeConvId),
      { lastMessage: newMsg.text, updatedAt: serverTimestamp() },
      { merge: true }
    );
    setInput('');
  };

  /* ────────── render helpers ────────── */
  const SidebarItem = ({ conv }) => {
    const otherId = conv.participants.find((p) => p !== currentUser.uid);
    useEffect(() => { ensureDisplayName(otherId); }, [otherId]); // eslint-disable-line

    const display = userNames[otherId] ?? otherId;

    return (
      <button
        className={`${styles.conversationBtn} ${
          activeConvId === conv.id ? styles.active : ''
        }`}
        onClick={() => setActiveConvId(conv.id)}
      >
        <strong className={styles.username}>{display}</strong>
        <span className={styles.preview}>{conv.lastMessage?.slice(0, 24)}</span>
      </button>
    );
  };

  /* ────────── UI ────────── */
  return (
    <section className={styles.container}>
      {/* ─────── Sidebar ─────── */}
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Messages</h3>
        {conversations.length ? (
          conversations.map((c) => <SidebarItem key={c.id} conv={c} />)
        ) : (
          <p className={styles.empty}>No conversations yet.</p>
        )}
      </aside>

      {/* ─────── Chat pane ─────── */}
      <main className={styles.chatPane}>
        {activeConvId ? (
          <>
            {/* listing header (persists for both users) */}
            {listing && (
              <div className={styles.listingHeader}>
                {listing.image ? (
                  <img src={listing.image} alt={listing.title} className={styles.listingImg} />
                ) : (
                  <div className={styles.noImg}>No Image</div>
                )}
                <div className={styles.meta}>
                  <h4>{listing.title}</h4>
                  <p><strong>Author:</strong> {listing.author}</p>
                  <p><strong>Genre:</strong> {listing.genre}</p>
                  <p><strong>ISBN:</strong> {listing.isbn}</p>
                  <p><strong>Condition:</strong> {listing.condition}</p>
                  <p><strong>Location:</strong> {listing.location}</p>
                  <p className={styles.desc}>{listing.description}</p>
                </div>
              </div>
            )}

            {/* messages */}
            <div className={styles.messages}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={m.senderId === currentUser.uid ? styles.myMsg : styles.theirMsg}
                >
                  {m.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* composer */}
            <form className={styles.inputBar} onSubmit={sendMessage}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className={styles.input}
              />
              <button type="submit" className={styles.sendBtn}>SEND</button>
            </form>
          </>
        ) : (
          <p className={styles.prompt}>Select a conversation to start chatting.</p>
        )}
      </main>
    </section>
  );
};

export default Messaging;
