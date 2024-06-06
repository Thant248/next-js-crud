// pages/api/edit/[id].tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Job {
  name: string;
  age: string;
  job: string;
  id: string;
}

const Edit: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');

  useEffect(() => {
    // Fetch job data based on the id from the route parameter
    const fetchData = async () => {
      try {
        const res = await fetch(`https://65bf384b25a83926ab94a485.mockapi.io/api/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const jobData = await res.json();
        setJob(jobData);
        setName(jobData.name);
        setAge(jobData.age);
        setJobTitle(jobData.job);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement your update logic here
    const updatedJob: Job = {
      name: name,
      age: age,
      job: jobTitle,
      id: id as string
    };
    try {
      const res = await fetch(`https://65bf384b25a83926ab94a485.mockapi.io/api/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJob)
      });
      if (!res.ok) {
        throw new Error('Failed to update data');
      }
      router.push('/'); // Redirect to the home page after successful update
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <h4 className="mb-2">Edit Job</h4>
      <div className="mb-2">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="text"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="job" className="form-label">
                  Job
                </label>
                <input
                  id="job"
                  name="job"
                  type="text"
                  className="form-control"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="mb-3 text-end">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
