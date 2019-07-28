import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state= { showprofile: false, redirect: false };
  }

  profile = () => {
    this.setState({ showprofile: true });
  }

  handleRedirect = () => {
    const fetchRememberedId = localStorage.getItem('remember-id');
    if(fetchRememberedId !== null){
      localStorage.removeItem('remember-id');
    }
    if ( this.state.redirect) { 
      return <Redirect
        to= {{
          pathname: '/login'
        }} />
    }
    return '';
  }

  handleLogout = () => {
    this.setState({ showprofile: false, redirect: true });
  }

  render() {
    return (
      <div className="header">
        { this.handleRedirect() }
        <div className="header_lft">
          <div className="logo">
            <a href="/">
              <img src="img/logo.png" alt="Not loaded" />
            </a>
          </div>
          <div className="navigatn">
            <ul>
              <li>
                <a href="/dashboard" className="active">Home</a>
              </li>
              <li>
                <a href="/dashboard"> E-Coupons </a>
              </li>
              <li>
                <a href="/dashboard">E-Brands </a>
              </li>
              <li>
                <a href="/dashboard"> Resuse Market </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <div className="flag_div">
            <img src="img/flag.png" alt="Not loaded" />
          </div>
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="msg_box">
            <a href="/">
              <span className="msg_count">100</span>
            </a>
          </div>
          <div className="info_div">
            <div className="image_div">
              {" "}
              <img src="img/pic.png" alt="Not loaded" />{" "}
            </div>
            <div className="info_div1" onClick={this.profile} style={{cursor: 'pointer'}}>Me</div>
              <ul className={`${this.state.showprofile ? `dropdown-profile` : `hide-profile`}`}>
                <li>
                  <Link
                    to='/login'
                    onClick={this.handleLogout}
                    style={{fontSize:'15px', color: 'gray', paddingLeft: '10px'}}>Logout</Link>
                </li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
