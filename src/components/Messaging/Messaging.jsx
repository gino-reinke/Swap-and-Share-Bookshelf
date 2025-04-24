import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Messaging.module.css';
import { AuthContext } from '../../context/AuthContext';
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, addDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useLocation } from 'react-router-dom';

/**
 * Conversation document shape
 * /conversations/{conversationId}
 *  └─ participants:  [uidA, uidB]     (array)
 *     lastMessage:   string
 *     updatedAt:     timestamp
 *
 * Messages are kept in a sub-collection:
 * /conversations/{conversationId}/messages/{messageId}
 *  └─ senderId, text, createdAt
 */

export const Messaging = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [conversations, setConversations] = useState([]);          // left rail
  const [activeConvId, setActiveConvId] = useState(null);          // id of selected conversation
  const [messages, setMessages] = useState([]);                    // right pane
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  /** ------------------------------------------------------------------
   *  Utility – create deterministic conversationId for two users
   * ------------------------------------------------------------------*/
  const getConversationId = (uid1, uid2) =>
    [uid1, uid2].sort().join('_');

  /** ------------------------------------------------------------------
   *  1. Initialisation – if we were navigated here from “Message User”
   * ------------------------------------------------------------------*/
  useEffect(() => {
    if (!location.state?.otherUserId || !currentUser) return;

    const convId = getConversationId(currentUser.uid, location.state.otherUserId);
    // If the conversation doc does NOT exist yet we create a stub so both users can see it
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

  /** ------------------------------------------------------------------
   *  2. Left-hand list – real-time listener for my conversations
   * ------------------------------------------------------------------*/
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(firestore, 'conversations'),
      // simple local filter because Firestore array-contains-any limit is 10;
      // use onSnapshot & filter client-side for unlimited list
    );

    const unsub = onSnapshot(q, (snap) => {
      const convs = [];
      snap.forEach((d) => {
        const data = d.data();
        if (data.participants.includes(currentUser.uid))
          convs.push({ id: d.id, ...data });
      });

      // newest on top
      convs.sort((a, b) => b.updatedAt?.seconds - a.updatedAt?.seconds);
      setConversations(convs);
    });

    return unsub;
  }, [currentUser]);

  /** ------------------------------------------------------------------
   *  3. Right-hand pane – listener for messages in selected conversation
   * ------------------------------------------------------------------*/
  useEffect(() => {
    if (!activeConvId) return setMessages([]);

    const q = query(
      collection(firestore, 'conversations', activeConvId, 'messages'),
      orderBy('createdAt')
    );

    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
      // auto-scroll
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return unsub;
  }, [activeConvId]);

  /** ------------------------------------------------------------------
   *  4. Send a message
   * ------------------------------------------------------------------*/
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !currentUser || !activeConvId) return;

    const msg = {
      senderId: currentUser.uid,
      text: input.trim(),
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(firestore, 'conversations', activeConvId, 'messages'), msg);
    // update convo summary
    await setDoc(
      doc(firestore, 'conversations', activeConvId),
      { lastMessage: msg.text, updatedAt: serverTimestamp() },
      { merge: true }
    );

    setInput('');
  };

  /** ------------------------------------------------------------------
   *  RENDER
   * ------------------------------------------------------------------*/
  const renderSidebarItem = (conv) => {
    // show the OTHER participant’s username or id
    const otherId = conv.participants.find((p) => p !== currentUser.uid);
    return (
      <button
        key={conv.id}
        className={`${styles.conversationBtn} ${conv.id === activeConvId ? styles.active : ''}`}
        onClick={() => setActiveConvId(conv.id)}
      >
        {otherId}
        <span className={styles.preview}>{conv.lastMessage?.slice(0, 24)}</span>
      </button>
    );
  };

  return (
    <section className={styles.container}>
      {/* ─────────────────── LEFT SIDEBAR ─────────────────── */}
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Messages</h3>
        {conversations.length ? (
          conversations.map(renderSidebarItem)
        ) : (
          <p className={styles.empty}>No conversations yet.</p>
        )}
      </aside>

      {/* ─────────────────── CHAT PANE ─────────────────── */}
      <main className={styles.chatPane}>
        {activeConvId ? (
          <>
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

            <form className={styles.inputBar} onSubmit={sendMessage}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className={styles.input}
              />
              <button type="submit" className={styles.sendBtn}>
                Send
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
