import React, { Component } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { List } from 'office-ui-fabric-react/lib/List';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import ledgerConnector from './../utils/ledgerConnector.js';
import authUtils from './../utils/authUtils.js';

class LedgerList extends Component {
  constructor(props) {
    super(props);
    this.updateLedgerList = this.updateLedgerList.bind(this);
    this.addLedger = this.addLedger.bind(this);
    this.showFixed = this.showFixed.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.renderCell = this.renderCell.bind(this);

    this.selectionHandler = this.props.selectHandler;
    this.loginHandler = this.props.loginHandler;
    this.months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.ledgers = [];
    this.commandItems = [
      {
        key: 'new',
        text: 'New item',
        iconProps: { iconName: 'Add' },
        onClick: this.addLedger
      }
    ];
    this.farItems = [
      {
        key: 'fixed',
        text: 'Fixed',
        iconProps: { iconName: 'Calendar' },
        onClick: this.showFixed
      },
      {
        key: 'refresh',
        text: 'Refresh',
        ariaLabel: 'Refresh',
        iconOnly: true,
        iconProps: { iconName: 'Refresh' },
        onClick: this.updateLedgerList
      }
    ];
    this.state = {
      dropdownOptions: [],
      displayedLedgers: [],
      showSpinner: false
    };
  }

  componentDidMount() {
    this.updateLedgerList();
  }

  configureDropdown() {
    let years = [];
    for (let i = 0; i < this.ledgers.length; i++) {
      if (years.indexOf(this.ledgers[i].Year) === -1) {
        years.push(parseInt(this.ledgers[i].Year));
      }
    }
    years.sort((a, b) => b - a); // Descending

    let options = [];
    for (let i = 0; i < years.length; i++) {
      options.push({ key: years[i], text: years[i] });
    }
    this.setState({
      dropdownOptions: options
    });
  }

  updateLedgerList() {
    this.setState({
      showSpinner: true
    });
    ledgerConnector.listLedgers(authUtils.getToken()).then((result) => {
      this.setState({
        showSpinner: false
      });
      if (result.success) {
        this.ledgers = result.data;
        this.ledgers.sort(this.sortLedgers);
        this.setState({
          displayedLedgers: this.ledgers
        });
        this.configureDropdown();
      }
      else {
        if (result.status === 'Unauthorized') {
          this.loginHandler();
        }
      }
    });
  }

  showFixed() {
    // TODO
  }

  filterByYear(year) {
    return this.ledgers.filter((item) => {
      return item.Year == year;
    });
  }

  sortLedgers(a, b) {
    if (a.Year !== b.Year) {
      return b.Year - a.Year;
    }
    return b.Month - a.Month;
  }

  addLedger() {
    let date = new Date();
    let latestYear = date.getFullYear();
    let latestMonth = date.getMonth() + 1;

    if (this.ledgers.length > 0) {
      latestYear = parseInt(this.ledgers[0].Year);
      latestMonth = parseInt(this.ledgers[0].Month);

      latestMonth++;
      if (latestMonth === 13) {
        latestYear++;
        latestMonth = 1;
      }
    }

    this.selectionHandler({
      target: {
        dataset: {
          year: latestYear,
          month: latestMonth
        }
      }
    });
  }

  onChangeHandler(event, item) {
    this.setState({
      displayedLedgers: this.filterByYear(item.value).sort(this.sortLedgers)
    });
  }

  renderCell(item, index) {
    return (
      <div className="list-item" onClick={this.selectionHandler} data-year={item.Year} data-month={item.Month}>
        <Text data-year={item.Year} data-month={item.Month}>{`${item.Year} ${this.months[item.Month]}`}</Text>
      </div>
    );
  }

  render() {
    return (
      <div data-is-scrollable="true">
        <Stack>
          <Dropdown placeholder="Filter by year" options={this.state.dropdownOptions} onChange={this.onChangeHandler} />
          <CommandBar
            items={this.commandItems}
            farItems={this.farItems}
            ariaLabel=""
          />
          { this.state.showSpinner && <Spinner size={SpinnerSize.medium} /> }
          <List items={this.state.displayedLedgers} onRenderCell={this.renderCell} />
        </Stack>
      </div>
    );
  }
}

export default LedgerList;
