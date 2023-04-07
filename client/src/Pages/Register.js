import { useEffect, useState } from "react"
import { useAuth } from "../Hooks/Auth"
import { useNavigate } from "react-router"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";





const Register = (props) => {

    const { userURLEndpoint } = props
    console.log(userURLEndpoint)

    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const registerResult = await auth.register(firstName, lastName,email, password)
        if(registerResult.success){
          auth.login(email, password)
          navigate('/dashboard')
        }
      }

    return (
        <Container id='welcome-container' fluid='md'>
          <Row className="justify-content-center">
            <h1>Welcome to my Jira Clone!</h1>
            <h3>Register to view all projects</h3>
            <p>Already a member? <a href="/login">Log in</a></p>
          </Row>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form id='welcome-form'>
    
                <Form.Group className="md-3">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control type="text" placeholder="Enter your first name" onChange={(e) => {
                    setFirstName(e.target.value)
                  }}></Form.Control>
                </Form.Group>

                <Form.Group className="md-3">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control type="text" placeholder="Enter your last name" onChange={(e) => {
                    setLastName(e.target.value)
                  }}></Form.Control>
                </Form.Group>

                <Form.Group className="md-3">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control type="text" placeholder="Enter your email" onChange={(e) => {
                    setEmail(e.target.value)
                  }}></Form.Control>
                </Form.Group>
    
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" onChange={(e) => {
                    setPassword(e.target.value)
                  }}></Form.Control>
                </Form.Group>
    
                <Button 
                  id="register-button"
                  variant="primary" type="submit"
                  onClick={(e) => {
                        handleSubmit(e)
                      }
                    }
                >
                  Register
                </Button>
    
              </Form>
            </Col>
          </Row>
        </Container>
      );
}

export default Register