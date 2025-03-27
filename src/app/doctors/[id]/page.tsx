"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./doctor.module.css";

// Types
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  totalReviews: number;
  degree: string;
  imageUrl: string;
  bio: string;
  location: string;
  consultationFee: number;
  languages: string[];
  availability: {
    [key: string]: string[];
  };
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

// Mock Data
const doctorData: Record<string, Doctor> = {
  "1": {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 10,
    rating: 4.8,
    totalReviews: 124,
    degree: "MD (Cardiology), MBBS",
    imageUrl: "/doctor1.jpg",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience. She specializes in preventive cardiology, heart failure management, and interventional procedures. Dr. Johnson is committed to providing compassionate care and education to help patients maintain heart health.",
    location: "MedicareHeart Institute, Okhla Road",
    consultationFee: 150,
    languages: ["English", "Spanish"],
    availability: {
      Monday: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
      Tuesday: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
      Wednesday: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM"],
      Thursday: ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
      Friday: ["11:00 AM", "01:00 PM", "03:00 PM"],
      Saturday: ["09:00 AM", "10:00 AM", "11:00 AM"],
      Sunday: [],
    },
  },
  "2": {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    experience: 8,
    rating: 4.5,
    totalReviews: 98,
    degree: "MD (Dermatology), MBBS",
    imageUrl: "/doctor2.jpg",
    bio: "Dr. Michael Chen is a dermatologist specializing in both medical and cosmetic dermatology. He has expertise in treating skin conditions such as acne, eczema, and psoriasis, as well as performing cosmetic procedures. Dr. Chen is dedicated to helping patients achieve healthy skin and improved confidence.",
    location: "SkinCare Clinic, Main Street",
    consultationFee: 120,
    languages: ["English", "Mandarin"],
    availability: {
      Monday: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
      Tuesday: ["09:00 AM", "10:00 AM", "11:00 AM", "04:00 PM"],
      Wednesday: ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"],
      Thursday: ["10:00 AM", "11:00 AM", "03:00 PM", "04:00 PM"],
      Friday: ["09:00 AM", "11:00 AM", "02:00 PM"],
      Saturday: ["10:00 AM", "11:00 AM", "12:00 PM"],
      Sunday: [],
    },
  },
};

// Mock current user ID
const CURRENT_USER_ID = "user123";

// Mock reviews
const reviewsData: Record<string, Review[]> = {
  "1": [
    {
      id: "1",
      userId: "user456",
      userName: "Robert Thompson",
      userImage: "/user1.jpg",
      rating: 5,
      date: "October 12, 2023",
      comment:
        "Dr. Johnson is an excellent cardiologist. She took the time to explain my condition in detail and answered all my questions. Very professional and caring.",
    },
    {
      id: "3",
      userId: "user789",
      userName: "David Wilson",
      userImage: "/user3.jpg",
      rating: 5,
      date: "August 22, 2023",
      comment:
        "Dr. Johnson helped me manage my heart condition with effective treatment plans. Her staff is also very friendly and helpful.",
    },
  ],
  "2": [
    {
      id: "1",
      userId: "user456",
      userName: "Jennifer Adams",
      userImage: "/user4.jpg",
      rating: 5,
      date: "October 8, 2023",
      comment:
        "Dr. Chen is amazing! He diagnosed and treated my skin condition that other doctors couldn't figure out for years.",
    },
  ],
};

// Day tabs for availability schedule
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DoctorProfilePage = () => {
  const params = useParams();
  const doctorId = params.id as string;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [activeDay, setActiveDay] = useState<string>("Monday");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    // In a real app, fetch doctor data and reviews from API
    const fetchedDoctor = doctorData[doctorId];
    const allReviews = reviewsData[doctorId] || [];

    // Find the current user's review
    // In a real app, this would be fetched from the backend
    const existingUserReview =
      allReviews.find((review) => review.userId === CURRENT_USER_ID) || null;

    if (fetchedDoctor) {
      setDoctor(fetchedDoctor);
      setActiveDay(
        Object.keys(fetchedDoctor.availability).find(
          (day) => fetchedDoctor.availability[day].length > 0
        ) || "Monday"
      );
    }

    setUserReview(existingUserReview);

    // Reset the form state
    setNewReview({
      rating: 0,
      comment: "",
    });
  }, [doctorId]);

  if (!doctor) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.errorMessage}>Doctor not found</div>
      </div>
    );
  }

  const handleDayChange = (day: string) => {
    setActiveDay(day);
  };

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newReview.rating === 0 || !newReview.comment.trim()) {
      alert("Please provide both a rating and comment");
      return;
    }

    // In a real app, send the review to the backend
    const updatedReview: Review = {
      id: userReview ? userReview.id : Date.now().toString(),
      userId: CURRENT_USER_ID,
      userName: "Current User",
      userImage: "/default-user.jpg",
      rating: newReview.rating,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      comment: newReview.comment,
    };

    setUserReview(updatedReview);
    setShowReviewForm(false);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Image
            key={i}
            src="/icons/star.svg"
            alt="Star"
            width={20}
            height={20}
            className={styles.starIcon}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Image
            key={i}
            src="/icons/star.svg"
            alt="Half Star"
            width={20}
            height={20}
            className={styles.starIconHalf}
          />
        );
      } else {
        stars.push(
          <Image
            key={i}
            src="/icons/star-empty.svg"
            alt="Empty Star"
            width={20}
            height={20}
            className={styles.starIconEmpty}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.profileContainer}>
        {/* Doctor Header */}
        <div className={styles.doctorHeader}>
          <div className={styles.doctorImage}>
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              width={150}
              height={150}
              className={styles.doctorAvatar}
            />
          </div>

          <div className={styles.doctorInfo}>
            <h1 className={styles.doctorName}>{doctor.name}</h1>
            <p className={styles.doctorSpecialty}>{doctor.specialty}</p>

            <div className={styles.ratingContainer}>
              <div className={styles.stars}>{renderStars(doctor.rating)}</div>
              <span className={styles.ratingText}>
                {doctor.rating.toFixed(1)}
              </span>
            </div>

            <div className={styles.infoItem}>
              <Image
                src="/icons/graduation-cap.svg"
                alt="Degree"
                width={20}
                height={20}
                className={styles.infoIcon}
              />
              <span>{doctor.degree}</span>
            </div>

            <div className={styles.infoItem}>
              <Image
                src="/icons/location.svg"
                alt="Location"
                width={20}
                height={20}
                className={styles.infoIcon}
              />
              <span>{doctor.location}</span>
            </div>
          </div>

          <div className={styles.bookingSection}>
            <Link href={`/appointments/book/${doctor.id}`}>
              <button className={styles.bookAppointmentBtn}>
                Book Appointment
              </button>
            </Link>
          </div>
        </div>

        {/* Doctor Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button className={`${styles.tabButton} ${styles.activeTab}`}>
              Overview
            </button>
          </div>

          <div className={styles.tabContent}>
            {/* About Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About Doctor</h2>
              <p className={styles.doctorBio}>{doctor.bio}</p>

              <div className={styles.doctorMetadata}>
                <div className={styles.metadataItem}>
                  <h3>Experience</h3>
                  <p>{doctor.experience} years</p>
                </div>
                <div className={styles.metadataItem}>
                  <h3>Languages</h3>
                  <p>{doctor.languages.join(", ")}</p>
                </div>
              </div>
            </section>

            {/* Availability Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Image
                  src="/icons/calendar.svg"
                  alt="Calendar"
                  width={20}
                  height={20}
                  className={styles.sectionIcon}
                />
                Availability Schedule
              </h2>

              <div className={styles.daysContainer}>
                {days.map((day) => (
                  <button
                    key={day}
                    className={`${styles.dayButton} ${
                      activeDay === day ? styles.activeDay : ""
                    } ${
                      doctor.availability[day].length === 0
                        ? styles.disabledDay
                        : ""
                    }`}
                    onClick={() => handleDayChange(day)}
                    disabled={doctor.availability[day].length === 0}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className={styles.timeSlotsContainer}>
                <h3 className={styles.dayTitle}>
                  <Image
                    src="/icons/clock.svg"
                    alt="Clock"
                    width={20}
                    height={20}
                    className={styles.timeIcon}
                  />
                  Available times on {activeDay}
                </h3>

                {doctor.availability[activeDay].length > 0 ? (
                  <div className={styles.timeSlots}>
                    {doctor.availability[activeDay].map((time) => (
                      <div key={time} className={styles.timeSlot}>
                        {time}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noSlots}>
                    No availability on {activeDay}
                  </p>
                )}
              </div>
            </section>

            {/* Reviews Section */}
            <section className={styles.section}>
              <div className={styles.reviewsHeader}>
                <h2 className={styles.sectionTitle}>Your Review</h2>
                <button
                  className={styles.writeReviewBtn}
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  {userReview
                    ? showReviewForm
                      ? "Cancel"
                      : "Edit Review"
                    : showReviewForm
                    ? "Cancel"
                    : "Write a Review"}
                </button>
              </div>

              {showReviewForm ? (
                <div className={styles.reviewForm}>
                  <h3 className={styles.reviewFormTitle}>
                    {userReview ? "Edit Your Review" : "Add Your Review"}
                  </h3>
                  <form onSubmit={handleReviewSubmit}>
                    <div className={styles.ratingSelection}>
                      <span className={styles.ratingLabel}>Rating:</span>
                      <div className={styles.ratingStars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className={styles.ratingButton}
                          >
                            {star <= newReview.rating ? (
                              <Image
                                src="/icons/star.svg"
                                alt="Star"
                                width={24}
                                height={24}
                                className={styles.ratingStarActive}
                              />
                            ) : (
                              <Image
                                src="/icons/star-empty.svg"
                                alt="Empty Star"
                                width={24}
                                height={24}
                                className={styles.ratingStar}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.reviewInputGroup}>
                      <label htmlFor="reviewComment">Your Comments:</label>
                      <textarea
                        id="reviewComment"
                        className={styles.reviewInput}
                        value={newReview.comment}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            comment: e.target.value,
                          })
                        }
                        placeholder="Share your experience with this doctor..."
                        rows={4}
                        required
                      />
                    </div>

                    <button type="submit" className={styles.submitReviewBtn}>
                      {userReview ? "Update Review" : "Submit Review"}
                    </button>
                  </form>
                </div>
              ) : userReview ? (
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewUser}>
                      <Image
                        src={userReview.userImage}
                        alt={userReview.userName}
                        width={40}
                        height={40}
                        className={styles.reviewUserImage}
                      />
                      <div className={styles.reviewUserInfo}>
                        <h4 className={styles.reviewUserName}>
                          {userReview.userName} (You)
                        </h4>
                        <span className={styles.reviewDate}>
                          {userReview.date}
                        </span>
                      </div>
                    </div>
                    <div className={styles.reviewRating}>
                      {renderStars(userReview.rating)}
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{userReview.comment}</p>
                </div>
              ) : (
                <div className={styles.noReviewContainer}>
                  <p className={styles.noReviews}>
                    You haven&apos;t reviewed this doctor yet
                  </p>
                  <p className={styles.reviewPrompt}>
                    Share your experience to help other patients
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.copyright}>
          © EmScripts 2024. All Rights Reserved.
        </div>
        <div className={styles.socialLinks}>
          <Image src="/phone.svg" alt="Phone" width={24} height={24} />
          <Image src="/WhatsApp.svg" alt="WhatsApp" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
