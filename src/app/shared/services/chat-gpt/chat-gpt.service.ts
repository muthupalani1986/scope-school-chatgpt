import { Injectable } from '@angular/core';
import { CHAT_GPT } from '../../constants/chat-gpt.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from 'src/app/home/interfaces/message.interface';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${CHAT_GPT.API_KEY}`
});
@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  constructor(private _httpClient: HttpClient) { }
  askChatGpt(animalName: string, message: Message) {
    const payload = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": "Respond as " + animalName
        }
      ]
    }
    payload.messages.push(message);
    return this._httpClient.post(CHAT_GPT.API_URL, payload, { headers });
  }

}
