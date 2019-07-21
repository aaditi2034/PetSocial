import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
  constructor() {
    super();
    this.state= { showprofile: false };
  }

  profile = () => {
    this.setState({ showprofile: true });
  }

  handleLogout = () => {
    this.setState({ showprofile: false });
  }

  render() {
    return (
      <div className="header">
        <div className="header_lft">
          <div className="logo">
            <a href="/">
              <img src="img/logo.png" alt="Not loaded" />
            </a>
          </div>
          <div className="navigatn">
            <ul>
              <li>
                <a href="/" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="/"> E-Coupons </a>
              </li>
              <li>
                <a href="/">E-Brands </a>
              </li>
              <li>
                <a href="/"> Resuse Market </a>
              </li>
              <li>
                <a href="/"> Lost and Found</a>
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
