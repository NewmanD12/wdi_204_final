import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button"
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios"



const AddReplyForm = (props) => {

    const { currentUser, comment, project, projectsUrlEndpoint, issue } = props

    // console.log(comment)
    const replyCommentID = `comment-reply-${comment.id}`

    const replyText = `reply-text-${comment.id}`

    const hideReplyForm = () => {
        const form = document.getElementById(`comment-reply-${comment.id}`)
        form.style.display = 'none'
    }


    const handleReplySubmit = (e) => {
        e.preventDefault()
        const reply = document.getElementById(replyText).value
        console.log(reply)
        axios.put(`${projectsUrlEndpoint}/add-reply/${project.id}/${issue.id}/${comment.id}`, {
            text : reply,
            creatorID : currentUser.id
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
            window.location.reload(false)
        })

    }

    return <Container id={replyCommentID} className='reply-form' fluid>
                <Row className='justify-content-center'>
                    <Col lg={12}>
                        <Form onSubmit={handleReplySubmit}>
                            <InputGroup>
                                <Form.Control as="textarea"
                                id={replyText}/>
                            </InputGroup> 
                            <div id='lower-reply-buttons'>
                                <Button 
                                    variant='success'
                                    id='reply-submit-button'
                                    type='submit'
                                >
                                    Submit
                                </Button>
                                <Button 
                                    variant='warning'
                                    onClick={(e) => {
                                        hideReplyForm()
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>  
                        </Form>
                    </Col>
                </Row>
            </Container>
}

export default AddReplyForm