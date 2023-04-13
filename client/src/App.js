import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useAuth } from './Hooks/Auth';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Layout from './Layouts/Layout'
import SingleProject from './Pages/SingleProject';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Pages/Dashboard';
import { useEffect, useState } from 'react';
import SingleIssue from './Pages/SingleIssue';

const userURLEndpoint = process.env.REACT_APP_USER_ENDPOINT
const projectsUrlEndpoint = process.env.REACT_APP_PROJECTS_ENDPOINT

// console.log(userURLEndpoint)



function App() {

  const auth = useAuth()
  const [projectList, setProjectList] = useState([])
  const [userList, setUserList] = useState([])

  // console.log(auth)

  useEffect(() => {
    axios.get(`${projectsUrlEndpoint}/all`)
          .then((res) => setProjectList(res.data.projects))
          .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios.get(`${userURLEndpoint}/all`)
          .then((res) => {
            // console.log(userList)
            setUserList(res.data.users)
            // console.log(userList)

          })
          .catch((err) => console.log(err))
  }, [])

  // console.log(projectList)

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
                      projects={projectList}
                      users={userList}
                    />
        },
        {
          path : 'projects/get-one/:id',
          element : <SingleProject 
                      projectsUrlEndpoint={projectsUrlEndpoint}
                      userURLEndpoint={userURLEndpoint}
                      userList={userList}
                    />
        },
        {
          path : 'issue/:projectID/:issueID',
          element : <SingleIssue 
                      projectsUrlEndpoint={projectsUrlEndpoint}
                      projectList={projectList}
                      userList={userList}
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
