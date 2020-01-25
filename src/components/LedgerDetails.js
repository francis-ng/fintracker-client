import React, { Component } from 'react';
import { MessageBar, MessageBarType, DefaultPalette } from 'office-ui-fabric-react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DetailsList, SelectionMode, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import ledgerConnector from '../utils/ledgerConnector.js';
import authUtils from './../utils/authUtils.js';

class LedgerDetails extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.renderItemColumn = this.renderItemColumn.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.loginHandler = this.props.loginHandler;
    this.backToList = this.props.returnHandler;
    this.parameters = {
      year: this.props.selection.year,
      month: this.props.selection.month
    };
    this.newLedger = false;
    this.displayprops = {
      columns: [
        {
          key: 'item',
          name: 'Item',
          fieldName: 'Label',
          isPadded: true
        },
        {
          key: 'amount',
          name: 'Amount',
          fieldName: 'Amount',
          isPadded: true
        },
      ],
      stackItemStyles: {
        root: {
          alignItems: 'center',
          justifyContent: 'right',
          display: 'grid'
        }
      }
    }
    this.commandItems = [
      {
        key: 'back',
        text: 'Back',
        ariaLabel: 'Back',
        iconOnly: true,
        iconProps: { iconName: 'Back' },
        onClick: this.backToList
      },
      {
        key: 'new',
        text: 'New item',
        iconProps: { iconName: 'Add' },
        onClick: this.addItem
      }
    ];
    this.farItems = [
      {
        key: 'save',
        text: 'Save',
        ariaLabel: 'Save',
        iconOnly: true,
        iconProps: { iconName: 'CheckMark' },
        onClick: this.save
      }
    ];
    this.state = {
      ledger: {
        Type: "regular",
        Month: this.parameters.month,
        Year: this.parameters.year,
        Debits: [],
        DebitTotal: "",
        Credits: [],
        CreditTotal: ""
      },
      selectedTab: 'Debits',
      saveSuccess: false,
      saveFailed: false
    }
  }

  componentDidMount() {
    this.getLedgerDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selection.Year !== prevProps.selection.Year &&
        this.props.selection.Month !== prevProps.selection.Month) {
      this.getLedgerDetails();
    }
  }

  getLedgerDetails() {
    console.log(`Loading ${this.parameters.year}/${this.parameters.month}`);
    ledgerConnector.getLedger(authUtils.getToken(), this.parameters.year, this.parameters.month).then((result) => {
      if (result.success) {
        this.setState({
          ledger: result.data
        });
      }
      else {
        if (result.status === 'Not found') {
          console.log('No data found. New ledger will be created');
          this.newLedger = true;
        }
        else if (result.status === 'Unauthorized') {
          this.loginHandler();
        }
      }
    });
  }

  addItem() {
    console.log(`Adding new item to ${this.state.selectedTab}`);

    this.setState(prevState => ({
      ledger: {
        ...prevState.ledger,
        [this.state.selectedTab]: prevState.ledger[this.state.selectedTab].concat({
          Label: '',
          Amount: ''
        })
      }
    }));
  }

  save() {
    this.setState({
      saveSuccess: false,
      saveFailed: false
    });
    if (this.newLedger) {
      ledgerConnector.addLedger(authUtils.getToken(), this.state.ledger).then((result) => {
        if (result.success) {
          this.setState({
            saveSuccess: true
          });
        }
        else {
          this.setState({
            saveFailed: true
          });
        }
      });
    }
    else {
      ledgerConnector.updateLedger(authUtils.getToken(), this.state.ledger).then((result) => {
        if (result.success) {
          this.setState({
            saveSuccess: true
          });
        }
        else {
          this.setState({
            saveFailed: true
          });
        }
      });
    }
  }

  calculateTotal(total, current) {
    if (current.Amount) {
      return total + parseInt(current.Amount);
    }
    return total;
  }

  handleTabClick(item) {
    this.setState({
      selectedTab: item.props.itemKey
    });
  }

  onChangeHandler(event) {
    const value = event.target.value;
    const name = event.target.name;
    const index = parseInt(event.target.dataset.index);
    console.log(`Updating ${name} of item ${index} of ${this.state.selectedTab}`);

    this.setState(prevState => ({
      ledger: {
        ...prevState.ledger,
        [this.state.selectedTab]: prevState.ledger[this.state.selectedTab].map((el, i) => i === index ? {
          ...el, [name]: value
        } : el)
      }
    }), () => {
      if (this.state.selectedTab === 'Debits') {
        this.setState(prevState => ({
          ledger: {
            ...prevState.ledger,
            DebitTotal: prevState.ledger.Debits.reduce(this.calculateTotal, 0)
          }
        }));
      }
      else {
        this.setState(prevState => ({
          ledger: {
            ...prevState.ledger,
            CreditTotal: prevState.ledger.Credits.reduce(this.calculateTotal, 0)
          }
        }));
      }
    });
  }

  renderItemColumn(item, index, column) {
    switch (column.key) {
      case 'item':
        return <TextField ariaLabel="Item" name="Label" data-index={index} value={this.state.ledger[this.state.selectedTab][index].Label} onChange={this.onChangeHandler} />;

      case 'amount':
        return <TextField ariaLabel="Amount" name="Amount" type="number" data-index={index} value={this.state.ledger[this.state.selectedTab][index].Amount} onChange={this.onChangeHandler} />;

      default:
        return;
    }
  }

  render() {
    return (
      <div>
        {
          this.state.saveSuccess &&
          <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
            Saved
          </MessageBar>
        }
        {
          this.state.saveFailed &&
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
            Could not save. Please try again.
          </MessageBar>
        }
        <CommandBar
          items={this.commandItems}
          farItems={this.farItems}
          ariaLabel=""
        />
        <Pivot
            selectedKey={this.state.selectedTab}
            onLinkClick={this.handleTabClick}
            styles={{ link: {width:"50%"}, linkIsSelected: {width:"50%"} }}>
          <PivotItem headerText="Expenses" itemKey="Debits">
            <div data-is-scrollable="true">
              <DetailsList
                items={this.state.ledger.Debits}
                columns={this.displayprops.columns}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                onRenderItemColumn={this.renderItemColumn}
              />
              <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10, padding: 32 }}>
              <Stack.Item grow={5} styles={this.displayprops.stackItemStyles}>
                  Total
                </Stack.Item>
                <Stack.Item grow styles={this.displayprops.stackItemStyles}>
                  {this.state.ledger.DebitTotal}
                </Stack.Item>
              </Stack>
            </div>
          </PivotItem>
          <PivotItem headerText="Income" itemKey="Credits">
            <div data-is-scrollable="true">
              <DetailsList
                items={this.state.ledger.Credits}
                columns={this.displayprops.columns}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                onRenderItemColumn={this.renderItemColumn}
              />
              <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10, padding: 32 }}>
                <Stack.Item grow={5} styles={this.displayprops.stackItemStyles}>
                  Total
                </Stack.Item>
                <Stack.Item grow styles={this.displayprops.stackItemStyles}>
                  {this.state.ledger.CreditTotal}
                </Stack.Item>
              </Stack>
            </div>
          </PivotItem>
        </Pivot>
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10, padding: 32 }}>
          <Stack.Item grow={5} styles={this.displayprops.stackItemStyles}>
            <b>Net</b>
          </Stack.Item>
          <Stack.Item grow styles={this.displayprops.stackItemStyles}>
            <b>{this.state.ledger.CreditTotal - this.state.ledger.DebitTotal}</b>
          </Stack.Item>
        </Stack>
      </div>
    );
  }
}

export default LedgerDetails;
