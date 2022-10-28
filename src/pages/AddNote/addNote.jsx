import { 
    FolderOutlined, 
    HddOutlined, 
    PlusCircleOutlined 
} from '@ant-design/icons';
import { Layout, Menu, Divider, Form, Input, Button, InputNumber, Card } from 'antd';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
    getItem(<Link to="/">Notas</Link>, '1', <FolderOutlined />),
    getItem(<Link to="/insert">Adicionar nova nota</Link>, '2', <PlusCircleOutlined />)
    //getItem('Option 2', '2', <DesktopOutlined />),
  ];

const finished = (values) => {
    axios.postForm("http://api:8000/notes/", values)
    
}
function AddNote(){
    const navigate = useNavigate();
    const {register, handleSubmit } = useForm();
     const [collapsed, setCollapsed] = useState(false);
  
    const onFinished = (values) => {
        const formData = new FormData();
        formData.append("title", values.title)
        formData.append("content", values.content)
        axios.postForm("http://api:8000/notes/", formData)
        .then(()=>{
            console.log("Sucesso")
            navigate(`/`);
        })
    }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
            marginTop: '20px'
          }}
        >
            <Card>
            <Form onFinish={onFinished} >
                <Form.Item  name={"title"} {...register('title')} >
                <Input placeholder='Título' />
            </Form.Item>
            <Form.Item name={"content"} {...register('content')}>
                <Input.TextArea placeholder='Conteúdo' name={"content"} {...register('content')}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Criar Nota
                </Button>
            </Form.Item>
            </Form>
            </Card>

        </Content>
      </Layout>
    </Layout>
  );
}
  

export default AddNote;