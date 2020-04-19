import React, { Component } from 'react';
import QuestionAddForm from './QuestionAddForm.js';

export class QuestionManager extends Component {
  static displayName = QuestionManager.name;

  render () {
      //let apiUrl = 'https://localhost:44330/api/question';
      let apiUrl = '/api/question';

      return (<QuestionAddForm apiUrl = {apiUrl} />);
  }
}
