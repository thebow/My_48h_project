import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position = "top-center" />
        <Routes>
          <Route exact path="/" element = {<Login/>} />
          <Route exact path="/home" element = {<Home/>} />
          <Route exact path="/addContact" element = {<AddEdit/>} />
          <Route exact path="/update/:id" element = {<AddEdit/>} />
          <Route exact path="/view/:id" element = {<View/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



