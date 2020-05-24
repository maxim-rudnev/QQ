import React, { Component } from 'react';
import { notification } from 'antd';
import { Card, Form, Input, Button } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export class TestManager extends Component{
    constructor(props) {
        super(props);
        this.apiUrl = '/api/question';
        //this.apiUrl = 'https://localhost:44330/api/question';


        this.state = { questions: [] };
        this.loadData = this.loadData.bind(this);

    }

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
                this.openErrorNotification('При получении данных произошла ошибка ' + ex + ' URL:' + methodUrl);
            }
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        try {
            this.loadData();
        }
        catch (ex) {
            this.openErrorNotification(ex);
        }
    }

    openErrorNotification(text) {
        notification['error']({
            message: 'Ошибка',
            description: text,
            placement: 'bottomRight'
        });
    };

    answerOnClick(e) {
        e.target.style.color = 'black';
    }

    render() {

        let questionList = [];

        for (let i in this.state.questions) {
            let answerId = 'answerId' + i;
            let question = this.state.questions[i];
            let questionEl =
                <div>
                    <Card style={{ height: 300 }}>
                        <Input readOnly style={{ textAlign: 'center' }} defaultValue={question.text} />
                        <Input readOnly id={answerId} style={{ marginTop: 10, color: 'white', textAlign:'center' }} defaultValue={question.answer} onClick={this.answerOnClick} />
                     </Card>
                    <p className="legend">Question {i}</p>
                </div>

            questionList.push(questionEl);
        }

        if (questionList.length == 0) {
            return <div></div>;
        } else {
            return <Carousel>
                        {questionList}
                    </Carousel>;
        }        
    }
}