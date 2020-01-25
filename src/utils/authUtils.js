function getToken() {
  return localStorage.getItem('authToken');
}

function saveToken(token) {
  localStorage.setItem('authToken', token);
}

export default {
  getToken,
  saveToken
};