import React, { Component } from 'react';
import QuestionAddForm from './QuestionAddForm.js';

export class QuestionManager extends Component {
  static displayName = QuestionManager.name;

  render () {
      return (<QuestionAddForm apiUrl = '/api/question' />);
  }
}
