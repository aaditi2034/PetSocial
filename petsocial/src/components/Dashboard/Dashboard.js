import React from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { fetchData } from '../../API/fetchData';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: props.location.state.email,
      email: 'ritu@gmail.com',
      image: '',
      uploadDetails: {
        description: '',
        date: '',
        category: ''
      },
      showPost: {},
      uploadPostPopUp: false,
      uploadCategoryPopUp: false,
      showUpdatedPost: false,
      categories: ['CAT', 'DOG', 'BIRD', 'RABBIT', 'OTHERS']
    }
  }
  
  componentDidMount() {
    const updatePostInfo = JSON.parse(window.localStorage.getItem('uploadPostInfo'));
    this.setState({ uploadPostInfo: updatePostInfo });
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
    this.setState({ image: acceptedFiles[0] });
  }

  handleChange = (event) => {
    let current_date = new Date();
    const { uploadDetails } = this.state;
    uploadDetails[event.target.name] = event.target.value;
    uploadDetails['date'] = current_date.getDate() + "-" +
                              (current_date.getMonth() + 1) + "-" +
                              current_date.getFullYear()
    this.setState({ uploadDetails });
  }

  handleSubmit = () => {
    let obj = {};
    fetchData().then(data => this.setState({ data }, () => {
      for(let index = 0; index < data.length; index++) {
        if ((data[index].email === this.state.email)) {
          obj.user = data[index].username;
          break;
        }
      }
    }));
    obj.image = this.state.image;
    obj.description = this.state.uploadDetails.description;
    obj.date = this.state.uploadDetails.date;
    obj.category = this.state.uploadDetails.category;
    // insertUpload(obj).then(() => {
    //   fetchUploadData().then(data => console.log('..........', data));
    // });
    window.localStorage.setItem('uploadPostInfo', JSON.stringify(obj))
    this.setState({ showUpdatedPost: true, uploadPostPopUp: false, showPost: obj })
  }

  uploadCategories = () => {
    this.setState({ uploadCategoryPopUp: true });
  }

  addCategory = (event) => {
    const { categories } = this.state;
    categories.push(event.target.value);
    this.setState({ categories });
  }

  handleSubmitSelectedCategory = () => {
    this.closePopUp();
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
                                    console.log('fdasfasfassdsfa')
                                    return <option>{item}</option>
                                  })
                                : null
                              }
                            </select>
                          </li><br/>
                          <li style={{ borderStyle: 'dotted', padding: '30px' }}>
                            <Dropzone onDrop={this.onDrop} accept='image/*' name='image'>
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
                        <input type="submit" onClick={this.handleSubmit} defaultValue="Ok" />
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
                        <ul>
                          <li>
                            <div className="col-md-4" style={{ width: '100%' }}>
                              <select
                                id="categories"
                                className="multiselect-ui form-control"
                                onChange={this.addCategory}
                                style={{width: '100%'}}
                                multiple="multiple"
                              >
                                <option value="Mammels">Mammels</option>
                                <option value="Fish">Fish</option>
                                <option value="Amphibians">Amphibians</option>
                                <option value="Reptiles">Reptiles</option>
                                <option value="Reptiles">Lion</option>
                                <option value="Reptiles">Frog</option>
                              </select>
                            </div>
                          </li>
                        </ul>
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
                              <li>
                                <a href='/'>
                                  <span className="list_icon">
                                    <img src={`./img/icon_0${index+1}.png`} alt="up" />
                                  </span>{" "}
                                  {item}
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
              {
                this.state.showUpdatedPost ?
                  <div className="contnt_2">
                    <div className="div_a">  
                      <div> 
                      {
                        Object.keys(this.state.showPost).length > 0 ?
                          <div className="div_title"> { this.state.showPost.description }</div>
                        : null
                      }
                      </div>
                      <div className="btm_rgt">
                        {
                          Object.keys(this.state.showPost).length > 0 ?
                            <div className="btm_arc">{ this.state.showPost.category }</div>
                          : null
                        }
                      </div>
                      <div className="div_top">
                        <div className="div_top_lft">
                          <img src="./img/img_6.png" alt="Not loaded" />
                          {
                            Object.keys(this.state.showPost).length > 0 ?
                              <span>{ this.state.showPost.user }</span>
                            : null
                          }
                        </div>
                        <div className="div_top_rgt">
                          {
                            Object.keys(this.state.showPost).length > 0 ?
                              <span className="span_date">{this.state.showPost.date}</span>
                            : null
                          }
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
                : null
              }
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
