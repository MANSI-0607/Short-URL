import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);
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

    try {
      const response = await fetch('http://localhost:8002/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include', 
        body: JSON.stringify({ url })
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
        const newUrl = {
          shortId: data.id,
          redirectURL: url,
          visitHistory: [], // Initialize visitHistory as an empty array
          totalClicks: 0,
        };
        setUrls([...urls, newUrl]);
        setUrl('');
      } else {
        console.error('Error generating short URL:', data);
      }
    } catch (error) {
      console.error('Error generating short URL:', error);
    }
  };

  
  const fetchUrls = async () => {
    try {
      const token = document.cookie.split('=')[1]; // Extract the token from cookies
      const response = await fetch('http://localhost:8002/url', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setUrls(data.urls);
      } else {
        console.error('Error fetching URLs:', data);
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };
  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="home-container">
      <h1>Your Personal URL Shortener</h1>
      <div className="head">
        <h2>Enter your URL</h2>
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="https://example.com"
        />
        <button onClick={handleGenerateClick}>Generate</button>
      </div>
      <div className='heading'>
        <h3>Sl No.</h3>
        <h3>Redirect URL</h3>
        <h3>Short URL</h3>
        <h3>Total Clicks</h3>
      </div>
      <div className='url-list'>
        {urls.map((urlItem, index) => (
          <div key={urlItem.shortId} className='url-item'>
            <span>{index + 1}</span>
            <span>{urlItem.redirectURL}</span>
            <span>{`http://localhost:8002/url/${urlItem.shortId}`}</span>
            <span>{urlItem.visitHistory.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
