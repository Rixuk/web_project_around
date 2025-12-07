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
  _fetchGet(path){
    return fetch(this.url + path, {
      headers: {
        authorization: this.token,
      },
    })
      .then(this._checkResponse)
      .catch(this._checkError);
  }
  getData() {
    return this._fetchGet("/users/me");
  }
  getInitialCards(){
    return this._fetchGet("/cards");
  }
  patchUserInfo({ newName, newAbout }) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    }).then(this._checkResponse)
    .catch(this._checkError); 
  }
  newCard({ name, link }) {
    return fetch(this.url + "/cards", {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse)
    .catch(this._checkError); 
  }
}
