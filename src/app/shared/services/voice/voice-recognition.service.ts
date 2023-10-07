import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { LANGUAGE_TAGS } from '../../constants/language-tags.constant';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  speechToText = new Subject<string>();
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords: any;
  language!: string;
  constructor(private _activatedRoute: ActivatedRoute) { }

  init() {
    this.language = this._activatedRoute.snapshot.queryParamMap.get('lang') || 'en-US';
    const languageTag = _.get(LANGUAGE_TAGS, this.language, 'en-US');
    this.recognition.interimResults = true;
    this.recognition.lang = languageTag;

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', () => {
      this.recognition.stop();
      this.setSppechTotext();
      /*if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }*/
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
  public setSppechTotext() {
    if (this.tempWords) {
      this.speechToText.next(this.tempWords);
      this.tempWords = '';
    }
  }
  public getSppechTotext() {
    return this.speechToText.asObservable();
  }
}