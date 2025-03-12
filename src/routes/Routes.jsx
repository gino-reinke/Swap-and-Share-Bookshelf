import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Marketplace from "../pages/MarketplacePage";
import Signup from "../pages/SignupPage";
import About from "../pages/AboutPage";
import TradingTips from "../pages/TradingTipsPage";
import Account from "../pages/AccountPage";
import Messaging from "../pages/MessagingPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/about" element={<About />} />
        <Route path="/tradingtips" element={<TradingTips />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/messaging" element={<Messaging />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;