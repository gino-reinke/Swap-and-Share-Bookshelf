import React from 'react';
import styles from './Marketplace.module.css';
import { getImageUrl } from '../../utils';

export const Marketplace = () => {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>MARKETPLACE</h1>
                <div className={styles.buttonContainer}>
                    <button className={styles.exploreBtn} onClick={() => alert("Pressed!")}>
                        Create Listing
                    </button>
                    <button className={styles.filterBtn} onClick={() => alert("Pressed!")}>
                        All Filters
                    </button>
                </div>
            </div>
        </section>
    );
};
