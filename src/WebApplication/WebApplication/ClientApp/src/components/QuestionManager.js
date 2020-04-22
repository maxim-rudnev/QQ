import React, { Component } from 'react';
import { notification } from 'antd';
import QuestionAddForm from './QuestionAddForm.js';



export class QuestionManager extends Component {
    static displayName = QuestionManager.name;

    

    constructor() {
        super();

        this.apiUrl = '/api/question';
        //this.apiUrl = 'https://localhost:44330/api/question';

        this.state = { questions: [] };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        try {
            this.loadData();
        }
        catch (ex) {
            console.log(ex);
        }
    }

    openErrorNotificationWithIcon(type, title, text)
    {
        notification[type]({
            message: title,
            description: text,
            placement: 'bottomRight'
        });
    };

    loadData() {
        let methodUrl = this.apiUrl;

        var xhr = new XMLHttpRequest();
        xhr.open("get", methodUrl, true);
        xhr.onload = function () {
            try {
                var data = JSON.parse(xhr.responseText);
                this.setState({ questions: data });
            }
            catch (ex) {
                this.openErrorNotificationWithIcon('error','Connection error', 'При получении данных произошла ошибка ' + ex + ' URL:' + methodUrl);
            }
        }.bind(this);
        xhr.send();
    }

    handleSubmit(e) {
        let methodUrl = this.apiUrl;

        e.preventDefault();



        let question = this.state;

        const data = new FormData();
        data.append("text", question.text);
        data.append("answer", question.answer);

        var xhr = new XMLHttpRequest();
        xhr.open("post", methodUrl, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                this.loadData();
            }
            else {
                this.openErrorNotificationWithIcon('error', 'Connection error', '');
            }
        }.bind(this);

        xhr.send(data);

    }

    render () {

        const questions = [];
        for (let i in this.state.questions) {
            let q = this.state.questions[i];

            questions.push(<div><span>{q.id}</span><span>{q.text}</span><span>{q.answer}</span></div>);
        }
        

        return [<QuestionAddForm handleSubmit={this.handleSubmit} />, questions];
    }
}
