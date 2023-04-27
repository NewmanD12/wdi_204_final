import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios';
import { useAuth } from '../Hooks/Auth'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ProjectTable from '../Components/ProjectsTable';
import CreateProjectModal from '../Components/CreateProjectModal';


const Dashboard = (props) => {
    
    
    const navigate = useNavigate()
    const { userURLEndpoint, projectsUrlEndpoint, projects, users } = props
    const auth = useAuth()
    const firstName = auth.userFirstName
    
    const [openModal, setOpenModal] = useState(false)

    const hideMainBody = () => {
        const body = document.getElementById('main-body')
        body.style.display = 'none'
    }

    return (
        <div id='table-container'>
            <Container>
                <div id='main-body'>
                    <h1>Hello {firstName}</h1>

                    <ProjectTable 
                        projects={projects}
                        users={users}
                    />

                    <p onClick={() => {
                        setOpenModal(true)
                        hideMainBody()
                    }}>
                        + Create New Project
                    </p>
                </div>
                {openModal &&   <CreateProjectModal
                                    setOpenModal={setOpenModal}
                                    projectsUrlEndpoint={projectsUrlEndpoint}
                                    auth={auth}
                                    users={users}
                                />}


            </Container>
            
        </div>
    )
}

export default Dashboard