import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { url } from '../utils/Url';
import './CreatePost.css';

const CretePost = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url + 'posts')
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  let total = 0;
  data.forEach((item) => {
    total += item.votes.length;
  });

  return (
    <div>
      <table className="post-table">
        <thead>
          <tr>
            <th>Option</th>
            <th>Symbol</th>
            <th>Vote</th>
            <th>Percentage Vote</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>
                <img
                  src={item.photo}
                  alt={item.title}
                  className="symbol-image"
                />
              </td>
              <td className="vote-count">{item.votes.length}</td>
              <td>
                {((item.votes.length / total) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="total-vote">
        <b>Total counting Vote: {total}</b>
      </p>
    </div>
  );
};

export default CretePost;
