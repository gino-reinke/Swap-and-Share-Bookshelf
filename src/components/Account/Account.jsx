import React, { useState } from 'react';
import styles from './Account.module.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase'; 
import { handleLogout } from '../../services/authservice'; 
import { useNavigate } from 'react-router-dom';

export const Account = () => {
    const [activeTab, setActiveTab] = useState('username');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const navigate = useNavigate();

    const handleSaveClick = (action) => {
        setModalAction(action);
        setIsModalOpen(true);
    };

    const confirmAction = async () => {
        if (modalAction === 'logout') {
            try {
                await handleLogout();
                alert('You have been logged out.');
                navigate('/'); // Redirect to home
            } catch (error) {
                alert(error.message);
            }
        } else {
            console.log(`Changes saved for ${modalAction}`);
        }
        setIsModalOpen(false);
    };    

    const cancelAction = () => {
        setIsModalOpen(false);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'password':
                return (
                    <div className={styles.tabContent}>
                        <h2>Change Password</h2>
                        <form>
                            <button
                                type="button"
                                onClick={async () => {
                                    const user = auth.currentUser;
                                    if (user && user.email) {
                                        try {
                                            await sendPasswordResetEmail(auth, user.email);
                                            alert('Password reset email sent to ' + user.email);
                                        } catch (error) {
                                            alert('Error sending password reset email: ' + error.message);
                                        }
                                    } else {
                                        alert('No authenticated user found.');
                                    }
                                }}
                            >
                                Send Password Reset Email
                            </button>
                        </form>
                    </div>
                );
            case 'logout':
                return (
                    <div className={styles.tabContent}>
                        <h2>Logout</h2>
                        <p>Are you sure you want to logout?</p>
                        <button
                            className={styles.logoutButton}
                            onClick={() => handleSaveClick('logout')}
                        >
                            Logout
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'password' ? styles.active : ''}`}
                    onClick={() => setActiveTab('password')}
                >
                    Change Password
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'logout' ? styles.active : ''}`}
                    onClick={() => setActiveTab('logout')}
                >
                    Logout
                </button>
            </div>
            <div className={styles.content}>
                {renderTabContent()}
            </div>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>
                            {modalAction === 'logout'
                                ? 'Are you sure you want to logout?'
                                : `Are you sure you want to save changes to ${modalAction}?`}
                        </p>
                        <div className={styles.modalActions}>
                            <button onClick={confirmAction} className={styles.confirmButton}>
                                Confirm
                            </button>
                            <button onClick={cancelAction} className={styles.cancelButton}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};