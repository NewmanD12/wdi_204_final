import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from "axios"




const AddCommentForm = (props) => {

    const { setIsCommenting, projectsUrlEndpoint, project, issue, currentUser} = props


    const handleSubmit = (e) => {
        e.preventDefault()
        const comment = document.getElementById('comment-text').value
        console.log(comment)
        axios.put(`${projectsUrlEndpoint}/add-comment/${project.id}/${issue.id}`, {
            text : comment,
            creatorID : currentUser.id
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
            window.location.reload(false)
        })
    }



    return  <Container id='comment-form-wrapper' fluid>
                <Row className='justify-content-center'>
                    <Col lg={12}>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup>
                                <Form.Control as="textarea"
                                id='comment-text'/>
                            </InputGroup> 
                            <div id='lower-buttons'>
                                <Button 
                                    variant='success'
                                    id='comment-submit-button'
                                    type='submit'
                                >
                                    Submit
                                </Button>
                                <Button 
                                    variant='warning'
                                    onClick={(e) => {
                                        setIsCommenting(false)
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

export default AddCommentForm