"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./dashboard.module.css";

// Mock data for appointments
const mockAppointments = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiologist",
    doctorImage: "/doctors/doctor1.png",
    date: "2023-12-15",
    time: "10:00",
    status: "upcoming",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Dermatologist",
    doctorImage: "/doctors/doctor2.png",
    date: "2023-12-20",
    time: "14:30",
    status: "upcoming",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Pediatrician",
    doctorImage: "/doctors/doctor3.png",
    date: "2023-11-05",
    time: "09:15",
    status: "completed",
  },
  {
    id: "4",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Neurologist",
    doctorImage: "/doctors/doctor4.png",
    date: "2023-11-10",
    time: "16:00",
    status: "completed",
  },
  {
    id: "5",
    doctorName: "Dr. Lisa Patel",
    doctorSpecialty: "Orthopedic Surgeon",
    doctorImage: "/doctors/doctor5.png",
    date: "2023-10-25",
    time: "11:30",
    status: "cancelled",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Filter appointments based on active tab
  const filteredAppointments = mockAppointments.filter((appointment) => {
    if (activeTab === "upcoming") {
      return appointment.status === "upcoming";
    } else if (activeTab === "past") {
      return appointment.status === "completed";
    } else {
      return appointment.status === "cancelled";
    }
  });

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

  return (
    <div className={styles.dashboardPage}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Dashboard</h1>
          <Link href="/appointments" className={styles.findDoctorButton}>
            Find a Doctor
          </Link>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div className={styles.userProfile}>
              <div className={styles.userImageContainer}>
                <Image
                  src="/user-profile.svg"
                  alt="User Profile"
                  width={100}
                  height={100}
                  className={styles.userImage}
                />
              </div>
              <h2 className={styles.userName}>John Doe</h2>
              <p className={styles.userEmail}>john.doe@example.com</p>
            </div>

            <nav className={styles.navigation}>
              <Link href="/dashboard" className={styles.navLink}>
                <span className={styles.navIcon}>📊</span>
                Dashboard
              </Link>
              <Link href="/dashboard/profile" className={styles.navLink}>
                <span className={styles.navIcon}>👤</span>
                My Profile
              </Link>
              <Link
                href="/dashboard/medical-records"
                className={styles.navLink}
              >
                <span className={styles.navIcon}>📋</span>
                Medical Records
              </Link>
              <Link href="/dashboard/settings" className={styles.navLink}>
                <span className={styles.navIcon}>⚙️</span>
                Settings
              </Link>
            </nav>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.appointmentsSection}>
              <h2 className={styles.sectionTitle}>My Appointments</h2>

              <div className={styles.tabs}>
                <button
                  className={`${styles.tabButton} ${
                    activeTab === "upcoming" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`${styles.tabButton} ${
                    activeTab === "past" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("past")}
                >
                  Past
                </button>
                <button
                  className={`${styles.tabButton} ${
                    activeTab === "cancelled" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("cancelled")}
                >
                  Cancelled
                </button>
              </div>

              {filteredAppointments.length > 0 ? (
                <div className={styles.appointmentsList}>
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={styles.appointmentCard}
                    >
                      <div className={styles.appointmentInfo}>
                        <div className={styles.doctorImageContainer}>
                          <Image
                            src={appointment.doctorImage}
                            alt={appointment.doctorName}
                            width={80}
                            height={80}
                            className={styles.doctorImage}
                          />
                        </div>

                        <div className={styles.appointmentDetails}>
                          <h3 className={styles.doctorName}>
                            {appointment.doctorName}
                          </h3>
                          <p className={styles.doctorSpecialty}>
                            {appointment.doctorSpecialty}
                          </p>
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
                      </div>

                      <div className={styles.appointmentActions}>
                        {appointment.status === "upcoming" && (
                          <>
                            <Link
                              href={`/dashboard/appointments/${appointment.id}`}
                              className={styles.viewButton}
                            >
                              View Details
                            </Link>
                            <button className={styles.rescheduleButton}>
                              Reschedule
                            </button>
                            <button className={styles.cancelButton}>
                              Cancel
                            </button>
                          </>
                        )}

                        {appointment.status === "completed" && (
                          <>
                            <Link
                              href={`/dashboard/appointments/${appointment.id}`}
                              className={styles.viewButton}
                            >
                              View Details
                            </Link>
                            <button className={styles.feedbackButton}>
                              Leave Feedback
                            </button>
                            <button className={styles.bookAgainButton}>
                              Book Again
                            </button>
                          </>
                        )}

                        {appointment.status === "cancelled" && (
                          <button className={styles.bookAgainButton}>
                            Book Again
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noAppointments}>
                  <Image
                    src="/no-results.svg"
                    alt="No appointments"
                    width={100}
                    height={100}
                  />
                  <h3>No {activeTab} appointments found</h3>
                  {activeTab === "upcoming" && (
                    <p>
                      You don&apos;t have any upcoming appointments.{" "}
                      <Link href="/appointments" className={styles.bookLink}>
                        Book an appointment
                      </Link>
                    </p>
                  )}
                  {activeTab === "past" && (
                    <p>You don&apos;t have any past appointments.</p>
                  )}
                  {activeTab === "cancelled" && (
                    <p>You don&apos;t have any cancelled appointments.</p>
                  )}
                </div>
              )}
            </div>

            <div className={styles.statsSection}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📅</div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statTitle}>Total Appointments</h3>
                  <p className={styles.statValue}>{mockAppointments.length}</p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statTitle}>Completed</h3>
                  <p className={styles.statValue}>
                    {
                      mockAppointments.filter(
                        (appointment) => appointment.status === "completed"
                      ).length
                    }
                  </p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>⏳</div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statTitle}>Upcoming</h3>
                  <p className={styles.statValue}>
                    {
                      mockAppointments.filter(
                        (appointment) => appointment.status === "upcoming"
                      ).length
                    }
                  </p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>❌</div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statTitle}>Cancelled</h3>
                  <p className={styles.statValue}>
                    {
                      mockAppointments.filter(
                        (appointment) => appointment.status === "cancelled"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
