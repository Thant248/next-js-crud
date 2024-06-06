// app/posts/page.tsx
"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '/page.module.css';
import { Job } from '@/type';
import Link from 'next/link';




const Page: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const router = useRouter(); // Use the useRouter hook

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const newJob = { name, age, job };

    const res = await fetch('https://65bf384b25a83926ab94a485.mockapi.io/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      throw new Error('Failed to post data');
    }

    // Update job list with the newly added job
    const postedJob = await res.json();
    setJobs([...jobs, postedJob]);

    // Clear form
    setName('');
    setAge('');
    setJob('');

    // Navigate to the /api/posts route
    router.push('/api/posts');
  };

  return (
    <div>
      
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputBox}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Age:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={styles.inputBox}
            required
          />
        </div>
        <div>
          <label className={styles.label}>Job:</label>
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className={styles.inputBox}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Add Job</button>
        <Link href="/api/posts" className={styles.button}>View Data</Link>
      </form>
    </div>
  );
};

export default Page;
