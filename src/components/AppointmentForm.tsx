"use client";

import { useState } from "react";
import styles from "./AppointmentForm.module.css";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    doctor: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data to an API
    console.log("Form submitted:", formData);
    alert("Appointment request submitted successfully!");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      doctor: "",
      reason: "",
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Book an Appointment</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Preferred Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="time" className={styles.label}>
              Preferred Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="doctor" className={styles.label}>
            Select Doctor
          </label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Select a doctor</option>
            <option value="dr-smith">Dr. Smith - Cardiologist</option>
            <option value="dr-johnson">Dr. Johnson - Dermatologist</option>
            <option value="dr-williams">Dr. Williams - Neurologist</option>
            <option value="dr-brown">Dr. Brown - Pediatrician</option>
            <option value="dr-davis">Dr. Davis - Orthopedic</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reason" className={styles.label}>
            Reason for Visit
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Briefly describe your symptoms or reason for appointment"
            rows={4}
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
