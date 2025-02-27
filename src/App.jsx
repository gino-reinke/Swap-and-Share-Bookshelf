import React, { useEffect } from 'react';
import AppRoutes from "./routes/Routes";
import { AuthProvider } from './context/AuthContext';
import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";

function App() {
  useEffect(() => {
    // Initialize CometChat
      //create the builder
      const UIKitSettings = new UIKitSettingsBuilder()
        .setAppId(import.meta.env.VITE_COMETCHAT_APP_ID)
        .setRegion(import.meta.env.VITE_COMETCHAT_REGION)
        .setAuthKey(import.meta.env.VITE_COMETCHAT_AUTH_KEY)
        .subscribePresenceForAllUsers()
        .build();
      //Initialize CometChat UI Kit
      CometChatUIKit.init(UIKitSettings)
        .then(() => {
          console.log("Initialization completed successfully");
          // You can now call login function.
        })
        .catch(console.log);
}, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
