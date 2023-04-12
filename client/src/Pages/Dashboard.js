import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios';
import { useAuth } from '../Hooks/Auth'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ProjectTable from '../Components/ProjectsTable';


const Dashboard = (props) => {
    
    
    const navigate = useNavigate()
    const { userURLEndpoint, projects, users } = props

    // console.log(users)

    const auth = useAuth()
    const firstName = auth.userFirstName
    console.log(projects)
    


    return (
        <div>
            <Container>

                <h1>Hello {firstName}</h1>

                <ProjectTable 
                    projects={projects}
                    users={users}
                />


            </Container>
            
        </div>
    )
}

export default Dashboard