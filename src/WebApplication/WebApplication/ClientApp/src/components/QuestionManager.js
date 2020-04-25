import React, { Component } from 'react';
import { notification } from 'antd';
import QuestionAddForm from './QuestionAddForm.js';
import QuestionList from './QuestionList.js';



export class QuestionManager extends Component {
    static displayName = QuestionManager.name;

    constructor(props) {
        super(props);

        this.apiUrl = '/api/question';
        //this.apiUrl = 'https://localhost:44330/api/question';

        this.state = { questions: [] };

        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        try {
            this.loadData();
        }
        catch (ex) {
            this.openErrorNotification(ex);
        }
    }

    openErrorNotification(text)
    {
        notification['error']({
            message: 'Ошибка',
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
                this.openErrorNotification( 'При получении данных произошла ошибка ' + ex + ' URL:' + methodUrl);
            }
        }.bind(this);
        xhr.send();
    }

    handleAddQuestion(question) {
        let methodUrl = this.apiUrl;

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
                this.openErrorNotification('Ошибка соединения ' + xhr.status + ' URL:' + methodUrl);
            }
        }.bind(this);

        xhr.send(data);
    }

    handleDeleteQuestion(id) {
        if (id) {
            var methodUrl = this.apiUrl + "/" + id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", methodUrl, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
                else {
                    this.openErrorNotification('Ошибка соединения ' + xhr.status + ' URL:' + methodUrl);
                }
            }.bind(this);
            xhr.send();
        }
    }

    render () {

        return [<QuestionAddForm handleAddQuestion={this.handleAddQuestion}  />,
                <QuestionList data={this.state.questions} handleDeleteQuestion={this.handleDeleteQuestion} />];
    }
}
