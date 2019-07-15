import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fetchData } from '../../API/fetchData';

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
      btnDisable: false
    }
  }

  handleChange = (event) => {
    const { login_credentials } = this.state;
    login_credentials[event.target.name] = event.target.value;
    this.setState({ login_credentials });
  }

  handleLogin = () => {
    const { login_credentials } = this.state;
    fetchData().then(data => this.setState({ data }, () => {
      for(let index = 0; index < data.length; index++) {
        if ((data[index].email === login_credentials.email)
          && (data[index].password === login_credentials.password)) {
          window.localStorage.setItem('username', JSON.stringify(data[index].username));
          this.setState({ redirect: true });
        }
      }
      if (!this.state.redirect) {
        this.setState({ errorMsg: 'Invalid credentials' });
      }
    }));
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

  render() {
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
                      value={this.state.email}
                      placeholder="Enter your email"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="text"
                      name="password"
                      value={this.state.password}
                      placeholder="Enter your Password"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <input type="checkbox" />Remember Me
                  </li>
                  <li>
                    <input type="submit" onClick={this.handleLogin} defaultValue="Log In" />
                    <a href>Forgot Password</a>
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
