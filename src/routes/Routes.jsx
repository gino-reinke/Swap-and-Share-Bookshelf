import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Marketplace from "../pages/MarketplacePage";
import Signup from "../pages/SignupPage";
import About from "../pages/AboutPage";
import TradingTips from "../pages/TradingTipsPage";
import Account from "../pages/AccountPage";
import Messaging from "../pages/MessagingPage";
import Favorites from "../pages/FavoritesPage";
import MyListings from "../pages/MyListingsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/mylistings" element={<MyListings />} />
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