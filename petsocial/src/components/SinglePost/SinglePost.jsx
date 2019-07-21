import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postInfo: props.location.state.post,
      categories: props.location.state.categories,
      email: props.location.state.email,
      b: '',
      a: ''
    };
  }

  componentDidMount() {
    const {_id} = this.state.postInfo;
    axios.post('http://localhost:8000/retrive', this.state.info)
    .then((response) => {
      if (response.data.length > 0) {
        for(var index = 0; index < response.data.length; index++) {
          if(Object.values(response.data[index]).indexOf(_id) > -1) {
            this.setState({ postInfo: response.data[index]});
            break;
          }
        }
      }
    })
    .catch((er) => console.log(er))
  }

  handleCommentChange = (event) => {
    this.setState({ b: event.target.value});
  }

  submitComment = () => {
    var obj = {
      'a': `${this.state.postInfo.fileName}`,
      'b': `${this.state.b}`
    };
    
    // save comment
    axios.post('http://localhost:8000/comment', obj)
    .then((response) => {
      const {_id} = this.state.postInfo;
      if (response.data.length > 0) {
        for(var index = 0; index < response.data.length; index++) {
          if(Object.values(response.data[index]).indexOf(_id) > -1) {
            this.setState({ postInfo: response.data[index], b: ''});
            break;
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    })  
  }

  handleLikes = () => {
    var obj = {
      'a': `${this.state.postInfo.fileName}`,
      'b': `1`
    }
    
    // hitting like api
    axios.post('http://localhost:8000/like', obj)
    .then((response) => {
      console.log('*******', response.data[0]);
      const { id } = response.data[0];
      const { postInfo } = this.state;
      console.log('post info....', postInfo);
      for(let index = 0; index < response.data[0].length; index++) {
        if(response.data[0][index]._id === postInfo._id) {
          console.log('helo')
        }
      }
    })
  }

  render() {
    const { postInfo, categories } = this.state;
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
                <a href="/">Upload Post</a>{" "}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="./img/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="./img/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="/">Upload Category</a>{" "}
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                      {
                        categories.length > 0 ?
                          categories.map((item, index) => {
                            return (
                              <li key={index}>
                                <a href='/'>
                                  <span className="list_icon">
                                    <img
                                      src={`http://localhost:8000/${item.fileName}`}
                                      style={{width: '40px', height: '40px'}}
                                      alt="up" />
                                  </span>{" "}
                                  {item.categeory}
                                </a>
                              </li>
                            );
                          })
                        : null
                      }
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
                      <img src="./img/feat_img1.png" alt='Not Uploaded' />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="./img/feat_img2.png" alt='Not Uploaded' />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="./img/feat_img3.png" alt='Not Uploaded' />
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
              <div className="contnt_2">
                <div className="div_a">
                  {
                    Object.keys(postInfo).length !== 0 ?
                      <div>
                        <div className="div_title">
                          {postInfo.description}
                        </div>
                        <div className="btm_rgt">
                          <div className="btm_arc">{postInfo.categeory}</div>
                        </div>
                        <div className="div_top">
                          <div className="div_top_lft">
                            <img src="./img/img_6.png" alt='Not Uploaded' />Steave Waugh
                          </div>
                          <div className="div_top_rgt">
                            <span className="span_date">{postInfo.date}</span>
                            <span className="span_time">{postInfo.time}</span>
                          </div>
                        </div>
                        <div className="div_image">
                          <img src={`http://localhost:8000/${postInfo.fileName}`} alt="pet" />
                        </div>
                      </div>
                    : null
                  }
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
                          <Link to="#" onClick={this.handleLikes}>
                            <span className="btn_icon">
                              <img src="./img/icon_003.png" alt="share" />
                            </span>0 Likes
                          </Link>
                        </li>
                        <li>
                          <a href="/">
                            <span className="btn_icon">
                              <img src="./img/icon_004.png" alt="share" />
                            </span>4 Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
                <ul>
                  {
                    Object.keys(postInfo).length !== 0 ?
                      postInfo.comment.length !== 0 ?
                        postInfo.comment.map((value, index) => {
                          return <li key={index}>
                            <div className="list_image">
                              <div className="image_sec">
                                <img src="./img/post_img.png" alt='Not Uploaded' />
                              </div>
                              <div className="image_name">Bharat</div>
                            </div>
                            <div className="list_info">
                              {value}
                            </div>
                          </li>
                        })
                      : null
                    : null
                  }
                  <li>
                    <div className="cmnt_div">
                      <input
                        type='text'
                        name='description'
                        value={this.state.b}
                        className="cmnt_bx"
                        placeholder='Add a Comment'
                        onChange={this.handleCommentChange} />
                      <input
                        type="submit"
                        className="sub_bttn"
                        defaultValue="Submit Comment"
                        onClick={this.submitComment}
                      />
                    </div>
                  </li>
                </ul>
                <div className="view_div">
                  <a href="/">View more</a>
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

export default SinglePost;
