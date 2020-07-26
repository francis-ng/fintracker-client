import React, { useEffect, useRef, useReducer, useState } from 'react';
import { MessageBar, MessageBarType, IconButton } from 'office-ui-fabric-react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { SelectionMode, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import ledgerConnector from '../utils/ledgerConnector.js';
import authUtils from './../utils/authUtils.js';

const calculateTotal = (total, current) => {
  if (current.Amount) {
    return total + parseInt(current.Amount);
  }
  return total;
}

const ledgerReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ledger;
    case 'ADD_FIXED':
      return {
        ...state,
        Debits: state.Debits.concat({
          Label: 'Fixed expenses',
          Amount: action.debitTotal
        }),
        Credits: state.Credits.concat({
          Label: 'Fixed income',
          Amount: action.creditTotal
        }),
        DebitTotal: action.debitTotal,
        CreditTotal: action.creditTotal
      };
    case 'ADD':
      return {
        ...state,
        [action.book]: state[action.book].concat({
          Label: '',
          Amount: ''
        })
      };
    case 'UPDATE_INCOME':
      const newCredits = state.Credits.map((el, i) => {
        if (i === action.index) return { ...el, [action.field]: action.value };
        else return el;
      });
      const creditTotal = newCredits.reduce(calculateTotal, 0);
      return {
        ...state,
        Credits: newCredits,
        CreditTotal: creditTotal
      };
    case 'UPDATE_EXPENSE':
      const newDebits = state.Debits.map((el, i) => {
        if (i === action.index) return { ...el, [action.field]: action.value };
        else return el;
      });
      console.log(newDebits);
      const debitTotal = newDebits.reduce(calculateTotal, 0);
      return {
        ...state,
        Debits: newDebits,
        DebitTotal: debitTotal
      };
    case 'DELETE':
      state[action.book].splice(action.index, 1);
      return {
        ...state,
        [action.book]: state[action.book]
      };
    default:
      throw new Error();
  }
};

const LedgerDetails = (props) => {
  const loginHandler = props.loginHandler;
  const backToList = props.returnHandler;
  const parameters = {
    year: props.selection.year,
    month: props.selection.month,
    type: props.selection.year === 0 ? 'fixed' : 'regular'
  };
  const newLedger = useRef(false);
  const [ledger, dispatchLedger] = useReducer(ledgerReducer, {
    Type: parameters.type,
    Month: parameters.month,
    Year: parameters.year,
    Debits: [],
    DebitTotal: "",
    Credits: [],
    CreditTotal: ""
  });

  const [selectedTab, setSelectedTab] = useState('Debits');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const populateFixedItems = () => {
    console.log(`Loading fixed items`);
    setDataLoaded(false);

    const { accessToken } = authUtils.getToken();
    ledgerConnector.getLedger(accessToken, 0, 0).then((result) => {
      setDataLoaded(true);
      if (result.success) {
        dispatchLedger({ type: 'ADD_FIXED', debitTotal: result.data.DebitTotal, creditTotal: result.data.CreditTotal });
      }
      else {
        if (result.status === 'Unauthorized') {
          loginHandler(populateFixedItems);
        }
      }
    });
  }

  const getLedgerDetails = () => {
    console.log(`Loading ${parameters.year}/${parameters.month}`);

    const { accessToken } = authUtils.getToken();
    ledgerConnector.getLedger(accessToken, parameters.year, parameters.month).then((result) => {
      setDataLoaded(true);
      if (result.success) {
        dispatchLedger({ type: 'SET', ledger: result.data });
      }
      else {
        if (result.status === 'Not found') {
          console.log('No data found. New ledger will be created');
          newLedger.current = true;
          if (ledger.Type === 'regular') {
            populateFixedItems();
          }
        }
        else if (result.status === 'Unauthorized') {
          loginHandler(getLedgerDetails);
        }
      }
    });
  }

  useEffect(getLedgerDetails, []);

  const addItem = () => {
    console.log(`Adding new item to ${selectedTab}`);

    dispatchLedger({ type: 'ADD', book: selectedTab });
  }

  const deleteItem = (selectedTab, index) => {
    dispatchLedger({ type: 'DELETE', index: index, book: selectedTab });
  }

  const save = () => {
    setSaveSuccess(false);
    setSaveFailed(false);
    const { accessToken } = authUtils.getToken();
    if (newLedger.current) {
      ledgerConnector.addLedger(accessToken, ledger).then((result) => {
        if (result.success) {
          setSaveSuccess(true);
        }
        else {
          setSaveFailed(true);
        }
      });
    }
    else {
      ledgerConnector.updateLedger(accessToken, ledger).then((result) => {
        if (result.success) {
          setSaveSuccess(true);
        }
        else {
          setSaveFailed(true);
        }
      });
    }
  }

  const onChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const index = parseInt(event.target.dataset.index);
    console.log(`Updating ${name} of item ${index} of ${selectedTab}`);

    if (selectedTab === 'Credits') {
      dispatchLedger({ type: 'UPDATE_INCOME', index: index, field: name, value: value });
    }
    else {
      dispatchLedger({ type: 'UPDATE_EXPENSE', index: index, field: name, value: value });
    }
  }

  const renderItemColumn = (item, index, column) => {
    switch (column.key) {
      case 'item':
        return <TextField ariaLabel="Item" name="Label" data-index={index} value={ledger[selectedTab][index].Label} onChange={onChangeHandler} />;

      case 'amount':
        return <TextField ariaLabel="Amount" name="Amount" type="number" data-index={index} value={ledger[selectedTab][index].Amount} onChange={onChangeHandler} />;

      case 'delete':
        return <IconButton iconProps={{ iconName: 'Cancel' }} title="Delete" ariaLabel="Delete" onClick={() => deleteItem(selectedTab, index) } />

      default:
        return;
    }
  }

  const displayprops = {
    columns: [
      {
        key: 'item',
        name: 'Item',
        fieldName: 'Label',
        minWidth: 150
      },
      {
        key: 'amount',
        name: 'Amount',
        fieldName: 'Amount',
        maxWidth: 80
      },
      {
        key: 'delete',
        name: 'Delete',
        fieldName: '',
        maxWidth: 16
      }
    ],
    stackItemStyles: {
      root: {
        alignItems: 'center',
        justifyContent: 'right',
        display: 'grid'
      }
    }
  }
  const commandItems = [
    {
      key: 'back',
      text: 'Back',
      ariaLabel: 'Back',
      iconOnly: true,
      iconProps: { iconName: 'Back' },
      onClick: backToList
    },
    {
      key: 'new',
      text: 'New item',
      iconProps: { iconName: 'Add' },
      onClick: addItem
    }
  ];
  const farItems = [
    {
      key: 'save',
      text: 'Save',
      ariaLabel: 'Save',
      iconOnly: true,
      iconProps: { iconName: 'CheckMark' },
      onClick: save
    }
  ];

  return (
    <div>
      {
        saveSuccess &&
        <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
          Saved
        </MessageBar>
      }
      {
        saveFailed &&
        <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
          Could not save. Please try again.
        </MessageBar>
      }
      <CommandBar
        items={commandItems}
        farItems={farItems}
        ariaLabel=""
      />
      <Pivot
          selectedKey={selectedTab}
          onLinkClick={(item) => setSelectedTab(item.props.itemKey)}
          styles={{ link: {width:"50%"}, linkIsSelected: {width:"50%"} }}>
        <PivotItem headerText="Expenses" itemKey="Debits">
          <div data-is-scrollable="true">
            <ShimmeredDetailsList
              items={ledger.Debits}
              columns={displayprops.columns}
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              enableShimmer={!dataLoaded}
              onRenderItemColumn={renderItemColumn}
            />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10, padding: 32 }}>
            <Stack.Item grow={5} styles={displayprops.stackItemStyles}>
                Total
              </Stack.Item>
              <Stack.Item grow styles={displayprops.stackItemStyles}>
                {ledger.DebitTotal}
              </Stack.Item>
            </Stack>
          </div>
        </PivotItem>
        <PivotItem headerText="Income" itemKey="Credits">
          <div data-is-scrollable="true">
            <ShimmeredDetailsList
              items={ledger.Credits}
              columns={displayprops.columns}
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              enableShimmer={!dataLoaded}
              onRenderItemColumn={renderItemColumn}
            />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10, padding: 32 }}>
              <Stack.Item grow={5} styles={displayprops.stackItemStyles}>
                Total
              </Stack.Item>
              <Stack.Item grow styles={displayprops.stackItemStyles}>
                {ledger.CreditTotal}
              </Stack.Item>
            </Stack>
          </div>
        </PivotItem>
      </Pivot>
      <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10, padding: 32 }}>
        <Stack.Item grow={5} styles={displayprops.stackItemStyles}>
          <b>Net</b>
        </Stack.Item>
        <Stack.Item grow styles={displayprops.stackItemStyles}>
          <b>{ledger.CreditTotal - ledger.DebitTotal}</b>
        </Stack.Item>
      </Stack>
    </div>
  );
}

export default LedgerDetails;
