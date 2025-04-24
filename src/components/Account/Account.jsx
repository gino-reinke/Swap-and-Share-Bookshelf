import React, { useState } from 'react';
import styles from './Account.module.css';

export const Account = () => {
    const [activeTab, setActiveTab] = useState('username');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');

    const handleSaveClick = (action) => {
        setModalAction(action);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        if (modalAction === 'logout') {
            // Handle logout logic here
            console.log('User logged out');
        } else {
            // Handle save logic for username/password here
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
                            <label htmlFor="currentPassword">Current Password:</label>
                            <input type="password" id="currentPassword" name="currentPassword" placeholder="Enter current password" />
                            <label htmlFor="newPassword">New Password:</label>
                            <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password" />
                            <button
                                type="button"
                                onClick={() => handleSaveClick('password')}
                            >
                                Save
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