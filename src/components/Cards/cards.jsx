import { Card, Col, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React from 'react';
import './cards.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
const style = { background: '#00', padding: '8px 0' };

function NoteCards(props){
    const t = 8
    return(
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {props.data.map((note)=>
                    <Col className="gutter-row" span={t}>
                        <div style={style}>
                            <Card title={note.title} bordered={true} 
                                actions={[
                                    <Link to={`/edit/${note.id}`}>
                                        <EditOutlined key="ellipsis" />
                                    </Link>,
                                    <Link onClick={() => {axios.delete(`http://api:8000/notes/${note.id}/`)}} reloadDocument>
                                        <DeleteOutlined key='dell'/>
                                    </Link>
                                  ]}
                            
                            >
                                    <p>{note.content}</p>
                                
                            </Card>
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    )

        
}
  

export default NoteCards;
/*

        */