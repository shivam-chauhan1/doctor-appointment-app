"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./DoctorCard.module.css";
import { useRouter } from "next/navigation";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  degree: string;
  imageUrl: string;
  gender?: string;
}

export default function DoctorCard({
  id,
  name,
  specialty,
  experience,
  rating,
  degree,
  imageUrl,
}: DoctorCardProps) {
  const router = useRouter();

  // Generate star rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Image
          key={i}
          src={i <= rating ? "/filled-star.svg" : "/unfilled-star.svg"}
          alt={i <= rating ? "Filled star" : "Unfilled star"}
          width={16}
          height={16}
          className={styles.star}
        />
      );
    }
    return stars;
  };

  const handleCardClick = () => {
    router.push(`/doctors/${id}`);
  };

  return (
    <div className={styles.doctorCard} onClick={handleCardClick}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={name}
            width={120}
            height={120}
            className={styles.doctorImage}
          />
        </div>

        <div className={styles.doctorDetails}>
          <h3 className={styles.doctorName}>
            {name}, {degree}
          </h3>

          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <Image
                src="/stethoscope.svg"
                alt="Specialty"
                width={17.5}
                height={15}
                className={styles.infoIcon}
              />
              <span className={styles.infoText}>{specialty}</span>
            </div>

            <div className={styles.infoItem}>
              <Image
                src="/hourglass.svg"
                alt="Experience"
                width={17.5}
                height={15}
                className={styles.infoIcon}
              />
              <span className={styles.infoText}>{experience} Years</span>
            </div>
          </div>

          <div className={styles.ratingsContainer}>
            <span className={styles.ratingsLabel}>Ratings:</span>
            <div className={styles.stars}>{renderStars()}</div>
          </div>
        </div>

        <Link
          href={`/appointments/book/${id}`}
          className={styles.bookButton}
          onClick={(e) => e.stopPropagation()}
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
