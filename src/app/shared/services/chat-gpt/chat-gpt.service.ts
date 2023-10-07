import { Injectable } from '@angular/core';
import { CHAT_GPT } from '../../constants/chat-gpt.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from 'src/app/home/interfaces/message.interface';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { LANGUAGE_CONTENT } from '../../constants/language-content.contants';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${CHAT_GPT.API_KEY}`
});
@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  constructor(private _httpClient: HttpClient,
    private _activatedRoute: ActivatedRoute) { }
  askChatGpt(animalName: string, message: Message) {
    const lang = this._activatedRoute.snapshot.queryParamMap.get('lang') || '';
    const langContent = _.get(LANGUAGE_CONTENT, lang, '');
    const payload = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": "Respond as " + animalName +' '+langContent
        }
      ]
    }
    const initialLoad = _.get(message, 'initialLoad', false);
    if (!initialLoad) {
      payload.messages.push(message);
    }
    return this._httpClient.post(CHAT_GPT.API_URL, payload, { headers });
  }

}
