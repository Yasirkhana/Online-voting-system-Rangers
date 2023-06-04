import React, { useState, useEffect } from 'react';
import { url } from '../utils/Url';
import './Style.css';

const Posts = () => {
  const [data, setData] = useState([]);

  // Fetch all posts from the server and set the data using the result
  useEffect(() => {
    fetch(url + 'posts', {})
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const renderData = data.map((item) => (
    <div className="posts" key={item.title}>
      <p>
        <b>{item && item.title && item.title.split(' ')[0]}</b>
      </p>
      <img className='Profile_Img' src={item.photo} alt={item.title} />
    </div>
  ));

  return (
    <div className="home">
      <div>{renderData}</div>
    </div>
  );
};

export default Posts;
