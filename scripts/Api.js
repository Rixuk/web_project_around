export default class Api {
  constructor(token, baseUrl) {
    this.url = baseUrl;
    this.token = token;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  _checkError(error){
    console.log(error);
  }
  _fetchData(path){
    return fetch(this.url + path, {
      headers: {
        authorization: this.token,
      },
    })
      .then(this._checkResponse)
      .catch(this._checkError);
  }
  getData() {
    return this._fetchData("/users/me");
  }
  getInitialCards(){
    return this._fetchData("/cards");
}}
