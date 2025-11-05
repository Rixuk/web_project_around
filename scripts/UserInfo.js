export default class UserInfo {
  constructor({ userName, userAbout }) {
    this._userName = userName;
    this._userAbout = userAbout;
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.about = this._userAbout.textContent;
    return userInfo;
  }
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}
