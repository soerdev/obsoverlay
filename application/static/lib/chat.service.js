const getJSON = function(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    const status = xhr.status;
    if (status === 200) {
      callback(200, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

export class ChatService {

  constructor() {
    this.totalAmount = 0;
    this.messagesList = [];
  }


  loadChatInfo(liveChatId, key) {

    const nextPageTokenTemplate = this.nextPageToken ? `&pageToken=${this.nextPageToken}&` : '';
    const url = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}${nextPageTokenTemplate}&part=id%2C+snippet%2C+authorDetails&key=${key}`;
    return new Promise((resolve, reject) => {
    getJSON(url, (status, data) => {
//  getJSON('http://localhost:3000/donate', (status, data) => {
       if (status === 200 && data.items) {

          this.nextPageToken = data['nextPageToken'];
          this.messagesList = [];
          data.items.forEach((d) => this.messagesList.push({
              comment: d['snippet']['textMessageDetails']['messageText'],
              author: d['authorDetails']['displayName']
          }));
          resolve(this.messagesList);
        } else {
          reject(data);
        }
      });
    });
  }
}
