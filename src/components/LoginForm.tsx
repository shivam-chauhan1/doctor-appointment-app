"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted:", { email, password });
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const isFormValid = email.trim() !== "" || password.trim() !== "";

  return (
    <div className={styles.loginContainer}>
      <div className={styles.heroSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Login</h2>
          <div className={styles.signupPrompt}>
            Are you a new member?{" "}
            <Link href="/auth/register">Sign up here.</Link>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <Image
                  src="/at_sign.svg"
                  alt="Email"
                  width={20}
                  height={20}
                  className={styles.inputIcon}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <Image
                  src="/lock.svg"
                  alt="Password"
                  width={20}
                  height={20}
                  className={styles.inputIcon}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-pressed={showPassword}
                >
                  <Image
                    src="/eye.svg"
                    alt={showPassword ? "Hide password" : "Show password"}
                    width={20}
                    height={20}
                    className={styles.inputIcon}
                  />
                </button>
              </div>
            </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
              disabled={!isFormValid}
            >
              Reset
            </button>
            <div className={styles.forgotPassword}>
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
