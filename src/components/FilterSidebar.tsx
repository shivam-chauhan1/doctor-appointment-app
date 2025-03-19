"use client";

import { useState, useEffect } from "react";
import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  onFilterChange: (filters: {
    rating: number | null;
    experience: number | null;
    gender: string | null;
  }) => void;
  onReset?: () => void;
}

export default function FilterSidebar({
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [experience, setExperience] = useState<number | null>(null);
  const [gender, setGender] = useState<string | null>("All");
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Monitor window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      // We only need the event listener to detect resize
      // No variable assignment needed
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRatingChange = (value: number) => {
    setRating(value === rating ? null : value);
    onFilterChange({
      rating: value === rating ? null : value,
      experience,
      gender,
    });
  };

  const handleExperienceChange = (value: number) => {
    setExperience(value === experience ? null : value);
    onFilterChange({
      rating,
      experience: value === experience ? null : value,
      gender,
    });
  };

  const handleGenderChange = (value: string) => {
    setGender(value === gender ? null : value);
    onFilterChange({
      rating,
      experience,
      gender: value === gender ? null : value,
    });
  };

  const toggleFilters = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggle when clicking reset
    setRating(null);
    setExperience(null);
    setGender("All");
    onFilterChange({
      rating: null,
      experience: null,
      gender: "All",
    });

    // If external reset handler is provided, call it
    if (onReset) {
      onReset();
    }
  };

  return (
    <div
      className={`${styles.filterContainer} ${
        isCollapsed ? styles.collapsed : ""
      }`}
    >
      <div className={styles.filterHeader} onClick={toggleFilters}>
        <h3 className={styles.filterTitle}>Filter By:</h3>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className={styles.filterContent}>
        <div className={styles.filterSection}>
          <h4 className={styles.sectionTitle}>Rating</h4>
          <div className={styles.filterOptions}>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="rating-all"
                name="rating"
                checked={rating === null}
                onChange={() => {
                  setRating(null);
                  onFilterChange({
                    rating: null,
                    experience,
                    gender,
                  });
                }}
                className={styles.radioInput}
              />
              <label htmlFor="rating-all" className={styles.radioLabel}>
                Show all
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="rating-1"
                name="rating"
                checked={rating === 1}
                onChange={() => handleRatingChange(1)}
                className={styles.radioInput}
              />
              <label htmlFor="rating-1" className={styles.radioLabel}>
                1+ star
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="rating-2"
                name="rating"
                checked={rating === 2}
                onChange={() => handleRatingChange(2)}
                className={styles.radioInput}
              />
              <label htmlFor="rating-2" className={styles.radioLabel}>
                2+ star
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="rating-3"
                name="rating"
                checked={rating === 3}
                onChange={() => handleRatingChange(3)}
                className={styles.radioInput}
              />
              <label htmlFor="rating-3" className={styles.radioLabel}>
                3+ star
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="rating-4"
                name="rating"
                checked={rating === 4}
                onChange={() => handleRatingChange(4)}
                className={styles.radioInput}
              />
              <label htmlFor="rating-4" className={styles.radioLabel}>
                4+ star
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="rating-5"
                name="rating"
                checked={rating === 5}
                onChange={() => handleRatingChange(5)}
                className={styles.radioInput}
              />
              <label htmlFor="rating-5" className={styles.radioLabel}>
                5+ star
              </label>
            </div>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h4 className={styles.sectionTitle}>Experience</h4>
          <div className={styles.filterOptions}>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="exp-all"
                name="experience"
                checked={experience === null}
                onChange={() => {
                  setExperience(null);
                  onFilterChange({
                    rating,
                    experience: null,
                    gender,
                  });
                }}
                className={styles.radioInput}
              />
              <label htmlFor="exp-all" className={styles.radioLabel}>
                Show all
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="exp-15"
                name="experience"
                checked={experience === 15}
                onChange={() => handleExperienceChange(15)}
                className={styles.radioInput}
              />
              <label htmlFor="exp-15" className={styles.radioLabel}>
                15+ years
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="exp-10"
                name="experience"
                checked={experience === 10}
                onChange={() => handleExperienceChange(10)}
                className={styles.radioInput}
              />
              <label htmlFor="exp-10" className={styles.radioLabel}>
                10-15 years
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="exp-5"
                name="experience"
                checked={experience === 5}
                onChange={() => handleExperienceChange(5)}
                className={styles.radioInput}
              />
              <label htmlFor="exp-5" className={styles.radioLabel}>
                5-10 years
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="exp-3"
                name="experience"
                checked={experience === 3}
                onChange={() => handleExperienceChange(3)}
                className={styles.radioInput}
              />
              <label htmlFor="exp-3" className={styles.radioLabel}>
                3-5 years
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="exp-1"
                name="experience"
                checked={experience === 1}
                onChange={() => handleExperienceChange(1)}
                className={styles.radioInput}
              />
              <label htmlFor="exp-1" className={styles.radioLabel}>
                1-3 years
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="exp-0"
                name="experience"
                checked={experience === 0}
                onChange={() => handleExperienceChange(0)}
                className={styles.radioInput}
              />
              <label htmlFor="exp-0" className={styles.radioLabel}>
                0-1 years
              </label>
            </div>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h4 className={styles.sectionTitle}>Gender</h4>
          <div className={styles.filterOptions}>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="gender-all"
                name="gender"
                checked={gender === "All"}
                onChange={() => handleGenderChange("All")}
                className={styles.radioInput}
              />
              <label htmlFor="gender-all" className={styles.radioLabel}>
                Show All
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="gender-male"
                name="gender"
                checked={gender === "Male"}
                onChange={() => handleGenderChange("Male")}
                className={styles.radioInput}
              />
              <label htmlFor="gender-male" className={styles.radioLabel}>
                Male
              </label>
            </div>
            <div className={styles.filterOption}>
              <input
                type="radio"
                id="gender-female"
                name="gender"
                checked={gender === "Female"}
                onChange={() => handleGenderChange("Female")}
                className={styles.radioInput}
              />
              <label htmlFor="gender-female" className={styles.radioLabel}>
                Female
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
