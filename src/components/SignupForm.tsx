"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./SignupForm.module.css";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup submitted:", { name, email, password });
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const isFormValid =
    name.trim() !== "" || email.trim() !== "" || password.trim() !== "";

  return (
    <div className={styles.loginContainer}>
      <div className={styles.heroSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Sign Up</h2>
          <div className={styles.signupPrompt}>
            Already a member? <Link href="/auth/login">Login.</Link>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <div className={styles.inputWrapper}>
                <Image
                  src="/id.svg"
                  alt="Name"
                  width={20}
                  height={20}
                  className={styles.inputIcon}
                />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="Enter your email address"
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
                  placeholder="Enter your password"
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

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
              disabled={!isFormValid}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
