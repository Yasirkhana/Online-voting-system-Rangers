import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userType } from '../utils';
import { UserContext } from '../../App';
import Posts from './Posts';
import M from 'materialize-css';
import Image from '../../Image/Capture.JPG';
import { url } from '../utils/Url';

const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');
  const [userItem, setUserItem] = useState('');

  const PostData = () => {
    // checks the validity of the email entered by the user
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: 'Invalid email',
        classes: '#c62828 red darken-3',
      });
      return;
    }

    // handling the sign-in functionality and managing the authentication state
    fetch(url + 'signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
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
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard" style={{ width: '80%', margin: '20px', paddingTop: '5%' }}>
      <p>
        <b style={{ marginLeft: '5%', fontSize: '24px' }}></b>
      </p>
      <div className="row">
        <div className="col-md-6 ">
          <Posts />
        </div>
        <div className="col-md-6">
          <div
            className="card"
            style={{
              paddingLeft: '40px',
              paddingRight: '40px',
              paddingTop: '20px',
              border: '1px solid blue',
            }}
          >
            <img
              src={Image}
              alt="image"
              style={{
                height: '90px',
                width: '90px',
                borderRadius: '50%',
                alignSelf: 'center',
                marginBottom: '15px',
              }}
            />

            <div>
              <div className="col">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  className="form-control"
                  style={{ height: '50px', width: '100%' }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  style={{ height: '50px', width: '100%' }}
                  onChange={(e) => setPasword(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="col">
                <select
                  className="form-select"
                  value={userItem}
                  onChange={(e) => setUserItem(e.target.value)}
                  style={{ height: '50px', width: '100%' }}
                >
                  {userType.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="btn btn-success mt-4"
              style={{ height: '50px', width: '100%' }}
              onClick={PostData}
            >
              Login
            </button>
            <p
              style={{
                fontFamily: 'Raleway',
                textAlign: 'center',
                fontSize: '17px',
                fontWeight: '500',
                marginTop: '20px',
              }}
            >
              Not registered? <Link to="/signup">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
