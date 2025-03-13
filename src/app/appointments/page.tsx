import Navbar from "@/components/Navbar";
import AppointmentForm from "@/components/AppointmentForm";
import styles from "./page.module.css";

export default function AppointmentsPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Book an Appointment</h1>
        <p className={styles.description}>
          Schedule your appointment with our experienced doctors. Fill out the
          form below and we&apos;ll get back to you shortly.
        </p>
        <AppointmentForm />
      </div>
    </main>
  );
}
