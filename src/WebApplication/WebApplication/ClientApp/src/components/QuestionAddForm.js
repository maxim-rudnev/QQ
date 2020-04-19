import React, { Component } from "react";


export default class QuestionAddForm extends Component {
    static displayName = QuestionAddForm.name;

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            answer: '',
            questions: []
        };

        

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        try{            
            this.loadData();
        }
        catch (ex){
            console.log(ex);
        }
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ questions: data });
        }.bind(this);
        xhr.send();
    }

    handleSubmit(e) {
        e.preventDefault();

        let question = this.state;

        const data = new FormData();
        data.append("text", question.text);
        data.append("answer", question.answer);

        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.apiUrl, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                this.loadData();
            }
        }.bind(this);

        xhr.send(data);

    }

    handleChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;

        this.setState(newState);
    }

    render() {

        const questions = [];
        for (let i in this.state.questions) {
            let q = this.state.questions[i];

            questions.push(<div><span>{q.id}</span><span>{q.text}</span><span>{q.answer}</span></div>);
        }

        return [
            <div>
                <form className='question-add-form' onSubmit={this.handleSubmit}>
                    <lable>Вопрос <input type='text' name='text' onChange={this.handleChange} /></lable>
                    <lable>Ответ <input type='text' name='answer' onChange={this.handleChange} /></lable>
                    <div><input className='btn' type='submit' value='Сохранить' onChange={this.handleChange} /></div>
                </form>
            </div>,
            questions
        ];
    }
}