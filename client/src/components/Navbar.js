import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import './NavBar.css';

const NavBar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const currentUser = localStorage.getItem('currentUser');

  console.log('currentUser', currentUser);

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="nav-wrapper blue">
        <div>
          <Link to={state ? '/' : '/signin'} className="brand-logo center">
            E-Voting System
          </Link>
        </div>
        <div className="logout-link">
          {state && state.isAdmin && (
            <li className="nav-link">
              <Link to="/result">
                <i className="fas fa-poll"></i> Result
              </Link>
            </li>
          )}
        </div>
        <div className="logout-link">
          {state && (
            <li
              className="nav-link"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: 'CLEAR' });
                history.push('/signin');
              }}
            >
              <i className="far fa-sign-out"></i> Logout
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
