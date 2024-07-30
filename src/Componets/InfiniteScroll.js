import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const InfiniteScroll = () => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const accessKey = 'la6_xHKMIAA6GTy3ugVmQXQa8-i5-R5cwZDmk56YBjs';

  useEffect(() => {
    loadMoreImages();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMoreImages = useCallback(() => {
    axios
      .get(`https://api.unsplash.com/photos`, {
        params: { page: page, per_page: 10 },
        headers: {
          Authorization: `Client-ID ${accessKey}`
        }
      })
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data]);
        if (response.data.length === 0 || response.data.length < 10) {
          setHasMore(false);
        }
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => console.error('Error loading images:', error));
  }, [page, accessKey]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight && hasMore) {
      loadMoreImages();
    }
  };

  return (
    <div>
      <h1>Scroll</h1>
      <h2>This is scroll</h2>
      <div className="image-grid">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
      {hasMore && <p>Loading more images...</p>}
    </div>
  );
};

export default InfiniteScroll;
