import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  submitFeedback(feedback: any): void {
    
    console.log('Feedback submitted:', feedback);

    
    let feedbackList = JSON.parse(localStorage.getItem('feedbackList') || '[]');
    feedbackList.push(feedback);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
  }

  getFeedback(): any[] {
    return JSON.parse(localStorage.getItem('feedbackList') || '[]');
  }
}
