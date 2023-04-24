import React, { useState } from "react";
import './CreateProjectModal.css'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";


const CreateProjectModal = (props) => {

    const { setOpenModal, projectsUrlEndpoint, auth, users } = props

    const showMainBody = () => {
        const body = document.getElementById('main-body')
        body.style.display = 'block'
    }


    const currentUser = users.filter((user) => {return user.email === auth.userEmail})[0]

    const [title, setTitle] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(projectsUrlEndpoint)
        axios.post(`${projectsUrlEndpoint}/create-project`,{
                        title, 
                        "creatorID" : currentUser.id
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
            window.location.reload(false)
        })
    }
 
        return  <div id="modal">
                    <div className="modal-background">
                        <div className="modal-container">
                            <div id="form-container">
                                <Form onSubmit={handleSubmit} id='form'>
                                    <Form.Group className="m-4" controlId="formGroupTitle" id='form-title'>
                                        <Form.Label>Title: </Form.Label>
                                        <Form.Control placeholder="Title" onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}/>
                                    </Form.Group>
                                    
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                    <Button variant="danger" onClick={() => {
                                        setOpenModal(false)
                                        showMainBody()
                                    }}>
                                        Cancel
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
}

export default CreateProjectModal 