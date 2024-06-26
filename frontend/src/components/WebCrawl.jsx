import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './WebCrawl.css';

const WebCrawl = () => {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGenerateClick = async () => {
    const token = document.cookie.split('=')[1]; // Extract the token from cookies
    if (!token) {
      navigate('/login', { state: { message: 'You are not logged in' } });
      return;
    }

    setLoading(true); // Set loading to true when request starts

    try {
      const response = await fetch('http://localhost:8002/crawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ baseURL: url })
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error('Unexpected response type:', contentType);
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error('Unexpected response format');
      }

      const data = await response.json();
      if (response.ok) {
        setUrls([...urls, data]);
        setUrl('');
      } else {
        console.error('Error generating :', data);
      }
    } catch (error) {
      console.error('Error generating :', error);
    } finally {
      setLoading(false); // Set loading to false when request ends
    }
  };

  const fetchUrls = async () => {
    try {
      const token = document.cookie.split('=')[1]; // Extract the token from cookies
      const response = await fetch('http://localhost:8002/crawl', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setUrls(data);
      } else {
        console.error('Error fetching data:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="home-container">
      <h1>Your Personal Spider</h1>
      <div className="head">
        <h2>Enter base URL</h2>
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="https://example.com"
        />
        <button onClick={handleGenerateClick} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      <div className='heading'>
        <h3>Sl No.</h3>
        <h3>Base URL</h3>
        <h3>Report</h3>
      </div>
      <div className='url-list'>
        {urls.map((urlItem, index) => (
          <div key={urlItem._id} className='url-item'>
            <span>{index + 1}</span>
            <span>{urlItem.baseURL}</span>
            <span>
              <NavLink to={`/report/${urlItem._id}`}>
                View Report
              </NavLink>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebCrawl;
