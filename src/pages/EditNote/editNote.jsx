import { 
    FolderOutlined, 
    HddOutlined, 
    PlusCircleOutlined 
} from '@ant-design/icons';
import { Layout, Menu, Divider, Form, Input, Button, InputNumber, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


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

function EditNote(){
    const navigate = useNavigate();
    const {register, reset, handleSubmit, formState: {
      isSubmitSuccessful
    } } = useForm();
    const [collapsed, setCollapsed] = useState(false);
    const { id } = useParams()

    useEffect(()=>{
      axios.get(`http://api:8000/notes/${id}/`)
      .then((response) => {
        reset(response.data)
      })
    }, [])
    const add = data => axios.putForm(`http://api:8000/notes/${id}/`, data)
    .then(() => {
        navigate("/")
    })
    const onFinished = (values) => {
        const formData = new FormData();
        formData.append("title", values.title)
        formData.append("content", values.content)
        axios.postForm("http://api:8000/notes/}", formData)
        .then(()=>{
            console.log("Sucesso")
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
            marginTop: '20px'
          }}
        >
          <Card>
            <form onSubmit={
              handleSubmit(add)
            }>
              <input type="text" name="title" {...register("title")} />
              <textarea type="text" name="content" {...register("content")}/>
              <button type="submit">Alterar</button>
            </form>
            </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
  

export default EditNote;