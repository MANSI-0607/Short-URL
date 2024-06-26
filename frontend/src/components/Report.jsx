import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Report.css"
const Report = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const token = document.cookie.split('=')[1]; // Extract the token from cookies
      const response = await fetch(`http://localhost:8002/crawl/report/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setReport(data);
      } else {
        console.error('Error fetching report:', data);
      }
    };

    fetchReport();
  }, [id]);

  if (!report) return <div>Loading...</div>;

  return (
    <div className="report-container">
      <h1>Report for {report.baseURL}</h1>
      <div className="report-list">
        {Object.entries(report.report).map(([url, count], index) => (
          <div key={index} className="report-item">
            <span>{index + 1}</span>
            <span>{url}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
