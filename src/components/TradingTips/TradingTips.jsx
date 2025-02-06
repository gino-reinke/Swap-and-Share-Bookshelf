import React from 'react';
import styles from './TradingTips.module.css';

export const TradingTips = () => {
    const tips = [
        { id: 1, title: "Check Book Condition", description: "Always inspect the book for any damages before trading." },
        { id: 2, title: "Verify Edition", description: "Ensure you’re getting the correct edition you need." },
        { id: 3, title: "Meet in Safe Locations", description: "For in-person trades, choose a safe, public place." },
        { id: 4, title: "Communicate Clearly", description: "Discuss all trade details before exchanging books." },
        { id: 5, title: "Use Trusted Platforms", description: "Leverage reputable book trading platforms for security." }
    ];

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Trading Tips</h1>
            <p className={styles.description}>Helpful guidelines to ensure smooth and secure book trades.</p>
            <div className={styles.tipsGrid}>
                {tips.map((tip) => (
                    <div key={tip.id} className={styles.tipCard}>
                        <h2 className={styles.tipTitle}>{tip.title}</h2>
                        <p className={styles.tipDescription}>{tip.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
