import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { insertData } from '../../API/saveData';
import { fetchData } from '../../API/fetchData';

const EMAIL = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

class Register extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      newMember: {
        username: '',
        password: '',
        email: '',
        f_name: '',
        l_name: ''
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
      btnDisable: false
    }
  }

  handleChange = (event) => {
    const { newMember, formErrors } = this.state;
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
      case 'f_name':
        formErrors.f_name = event.target.value !== '' ? '' : 'Enter First Name';
        break;
      case 'l_name':
        formErrors.l_name = event.target.value !== '' ? '' : 'Enter Last Name';
        break;
      default:
        break;
    }
    this.setState({ newMember, formErrors });
  }

  handleClickCheck = () => {
    const { agree_terms } = this.state;
    this.setState({ agree_terms: !agree_terms });
  }

  registerData = () => {
    const { newMember } = this.state;
    insertData(newMember).then(() => {
      fetchData().then(data => this.setState({ data }));
    });
    this.setState({
      redirect: true
    })
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
                      && newMember.f_name.length > 0 && newMember.l_name.length > 0
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
                      value={newMember.username}
                      placeholder="Enter your Username"
                      onChange={this.handleChange} />
                    <span style={{color: 'red'}}>{formErrors.username}</span>
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="text"
                      name="password"
                      value={newMember.password}
                      placeholder="Enter your Password"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <span>Email</span>
                    <input
                      type="text"
                      name="email"
                      value={newMember.email}
                      placeholder="Enter your Email"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <span>First Name</span>
                    <input
                      type="text"
                      name="f_name"
                      value={newMember.f_name}
                      placeholder="Enter your First Name"
                      onChange={this.handleChange} />
                  </li>
                  <li>
                    <span>Last Name</span>
                    <input
                      type="text"
                      name="l_name"
                      value={newMember.l_name}
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
