import React from 'react';

const Footer = () => {
  return (
    <div className="footr">
      <div className="footr_lft">
        <div className="footer_div1">
          Copyright © Pet-Socail 2014 All Rights Reserved
        </div>
        <div className="footer_div2">
          <a href="/">Privacy Policy </a>|{" "}
          <a href="/"> Terms &amp; Conditions</a>
        </div>
      </div>
      <div className="footr_rgt">
        <ul>
          <li>
            <a href="/">
              <img src="img/social_1.png" alt="Not loaded" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="img/social_2.png" alt="Not loaded" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="img/social_3.png" alt="Not loaded" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="img/social_4.png" alt="Not loaded"  />
            </a>
          </li>
        </ul>
      </div>
    </div>
  
  );
};

export default Footer;
