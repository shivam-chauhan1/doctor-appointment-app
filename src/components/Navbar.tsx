"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`${styles.navbar} ${mobileMenuOpen ? styles.navbarFixed : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/logo.svg"
              alt="MedCare Logo"
              width={35}
              height={35}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>MedCare</span>
          </Link>
        </div>

        <div className={styles.links}>
          <Link
            href="/"
            className={`${styles.link} ${
              pathname === "/" ? styles.active : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/appointments"
            className={`${styles.link} ${
              pathname === "/appointments" ? styles.active : ""
            }`}
          >
            Appointments
          </Link>
          <Link
            href="/health-blog"
            className={`${styles.link} ${
              pathname === "/health-blog" ? styles.active : ""
            }`}
          >
            Health Blog
          </Link>
          <Link
            href="/reviews"
            className={`${styles.link} ${
              pathname === "/reviews" ? styles.active : ""
            }`}
          >
            Reviews
          </Link>
        </div>

        <div className={styles.buttons}>
          <Link href="/auth/login" className={styles.loginButton}>
            Login
          </Link>
          <Link href="/auth/register" className={styles.registerButton}>
            Register
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`${styles.mobileMenuButton} ${
            mobileMenuOpen ? styles.active : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div
          className={`${styles.mobileMenu} ${
            mobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <div className={styles.mobileMenuLinks}>
            <Link
              href="/"
              className={`${styles.mobileMenuLink} ${
                pathname === "/" ? styles.active : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/appointments"
              className={`${styles.mobileMenuLink} ${
                pathname === "/appointments" ? styles.active : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Appointments
            </Link>
            <Link
              href="/health-blog"
              className={`${styles.mobileMenuLink} ${
                pathname === "/health-blog" ? styles.active : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Health Blog
            </Link>
            <Link
              href="/reviews"
              className={`${styles.mobileMenuLink} ${
                pathname === "/reviews" ? styles.active : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Reviews
            </Link>
          </div>
          <div className={styles.mobileMenuButtons}>
            <Link
              href="/auth/login"
              className={styles.loginButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className={styles.registerButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
