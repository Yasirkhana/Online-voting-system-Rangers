import React from 'react';
import { useHistory } from 'react-router-dom';
import { url } from '../utils/Url';
import './Style.css';

const Profile = () => {
  const history = useHistory();

  // Get user from the localStorage and set userInformation
  const userInfor = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      {userInfor !== null ? (
        <div className="card ">
          <p>
            <b>{userInfor.firstname}</b>
          </p>
          <img className="Profile_img" src={userInfor.pic} alt="Profile" />
          <p>
            <b>Name :</b> {userInfor.firstname} {userInfor.lastname}
          </p>
          <p>
            <b>Branch :</b> {userInfor.branch}
          </p>
          <p>
            <b>Reg.No :</b> {userInfor.mobile}
          </p>
          <p>
            <b>City :</b> {userInfor.city}
          </p>
          <p>
            <b>State :</b> {userInfor.stateName}
          </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Profile;
