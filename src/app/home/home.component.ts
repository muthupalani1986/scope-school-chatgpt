import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoiceRecognitionService } from '../shared/services/voice/voice-recognition.service';
import { Subscriber, Subscription } from 'rxjs';
import { Message } from './interfaces/message.interface';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { LocalStorageService } from '../shared/services/storage/local-storage.service';
import { ChatGptService } from '../shared/services/chat-gpt/chat-gpt.service';
// @ts-ignore
import Speech from 'speak-tts';
@Component({
  selector: 'workflow-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  public emojis = ['😀', '😃'];
  public emojiFlag = false;
  public chatbotForm!: FormGroup;
  public selectionStart = 0;
  public selectionEnd = 0;
  public speechToTextSubs!: Subscription;
  public messages!: Message[];
  public animalName!: string;
  public storageKeyName!: string;
  private chatGptSubs!: Subscription;
  public chatSpinner = false;
  speech: any;
  language!:string;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  constructor(private _formBuilder: FormBuilder,
    private _voiceRecognitionService: VoiceRecognitionService,
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _chatGptService: ChatGptService) {
    this._voiceRecognitionService.init();
    this.speech = new Speech();
  }
  ngOnInit(): void {
    this.storageKeyName = moment().format('YYYY-MM-DD');
    this.messages = JSON.parse(this._localStorageService.getItem(this.storageKeyName)) || [];
    this.animalName = this._activatedRoute.snapshot.queryParamMap.get('animal') || 'cat';
    this.chatbotForm = this._formBuilder.group({
      message: ['', [Validators.required]]
    });
    this._voiceRecognitionService.getSppechTotext().subscribe((response) => {
      const existingMessage = this.chatbotForm.get('message')?.value;
      const message = existingMessage + ' ' + response;
      this.chatbotForm.patchValue({
        message
      });
    });
    if (this.messages.length === 0) {
      const message: Message = {
        role: '',
        content: '',
        initialLoad: true
      }
      this.askChatGpt(message);
    }
    this.scrollToBottom();
    if (this.speech.hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported");
      this.speech.init({
        'volume': 1,
        'lang': 'en-GB',
        'rate': 1,
        'pitch': 1,
        'voice': 'Google UK English Male',
        'splitSentences': true,
        'listeners': {
          'onvoiceschanged': (voices: any) => {
            //console.log("Event voiceschanged", voices)
          }
        }
      }).then((data: any) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data)
      }).catch((e: any) => {
        console.error("An error occured while initializing : ", e)
      })
    }

  }
  public emojiToggle() {
    this.emojiFlag = !this.emojiFlag;
  }
  public setSelection(event: any) {
    this.selectionStart = event.target?.selectionStart;
    this.selectionEnd = event.target?.selectionEnd;
  }
  public addEmoji(emoji: any) {
    const existingMessage = this.chatbotForm.get('message')?.value;
    let message;
    if (existingMessage) {
      let startingText = existingMessage.slice(0, this.selectionStart);
      let endingText = existingMessage.slice(this.selectionStart);
      message = startingText + emoji + endingText;
    } else {
      message = emoji;
    }
    this.chatbotForm.patchValue({
      message
    });
    this.emojiFlag = false;
  }
  public onInput() {
    this, this.emojiFlag = false;
  }
  public start() {
    this._voiceRecognitionService.start();
  }
  public stop() {
    this._voiceRecognitionService.stop();
  }
  public sendMessage() {
    if (this.chatbotForm.valid) {
      const message: Message = {
        role: 'user',
        content: this.chatbotForm.get('message')?.value.replace(/(?:\r\n|\r|\n)/g, '<br>')
      }
      this.messages.push(message);
      this._localStorageService.setItem(this.storageKeyName, JSON.stringify(this.messages));
      this.chatbotForm.reset();
      this.askChatGpt(message);
    }

  }
  private askChatGpt(message: Message) {
    this.chatSpinner = true;
    this.chatGptSubs = this._chatGptService.askChatGpt(this.animalName, message).subscribe((response) => {
      this.chatSpinner = false;
      const choices = _.get(response, 'choices', []);
      choices.forEach((item: any) => {
        this.messages.push(item.message);
      });
      this._localStorageService.setItem(this.storageKeyName, JSON.stringify(this.messages));
    }, (err) => {
      this.chatSpinner = false;
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  share(message: string) {
    const shareData = {
      title: "Scope School",
      text: message,
      url: window.location.href
    };
    try {
      navigator.share(shareData);
    } catch (err) {
      console.log(err);
    }
  }
  speak(text: string) {
    this.speech.speak({
      text
    }).then(() => {
      console.log("Success !")
    }).catch((e: any) => {
      console.error("An error occurred :", e);
    })
  }
  ngOnDestroy(): void {
    this.speechToTextSubs.unsubscribe();
    this.chatGptSubs.unsubscribe();
  }
}
