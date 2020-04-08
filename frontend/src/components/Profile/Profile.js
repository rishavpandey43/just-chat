import React, { component, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdSearch } from "react-icons/md";

import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="profile-wrapper">
        <div className="search-bar-wrapper">
          <form>
            <div className="search-bar">
              <div className="search-input">
                <input
                  type="text"
                  className="input"
                  placeholder="search"
                  required
                />
              </div>
              <div className="search-btn">
                <button className="btn">
                  <MdSearch />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="profile-card">
          <h1>Hello World</h1>
        </div>
      </div>
    );
  }
}

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import displayFlash from "../../utils/flashEvent";

// import Loading from "../Loading/Loading";

// const baseUrl = process.env.REACT_APP_API_BASE_URL;

// const Profile = (props) => {
//   const [state, setState] = useState({
//     authUserId: props.authDetail.userId,
//     userDetail: null,
//     userService: 0,
//     groupName: "",
//     privateGroup: false,
//     groupPassword: "",
//   });

//   useEffect(() => {
//     if (props.authDetail.isAuthenticated) {
//       axios
//         .get(baseUrl + "user/get-user-detail", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${props.authDetail.token}`,
//           },
//           params: {
//             username: `${props.match.params.username}`,
//           },
//         })
//         .then((response) => {
//           const userDetail = {
//             userId: response.data.user._id,
//             username: response.data.user.username,
//             email: response.data.user.email,
//             firstName: response.data.user.firstName,
//             lastName: response.data.user.lastName,
//           };
//           let tempState = { ...state };
//           tempState.userDetail = { ...userDetail };
//           setState(tempState);
//         })
//         .catch((error) => {});
//     }
//   }, [props.authDetail.isAuthenticated]);

//   const changeService = (type) => {
//     let tempState = { ...state };
//     tempState.userService = type;
//     setState(tempState);
//   };

//   const createGroup = (e) => {
//     e.preventDefault();

//     axios
//       .post(
//         baseUrl + "group/create-new-group",
//         JSON.stringify({
//           name: state.groupName.trim(),
//           private: state.privateGroup,
//           password: state.groupPassword.trim(),
//         }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${
//               localStorage.getItem("chat_auth_token") ||
//               sessionStorage.getItem("chat_auth_token")
//             }`,
//           },
//           withCredentials: true,
//         }
//       )
//       .then((response) => {
//         displayFlash.emit("get-message", {
//           message: response.data.message,
//           type: "success",
//         });
//         props.history.push(`/chat`);
//       })
//       .catch((error) => {
//         error.response
//           ? displayFlash.emit("get-message", {
//               message: error.response.data.message,
//               type: "danger",
//             })
//           : displayFlash.emit("get-message", {
//               message: `Network Error, Connection to server couldn't be established. Please try again.`,
//               type: "danger",
//             });
//       });
//   };

//   const joinGroup = (e) => {
//     e.preventDefault();
//     axios
//       .put(
//         baseUrl + "group/join-group",
//         JSON.stringify({
//           name: state.groupName.trim(),
//           private: state.privateGroup,
//           password: state.groupPassword.trim(),
//         }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${
//               localStorage.getItem("chat_auth_token") ||
//               sessionStorage.getItem("chat_auth_token")
//             }`,
//           },
//           withCredentials: true,
//         }
//       )
//       .then((response) => {
//         displayFlash.emit("get-message", {
//           message: response.data.message,
//           type: "success",
//         });
//         props.history.push(`/chat`);
//       })
//       .catch((error) => {
//         error.response
//           ? displayFlash.emit("get-message", {
//               message: error.response.data.message,
//               type: "danger",
//             })
//           : displayFlash.emit("get-message", {
//               message: `Network Error, Connection to server couldn't be established. Please try again.`,
//               type: "danger",
//             });
//       });
//   };

//   return !state.userDetail ? (
//     <div className="container">
//       <div className="page-wrapper">
//         <div style={{ margin: "auto", width: "80px", marginTop: "50px" }}>
//           <Loading isTrue={!state.userDetail} />
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="profile-wrapper">
//       <div className="container">
//         <div className="page-wrapper">
//           <div className="row">
//             <div className="col-12 col-sm-6">
//               <div className="profile-container">
//                 <div className="card">
//                   <div className="card-head">
//                     <h3>
//                       {state.userDetail
//                         ? state.authUserId === state.userDetail.userId
//                           ? `Your Profile`
//                           : `${state.userDetail.firstName} ${state.userDetail.lastName}'s Profile`
//                         : "Your Profile"}
//                     </h3>
//                   </div>
//                   <div className="card-body">
//                     <div className="short-summary">
//                       <div className="user-img">
//                         <img
//                           src={require("../../assets/images/user.png")}
//                           alt="user-img"
//                           width="100px"
//                           height="100px"
//                         />
//                       </div>
//                       <div className="user-name">
//                         <h3>
//                           {state.userDetail
//                             ? `${state.userDetail.firstName} ${state.userDetail.lastName}`
//                             : ``}
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="detail-summery">
//                       <div className="heading">
//                         <h3>About</h3>
//                       </div>
//                       <div className="content">
//                         <div className="row">
//                           <div className="col-12 col-sm-6">
//                             <div className="label">
//                               <label>Username:</label>
//                             </div>
//                           </div>
//                           <div className="col-12 col-sm-6">
//                             <div className="value">
//                               {state.userDetail
//                                 ? `${state.userDetail.username}`
//                                 : ``}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-12 col-sm-6">
//                             <div className="label">
//                               <label>Name:</label>
//                             </div>
//                           </div>
//                           <div className="col-12 col-sm-6">
//                             <div className="value">
//                               {state.userDetail
//                                 ? `${state.userDetail.firstName} ${state.userDetail.lastName}`
//                                 : ``}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-12 col-sm-6">
//                             <div className="label">
//                               <label>Email:</label>
//                             </div>
//                           </div>
//                           <div className="col-12 col-sm-6">
//                             <div className="value">
//                               {state.userDetail
//                                 ? `${state.userDetail.email}`
//                                 : ``}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-12 col-sm-6">
//               <div className="service-container">
//                 <div className="card">
//                   <div className="card-head">
//                     <h3>Say Hello!</h3>
//                   </div>
//                   <div
//                     className={`card-body ${
//                       state.authUserId === state.userDetail.userId
//                         ? "d-block"
//                         : "d-none"
//                     }`}
//                   >
//                     <div className="service-btn">
//                       <div className="create-room-btn">
//                         <button
//                           className="btn btn-primary"
//                           onClick={changeService.bind(null, 0)}
//                         >
//                           Create Group
//                         </button>
//                       </div>
//                       <div className="join-room-btn">
//                         <button
//                           className="btn btn-secondary"
//                           onClick={changeService.bind(null, 1)}
//                         >
//                           Join Group
//                         </button>
//                       </div>
//                     </div>
//                     <div className="service">
//                       <div className="create-group-form">
//                         <form></form>
//                       </div>
//                       <div className="join-group-form">
//                         <form
//                           onSubmit={
//                             state.userService === 0 ? createGroup : joinGroup
//                           }
//                         >
//                           <div className="form-group">
//                             <label>Group Name</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="groupName"
//                               value={state.groupName}
//                               required
//                               placeholder="group name should be min length of 5"
//                               minLength="5"
//                               onChange={(e) => {
//                                 let tempState = { ...state };
//                                 tempState.groupName = e.target.value;
//                                 setState(tempState);
//                               }}
//                             />
//                           </div>
//                           <div className="form-group form-check">
//                             <label className="form-check-label">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 name="makePrivate"
//                                 checked={state.privateGroup}
//                                 onChange={() => {
//                                   let tempState = { ...state };
//                                   tempState.privateGroup = state.privateGroup
//                                     ? false
//                                     : true;
//                                   setState(tempState);
//                                 }}
//                               />
//                               {state.userService === 0
//                                 ? "Make Private Group"
//                                 : "Join Private Group"}
//                             </label>
//                           </div>
//                           <div className="form-group">
//                             <label>Group Password</label>
//                             <input
//                               type="password"
//                               className="form-control"
//                               name="groupPassword"
//                               value={state.groupPassword}
//                               required={state.privateGroup}
//                               placeholder="password should be min length of 8"
//                               minLength="8"
//                               onChange={(e) => {
//                                 let tempState = { ...state };
//                                 tempState.groupPassword = e.target.value;
//                                 setState(tempState);
//                               }}
//                             />
//                           </div>
//                           <button type="submit" className="btn btn-success">
//                             {state.userService === 0
//                               ? "Create Group"
//                               : "Join Group"}
//                           </button>
//                         </for>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-footer">
//                     <div className="inbox-link mt-5">
//                       <Link to="/chat">
//                         <button className="btn btn-info">
//                           Go to your inbox &rarr;
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Profile;
