import React, { useState, useRef } from 'react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { CSSTransition } from 'react-transition-group';
import AuthScreen from './components/AuthScreen.js';
import LedgerList from './components/LedgerList.js';
import LedgerDetails from './components/LedgerDetails.js';
import authConnector from './utils/authConnector.js';
import './css/App.css';
import authUtils from './utils/authUtils.js';

const App = (props) => {
  const [title, setTitle] = useState('Ledgers');
  const [showLedgerList, setShowLedgerList] = useState(true);
  const [showLedger, setShowLedger] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState({
    year: '',
    month: ''
  });
  const origin = useRef('');
  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const loginHandler = (retryFunc) => {
    const {refreshToken} = authUtils.getToken();

    if (refreshToken) {
      authConnector.renew(refreshToken).then((result) => {
        if (result.success) {
          authUtils.saveToken(result.accessToken, refreshToken);
          retryFunc();
        }
        else {
          origin.current = title;
          setTitle('Sign in');
          setShowLedgerList(false);
          setShowLedger(false);
          setShowLogin(true);
        }
      });
    }
    else {
      origin.current = title;
      setTitle('Sign in');
      setShowLedgerList(false);
      setShowLedger(false);
      setShowLogin(true);
    }
  }

  const loggedIn = () => {
    if (origin.current === 'Ledgers') {
      setTitle('Ledgers');
      setShowLedgerList(true);
      setShowLedger(false);
      setShowLogin(false);
    }
    else {
      setTitle(origin.current);
      setShowLedgerList(false);
      setShowLedger(true);
      setShowLogin(false);
    }
  }

  const selectionHandler = (event) => {
    let year = parseInt(event.target.dataset.year);
    let month = parseInt(event.target.dataset.month);
    let title = `${year} ${months[month]}`;

    if (year === 0 && month === 0) {
      title = 'Fixed items';
    }

    setTitle(title);
    setSelectedLedger({
      year: year,
      month: month
    });
    setShowLedgerList(false);
    setShowLedger(true);
    setShowLogin(false);
  }

  const backToList = () => {
    setTitle('Ledgers');
    setShowLedgerList(true);
    setShowLedger(false);
    setShowLogin(false);
  }

  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row header">
        <div className="ms-Grid-col ms-sm12 align-center">
          <Text variant={'large'}>{title}</Text>
        </div>
      </div>
      <CSSTransition in={showLedgerList} timeout={200} classNames="ledgerList" mountOnEnter unmountOnExit>
        <LedgerList selectHandler={selectionHandler} loginHandler={loginHandler} />
      </CSSTransition>
      <CSSTransition in={showLedger} timeout={200} classNames="ledgerDetails" mountOnEnter unmountOnExit>
        <LedgerDetails selection={selectedLedger} loginHandler={loginHandler} returnHandler={backToList} />
      </CSSTransition>
      <CSSTransition in={showLogin} timeout={200} classNames="authScreen" mountOnEnter unmountOnExit>
        <AuthScreen completionCallback={loggedIn} />
      </CSSTransition>
    </div>
  );
}

export default App;
