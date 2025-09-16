import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.section01}>
      <p className={styles.welcomeToSqueenvipTr}>
        Welcome to SQUEEN VIP - Trusted Online Casino in Malaysia since 2012
      </p>
      <p className={styles.howToRegister}>How to Register?</p>
      <div className={styles.autoWrapper}>
        <div className={styles.rectangle5}>
          <img
            src="../image/mfme3a6n-q4bqi3j.png"
            className={styles.registerIcon01}
          />
          <p className={styles.clickSignUpFillInYou}>
            Click Sign Up & Fill in your login details
          </p>
          <div className={styles.rectangle16} />
        </div>
        <div className={styles.howToRegister02}>
          <div className={styles.rectangle4}>
            <img
              src="../image/mfme3a6n-zclo5ya.png"
              className={styles.depositIcon01}
            />
            <p className={styles.makeADepositClaimYou}>
              Make a deposit & Claim your Free Credit&nbsp;
            </p>
          </div>
          <div className={styles.rectangle17} />
        </div>
        <div className={styles.howToRegister03}>
          <div className={styles.rectangle15}>
            <img
              src="../image/mfme3a6n-jr4tr9n.png"
              className={styles.depositIcon01}
            />
            <p className={styles.makeADepositClaimYou}>
              Start winning while playing with your favourite games
            </p>
          </div>
          <div className={styles.rectangle18} />
        </div>
        <div className={styles.howToRegister04}>
          <div className={styles.rectangle14}>
            <img
              src="../image/mfme3a6n-2wrnn7o.png"
              className={styles.depositIcon01}
            />
            <p className={styles.makeADepositClaimYou}>
              Enjoy exciting winnings moment & withdraw
            </p>
          </div>
          <div className={styles.rectangle19} />
        </div>
      </div>
      <img src="../image/mfme3a6m-93bswqe.svg" className={styles.progressiveBar} />
    </div>
  );
}

export default Component;
