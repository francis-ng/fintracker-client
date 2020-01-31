function getServerUrl() {
  return 'https://fintrack-image-occpy2fuaa-an.a.run.app';
}

function listLedgers(token) {
  var getUrl = this.getServerUrl() + '/api/ledger/list';

  var authHeader = new Headers({
    'Authorization': 'Bearer ' + token
  });

  return fetch(getUrl, { headers: authHeader }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return {
          success: true,
          data: data
        };
      });
    }
    else {
      if (response.status === 404) {
        return {
          success: false,
          status: 'Not found'
        };
      }
      else if (response.status === 401 || response.status === 403) {
        return {
          success: false,
          status: 'Unauthorized'
        };
      }
      return {
        success: false,
        status: 'Error',
        data: []
      };
    }
  });
}

function getLedger(token, year, month) {
  var getUrl = this.getServerUrl() + '/api/ledger/get?year=' + year + '&month=' + month;
  var authHeader = new Headers({
    'Authorization': 'Bearer ' + token
  });

  return fetch(getUrl, { headers: authHeader }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return {
          success: true,
          data: data
        };
      });
    }
    else {
      if (response.status === 401 || response.status === 403) {
        return {
          success: false,
          status: 'Unauthorized'
        };
      }
      else if (response.status === 404) {
        return {
          success: false,
          status: 'Not found'
        };
      }
      return {
        success: false,
        status: 'Error',
        data: {
          "Id": "",
          "Owner": "",
          "Type": "",
          "Month": "",
          "Year": "",
          "Debits": [
          ],
          "DebitTotal": "",
          "Credits": [
          ],
          "CreditTotal": ""
        }
      };
    }
  });
}

function addLedger(token, ledger) {
  var addUrl = this.getServerUrl() + '/api/ledger/add';
  var authHeader = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });

  return fetch(addUrl, {
    method: 'POST',
    headers: authHeader,
    body: JSON.stringify(ledger)
  })
  .then((response) => {
    if (response.ok) {
      return {
        success: true
      };
    }
    else {
      if (response.status === 401 || response.status === 403) {
        return {
          success: false,
          status: 'Unauthorized'
        };
      }
      return {
        success: false,
        status: 'Error'
      };
    }
  });
}

function updateLedger(token, ledger) {
  var updateUrl = this.getServerUrl() + '/api/ledger/update?id=' + ledger.Id;
  var authHeader = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });

  return fetch(updateUrl, {
    method: 'PUT',
    headers: authHeader,
    body: JSON.stringify(ledger)
  })
  .then((response) => {
    if (response.ok) {
      return {
        success: true
      };
    }
    else {
      if (response.status === 401 || response.status === 403) {
        return {
          success: false,
          status: 'Unauthorized'
        };
      }
      return {
        success: false,
        status: 'Error'
      };
    }
  });
}

function deleteLedger(token, ledger) {
  var deleteUrl = this.getServerUrl() + '/api/ledger/delete?id=' + ledger.Id;
  var authHeader = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });

  return fetch(deleteUrl, {
    method: 'DELETE',
    headers: authHeader
  })
  .then((response) => {
    if (response.ok) {
      return {
        success: true
      };
    }
    else {
      if (response.status === 401 || response.status === 403) {
        return {
          success: false,
          status: 'Unauthorized'
        };
      }
      return {
        success: false,
        status: 'Error'
      };
    }
  });
}

export default {
  getServerUrl,
  listLedgers,
  getLedger,
  addLedger,
  updateLedger,
  deleteLedger
};
