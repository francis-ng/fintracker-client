import React, { useState, useEffect, useRef } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { List } from 'office-ui-fabric-react/lib/List';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import ledgerConnector from './../utils/ledgerConnector.js';
import authUtils from './../utils/authUtils.js';

const LedgerList = (props) => {
  const selectionHandler = props.selectHandler;
  const loginHandler = props.loginHandler;
  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const ledgers = useRef([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [displayedLedgers, setDisplayedLedgers] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const sortLedgers = (a, b) => {
    if (a.Year !== b.Year) {
      return b.Year - a.Year;
    }
    return b.Month - a.Month;
  }

  const configureDropdown = () => {
    let years = [];
    for (let i = 0; i < ledgers.current.length; i++) {
      if (years.indexOf(ledgers.current[i].Year) === -1) {
        years.push(parseInt(ledgers.current[i].Year));
      }
    }
    years.sort((a, b) => b - a); // Descending

    let options = [];
    options.push({ key: '', text: '' });
    for (let i = 0; i < years.length; i++) {
      options.push({ key: years[i], text: years[i] });
    }
    setDropdownOptions(options);
  }

  const updateLedgerList = () => {
    setShowSpinner(true);
    const { accessToken } = authUtils.getToken();
    ledgerConnector.listLedgers(accessToken).then((result) => {
      setShowSpinner(false);
      if (result.success) {
        ledgers.current = result.data.filter((item) => {
          return item.Type === 'regular';
        });
        ledgers.current.sort(sortLedgers);
        setDisplayedLedgers(ledgers.current);
        configureDropdown();
      }
      else {
        if (result.status === 'Unauthorized') {
          loginHandler(updateLedgerList);
        }
      }
    });
  }

  useEffect(updateLedgerList, []);

  const showFixed = () => {
    selectionHandler({
      target: {
        dataset: {
          year: 0,
          month: 0
        }
      }
    });
  }

  const filterByYear = (year) => {
    return ledgers.current.filter((item) => {
      return parseInt(item.Year) === parseInt(year);
    });
  }

  const addLedger = () => {
    let date = new Date();
    let latestYear = date.getFullYear();
    let latestMonth = date.getMonth() + 1;

    if (ledgers.current.length > 0) {
      latestYear = parseInt(ledgers.current[0].Year);
      latestMonth = parseInt(ledgers.current[0].Month);

      latestMonth++;
      if (latestMonth === 13) {
        latestYear++;
        latestMonth = 1;
      }
    }

    selectionHandler({
      target: {
        dataset: {
          year: latestYear,
          month: latestMonth
        }
      }
    });
  }

  const onChangeHandler = (event, item) => {
    if (item.value === '') {
      setDisplayedLedgers(ledgers.current);
    }
    else {
      setDisplayedLedgers(filterByYear(item.value).sort(sortLedgers));
    }
  }

  const renderCell = (item, index) => {
    return (
      <div className="list-item" onClick={selectionHandler} data-year={item.Year} data-month={item.Month}>
        <Text data-year={item.Year} data-month={item.Month}>{`${item.Year} ${months[item.Month]}`}</Text>
      </div>
    );
  }

  const commandItems = [
    {
      key: 'new',
      text: 'New item',
      iconProps: { iconName: 'Add' },
      onClick: addLedger
    }
  ];
  const farItems = [
    {
      key: 'fixed',
      text: 'Fixed',
      iconProps: { iconName: 'Calendar' },
      onClick: showFixed
    },
    {
      key: 'refresh',
      text: 'Refresh',
      ariaLabel: 'Refresh',
      iconOnly: true,
      iconProps: { iconName: 'Refresh' },
      onClick: updateLedgerList
    }
  ];

  return (
    <div data-is-scrollable="true">
      <Stack>
        <Dropdown placeholder="Filter by year" options={dropdownOptions} onChange={onChangeHandler} />
        <CommandBar
          items={commandItems}
          farItems={farItems}
          ariaLabel=""
        />
        { showSpinner && <Spinner size={SpinnerSize.medium} /> }
        <List items={displayedLedgers} onRenderCell={renderCell} />
      </Stack>
    </div>
  );
}

export default LedgerList;
