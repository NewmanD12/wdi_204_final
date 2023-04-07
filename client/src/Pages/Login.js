import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Hooks/Auth'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const auth = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('')
	  const navigate = useNavigate() // be able to navigate to home on login

    return (
        <Container id='welcome-container' fluid='md'>
          <Row className="justify-content-center">
            <h1>Login to view the projects!</h1>
            <p>Need to create an account? <a href="/">Register</a></p>
          </Row>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form id='welcome-form'>
    
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

                {errorMessage && <p id="password-error">{errorMessage}</p>}
    
                <Button 
                  id="login-button"
                  variant="primary" type="submit"
                  onClick={async (e) => {
                    e.preventDefault()
                    const loginResult = await auth.login(email, password)
                    // console.log(loginResult)
                    if(loginResult.success) {
                        navigate('/dashboard')
                    }
                    else{
                        console.log(loginResult)
                        setErrorMessage(loginResult.message)
                    }
                  }}
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
}

export default Login