import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

export default function ReviewsPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Reviews</h1>
        <p className={styles.description}>
          Read what our patients say about their experiences with our doctors
          and services. This page is under construction.
        </p>
      </div>
    </main>
  );
}
