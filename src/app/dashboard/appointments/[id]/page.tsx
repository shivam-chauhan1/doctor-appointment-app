"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./appointmentDetails.module.css";

// Define Appointment interface
interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  location: string;
  reason: string;
  notes: string;
  diagnosis?: string;
  prescription?: string;
  followUp?: string;
  cancellationReason?: string;
}

// Mock data for appointments (same as in dashboard page)
const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiologist",
    doctorImage: "/doctor1.jpg",
    date: "2023-12-15",
    time: "10:00",
    status: "upcoming",
    location: "Medical Center, 123 Health St, Suite 101",
    reason: "Annual heart checkup",
    notes:
      "Please bring your previous test results and a list of current medications.",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Dermatologist",
    doctorImage: "/doctor2.jpg",
    date: "2023-12-20",
    time: "14:30",
    status: "upcoming",
    location: "Dermatology Clinic, 456 Skin Ave, Room 205",
    reason: "Skin rash consultation",
    notes: "Take photos of affected areas if possible.",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Pediatrician",
    doctorImage: "/doctor3.jpg",
    date: "2023-11-05",
    time: "09:15",
    status: "completed",
    location: "Children's Health Center, 789 Kid Blvd",
    reason: "Regular checkup and vaccinations",
    notes: "Bring vaccination records.",
    diagnosis: "Healthy development, all vaccinations up to date.",
    prescription: "Vitamin D supplements, 400 IU daily.",
    followUp: "Next appointment in 6 months.",
  },
  {
    id: "4",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Neurologist",
    doctorImage: "/doctor4.jpg",
    date: "2023-11-10",
    time: "16:00",
    status: "completed",
    location: "Neurology Associates, 321 Brain St, Floor 4",
    reason: "Recurring headaches",
    notes: "Keep a headache journal for two weeks prior.",
    diagnosis: "Tension headaches due to stress and poor posture.",
    prescription: "Ibuprofen 400mg as needed, not to exceed 3 times per week.",
    followUp: "Return in 1 month if symptoms persist.",
  },
  {
    id: "5",
    doctorName: "Dr. Lisa Patel",
    doctorSpecialty: "Orthopedic Surgeon",
    doctorImage: "/doctor5.jpg",
    date: "2023-10-25",
    time: "11:30",
    status: "cancelled",
    location: "Orthopedic Center, 555 Bone Ave",
    reason: "Knee pain evaluation",
    notes: "Bring previous X-rays if available.",
    cancellationReason: "Doctor unavailable due to emergency surgery.",
  },
];

export default function AppointmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const appointmentId = params.id as string;
    const foundAppointment = mockAppointments.find(
      (appt) => appt.id === appointmentId
    );

    if (foundAppointment) {
      setAppointment(foundAppointment);
    }

    setLoading(false);
  }, [params.id]);

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time to display in 12-hour format
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading appointment details...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className={styles.errorContainer}>
        <h2>Appointment Not Found</h2>
        <p>The appointment you are looking for does not exist.</p>
        <button
          className={styles.backButton}
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className={styles.detailsPage}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/dashboard" className={styles.backLink}>
            ← Back to Dashboard
          </Link>
          <h1 className={styles.title}>Appointment Details</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.appointmentHeader}>
            <div
              className={styles.statusBadge}
              data-status={appointment.status}
            >
              {appointment.status.charAt(0).toUpperCase() +
                appointment.status.slice(1)}
            </div>

            <div className={styles.appointmentDateTime}>
              <div className={styles.dateTime}>
                <span className={styles.icon}>📅</span>
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className={styles.dateTime}>
                <span className={styles.icon}>🕒</span>
                <span>{formatTime(appointment.time)}</span>
              </div>
            </div>
          </div>

          <div className={styles.doctorInfo}>
            <div className={styles.doctorImageContainer}>
              <Image
                src={appointment.doctorImage}
                alt={appointment.doctorName}
                width={120}
                height={120}
                className={styles.doctorImage}
              />
            </div>

            <div className={styles.doctorDetails}>
              <h2 className={styles.doctorName}>{appointment.doctorName}</h2>
              <p className={styles.doctorSpecialty}>
                {appointment.doctorSpecialty}
              </p>

              <div className={styles.locationInfo}>
                <span className={styles.icon}>📍</span>
                <span>{appointment.location}</span>
              </div>
            </div>
          </div>

          <div className={styles.appointmentDetails}>
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>Reason for Visit</h3>
              <p className={styles.sectionContent}>{appointment.reason}</p>
            </div>

            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>Notes</h3>
              <p className={styles.sectionContent}>{appointment.notes}</p>
            </div>

            {appointment.status === "completed" && (
              <>
                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Diagnosis</h3>
                  <p className={styles.sectionContent}>
                    {appointment.diagnosis}
                  </p>
                </div>

                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Prescription</h3>
                  <p className={styles.sectionContent}>
                    {appointment.prescription}
                  </p>
                </div>

                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Follow-up</h3>
                  <p className={styles.sectionContent}>
                    {appointment.followUp}
                  </p>
                </div>
              </>
            )}

            {appointment.status === "cancelled" && (
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>Cancellation Reason</h3>
                <p className={styles.sectionContent}>
                  {appointment.cancellationReason}
                </p>
              </div>
            )}
          </div>

          <div className={styles.actionButtons}>
            {appointment.status === "upcoming" && (
              <>
                <button className={styles.rescheduleButton}>
                  Reschedule Appointment
                </button>
                <button className={styles.cancelButton}>
                  Cancel Appointment
                </button>
              </>
            )}

            {appointment.status === "completed" && (
              <>
                <button className={styles.feedbackButton}>
                  Leave Feedback
                </button>
                <button className={styles.bookAgainButton}>Book Again</button>
              </>
            )}

            {appointment.status === "cancelled" && (
              <button className={styles.bookAgainButton}>Book Again</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
