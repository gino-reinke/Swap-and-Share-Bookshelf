import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Marketplace from "../pages/MarketplacePage";
import Signup from "../pages/SignupPage";
import About from "../pages/AboutPage";
import TradingTips from "../pages/TradingTipsPage";
import Account from "../pages/AccountPage";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/about" element={<About />} />
        <Route path="/tradingtips" element={<TradingTips />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Account />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
