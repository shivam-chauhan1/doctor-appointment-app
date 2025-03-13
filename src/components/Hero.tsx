import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.leftSection}>
        <div className={styles.content}>
          <h1 className={styles.title}>Health in Your Hands.</h1>
          <p className={styles.description}>
            Take control of your healthcare with MedCare. Book appointments with
            ease, explore health blogs, and stay on top of your well-being, all
            in one place.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/appointments" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <Image
          src="/images/hero-img.png"
          alt="Doctor consulting with a patient in a modern medical facility"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 53vw"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
};

export default Hero;
