"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import styles from "./confirm.module.css";

// Define interfaces
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  degree: string;
  imageUrl: string;
}

interface FormData {
  fullName: string;
  age: string;
  gender: string;
  email: string;
  reasonForVisit: string;
  allergies: string;
  currentMedications: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  age?: string;
  gender?: string;
  email?: string;
  reasonForVisit?: string;
  consent?: string;
}

// Mock user data (this would come from user's login in the future)
const mockUserData = {
  fullName: "John Doe",
  email: "john.doe@example.com",
};

const initialFormData: FormData = {
  fullName: mockUserData.fullName,
  age: "",
  gender: "",
  email: mockUserData.email,
  reasonForVisit: "",
  allergies: "",
  currentMedications: "",
  consent: false,
};

// Mock doctor data (same as in booking page)
const doctorData: Record<string, Doctor> = {
  "1": {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 10,
    rating: 5,
    degree: "MD",
    imageUrl: "/doctor1.jpg",
  },
  "2": {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    experience: 8,
    rating: 4,
    degree: "MD",
    imageUrl: "/doctor2.jpg",
  },
  "3": {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    experience: 15,
    rating: 5,
    degree: "MD",
    imageUrl: "/doctor3.jpg",
  },
  "4": {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    experience: 12,
    rating: 4,
    degree: "MD",
    imageUrl: "/doctor4.jpg",
  },
  "5": {
    id: "5",
    name: "Dr. Lisa Patel",
    specialty: "Orthopedic Surgeon",
    experience: 20,
    rating: 5,
    degree: "MD",
    imageUrl: "/doctor5.jpg",
  },
  "6": {
    id: "6",
    name: "Dr. Robert Kim",
    specialty: "Psychiatrist",
    experience: 9,
    rating: 4,
    degree: "MD",
    imageUrl: "/doctor6.jpg",
  },
};

const ConfirmBookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  // Get appointment details from URL parameters
  const doctorId = params.id as string;
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const isVirtual = searchParams.get("isVirtual") === "true";

  const doctor = doctorData[doctorId];

  // Add error handling for doctor data
  if (!doctor) {
    console.error("Doctor not found for ID:", doctorId);
    return (
      <div className={styles.bookingPage}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Error</h1>
            <p className={styles.subtitle}>
              Doctor information not found. Please try booking again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 0) {
      newErrors.age = "Please enter a valid age";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = "Reason for visit is required";
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to book appointment
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setIsSuccessful(true);

      // Redirect to user dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.bookingPage}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Confirm Your Appointment</h1>
          <p className={styles.subtitle}>
            Please fill in your details to complete the booking
          </p>
        </div>

        {isSuccessful ? (
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <Image
                src="/checkmark.svg"
                alt="Success"
                width={64}
                height={64}
              />
            </div>
            <h2 className={styles.successTitle}>Appointment Confirmed!</h2>
            <p className={styles.successMessage}>
              Your appointment has been successfully booked. A confirmation
              email will be sent to {formData.email} shortly.
            </p>
            <p className={styles.redirectMessage}>
              Redirecting you to dashboard...
            </p>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <div className={styles.appointmentSummary}>
              <div className={styles.doctorInfo}>
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={80}
                  height={80}
                  className={styles.doctorImage}
                />
                <div className={styles.doctorDetails}>
                  <h3 className={styles.doctorName}>{doctor.name}</h3>
                  <p className={styles.doctorSpecialty}>{doctor.specialty}</p>
                  <p className={styles.appointmentDateTime}>
                    {date} at {time}
                  </p>
                  <p className={styles.consultationType}>
                    {isVirtual ? "Video Consultation" : "Hospital Visit"}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  readOnly
                  className={styles.readOnlyInput}
                  placeholder="Enter your full name"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={errors.age ? styles.inputError : ""}
                    placeholder="Enter your age"
                  />
                  {errors.age && (
                    <span className={styles.errorMessage}>{errors.age}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={errors.gender ? styles.inputError : ""}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className={styles.errorMessage}>{errors.gender}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className={styles.readOnlyInput}
                  placeholder="Enter your email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reasonForVisit">Reason for Visit</label>
                <textarea
                  id="reasonForVisit"
                  name="reasonForVisit"
                  value={formData.reasonForVisit}
                  onChange={handleInputChange}
                  className={errors.reasonForVisit ? styles.inputError : ""}
                  placeholder="Please describe your symptoms or reason for visit"
                  rows={3}
                />
                {errors.reasonForVisit && (
                  <span className={styles.errorMessage}>
                    {errors.reasonForVisit}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="allergies">Allergies (if any)</label>
                <input
                  type="text"
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="List any allergies you have"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="currentMedications">
                  Current Medications (if any)
                </label>
                <input
                  type="text"
                  id="currentMedications"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleInputChange}
                  placeholder="List any medications you are currently taking"
                />
              </div>

              <div className={styles.consentGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className={errors.consent ? styles.inputError : ""}
                  />
                  <span>
                    I agree to share my information with the healthcare provider
                    and consent to the{" "}
                    <a href="/privacy-policy" className={styles.privacyLink}>
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.consent && (
                  <span className={styles.errorMessage}>{errors.consent}</span>
                )}
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Confirming..." : "Confirm Appointment"}
              </button>
            </form>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.copyright}>
          © EmScripts 2024. All Right Reserved.
        </div>
        <div className={styles.socialLinks}>
          <Image src="/phone.svg" alt="Phone" width={24} height={24} />
          <Image src="/WhatsApp.svg" alt="WhatsApp" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
