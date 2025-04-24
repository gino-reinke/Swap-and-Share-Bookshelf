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

/**
 * Conversation document shape
 * /conversations/{conversationId}
 *   └─ participants:  [uidA, uidB]
 *      lastMessage:   string
 *      updatedAt:     timestamp
 *
 * Messages live in a sub-collection:
 * /conversations/{conversationId}/messages/{messageId}
 *   └─ senderId, text, createdAt
 */

export const Messaging = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  /*  uid → displayName cache so we only hit Firestore once per user  */
  const [userNames, setUserNames] = useState({});

  const bottomRef = useRef(null);

  /* -------------------------------------------------------------
   * Util: deterministic conversation id for any 2 uids
   * ----------------------------------------------------------- */
  const getConversationId = (uid1, uid2) =>
    [uid1, uid2].sort().join('_');

  /* -------------------------------------------------------------
   * If we arrived via “Message User” button, open / create convo
   * ----------------------------------------------------------- */
  useEffect(() => {
    if (!currentUser || !location.state?.otherUserId) return;

    const convId = getConversationId(currentUser.uid, location.state.otherUserId);
    const convRef = doc(firestore, 'conversations', convId);

    (async () => {
      const snap = await getDoc(convRef);
      if (!snap.exists()) {
        await setDoc(convRef, {
          participants: [currentUser.uid, location.state.otherUserId],
          lastMessage: '',
          updatedAt: serverTimestamp(),
        });
      }
      setActiveConvId(convId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, currentUser]);

  /* -------------------------------------------------------------
   * LEFT rail: listen to all my conversations
   * ----------------------------------------------------------- */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(firestore, 'conversations'));
    const unsub = onSnapshot(q, (snap) => {
      const convs = [];
      snap.forEach((d) => {
        const data = d.data();
        if (data.participants.includes(currentUser.uid)) convs.push({ id: d.id, ...data });
      });
      convs.sort((a, b) => b.updatedAt?.seconds - a.updatedAt?.seconds);
      setConversations(convs);
    });

    return unsub;
  }, [currentUser]);

  /* -------------------------------------------------------------
   * RIGHT pane: listen to messages in selected conversation
   * ----------------------------------------------------------- */
  useEffect(() => {
    if (!activeConvId) return setMessages([]);

    const q = query(
      collection(firestore, 'conversations', activeConvId, 'messages'),
      orderBy('createdAt')
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return unsub;
  }, [activeConvId]);

  /* -------------------------------------------------------------
   * Fetch a user’s displayName once, cache it in state
   * ----------------------------------------------------------- */
  const ensureDisplayName = async (uid) => {
    if (userNames[uid] || uid === currentUser.uid) return;

    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid)); // assumes “users” collection
      if (userDoc.exists()) {
        setUserNames((prev) => ({ ...prev, [uid]: userDoc.data().displayName }));
      }
    } catch (err) {
      console.error('Could not fetch username:', err);
    }
  };

  /* -------------------------------------------------------------
   * Send message
   * ----------------------------------------------------------- */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !activeConvId) return;

    const newMsg = {
      senderId: currentUser.uid,
      text: input.trim(),
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

  /* -------------------------------------------------------------
   * Render helpers
   * ----------------------------------------------------------- */
  const SidebarItem = ({ conv }) => {
    const otherId = conv.participants.find((p) => p !== currentUser.uid);
    useEffect(() => { ensureDisplayName(otherId); }, [otherId]);

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

  /* ------------------------------------------------------------- */
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
            <div className={styles.messages}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.senderId === currentUser.uid ? styles.myMsg : styles.theirMsg
                  }
                >
                  {m.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form className={styles.inputBar} onSubmit={sendMessage}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className={styles.input}
              />
              <button type="submit" className={styles.sendBtn}>
                SEND
              </button>
            </form>
          </>
        ) : (
          <p className={styles.prompt}>Select a conversation to start chatting.</p>
        )}
      </main>
    </section>
  );
};
