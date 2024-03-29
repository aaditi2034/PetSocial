import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login_credentials: {
        email: '',
        password: ''
      },
      data: '',
      redirect: false,
      errorMsg: '',
      btnDisable: false,
      rememberMe: false
    }
  }

  handleChange = (event) => {
    const { login_credentials } = this.state;
    login_credentials[event.target.name] = event.target.value;
    this.setState({ login_credentials });
  }

  handleLogin = () => {
    const { login_credentials } = this.state;

    // backend server
    axios.post('http://localhost:8000/loginpostcall', login_credentials.email, login_credentials.password)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ redirect: true });
        } else {
          this.setState({ errorMsg: response.data });          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
   }

  handleRedirect = () => {
    if(this.state.redirect) {
      return <Redirect
                to={{
                  pathname:'/dashboard',
                  state: {
                    email: this.state.login_credentials.email
                  }
                }}
              />
    }
    return '';
  }

  handleRememberMe = () => {
    if (!this.state.rememberMe) {
      localStorage.setItem('remember-id', this.state.login_credentials.email);
      this.setState({ rememberMe: true });
    } else {
      localStorage.removeItem('')
    }
  }

  render() {
    const isValid = this.state.login_credentials.email.length > 0 &&
      this.state.login_credentials.password.length > 0;
    return (
      <div>
        { this.handleRedirect() }
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <ul>
                  <li>
                    <span>Email-ID</span>
                    <input
                      type="text"
                      name="email"
                      style={{ color: '#e65100' }}
                      value={this.state.email}
                      placeholder="Enter your email"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="password"
                      name="password"
                      style={{ color: '#e65100', width: '100%', height: '30px' }}
                      value={this.state.password}
                      placeholder="Enter your Password"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <input type="checkbox" onClick={this.handleRememberMe}/>Remember Me
                  </li>
                  <li>
                    <input
                      type="submit"
                      disabled={!isValid}
                      style={{ cursor: isValid ? 'pointer' : 'not-allowed' }}
                      onClick={this.handleLogin}
                      defaultValue="Log In" />
                    <a href='/'>Forgot Password</a>
                    <span style={{ color: 'red' }}>{this.state.errorMsg}</span>
                  </li>
                </ul>
                <div className="addtnal_acnt">
                  I do not have any account yet.<Link to='/'>Create My Account Now !</Link>
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
              <img src="img/img_9.png" alt='Not Loaded' />{" "}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>

    );
  }
}

export default Login;
