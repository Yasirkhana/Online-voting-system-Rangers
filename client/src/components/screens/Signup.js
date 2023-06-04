import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { url } from '../utils/Url';

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [branch, setBranch] = useState('');
  const [image, setImage] = useState('');
  const [urls, setUrls] = useState(undefined);

  useEffect(() => {
    if (urls) {
      uploadFields();
    }
  }, [urls]);

  const uploadPic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'voting');
    data.append('cloud_name', 'dvfpkko1z');

    fetch('https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrls(data.urls);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      // Displays a toast message with the text "Invalid email" and applies red color styling to the toast.
      M.toast({
        html: 'Invalid email',
        classes: '#c62828 red darken-3',
      });
      return;
    }

    fetch(url + 'signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
        mobile,
        city,
        branch,
        pic: urls,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({
            html: data.error,
            classes: '#c62828 red darken-3',
          });
        } else {
          M.toast({
            html: data.message,
            classes: '#43a047 green darken-1',
          });
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <p className="registration-title">Registration</p>

        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="file-field input-field">
          <div className="btn upload-btn">
            <span>Upload pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <button className="btn signup-btn" onClick={() => PostData()}>
          Sign Up
        </button>

        <p className="login-text">
          Already have an account?{' '}
          <Link to="/signin" className="login-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
