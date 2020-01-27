function getServerUrl() {
  //return 'https://fintrack-image-occpy2fuaa-an.a.run.app';
  return 'http://localhost'
}

function isReachable() {
  return fetch(this.getServerUrl(), { method: 'HEAD', mode: 'no-cors' })
    .then((resp) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
}

function login(username, password) {
  var url = this.getServerUrl() + '/api/user/login';

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ UserName: username, Password: password })
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return {
          success: true,
          token: data.token
        };
      });
    }
    else {
      return {
        success: false
      };
    }
  });
}

function register(username, password) {
  var url = this.getServerUrl() + '/api/user/login';

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ UserName: username, Password: password })
  }).then((response) => {
    if (response.ok) {
      return {
        success: true
      };
    }
    else {
      return {
        success: false
      };
    }
  });
}

export default {
  getServerUrl,
  isReachable,
  login,
  register
};
