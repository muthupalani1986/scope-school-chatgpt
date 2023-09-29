import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoiceRecognitionService } from '../shared/services/voice/voice-recognition.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'workflow-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public emojis = ['😀', '😃'];
  public emojiFlag = false;
  public chatbotForm!: FormGroup;
  public selectionStart = 0;
  public selectionEnd = 0;
  public speechToTextSubs!: Subscription;
  constructor(private _formBuilder: FormBuilder,
    private _voiceRecognitionService: VoiceRecognitionService) {
    this._voiceRecognitionService.init();
  }
  ngOnInit(): void {
    this.chatbotForm = this._formBuilder.group({
      message: ['', [Validators.required]]
    });
    this._voiceRecognitionService.getSppechTotext().subscribe((response) => {
      const existingMessage = this.chatbotForm.get('message')?.value;
      const message = existingMessage +' ' + response;
      this.chatbotForm.patchValue({
        message
      });
    });
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
  ngOnDestroy(): void {
    this.speechToTextSubs.unsubscribe();
  }
}
