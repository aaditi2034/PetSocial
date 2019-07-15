import React from 'react';
import { Redirect } from 'react-router-dom';

class UploadPsot extends React.Component {
  constructor() {
    super();
    this.state = {
      uploadPostInfo: {
        imagePath: '',
        description: '',
        date: '',
        category: ''
      },
      redirect: false
    };
  }

  handleChange = (event) => {
    let current_date = new Date();
    const { uploadPostInfo } = this.state;
    uploadPostInfo[event.target.name] = event.target.value;
    uploadPostInfo['date'] = current_date.getDate() + "-" +
                              (current_date.getMonth() + 1) + "-" +
                              current_date.getFullYear()
    this.setState({ uploadPostInfo })
  }

  handleClick = () => {
    window.localStorage.setItem('uploadPostInfo', JSON.stringify(this.state.uploadPostInfo))
    this.setState({ redirect: true });
  }

  handleRedirect = () => {
    if (this.state.redirect) {
      return <Redirect
       to= '/dashboard'
      />
    }
    return '';
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.handleRedirect()}
        <ul>
          <li>
            <span>Image</span>
            <input
              type='file'
              name= 'imagePath'
              accept='image/*'
              onChange={this.handleChange}
            />
          </li>
          <li>
            <span>Description</span>
            <input
              type='text'
              name='description'
              value={this.state.uploadPostInfo.description}
              onChange={this.handleChange} />
          </li>
          <li>
            <span>Select Category</span>
            <select
              type='select'
              name='category'
              value={this.state.uploadPostInfo.category}
              onChange={this.handleChange} >
              <option>Cats</option>
              <option>Dogs</option>
              <option>Birds</option>
              <option>Rabbits</option>
              <option>Others</option>
            </select>
          </li>
          <input type='button' onClick={this.handleClick} defaultValue='Upload Post' />
        </ul>
      </div>
    );
  }
}

export default UploadPsot;
