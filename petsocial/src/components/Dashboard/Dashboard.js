import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { SortByLatestTime, SortByOldestTime } from '../../libs/common/HelperFunction';
import Modal from '../Modal';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: props.location.state.email,
      email: 'aditi@gmail.com',
      image: '',
      uploadDetails: {
        description: '',
        date: '',
        category: '',
        time: '',
        filename: ''
      },
      showPost: [],
      uploadPostPopUp: false,
      uploadCategoryPopUp: false,
      showUpdatedPost: false,
      categories: [],
      copyShowPost: [],
      categeory_image: '',
      category: '',
      sortedLatestFirst: false,
      sortedOldestTime: false,
    }
  }
  
  componentDidMount() {
    // retrieving details of post
    axios.post('http://localhost:8000/retrive', this.state.uploadDetails)
    .then((response) => {
      this.setState({ showPost: response.data, copyShowPost: response.data });
    })
    .catch((err) => {
      console.log(err);
    })  

    // retrieving categories
    axios.post('http://localhost:8000/findsave_categeory', this.state.categories)
    .then((response) => {
      this.setState({ categories: response.data });
    })
    .catch((err) => {
      console.log(err);
    })  
  }

  uploadPost = () => {
    this.setState({ uploadPostPopUp: true });
  }

  closePopUp = () => {
    if(this.state.uploadPostPopUp) {
      this.setState({ uploadPostPopUp: false });
    }
    if(this.state.uploadCategoryPopUp) {
      this.setState({ uploadCategoryPopUp: false });
    }
  }

  onDrop = (acceptedFiles) => {
    if (this.state.uploadCategoryPopUp) {
      this.setState({ categeory_image: acceptedFiles[0] });
    } else {
      const { uploadDetails } = this.state;
      uploadDetails.filename = acceptedFiles[0];
      this.setState({ uploadDetails });
    } 
  }

  handleChange = (event) => {
    let current_date = new Date();
    const { uploadDetails } = this.state;
    uploadDetails[event.target.name] = event.target.value;
    uploadDetails['date'] = current_date.getDate() + "-" +
                              (current_date.getMonth() + 1) + "-" +
                              current_date.getFullYear();
    uploadDetails['time'] = current_date.getHours() + ":" +
                              current_date.getMinutes() + ":" +
                              current_date.getSeconds();
    this.setState({ uploadDetails });
  }

  submitUploadPost = () => {
    let obj = new FormData();
    obj.append("filename", this.state.uploadDetails.filename);
    obj.append("description", this.state.uploadDetails.description);
    obj.append("date", this.state.uploadDetails.date);
    obj.append("category", this.state.uploadDetails.category);
    obj.append("time", this.state.uploadDetails.time);

    axios.post('http://localhost:8000/upload', obj)
      .then((response) => {
        this.setState({ showUpdatedPost: true, uploadPostPopUp: false, showPost: response.data, copyShowPost: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  uploadCategories = () => {
    this.setState({ uploadCategoryPopUp: true });
  }

  addCategory = (event) => {
    this.setState({ category: event.target.value });
  }

  handleSubmitSelectedCategory = () => {
    this.closePopUp();
    let obj = new FormData();
    obj.append("categeory_image", this.state.categeory_image);
    obj.append("category", this.state.category);
    
    axios.post('http://localhost:8000/save_categeory', obj)
      .then((response) => {
        this.setState({ categories: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sortByLatestFirst = () => {
    var sortedLatestFirst= SortByLatestTime(this.state.showPost);
    this.setState({ sortedLatestFirst, sortByOldestFirst: false });
  }

  sortByOldestFirst = () => {
    var sortByOldestTime= SortByOldestTime(this.state.showPost);
    this.setState({sortByOldestTime, sortByLatestFirst: false})
  }

  handleCategoryFilter = (category) => {
    const { copyShowPost } = this.state;
    const filteredPost = [];
    for(let index = 0; index < copyShowPost.length; index++) {
      if(copyShowPost[index].categeory === category) {
        filteredPost.push(copyShowPost[index]);
      }
    }
    this.setState({ showPost: filteredPost });
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
                <Link to="#" onClick={this.uploadPost}>Upload Post</Link>{" "}
                {
                  this.state.uploadPostPopUp ?
                    <div className="popup_sec" id="pop_forgt">
                      <div className="clos_btn">
                        <img src="./img/clos.png" alt='Not loaded' id="clos_pop" onClick={this.closePopUp} />
                      </div>
                      <div className="pop_hdr">
                        Upload Post
                      </div>
                      <div className="man_contnt">
                        <ul>
                          <li>
                            Category <select
                              type='select'
                              name='category'
                              onChange={this.handleChange} >
                              <option>Select Category</option>
                              {
                                this.state.categories.length > 0 ?
                                  this.state.categories.map((item, index) => {
                                    return <option key={index}>{item.categeory}</option>
                                  })
                                : null
                              }
                            </select>
                          </li><br/>
                          <li style={{ borderStyle: 'dotted', padding: '30px' }}>
                            <Dropzone onDrop={this.onDrop} accept='image/*' name='filename'>
                              {({getRootProps, getInputProps, isDragActive}) => (
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}
                                </div>
                              )}
                            </Dropzone>
                          </li><br/>
                          <li>
                            Description <input
                              type='text'
                              name='description'
                              value={this.state.uploadDetails.description}
                              placeholder='Enter descripton for selected image'
                              onChange={this.handleChange} />
                          </li>
                        </ul>
                        <input type="submit" onClick={this.submitUploadPost} defaultValue="Ok" />
                      </div>
                    </div>
                  : null
                }
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="./img/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="./img/btn_sep.png" alt="sep" />
                </span>{" "}
                <Link to="#" onClick={this.uploadCategories}>Upload Categories</Link>{" "}
                {
                  this.state.uploadCategoryPopUp ?
                    <div className="popup_sec" id="pop_forgt">
                      <div className="clos_btn">
                        <img src="./img/clos.png" alt='Not loaded' id="clos_pop" onClick={this.closePopUp} />
                      </div>
                      <div className="pop_hdr">
                        Upload Categories
                      </div>
                      <div className="man_contnt">
                        <div className="col-md-4" style={{ width: '100%' }}>
                          <ul>
                            <li>
                              <Dropzone onDrop={this.onDrop} accept='image/*' name='categeory_image'>
                                {({getRootProps, getInputProps, isDragActive}) => (
                                  <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? "Drop it like it's hot!"
                                      : 'Click me or drag a file to upload!'}
                                  </div>
                                )}
                              </Dropzone>
                            </li><br/>
                            <li>  
                              Category <input
                                type="text"
                                name="category"
                                value={this.state.category}
                                placeholder="Enter category"
                                onChange={this.addCategory} />
                            </li>
                          </ul>
                        </div>
                        <input type="submit" onClick={this.handleSubmitSelectedCategory} defaultValue="Ok" />
                      </div>
                    </div>
                  : null
                }
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                      {
                        this.state.categories.length > 0 ?
                          this.state.categories.map((item, index) => {
                            return (
                              <li key={index}>
                                <Link to='#' onClick={() => this.handleCategoryFilter(item.categeory)} >
                                  <span className="list_icon">
                                    <img
                                      src={`http://localhost:8000/${item.fileName}`}
                                      style={{width: '40px', height: '40px'}}
                                      alt="up" />
                                  </span>{" "}
                                  {item.categeory}
                                </Link>
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
                        <Link
                          to="#"
                          onClick={!this.state.sortedLatestFirst ? this.sortByLatestFirst : null} >
                          <span className="list_img">
                            <img src="./img/img_1.png" alt="Not loaded" />
                          </span>Latest First
                        </Link>
                      </li>
                      <li>
                        <Link href="#" onClick={!this.state.sortedOldestTime ? this.sortByOldestFirst : null}>
                          <span className="list_img">
                            <img src="./img/img_2.png" alt="Not loaded" />
                          </span>Oldest First
                        </Link>
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
              {
                this.state.showPost !== null ?
                  this.state.showPost.length > 0 ?
                    this.state.showPost.map((obj, index) => {
                      return <div key={index}>
                        <div className="contnt_2">
                          <div className="div_a">  
                            <div className="div_title"> { obj.description }</div>
                            <div className="btm_rgt">
                              <div className="btm_arc">{ obj.categeory }</div>
                            </div>
                            <div className="div_top">
                              <div className="div_top_lft">
                                <img src="./img/img_6.png" alt="Not loaded" />
                                  <span>{ obj.user }</span>
                              </div>
                              <div className="div_top_rgt">
                                <span className="span_date">{obj.date}</span>
                                <span className="span_time">{obj.time}</span>
                              </div>
                            </div>
                            <div className="div_image">
                              <Link to={{
                                pathname: '/single-post',
                                state: {
                                  post: obj,
                                  categories: this.state.categories,
                                  email: this.state.email
                                }
                              }} >
                                <img src={`http://localhost:8000/${obj.fileName}`} alt="pet" />
                              </Link>
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
                    })
                  : null
                : null
              }
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
