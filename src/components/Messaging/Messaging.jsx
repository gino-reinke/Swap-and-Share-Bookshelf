// src/components/Messaging/Messaging.jsx

import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Messaging.module.css';
import { CometChatConversations } from "@cometchat/chat-uikit-react";
import { AuthContext } from '../../context/AuthContext';

export const Messaging = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not logged into Firebase, redirect them
    if (!currentUser) {
      navigate('/signin');
    }
    // Otherwise, we assume CometChat login was done in your login flow.
    // If you want, you can also attempt CometChatUIKit.login here again.
  }, [currentUser, navigate]);

  return (
    <section className={styles.container}>
        <CometChatConversations />
    </section>
  );
};
