export class Api { 
  constructor () {
  }
  
  _checkResponse = (res) => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Произошла ошибка');
  }
  
  getAddress (url) {
    return fetch (url, {
      method: 'GET'
    }).then(this._checkResponse);
  }
}