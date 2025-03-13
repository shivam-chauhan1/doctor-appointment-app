import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form}>
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
                placeholder="Enter your password"
                required
              />
            </div>
            <div className={styles.forgotPassword}>
              <Link href="/auth/forgot-password">Forgot password?</Link>
            </div>
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>
          <div className={styles.registerLink}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register">Register</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
