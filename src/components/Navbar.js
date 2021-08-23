import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {PropTypes} from "prop-types";
import { logoutUser } from '../actions/auth';
import   jwtDecode from 'jwt-decode'
class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  handlename = () => {

const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);
      return user.name;
    }
  }

  render() {
    const newname=this.handlename();
    const { auth } = this.props;
    console.log("navbar auth is ",auth);
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://i.ytimg.com/vi/COQkYHiRkhE/hqdefault.jpg" style={{width:200,height:70}}
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" />

          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                />
                <span>John Doe</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          {auth.isLoggedin &&(
            <div className="user">
      
              
      {/* {auth.user &&(
           <span>{auth.user.name}</span>
      )}
      <span>{newname}</span> */}

      {auth.user ?  <span>{auth.user.name}</span> : <span>{newname}</span>}

              <Link to="/settings">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}

              {auth.isLoggedin && <li onClick={this.logOut}>Log out</li>}

              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
Navbar.propTypes = {
  auth: PropTypes.object
};
export default connect(mapStateToProps)(Navbar);
