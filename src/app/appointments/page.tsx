"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import DoctorCard from "@/components/DoctorCard";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import styles from "./appointments.module.css";

// Mock data for doctors
const mockDoctors = [
  {
    id: "1",
    name: "Dr Jane Doe",
    specialty: "Dentist",
    experience: 9,
    rating: 4,
    degree: "MBBS",
    imageUrl: "/doctors/doctor1.png",
    gender: "Female",
  },
  {
    id: "2",
    name: "Dr Sam Wilson",
    specialty: "Dentist",
    experience: 5,
    rating: 4,
    degree: "BDS",
    imageUrl: "/doctors/doctor2.png",
    gender: "Male",
  },
  {
    id: "3",
    name: "Dr Pepper Potts",
    specialty: "Dentist",
    experience: 5,
    rating: 5,
    degree: "BHMS",
    imageUrl: "/doctors/doctor3.png",
    gender: "Female",
  },
  {
    id: "4",
    name: "Dr Tony Stark",
    specialty: "Dentist",
    experience: 4,
    rating: 4,
    degree: "MDS",
    imageUrl: "/doctors/doctor4.png",
    gender: "Male",
  },
  {
    id: "5",
    name: "Dr Meghan",
    specialty: "Dentist",
    experience: 3,
    rating: 4,
    degree: "MD",
    imageUrl: "/doctors/doctor5.png",
    gender: "Female",
  },
  {
    id: "6",
    name: "Dr Dev Patel",
    specialty: "Dentist",
    experience: 2,
    rating: 5,
    degree: "FNB",
    imageUrl: "/doctors/doctor6.png",
    gender: "Male",
  },
];

interface Filters {
  rating: number | null;
  experience: number | null;
  gender: string | null;
}

export default function AppointmentsPage() {
  const [doctors] = useState(mockDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    rating: null,
    experience: null,
    gender: null,
  });

  const doctorsPerPage = 6;

  // Apply filters and search
  useEffect(() => {
    let result = [...doctors];

    // Apply search
    if (searchQuery) {
      result = result.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply rating filter
    if (filters.rating !== null) {
      result = result.filter(
        (doctor) => doctor.rating >= (filters.rating || 0)
      );
    }

    // Apply experience filter
    if (filters.experience !== null && filters.experience > 0) {
      result = result.filter(
        (doctor) => doctor.experience >= (filters.experience || 0)
      );
    }

    // Apply gender filter
    if (filters.gender !== null && filters.gender !== "All") {
      result = result.filter((doctor) => doctor.gender === filters.gender);
    }

    setFilteredDoctors(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filters, doctors]);

  // Get current doctors for pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.appointmentsPage}>
      <Navbar />

      <div className={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.doctorsHeader}>
          <h2 className={styles.doctorsCount}>
            {filteredDoctors.length} doctors available
          </h2>
          <p className={styles.doctorsSubtitle}>
            Book appointments with minimum wait-time & verified doctor details
          </p>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.filterContainer}>
            <FilterSidebar
              onFilterChange={handleFilterChange}
              onReset={() =>
                setFilters({ rating: null, experience: null, gender: null })
              }
            />
          </div>

          <div className={styles.doctorsColumn}>
            {filteredDoctors.length > 0 ? (
              <>
                <div className={styles.doctorsGrid}>
                  {currentDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} {...doctor} />
                  ))}
                </div>

                <div className={styles.paginationContainer}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(
                      filteredDoctors.length / doctorsPerPage
                    )}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <div className={styles.noResults}>
                <Image
                  src="/no-results.svg"
                  alt="No results found"
                  width={100}
                  height={100}
                />
                <h3>No doctors found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
