import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: props.location.state.email,
      email: 'ritu@gmail.com',
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="./img/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="./img/btn_sep.png" alt="sep" />
                </span>{" "}
                <Link to="/upload-post" onClick={this.uploadPost}>Upload Post</Link>{" "}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="./img/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="./img/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="/">Invite Friends</a>{" "}
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                    <li>
                      <a href="/">
                        <span className="list_icon">
                          <img src="./img/icon_01.png" alt="up" />
                        </span>{" "}
                        CATS
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <span className="list_icon">
                          <img src="./img/icon_02.png" alt="up" />
                        </span>{" "}
                        Dogs
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <span className="list_icon">
                          <img src="./img/icon_03.png" alt="up" />
                        </span>{" "}
                        Birds
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <span className="list_icon">
                          <img src="./img/icon_04.png" alt="up" />
                        </span>{" "}
                        Rabbit
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <span className="list_icon">
                          <img src="./img/icon_05.png" alt="up" />
                        </span>{" "}
                        Others
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">
                  Featured
                </div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="./img/feat_img1.png" alt="Not loaded" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Cats</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="./img/feat_img2.png" alt="Not loaded" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="./img/feat_img3.png" alt="Not loaded" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends
                    </li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged
                    </li>
                  </ul>
                </div>
                <div className="post_div">
                  <div className="post_list">
                    <ul>
                      <li>
                        <a href="/">
                          <span className="list_img">
                            <img src="./img/img_1.png" alt="Not loaded" />
                          </span>Latest First
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <span className="list_img">
                            <img src="./img/img_2.png" alt="Not loaded" />
                          </span>Oldest First
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <span className="list_img">
                            <img src="./img/img_3.png" alt="Not loaded" />
                          </span>Most Pet
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <span className="list_img">
                            <img src="./img/img_4.png" alt="Not loaded" />
                          </span>Most Clicks
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <span className="list_img">
                            <img src="./img/img_5.png" alt="Not loaded" />
                          </span>Most Commented
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="post_txt">4 New Post Updates</div>
                </div>
              </div>
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">
                    User Interface PSD Source files Web Designing for web
                  </div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Cats</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft">
                      <img src="./img/img_6.png" alt="Not loaded" />Steave Waugh
                    </div>
                    <div className="div_top_rgt">
                      <span className="span_date">02 Jan 2014</span>
                      <span className="span_time">11:15am</span>
                    </div>
                  </div>
                  <div className="div_image">
                    <img src="./img/lft_img.png" alt="pet" />
                  </div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_001.png" alt="share" />
                            </span>Share
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_002.png" alt="share" />
                            </span>Flag
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_004.png" alt="share" />
                            </span>4 Comments
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_003.png" alt="share" />
                            </span>Likes
                          </a>
                        </li>
                        <div
                          className="like_count"
                          style={{ marginRight: 10 }}
                        >
                          <span className="lft_cnt" />
                          <span className="mid_cnt">10</span>
                          <span className="rit_cnt" />
                        </div>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_003.png" alt="share" />
                            </span>Unlike
                          </a>
                        </li>
                        <div className="like_count">
                          <span className="lft_cnt" />
                          <span className="mid_cnt">4</span>
                          <span className="rit_cnt" />
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">
                    User Interface PSD Source files Web Designing for web
                  </div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft">
                      <img src="./img/img_6.png" alt="Not loaded" />Steave Waugh
                    </div>
                    <div className="div_top_rgt">
                      <span className="span_date">02 Jan 2014</span>
                      <span className="span_time">11:15am</span>
                    </div>
                  </div>
                  <div className="div_image">
                    <img src="./img/lft_img1.png" alt="pet" />
                  </div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_001.png" alt="share" />
                            </span>Share
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_002.png" alt="share" />
                            </span>Flag
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_004.png" alt="share" />
                            </span>4 Comments
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_003.png" alt="share" />
                            </span>Likes
                          </a>
                        </li>
                        <div
                          className="like_count"
                          style={{ marginRight: 10 }}
                        >
                          <span className="lft_cnt" />
                          <span className="mid_cnt">10</span>
                          <span className="rit_cnt" />
                        </div>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_003.png" alt="share" />
                            </span>Unlike
                          </a>
                        </li>
                        <div className="like_count">
                          <span className="lft_cnt" />
                          <span className="mid_cnt">4</span>
                          <span className="rit_cnt" />
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

export default Dashboard;