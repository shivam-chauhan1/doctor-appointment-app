import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Register</h1>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="Create a password"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.input}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </form>
          <div className={styles.loginLink}>
            Already have an account? <Link href="/auth/login">Login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
