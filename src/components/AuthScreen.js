import React, { Component } from 'react';
import { PrimaryButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import authConnector from '../utils/authConnector.js';
import authUtils from '../utils/authUtils.js';

class AuthSceen extends Component {
  constructor(props) {
    super(props);
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);

    this.loggedIn = this.props.completionCallback;
    this.state = {
      showLogin: true,
      showRegister: false,
      regSuccess: false,
      regFailed: false,
      loginFailed: false,
      LoginUserName: '',
      LoginPassword: '',
      RegUserName: '',
      RegPassword: '',
      RegPasswordVerify: ''
    }
  }

  showLogin() {
    this.setState({
      showLogin: true,
      showRegister: false,
      regSuccess: false,
      regFailed: false,
      loginFailed: false
    });
  }

  showRegister() {
    this.setState({
      showLogin: false,
      showRegister: true,
      regSuccess: false,
      regFailed: false,
      loginFailed: false
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  verifyPassword(value) {
    return value === this.state.RegPassword ? '' : 'Passwords do not match';
  }

  handleLogin(event) {
    event.preventDefault();

    authConnector.login(this.state.LoginUserName, this.state.LoginPassword).then((result) => {
      if (result.success) {
        authUtils.saveToken(result.token);
        this.setState({
          regSuccess: false,
          loginFailed: false
        });
        this.loggedIn();
      }
      else {
        this.setState({
          regSuccess: false,
          loginFailed: true
        });
      }
    });
  }

  handleRegister(event) {
    event.preventDefault();

    if (this.state.RegPassword !== this.state.RegPasswordVerify) {
      return;
    }

    authConnector.register(this.state.LoginUserName, this.state.LoginPassword).then((result) => {
      if (result.success) {
        this.setState({
          showLogin: true,
          showRegister: false,
          regSuccess: true,
          regFailed: false
        });
      }
      else {
        this.setState({
          regFailed: true
        });
      }
    });
  }

  render() {
    return (
      <div>
        {
          this.state.showLogin &&
          <form onSubmit={this.handleLogin}>
            <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
              {
                this.state.regSuccess &&
                <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
                  Registration successful
                </MessageBar>
              }
              {
                this.state.loginFailed &&
                <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                  The username and password do not match
                </MessageBar>
              }
              <TextField label="User name" name="LoginUserName" value={this.state.LoginUserName} onChange={this.handleInputChange} required />
              <TextField label="Password" name="LoginPassword" value={this.state.LoginPassword} onChange={this.handleInputChange} type="password" required />
              <PrimaryButton text="Login" type="submit" />
              <Link onClick={this.showRegister}>Click here to register</Link>
            </Stack>
          </form>
        }
        {
          this.state.showRegister &&
          <form onSubmit={this.handleRegister}>
            <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
              {
                this.state.regFailed &&
                <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                  The username and password do not match.
                </MessageBar>
              }
              <TextField label="User name" name="RegUserName" value={this.state.RegUserName} onChange={this.handleInputChange} required />
              <TextField label="Password" name="RegPassword" type="password" value={this.state.RegPassword} onChange={this.handleInputChange} required />
              <TextField label="Verify password" name="RegPasswordVerify" type="password" value={this.state.RegPasswordVerify} onChange={this.handleInputChange} onGetErrorMessage={this.verifyPassword} required />
              <PrimaryButton text="Register" type="submit" />
              <Link onClick={this.showLogin}>Return to login</Link>
            </Stack>
          </form>
        }
      </div>
    );
  }
}

export default AuthSceen;