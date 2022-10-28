import { FolderOutlined, HddOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, Divider } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NoteCards from '../../components/Cards/cards';
import AddNote from '../AddNote/addNote';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/">Notas</Link>, '1', <FolderOutlined />, [<AddNote/>]),
  getItem(<Link to="/insert">Adicionar nova nota</Link>, '2', <PlusCircleOutlined />)
  //getItem('Option 2', '2', <DesktopOutlined />),
];

function Home(){
  const [collapsed, setCollapsed] = useState(false);
  const [notes, setNotes] = useState([]);
  useState(() => {
    axios.get('http://api:8000/notes')
    .then((response)=>{
      setNotes(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])
console.log(notes)
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>

      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Divider orientation="left">Notas</Divider>
          <NoteCards data={notes}/>
        </Content>
      </Layout>
    </Layout>
  );
}
  

export default Home;
