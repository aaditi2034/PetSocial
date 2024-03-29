import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const EMAIL = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: ''
      },
      agree_terms: false,
      redirect: false,
      data: '',
      formErrors: {
        username: '',
        email: '',
        password: '',
        f_name: 'Enter First Name',
        l_name: 'Enter Last Name' },
      showAPIerr: false,
      api_err_msg: '',
      btnDisable: false
    }
  }

  handleChange = (event) => {
    const { newMember, formErrors, newMem } = this.state;
    newMember[event.target.name] = event.target.value;
    switch (event.target.name) {
      case 'username':
        formErrors.username = event.target.value.length < 5 ? 'Length of username is small' : '';
        break;
      case 'email':
        formErrors.email = EMAIL.test(event.target.value) ? '' : 'Invalid Email Address.';
        break;
      case 'password':
        formErrors.password = event.target.value.length > 5 ? '' : 'Password is not in range';
        break;
      case 'firstname':
        formErrors.f_name = event.target.value !== '' ? '' : 'Enter First Name';
        break;
      case 'lastname':
        formErrors.l_name = event.target.value !== '' ? '' : 'Enter Last Name';
        break;
      default:
        break;
    }
    this.setState({ newMember, formErrors, newMem });
  }

  handleClickCheck = () => {
    const { agree_terms } = this.state;
    this.setState({ agree_terms: !agree_terms });
  }

  registerData = () => {
    const { newMem } = this.state;

    ///backend server
    axios.post('http://localhost:8000/adduser', newMem)
    .then((response) => {
      if (response.data !== '') {
        this.setState({ api_err_msg:  response.data }, () => {
          if(response.status === 200){
            this.setState({
              redirect: true
            });
          } else {
            this.setState({ showAPIerr: true });
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  render() {
    const { newMember, formErrors, agree_terms } = this.state;
    const isValid = newMember.username.length > 0
                      && newMember.password.length > 0 && newMember.email.length > 0
                      && newMember.firstname.length > 0 && newMember.lastname.length > 0
                      && agree_terms ;
    return (
      <div>
        { this.renderRedirect() }
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li>
                    <span>Username</span>
                    <input
                      type="text"
                      name="username"
                      style={{ color: '#e65100' }}
                      value={newMember.username}
                      placeholder="Enter your Username"
                      onChange={this.handleChange} />
                    <span style={{color: 'red'}}>{formErrors.username}</span>
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="password"
                      name="password"
                      style={{ color: '#e65100', width: '100%', height: '30px' }}
                      value={newMember.password}
                      placeholder="Enter your Password"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <span>Email</span>
                    <input
                      type="text"
                      name="email"
                      style={{ color: '#e65100' }}
                      value={newMember.email}
                      placeholder="Enter your Email"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <span>First Name</span>
                    <input
                      type="text"
                      name="firstname"
                      style={{ color: '#e65100' }}
                      value={newMember.firstname}
                      placeholder="Enter your First Name"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <span>Last Name</span>
                    <input
                      type="text"
                      name="lastname"
                      style={{ color: '#e65100' }}
                      value={newMember.lastname}
                      placeholder="Enter your Last Name"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <input type="checkbox" onClick={this.handleClickCheck}/>I agree to Term &amp;
                    Conditions
                  </li>
                  <li>
                    <input
                      type="submit"
                      onClick={this.registerData}
                      disabled={!isValid}
                      defaultValue="Register" />
                  </li>
                  {
                    this.state.showAPIerr ?
                      <span style={{color: 'red'}}>{this.state.api_err_msg}</span>
                    : null
                  }
                </ul>
                <div className="addtnal_acnt">
                  I already have an account.<Link to='/login'>Login My Account !</Link>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form, by injected humour, or randomised words which don't
                look even slightly believable. If you are going to use a
                passage of Lorem Ipsum, you need to be sure there isn't
                anything embarrassing hidden in the middle of text.{" "}
              </p>
              <img src="./img/img_9.png" alt="Not loaded"  />{" "}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}

export default Register;
