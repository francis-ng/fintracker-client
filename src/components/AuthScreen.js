import React, { useState } from 'react';
import { PrimaryButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import authConnector from '../utils/authConnector.js';
import authUtils from '../utils/authUtils.js';

const AuthSceen = (props) => {
  const loggedIn = props.completionCallback;

  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regFailed, setRegFailed] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [LoginUserName, setLoginUserName] = useState('');
  const [LoginPassword, setLoginPassword] = useState('');
  const [RegUserName, setRegUserName] = useState('');
  const [RegPassword, setRegPassword] = useState('');
  const [RegPasswordVerify, setRegPasswordVerify] = useState('');

  const loginPage = () => {
    setShowLogin(true);
    setShowRegister(false);
    setRegSuccess(false);
    setRegFailed(false);
    setLoginFailed(false);
  }

  const registerPage = () => {
    setShowLogin(false);
    setShowRegister(true);
    setRegSuccess(false);
    setRegFailed(false);
    setLoginFailed(false);
  }

  const verifyPassword = (value) => {
    return value === RegPassword ? '' : 'Passwords do not match';
  }

  const handleLogin = (event) => {
    event.preventDefault();

    setShowSpinner(true);
    authConnector.login(LoginUserName, LoginPassword).then((result) => {
      setShowSpinner(false);
      if (result.success) {
        authUtils.saveToken(result.accessToken, result.refreshToken);
        setRegSuccess(false);
        setLoginFailed(false);
        loggedIn();
      }
      else {
        setRegSuccess(false);
        setLoginFailed(true);
      }
    });
  }

  const handleRegister = (event) => {
    event.preventDefault();

    if (RegPassword !== RegPasswordVerify) {
      return;
    }

    setShowSpinner(true);
    authConnector.register(LoginUserName, LoginPassword).then((result) => {
      setShowSpinner(false);
      if (result.success) {
        authUtils.saveToken(result.accessToken, result.refreshToken);
        setShowLogin(true);
        setShowRegister(false);
        setRegSuccess(false);
        setRegFailed(false);
        loggedIn();
      }
      else {
        setRegFailed(true);
      }
    });
  }

  return (
    <div>
      {
        showLogin &&
        <form onSubmit={handleLogin}>
          <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
            {
              regSuccess &&
              <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
                Registration successful
              </MessageBar>
            }
            {
              loginFailed &&
              <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                The username and password do not match
              </MessageBar>
            }
            <TextField label="User name" value={LoginUserName} onChange={(e) => setLoginUserName(e.target.value)} required />
            <TextField label="Password" value={LoginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" required />
            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
              <PrimaryButton text="Login" type="submit" />
              { showSpinner && <Spinner size={SpinnerSize.small} /> }
            </Stack>
            <Link onClick={registerPage}>Click here to register</Link>
          </Stack>
        </form>
      }
      {
        showRegister &&
        <form onSubmit={handleRegister}>
          <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
            {
              regFailed &&
              <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                The username and password do not match.
              </MessageBar>
            }
            <TextField label="User name" value={RegUserName} onChange={(e) => setRegUserName(e.target.value)} required />
            <TextField label="Password" type="password" value={RegPassword} onChange={(e) => setRegPassword(e.target.value)} required />
            <TextField label="Verify password" type="password" value={RegPasswordVerify} onChange={(e) => setRegPasswordVerify(e.target.value)} onGetErrorMessage={verifyPassword} required />
            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
              <PrimaryButton text="Register" type="submit" />
              { showSpinner && <Spinner size={SpinnerSize.small} /> }
            </Stack>
            <Link onClick={loginPage}>Return to login</Link>
          </Stack>
        </form>
      }
    </div>
  );
}

export default AuthSceen;
