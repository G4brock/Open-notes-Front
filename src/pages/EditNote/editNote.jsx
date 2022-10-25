import { 
    FolderOutlined, 
    HddOutlined, 
    PlusCircleOutlined 
} from '@ant-design/icons';
import { Layout, Menu, Divider, Form, Input, Button, InputNumber, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


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
    const {register, reset, handleSubmit, formState: {
      isSubmitSuccessful
    } } = useForm();
    const [collapsed, setCollapsed] = useState(false);
    const { id } = useParams()

    useEffect(()=>{
      axios.get(`http://127.0.0.1:5000/${id}`)
      .then((response) => {
        reset(response.data)
      })
    }, [])
    const add = data => axios.putForm(`http://127.0.0.1:5000/${id}`, data)
    const onFinished = (values) => {
        const formData = new FormData();
        formData.append("title", values.title)
        formData.append("content", values.content)
        axios.postForm("http://127.0.0.1:5000/insertDoc", formData)
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