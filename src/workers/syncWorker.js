import authUtils from './../utils/authUtils.js';
import authConnector from './../utils/authConnector.js';
import ledgerConnector from './../utils/ledgerConnector.js';

// IndexedDB setup
var db;
var dbRequest = window.indexedDB.open('FinTrackDB', 1);
dbRequest.onsuccess = (event) => {
  db = event.target.result;
};
dbRequest.onerror = (event) => {
  console.log("Unable to use IndexedDB");
};
dbRequest.onupgradeneeded = (event) => {
  db = event.target.result;

  var objectStore = db.createObjectStore('ledgers', { autoIncrement : true });
  objectStore.createIndex('Id', 'Id', { unique: false });
  objectStore.createIndex('Year', 'Year', { unique: false });
  objectStore.createIndex('Month', 'Month', { unique: false });
};

// Online offline handlers
var serverUrl = ledgerConnector.getServerUrl();
var isOnline = true;
window.addEventListener('online', handleConnection);
window.addEventListener('offline', handleConnection);

function handleConnection() {
  if (navigator.onLine) {
    authConnector.isReachable(serverUrl).then((online) => {
      if (online) {
        console.log('Client online');
        isOnline = true;
      } else {
        console.log('No connectivity');
        isOnline = false;
      }
    });
  } else {
    console.log('Client offline');
    isOnline = false;
  }
}

// Worker core
var token = authUtils.getToken();
onmessage = (e) => {
  var objectStore = db.transaction(['ledgers'], 'readwrite').objectStore('ledgers');
  objectStore.add(e.data);
};

setInterval(sync, 10000);

function sync() {
  if (isOnline) {
    var objectStore = db.transaction('ledgers').objectStore('ledgers');
    objectStore.getCursor().onsuccess = (e) => {
      var cursor = e.target.result;
      if (cursor) {
        console.log('Syncing entry ' + cursor.value.key);
        syncLedger(cursor.value).then((result) => {
          if (result) {
            console.log('Entry ' + cursor.value.key + ' synced');
            console.log('Deleting entry ' + cursor.value.key);
            db.transaction('ledgers', 'readwrite').objectStore('ledgers').delete(cursor.value.key).onsuccess = () => true;
          }
        }).then((result) => {
          console.log('Delete complete');
          cursor.continue();
        }).catch(() => {
          console.log('Syncing failed for entry ' + cursor.value.key);
          cursor.continue();
        });
      }
    };
  }
}

function syncLedger(ledger) {
  ledgerConnector.getLedger(token, ledger.Year, ledger.Month).then((result) => {
    if (result.success) {
      const serverUpd = Date.parse(result.data.UpdatedAt);
      const localUpd = Date.parse(ledger.UpdatedAt);
      if (localUpd > serverUpd) {
        return updateLedger(ledger).then((result) => {
          return result;
        });
      }
      else {
        return true;
      }
    }
    else {
      if (result.status === 'Unauthorized') {
        postMessage('Unauthorized');
        return false;
      }
      else if (result.status === 'Not found') {
        return addLedger(ledger).then((result) => {
          return result;
        });
      }
    }
  });
}

function updateLedger(ledger) {
  ledgerConnector.updateLedger(token, ledger).then((result) => {
    if (result.success) {
      return true;
    }
    else {
      if (result.status === 'Unauthorized') {
        postMessage('Unauthorized');
      }
      return false;
    }
  });
}

function addLedger(ledger) {
  ledgerConnector.addLedger(token, ledger).then((result) => {
    if (result.success) {
      return true;
    }
    else {
      if (result.status === 'Unauthorized') {
        postMessage('Unauthorized');
      }
      return false;
    }
  });
}
