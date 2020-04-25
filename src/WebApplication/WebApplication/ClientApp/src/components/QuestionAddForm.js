import React, { Component } from "react";
import { notification } from 'antd';
import { Card, Form, Input, Button } from 'antd';


export default class QuestionAddForm extends Component {
    static displayName = QuestionAddForm.name;

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            answer: ''
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }
    

    handleChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;

        this.setState(newState);
    }

    handleFinish(e) {

        if (e.text && e.answer) {
            try {
                this.props.handleAddQuestion(e);
                this.setState({
                    text: '',
                    answer: ''
                });
            }
            catch (ex) {
                this.openErrorNotification(ex);
            }
        }
        else {
            this.openErrorNotification('Заполните текст вопроса и вопрос');
        }

        this.formRef.current.resetFields();
    }

    handleSubmit(e) {
        console.log(e);
        e.preventDefault();

        if (this.state.text && this.state.answer) {
            try {
                this.props.handleAddQuestion(this.state);
                this.setState({
                    text: '',
                    answer: ''
                });
            }
            catch (ex) {
                this.openErrorNotification(ex);
            }
        }
        else {
            this.openErrorNotification('Заполните текст вопроса и вопрос');
        }
    }

    openErrorNotification(text) {
        notification['error']({
            message: 'Ошибка',
            description: text,
            placement: 'bottomRight'
        });
    };

    render() {

        const layout = {
            labelCol: { span: 1 },
            wrapperCol: { span: 8 },
        };

        const validateMessages = {
            required: 'Поле ${label} должно быть заполнено!',
            
        };

        return (
            <Card title="Создание вопроса"  >
                <Form ref={this.formRef} onFinish={this.handleFinish} onSubmit={this.handleSubmit} {...layout} name="nest-messages" validateMessages={validateMessages}>
                    <Form.Item name={'text'} label="Вопрос" rules={[{ required: true }]}>
                        <Input placeholder='Введите текст вопроса' />
                    </Form.Item>
                    <Form.Item name={'answer'} label="Ответ" rules={[{ required: true }]}>
                        <Input.TextArea placeholder='Введите текст ответа' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                        <Button type="primary" htmlType="submit">
                            Добавить
                            </Button>
                    </Form.Item>
                </Form>
            </Card>
            );
    }
}