import React, { Component } from "react";
import { Table } from 'antd';


export default class QuestionList extends Component {
    static displayName = QuestionList.name;


    

    render() {

        

        return (
            <div>
                <form className='question-add-form' onSubmit={this.props.handleSubmit}>
                    <lable>Вопрос <input type='text' name='text' onChange={this.handleChange} /></lable>
                    <lable>Ответ <input type='text' name='answer' onChange={this.handleChange} /></lable>
                    <div><input className='btn' type='submit' value='Сохранить'  /></div>
                </form>
            </div>);
    }
}