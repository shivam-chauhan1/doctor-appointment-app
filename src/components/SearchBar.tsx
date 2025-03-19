"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.searchTitle}>Find a doctor at your own ease</h2>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.searchInputWrapper}>
            <Image
              src="/search.svg"
              alt="Search"
              width={20}
              height={20}
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Search doctors"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.searchButton}>
            <span className={styles.searchText}>Search</span>
            <Image
              src="/search.svg"
              alt="Search"
              width={20}
              height={20}
              className={styles.mobileSearchIcon}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
