import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoiceRecognitionService } from '../shared/services/voice/voice-recognition.service';
import { Subscriber, Subscription } from 'rxjs';
import { Message } from './interfaces/message.interface';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { LocalStorageService } from '../shared/services/storage/local-storage.service';

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
  public animal!: string;
  public storageKeyName!: string;

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  constructor(private _formBuilder: FormBuilder,
    private _voiceRecognitionService: VoiceRecognitionService,
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService) {
    this._voiceRecognitionService.init();
  }
  ngOnInit(): void {
    this.storageKeyName = moment().format('YYYY-MM-DD');
    this.messages = JSON.parse(this._localStorageService.getItem(this.storageKeyName)) || [];
    this.messages = [...this.messages, { "message": "This is bot message", "messageType": "bot" }];
    this.animal = this._activatedRoute.snapshot.queryParamMap.get('animal') || 'cat';
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
    this.scrollToBottom();
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
        messageType: 'user',
        message: this.chatbotForm.get('message')?.value
      }
      this.messages.push(message);
      this._localStorageService.setItem(this.storageKeyName, JSON.stringify(this.messages));
      this.chatbotForm.reset();
    }

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
  ngOnDestroy(): void {
    this.speechToTextSubs.unsubscribe();
  }
}
