import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdOptions } from 'react-icons/io';

import './friends.css';

import Loading from '../Loading/Loading';

const Friends = (props) => {
  const [state, setState] = useState({
    filterOption: [
      { label: 'All Friends', value: 'friendList', active: true },
      {
        label: 'Sent Friend Request',
        value: 'sentFriendRequest',
        active: false,
      },
      {
        label: 'Received Friend Request',
        value: 'receivedFriendRequest',
        active: false,
      },
    ],
    friendList: {
      type: 'friendList',
      list: props.user.user ? props.user.user.friendList : [],
    },
    toggleDropdown: false,
  });

  const _filter = (type) => {
    setState({
      ...state,
      filterOption: state.filterOption.map((filter) =>
        filter.value === type
          ? {
              ...filter,
              active: true,
            }
          : {
              ...filter,
              active: false,
            }
      ),
      friendList: {
        type,
        list: props.user.user[type],
      },
    });
  };

  // const option

  return props.user.isFetching ? (
    <div className="loading-wrapper text-center m-5">
      <Loading isTrue={props.user.isFetching} />
    </div>
  ) : (
    <div className="profile-wrapper">
      <div className="main-page-card">
        <div>
          <h1>Friends List</h1>
        </div>
        <div className="row">
          {state.filterOption.map((filter, index) => (
            <div
              key={index}
              className={`filter-tag ${filter.active ? 'active' : ''}`}
              onClick={_filter.bind(null, filter.value)}
            >
              <span>{filter.label}</span>
            </div>
          ))}
        </div>
        <div className="friend-list mt-5">
          <div className="row">
            {state.friendList.list.length > 0 ? (
              state.friendList.list.map((friend, index) => (
                <div className="col-6" key={index}>
                  <div className="friend-wrapper">
                    <div className="img flex-grow-1">
                      <img
                        src={require('../../assets/images/profile_pic.png')}
                        alt=""
                        width="100px"
                      />
                    </div>
                    <div className="name flex-grow-1">
                      <Link to={`/profile/${friend.username}`}>
                        <span>{`${friend.firstName} ${friend.lastName}`}</span>
                      </Link>
                    </div>
                    {/* <div className="dropdown option flex-grow-1">
                    <div
                      onClick={() => {
                        setState({
                          ...state,
                          toggleDropdown: !state.toggleDropdown,
                        });
                      }}
                    >
                      <IoMdOptions></IoMdOptions>
                    </div>
                    <div
                      className={`option-dropdown ${
                        state.toggleDropdown ? 'd-block' : 'd-none'
                      }`}
                    >
                      <ul className="list-unstyled">
                        <li className={``}>hello</li>
                      </ul>
                    </div>
                  </div> */}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-danger">
                Friend list empty for selected filter.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
