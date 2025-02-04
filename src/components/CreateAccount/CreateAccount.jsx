import { useState } from "react";
import "./CreateAccount.css";

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Account Created:", formData);
    };

    return (
        <>
          

            <div className="container">
                <div className="left">
                    <h2>CREATE AN ACCOUNT</h2>
                    <img src="assets/login/2.png" alt="Bookshelf" />
                </div>
                <div className="right">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@address.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="**********"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="Account-btn">
                            Create Account
                        </button>
                    </form>
                    <p>
                        Already have an account? <a href="#">Sign in</a>
                    </p>
                </div>
            </div>

            <footer>
                <div className="container">
                    <div className="quick-links">
                        <ul>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#terms">Terms & Conditions</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#faq">FAQs</a></li>
                        </ul>
                    </div>
                    <div className="contact-info">
                        <p>Email: support@swapandsharebookshelf.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                    <div className="social-media">
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                        <a href="#">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default CreateAccount;
