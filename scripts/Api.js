export default class Api {
  constructor(token) {
    this.token = token;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getData() {
    return fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: this.token,
      },
    })
      .then((data) => {
        return this._checkResponse(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
