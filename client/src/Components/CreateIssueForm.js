import { useState } from 'react'
import axios from "axios"

import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'

const CreateIssueForm = (props) => {

    const { stage, currentUser, projectsUrlEndpoint, project, setAddingIssue } = props

    // console.log(currentUser.id, projectsUrlEndpoint)

    const [issue, setIssue] = useState('')
    const [priority, setPriority] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`${projectsUrlEndpoint}/add-issue/${project.id}`, {
            text : issue,
            priority,
            creatorID : currentUser.id,
            stage : stage,
            createdAt : Date.now()
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err.toString()))
        .finally(() => {
            window.location.reload(false)
        })

    }

    const id = `${stage}-form`

    const hideForm = (id) => {
        const form = document.getElementById(id)
        form.style.display = 'none'
    }
    
    return(
        <div id={id}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-4'>
                    <Form.Label>Issue: </Form.Label>
                    <Form.Control 
                        placeholder='Please enter a new issue'
                        onChange={(e) => {
                            setIssue(e.target.value)
                        }}
                    />
                </Form.Group>

                <Form.Group className='m-4'>
                    <Form.Label>Priority: </Form.Label>
                    <Form.Select onChange={(e) => {
                        setPriority(e.target.value)
                    }}>
                        <option>Select One</option>
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                    </Form.Select>
                </Form.Group>
                
                <Button variant='success' onClick={(e) => {
                    handleSubmit(e)
                }}>Save</Button>
                <Button 
                    variant='danger'
                    onClick={(e) => {
                        setAddingIssue(false)
                        hideForm(id)
                    }}
                >Cancel</Button>
            </Form>
        </div>
    )
}

export default CreateIssueForm