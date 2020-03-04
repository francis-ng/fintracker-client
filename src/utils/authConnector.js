function getServerUrl() {
  return 'https://fintrack-image-occpy2fuaa-an.a.run.app';
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
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
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
  var url = this.getServerUrl() + '/api/user/register';

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ UserName: username, Password: password })
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return {
          success: true,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
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

function renew(refreshToken) {
  var url = this.getServerUrl() + '/api/user/renew';

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `"${refreshToken}"`
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return {
          success: true,
          accessToken: data.accessToken
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

export default {
  getServerUrl,
  isReachable,
  login,
  register,
  renew
};
