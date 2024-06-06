// app/api/posts/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '/page.module.css';

interface Job {
  name: string;
  age: string;
  job: string;
  id: string;
}

const Page: React.FC = () => {
  const [data, setData] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://65bf384b25a83926ab94a485.mockapi.io/api');

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Fetch data on initial render

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`https://65bf384b25a83926ab94a485.mockapi.io/api/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete data');
      }

      // Remove the deleted job from the data array
      setData(data.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <h1>Job Listings</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.text}>Name</th>
            <th className={styles.text}>Age</th>
            <th className={styles.text}>Job</th>
            <th className={styles.text}>Edit</th>
            <th className={styles.text}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((job) => (
            <tr key={job.id}>
              <td>{job.name}</td>
              <td>{job.age}</td>
              <td>{job.job}</td>
              <td><Link href={`/api/edit/${job.id}`}>Edit</Link></td>
              <td><button onClick={() => handleDelete(job.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/api/create">Create</Link>
    </div>
  );
};

export default Page;
