export default class UserInfo {
  constructor({ userName, userAbout , userAvatar}) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
    this._userAvatar = document.querySelector(userAvatar);
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.about = this._userAbout.textContent;
    return userInfo;
  }
  setUserInfo({ name, about}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;

  }
  setAvatar({ avatar}){
    this._userAvatar.src = avatar;
  }
}
