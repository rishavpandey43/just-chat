import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './homepage.css';

import Loading from '../../components/Loading/Loading';

const HomePage = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      if (props.user.user) {
        props.history.push(`/profile/${props.user.user.username}`);
      }
    }
  }, []);

  return props.auth.isAuthenticated ? (
    props.user.isLoading ? (
      <div className="loading-wrapper text-center m-5">
        <Loading isTrue={props.user.isLoading} />
      </div>
    ) : (
      ''
    )
  ) : (
    <div className="home-page">
      <div className="container">
        <div className="page-wrapper">
          <div className="row">
            <div className="col-12 col-sm-6 grid-sec">
              <div className="img-container">
                <img
                  src={require('../../assets/images/group_chat_img.png')}
                  alt="main-illustrator"
                  width="100%"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 grid-sec">
              <div className="desc-container">
                <div className="heading">
                  <h1>The easiest way to talk with your peers</h1>
                </div>
                <div className="desc">
                  <p>
                    Just Chat helps you to communicate with your peers and
                    friends in a real time by chatting over a secure channel.
                  </p>
                </div>
                <div className="get-started-button">
                  <Link to="/login">
                    <button>Get started now - it's free</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
