import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useAuth } from '../Hooks/Auth'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


const Dashboard = (props) => {
    

    
    const navigate = useNavigate()
    const { userURLEndpoint } = props
    const auth = useAuth()
    console.log(auth)

    

    // console.log(auth)
    // console.log(userURLEndpoint)
    // console.log(props)

    return (
        <div>
            <Container>

                <h1>Dashboard</h1>

            </Container>
            
        </div>
    )
}

export default Dashboard