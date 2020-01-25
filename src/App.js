import React, { Component } from 'react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { CSSTransition } from 'react-transition-group';
import AuthScreen from './components/AuthScreen.js';
import LedgerList from './components/LedgerList.js';
import LedgerDetails from './components/LedgerDetails.js';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
    this.selectionHandler = this.selectionHandler.bind(this);
    this.backToList = this.backToList.bind(this);
    this.loggedIn = this.loggedIn.bind(this);

    this.state = {
      title: 'Ledgers',
      showLedgerList: true,
      showLedger: false,
      showLogin: false,
      selectedLedger: {
        year: '',
        month: ''
      }
    };
    this.months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  loginHandler() {
    this.origin = this.state.title;
    this.setState({
      title: 'Sign in',
      showLedgerList: false,
      showLedger: false,
      showLogin: true
    });
  }

  loggedIn() {
    if (this.origin === 'Ledgers') {
      this.setState({
        title: 'Ledgers',
        showLedgerList: true,
        showLedger: false,
        showLogin: false
      });
    }
    else {
      this.setState({
        title: this.origin,
        showLedgerList: false,
        showLedger: true,
        showLogin: false
      });
    }
  }

  selectionHandler(event) {
    let year = event.target.dataset.year;
    let month = event.target.dataset.month;

    this.setState({
      title: `${year} ${this.months[month]}`
    });
    this.setState({
      selectedLedger: {
        year: year,
        month: month
      }
    });
    this.setState({
      showLedgerList: false,
      showLedger: true,
      showLogin: false
    });
  }

  backToList() {
    this.setState({
      title: 'Ledgers',
      showLedgerList: true,
      showLedger: false,
      showLogin: false
    });
  }

  render() {
    return (
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row header">
          <div className="ms-Grid-col ms-sm12 align-center">
            <Text variant={'large'}>{this.state.title}</Text>
          </div>
        </div>
        <CSSTransition in={this.state.showLedgerList} timeout={200} classNames="ledgerList" mountOnEnter unmountOnExit>
          <LedgerList selectHandler={this.selectionHandler} loginHandler={this.loginHandler} />
        </CSSTransition>
        <CSSTransition in={this.state.showLedger} timeout={200} classNames="ledgerDetails" mountOnEnter unmountOnExit>
          <LedgerDetails selection={this.state.selectedLedger} loginHandler={this.loginHandler} returnHandler={this.backToList} />
        </CSSTransition>
        <CSSTransition in={this.state.showLogin} timeout={200} classNames="authScreen" mountOnEnter unmountOnExit>
          <AuthScreen completionCallback={this.loggedIn} />
        </CSSTransition>
      </div>
    );
  }
}

export default App;
