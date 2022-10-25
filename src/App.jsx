import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddNote from './pages/AddNote/addNote';
import EditNote from './pages/EditNote/editNote';
import Home from './pages/Home/home';

function App() {
  return (
      <Router>
      <Routes>
          <Route exact path={'/'} element={<Home />}/>
          <Route path={'/insert'} element={<AddNote/>}/>
          <Route path={'/edit/:id'} element={<EditNote/>}/>
      </Routes>
    </Router>
  )
}

export default App
