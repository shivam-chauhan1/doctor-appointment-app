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

// Interface for date objects
interface DateItem {
  day: string;
  date: number;
  month: string;
  year: number;
  fullDate: Date;
  availableSlots?: number;
}

// Interface for time slots
interface TimeSlot {
  time: string;
  status: "available" | "disabled" | "selected";
}

// Define a utility function to get slots for a specific date
const getTimeSlotsForDate = (
  date: DateItem
): { morning: TimeSlot[]; afternoon: TimeSlot[] } => {
  // Different days have different availability patterns
  // Here we use the day of week to determine availability
  const dayOfWeek = date.fullDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Initialize slots with all disabled
  const morningSlots: TimeSlot[] = [
    { time: "9:00 AM", status: "disabled" },
    { time: "9:30 AM", status: "disabled" },
    { time: "10:00 AM", status: "disabled" },
    { time: "10:30 AM", status: "disabled" },
    { time: "11:00 AM", status: "disabled" },
    { time: "11:30 AM", status: "disabled" },
  ];

  const afternoonSlots: TimeSlot[] = [
    { time: "1:00 PM", status: "disabled" },
    { time: "1:30 PM", status: "disabled" },
    { time: "2:00 PM", status: "disabled" },
    { time: "2:30 PM", status: "disabled" },
    { time: "3:00 PM", status: "disabled" },
    { time: "3:30 PM", status: "disabled" },
    { time: "4:00 PM", status: "disabled" },
    { time: "4:30 PM", status: "disabled" },
  ];

  // Weekday pattern (Monday-Friday)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Morning slots
    morningSlots[1].status = "available"; // 9:30 AM
    morningSlots[3].status = "available"; // 10:30 AM

    // Afternoon slots
    afternoonSlots[3].status = "available"; // 2:30 PM
    afternoonSlots[4].status = "available"; // 3:00 PM
    afternoonSlots[5].status = "available"; // 3:30 PM
  }

  // Weekend pattern (Saturday, Sunday)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    // Limited slots on weekends
    morningSlots[1].status = "available"; // 9:30 AM
    morningSlots[2].status = "available"; // 10:00 AM
    afternoonSlots[1].status = "available"; // 1:30 PM
  }

  // Special case for specific dates (example for today)
  if (date.fullDate.toDateString() === new Date().toDateString()) {
    // Today only has specific slots available
    morningSlots.forEach((slot) => {
      slot.status = "disabled";
    });
    morningSlots[1].status = "available"; // Only 9:30 AM

    afternoonSlots.forEach((slot) => {
      slot.status = "disabled";
    });
    afternoonSlots[5].status = "available"; // Only 3:30 PM
  }

  return { morning: morningSlots, afternoon: afternoonSlots };
};

// Helper function to count available slots
const countAvailableSlots = (
  morning: TimeSlot[],
  afternoon: TimeSlot[]
): number => {
  return (
    morning.filter((slot) => slot.status === "available").length +
    afternoon.filter((slot) => slot.status === "available").length
  );
};

// Modify getDatesForMonth to include slot counts
const getDatesForMonth = (month: number, year: number) => {
  const dates: DateItem[] = [];
  const today = new Date();
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // If current month, start from today's date
  const startDate =
    month === today.getMonth() && year === today.getFullYear()
      ? today.getDate()
      : 1;

  for (let i = startDate; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(year, month, i);
    const dateItem: DateItem = {
      day: dayNames[date.getDay()],
      date: date.getDate(),
      month: monthNames[date.getMonth()],
      year: date.getFullYear(),
      fullDate: date,
    };

    // Calculate available slots for this date
    const { morning, afternoon } = getTimeSlotsForDate(dateItem);
    dateItem.availableSlots = countAvailableSlots(morning, afternoon);

    dates.push(dateItem);
  }

  return dates;
};

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"hospital" | "video">("hospital");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [currentMonthData, setCurrentMonthData] = useState<{
    month: number;
    year: number;
    name: string;
  }>({ month: 0, year: 0, name: "" });
  const [dates, setDates] = useState<DateItem[]>([]);

  // Morning time slots (up to 11:30 AM)
  const [morningSlots, setMorningSlots] = useState<TimeSlot[]>([
    { time: "9:00 AM", status: "disabled" },
    { time: "9:30 AM", status: "available" },
    { time: "10:00 AM", status: "disabled" },
    { time: "10:30 AM", status: "available" },
    { time: "11:00 AM", status: "disabled" },
    { time: "11:30 AM", status: "disabled" },
  ]);

  // Afternoon time slots (after 12 noon)
  const [afternoonSlots, setAfternoonSlots] = useState<TimeSlot[]>([
    { time: "1:00 PM", status: "disabled" },
    { time: "1:30 PM", status: "disabled" },
    { time: "2:00 PM", status: "disabled" },
    { time: "2:30 PM", status: "available" },
    { time: "3:00 PM", status: "available" },
    { time: "3:30 PM", status: "available" },
    { time: "4:00 PM", status: "disabled" },
    { time: "4:30 PM", status: "disabled" },
  ]);

  useEffect(() => {
    // In a real app, this would be an API call
    const doctorId = params.id as string;
    const foundDoctor = mockDoctors.find((doc) => doc.id === doctorId);

    if (foundDoctor) {
      setDoctor(foundDoctor);
    }

    // Set current month based on current date
    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    setCurrentMonthData({
      month: currentMonth,
      year: currentYear,
      name: `${monthNames[currentMonth]} ${currentYear}`,
    });

    // Generate dates for current month
    const monthDates = getDatesForMonth(currentMonth, currentYear);
    setDates(monthDates);

    // Set first date as selected by default if dates exist
    if (monthDates.length > 0) {
      setSelectedDate(0);
    }

    setLoading(false);
  }, [params.id]);

  // Update slots when date changes
  useEffect(() => {
    if (selectedDate !== null && dates.length > 0) {
      const selectedDateObj = dates[selectedDate];
      const { morning, afternoon } = getTimeSlotsForDate(selectedDateObj);

      setMorningSlots(morning);
      setAfternoonSlots(afternoon);

      // Reset selected time when date changes
      setSelectedTimeSlot(null);
    }
  }, [selectedDate, dates]);

  const handleTabChange = (tab: "hospital" | "video") => {
    setActiveTab(tab);
  };

  const handleDateSelect = (index: number) => {
    if (selectedDate === index) return; // Don't reselect the same date
    setSelectedDate(index);
  };

  const handleTimeSelect = (slot: TimeSlot, isAfternoon: boolean) => {
    if (slot.status === "disabled") return;

    // Get copies of slots arrays
    const newMorningSlots = [...morningSlots];
    const newAfternoonSlots = [...afternoonSlots];

    // If clicking on already selected slot, toggle it off
    if (selectedTimeSlot && selectedTimeSlot.time === slot.time) {
      const morningIndex = newMorningSlots.findIndex(
        (s) => s.time === slot.time
      );
      const afternoonIndex = newAfternoonSlots.findIndex(
        (s) => s.time === slot.time
      );

      if (
        morningIndex !== -1 &&
        newMorningSlots[morningIndex].status === "selected"
      ) {
        newMorningSlots[morningIndex].status = "available";
        setMorningSlots(newMorningSlots);
        setSelectedTimeSlot(null);
        return;
      }

      if (
        afternoonIndex !== -1 &&
        newAfternoonSlots[afternoonIndex].status === "selected"
      ) {
        newAfternoonSlots[afternoonIndex].status = "available";
        setAfternoonSlots(newAfternoonSlots);
        setSelectedTimeSlot(null);
        return;
      }
    }

    // Reset previously selected slot
    if (selectedTimeSlot) {
      const morningIndex = newMorningSlots.findIndex(
        (s) => s.time === selectedTimeSlot.time
      );
      const afternoonIndex = newAfternoonSlots.findIndex(
        (s) => s.time === selectedTimeSlot.time
      );

      if (
        morningIndex !== -1 &&
        newMorningSlots[morningIndex].status === "selected"
      ) {
        newMorningSlots[morningIndex].status = "available";
      }

      if (
        afternoonIndex !== -1 &&
        newAfternoonSlots[afternoonIndex].status === "selected"
      ) {
        newAfternoonSlots[afternoonIndex].status = "available";
      }
    }

    // Set new selected slot
    if (isAfternoon) {
      const index = newAfternoonSlots.findIndex((s) => s.time === slot.time);
      if (index !== -1) {
        newAfternoonSlots[index].status = "selected";
      }
      setAfternoonSlots(newAfternoonSlots);
      setMorningSlots(newMorningSlots);
    } else {
      const index = newMorningSlots.findIndex((s) => s.time === slot.time);
      if (index !== -1) {
        newMorningSlots[index].status = "selected";
      }
      setMorningSlots(newMorningSlots);
      setAfternoonSlots(newAfternoonSlots);
    }

    setSelectedTimeSlot(slot);
  };

  const handlePrevMonth = () => {
    const { month, year } = currentMonthData;
    const today = new Date();

    // Don't allow going to previous months before current month
    if (month === today.getMonth() && year === today.getFullYear()) {
      return;
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let prevMonth = month - 1;
    let prevYear = year;

    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }

    // Don't go before current month
    if (
      prevYear < today.getFullYear() ||
      (prevYear === today.getFullYear() && prevMonth < today.getMonth())
    ) {
      prevMonth = today.getMonth();
      prevYear = today.getFullYear();
    }

    const newMonthData = {
      month: prevMonth,
      year: prevYear,
      name: `${monthNames[prevMonth]} ${prevYear}`,
    };

    setCurrentMonthData(newMonthData);

    // Update dates for new month
    const newDates = getDatesForMonth(prevMonth, prevYear);
    setDates(newDates);

    // Reset selected date if no dates available
    if (newDates.length > 0) {
      setSelectedDate(0);
    } else {
      setSelectedDate(null);
    }
  };

  const handleNextMonth = () => {
    const { month, year } = currentMonthData;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let nextMonth = month + 1;
    let nextYear = year;

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }

    const newMonthData = {
      month: nextMonth,
      year: nextYear,
      name: `${monthNames[nextMonth]} ${nextYear}`,
    };

    setCurrentMonthData(newMonthData);

    // Update dates for new month
    const newDates = getDatesForMonth(nextMonth, nextYear);
    setDates(newDates);

    // Reset selected date
    if (newDates.length > 0) {
      setSelectedDate(0);
    } else {
      setSelectedDate(null);
    }
  };

  const isPrevMonthDisabled = () => {
    const today = new Date();
    return (
      currentMonthData.year === today.getFullYear() &&
      currentMonthData.month === today.getMonth()
    );
  };

  const handleBookAppointment = () => {
    if (!selectedTimeSlot || selectedDate === null) {
      alert("Please select a date and time for your appointment");
      return;
    }

    const selectedDateObj = dates[selectedDate];
    const formattedDate = `${selectedDateObj.date} ${selectedDateObj.month} ${selectedDateObj.year}`;

    // Navigate to confirmation page with appointment details
    router.push(
      `/appointments/book/${doctor?.id}/confirm?date=${encodeURIComponent(
        formattedDate
      )}&time=${encodeURIComponent(selectedTimeSlot.time)}&isVirtual=${
        activeTab === "video"
      }`
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
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

      <div className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            Book Your Next Doctor Visit in Seconds.
          </h1>
          <p className={styles.heroSubtitle}>
            CareMate helps you find the best healthcare provider by specialty,
            location, and more, ensuring you get the care you need.
          </p>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.scheduleAppointment}>
            <div className={styles.scheduleHeader}>
              <h2 className={styles.scheduleTitle}>Schedule Appointment</h2>
            </div>

            <div className={styles.tabContainer}>
              <div
                className={`${styles.tab} ${
                  activeTab === "hospital"
                    ? styles.tabActive
                    : styles.tabInactive
                }`}
                onClick={() => handleTabChange("hospital")}
              >
                Book Hospital Visit
              </div>
              <div
                className={`${styles.tab} ${
                  activeTab === "video" ? styles.tabActive : styles.tabInactive
                }`}
                onClick={() => handleTabChange("video")}
              >
                Book Video Consult
              </div>
            </div>

            {activeTab === "hospital" ? (
              <div className={styles.locationLabel}>
                <Image
                  src="/location-icon.svg"
                  alt="Location"
                  width={16}
                  height={16}
                  className={styles.locationIcon}
                />
                <span>MedicareHeart Institute, Okhla Road</span>
              </div>
            ) : (
              <div className={styles.locationLabel}>
                <Image
                  src="/video-icon.svg"
                  alt="Virtual"
                  width={16}
                  height={16}
                  className={styles.locationIcon}
                />
                <span>Virtual Consultation</span>
              </div>
            )}

            <div className={styles.monthSelector}>
              <button
                className={`${styles.arrowButton} ${
                  isPrevMonthDisabled() ? styles.arrowButtonDisabled : ""
                }`}
                onClick={handlePrevMonth}
                disabled={isPrevMonthDisabled()}
              >
                <Image
                  src={
                    isPrevMonthDisabled()
                      ? "/left-arrow-disabled.svg"
                      : "/left-arrow.svg"
                  }
                  alt="Previous"
                  width={20}
                  height={20}
                />
              </button>
              <span className={styles.monthName}>{currentMonthData.name}</span>
              <button className={styles.arrowButton} onClick={handleNextMonth}>
                <Image
                  src="/right-arrow.svg"
                  alt="Next"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <div className={styles.daysContainer}>
              {dates.map((date, index) => (
                <div
                  key={index}
                  className={`${styles.dayCard} ${
                    selectedDate === index
                      ? styles.dayCardActive
                      : styles.dayCardInactive
                  }`}
                  onClick={() => handleDateSelect(index)}
                >
                  <div className={styles.dayName}>{date.day}</div>
                  <div className={styles.dayDate}>
                    {date.date} {date.month}
                  </div>
                  {date.availableSlots !== undefined &&
                    date.availableSlots > 0 && (
                      <div className={styles.daySlots}>
                        {date.availableSlots} slots
                      </div>
                    )}
                </div>
              ))}
              {dates.length === 0 && (
                <div className={styles.noDateMessage}>No available dates</div>
              )}
            </div>

            {/* Morning time slots */}
            <div className={styles.timeSection}>
              <div className={styles.timeSectionHeader}>
                <Image
                  src="/sun.svg"
                  alt="Morning"
                  width={20}
                  height={20}
                  className={styles.timeSectionIcon}
                />
                <span className={styles.timeSectionTitle}>Morning</span>
                <div className={styles.slotsIndicator}>
                  {
                    morningSlots.filter(
                      (s) => s.status === "available" || s.status === "selected"
                    ).length
                  }{" "}
                  Slots
                </div>
              </div>

              <div className={styles.timeGrid}>
                {morningSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`${styles.timeSlot} ${
                      slot.status === "disabled"
                        ? styles.timeSlotDisabled
                        : slot.status === "selected"
                        ? styles.timeSlotSelected
                        : styles.timeSlotAvailable
                    }`}
                    onClick={() =>
                      slot.status !== "disabled" &&
                      handleTimeSelect(slot, false)
                    }
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
            </div>

            {/* Afternoon time slots */}
            <div className={styles.timeSection}>
              <div className={styles.timeSectionHeader}>
                <Image
                  src="/sunset.svg"
                  alt="Afternoon"
                  width={20}
                  height={20}
                  className={styles.timeSectionIcon}
                />
                <span className={styles.timeSectionTitle}>Afternoon</span>
                <div className={styles.slotsIndicator}>
                  {
                    afternoonSlots.filter(
                      (s) => s.status === "available" || s.status === "selected"
                    ).length
                  }{" "}
                  Slots
                </div>
              </div>

              <div className={styles.timeGrid}>
                {afternoonSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`${styles.timeSlot} ${
                      slot.status === "disabled"
                        ? styles.timeSlotDisabled
                        : slot.status === "selected"
                        ? styles.timeSlotSelected
                        : styles.timeSlotAvailable
                    }`}
                    onClick={() =>
                      slot.status !== "disabled" && handleTimeSelect(slot, true)
                    }
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
            </div>

            <button
              className={styles.nextButton}
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
          </div>
        </div>
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
}
