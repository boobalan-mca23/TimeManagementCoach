import './App.css'; // Make sure to create this file
import Home from './components/Home/Home';
import DashBoard from './components/TaskDashBoard/TaskDashBoard';
import NavComponent from './components/Nav/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavComponent></NavComponent>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />}></Route>
          {/* <Route path='/dashBoard' element={<DashBoard/>}></Route> */}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>


    </>
  );
}

export default App;
