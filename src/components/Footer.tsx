"use client";

import Image from "next/image";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© EmScripts 2024. All Right Reserved.</p>
        <div className={styles.contactInfo}>
          <a href="tel:+1234567890" className={styles.contactLink}>
            <Image src="/phone.svg" alt="Phone" width={20} height={20} />
          </a>
          <a href="https://wa.me/1234567890" className={styles.contactLink}>
            <Image src="/WhatsApp.svg" alt="WhatsApp" width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
