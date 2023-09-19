export class Api { 
    constructor (config) {
      this._url = config.url;
      this._headers = config.headers;
    }
    
    _checkResponse = (res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    }

    getPosts (counter) {
      return fetch (this._url + '/getPosts?counter=' + counter, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers
      }).then(this._checkResponse);
    }
  }

  const api = new Api({
    url: 'http://localhost:3000',
    headers: {
      "Content-Type": "application/json"
  }});

  export default api;