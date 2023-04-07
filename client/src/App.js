import logo from './logo.svg';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Layout from './Layouts/Layout'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Pages/Dashboard';
import { element } from 'prop-types';

const userURLEndpoint = process.env.REACT_APP_USER_ENDPOINT


function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element : <Register 
                  userURLEndpoint={userURLEndpoint}
                />
    },
    {
      path : '/login',
      element : <Login />
    },
    {
      path : '/dashboard',
      element : <Layout />,
      children : [
        {
          index : true,
          element : <Dashboard 
                      userURLEndpoint={userURLEndpoint}
                    />
        }
      ]
    }
  ])

  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
