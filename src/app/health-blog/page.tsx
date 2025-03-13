import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

export default function HealthBlogPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Health Blog</h1>
        <p className={styles.description}>
          Explore our health articles and stay informed about the latest medical
          news and advice. This page is under construction.
        </p>
      </div>
    </main>
  );
}
