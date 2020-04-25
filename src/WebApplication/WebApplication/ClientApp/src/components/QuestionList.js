import React, { Component } from "react";
import { Card, Table, Button } from 'antd';


export default class QuestionList extends Component {
    static displayName = QuestionList.name;

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(id) {
        const handleDeleteQuestion = this.props.handleDeleteQuestion;

        handleDeleteQuestion(id);
    }

    render() {

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                width: 150,
            },
            {
                title: 'Вопрос',
                dataIndex: 'text',
                width: 150,
            },
            {
                title: 'Ответ',
                dataIndex: 'answer',
            },
            {
                title: 'Удалить',
                key: 'action',
                width: 360,
                render: (text, record) => (<span>
                    <Button type='primary' onClick={() => this.handleDelete(record.id)}>Удалить</Button>
                </span>
                ),
            }
        ];
        

        return (
            <Card title='Существующие вопросы'>
                <Table columns={columns} dataSource={this.props.data} pagination={{ pageSize: 50 }} />
            </Card>
            );
    }
}