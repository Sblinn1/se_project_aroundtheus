export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);

    if (!this._nameElement || !this._jobElement) {
      console.error("UserInfo elements not found");
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    if (this._nameElement && this._jobElement) {
      this._nameElement.textContent = title;
      this._jobElement.textContent = description;
    } else {
      console.error("UserInfo elements not found");
    }
  }
}
