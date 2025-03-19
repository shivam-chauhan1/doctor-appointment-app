"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./booking.module.css";

// Define Doctor interface
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  degree: string;
  imageUrl: string;
}

// Mock data for doctors (same as in appointments page)
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 10,
    rating: 5,
    degree: "MD",
    imageUrl: "/doctor1.jpg",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    experience: 8,
    rating: 4,
    degree: "MD",
    imageUrl: "/doctor2.jpg",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    experience: 15,
    rating: 5,
    degree: "MD",
    imageUrl: "/doctor3.jpg",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    experience: 12,
    rating: 4,
    degree: "MD",
    imageUrl: "/doctor4.jpg",
  },
  {
    id: "5",
    name: "Dr. Lisa Patel",
    specialty: "Orthopedic Surgeon",
    experience: 20,
    rating: 5,
    degree: "MD",
    imageUrl: "/doctor5.jpg",
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    specialty: "Psychiatrist",
    experience: 9,
    rating: 4,
    degree: "MD",
    imageUrl: "/doctor6.jpg",
  },
];

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const doctorId = params.id as string;
    const foundDoctor = mockDoctors.find((doc) => doc.id === doctorId);

    if (foundDoctor) {
      setDoctor(foundDoctor);
    }

    setLoading(false);
  }, [params.id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (!formData.time) {
      errors.time = "Time is required";
    }

    if (!formData.reason.trim()) {
      errors.reason = "Reason for visit is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, this would be an API call to book the appointment
      console.log("Booking appointment with:", doctor);
      console.log("Form data:", formData);

      // Show success message
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        reason: "",
      });

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/appointments");
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading doctor information...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className={styles.errorContainer}>
        <h2>Doctor Not Found</h2>
        <p>The doctor you are looking for does not exist.</p>
        <button
          className={styles.backButton}
          onClick={() => router.push("/appointments")}
        >
          Back to Doctors
        </button>
      </div>
    );
  }

  return (
    <div className={styles.bookingPage}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Book an Appointment</h1>
          <p className={styles.subtitle}>
            Fill out the form below to book an appointment with {doctor.name}
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.doctorInfo}>
            <div className={styles.doctorImageContainer}>
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                width={200}
                height={200}
                className={styles.doctorImage}
              />
            </div>

            <div className={styles.doctorDetails}>
              <h2 className={styles.doctorName}>
                {doctor.name}, {doctor.degree}
              </h2>
              <p className={styles.doctorSpecialty}>{doctor.specialty}</p>

              <div className={styles.doctorStats}>
                <div className={styles.statItem}>
                  <Image
                    src="/hourglass.svg"
                    alt="Experience"
                    width={20}
                    height={20}
                    className={styles.statIcon}
                  />
                  <span>{doctor.experience} Years Experience</span>
                </div>

                <div className={styles.statItem}>
                  <div className={styles.ratingStars}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Image
                        key={index}
                        src={
                          index < doctor.rating
                            ? "/filled-star.svg"
                            : "/unfilled-star.svg"
                        }
                        alt={
                          index < doctor.rating
                            ? "Filled star"
                            : "Unfilled star"
                        }
                        width={20}
                        height={20}
                      />
                    ))}
                  </div>
                  <span>{doctor.rating}.0 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {submitSuccess ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3>Appointment Booked Successfully!</h3>
              <p>You will receive a confirmation email shortly.</p>
              <p>Redirecting to doctors page...</p>
            </div>
          ) : (
            <form className={styles.bookingForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? styles.inputError : ""}
                  />
                  {formErrors.name && (
                    <span className={styles.errorText}>{formErrors.name}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? styles.inputError : ""}
                  />
                  {formErrors.email && (
                    <span className={styles.errorText}>{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? styles.inputError : ""}
                  />
                  {formErrors.phone && (
                    <span className={styles.errorText}>{formErrors.phone}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="date">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={formErrors.date ? styles.inputError : ""}
                  />
                  {formErrors.date && (
                    <span className={styles.errorText}>{formErrors.date}</span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="time">Preferred Time</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={formErrors.time ? styles.inputError : ""}
                  >
                    <option value="">Select a time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                  {formErrors.time && (
                    <span className={styles.errorText}>{formErrors.time}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reason">Reason for Visit</label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={4}
                  className={formErrors.reason ? styles.inputError : ""}
                ></textarea>
                {formErrors.reason && (
                  <span className={styles.errorText}>{formErrors.reason}</span>
                )}
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => router.push("/appointments")}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Book Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
