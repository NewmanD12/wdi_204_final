import axios from "axios"
import { useAuth } from "../Hooks/Auth"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { useParams } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"





const SingleIssue = (props) => {

    const { projectID, issueID} = useParams()
    const { projectsUrlEndpoint, projectList, userList} = props
    const [activityState, setActivityState] = useState('comments')
    const auth = useAuth()
    const currentUser = userList.filter((user) => user.email === auth.userEmail)[0]


    const project = projectList.filter((project) => project.id === projectID)[0]
    let issue = {}
    if(project){
        issue = project.issues.filter((issue) => issue.id === issueID)[0]
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        console.log('adding comment')
        const comment = document.getElementById('commentText').value
        console.log(comment)
        console.log(`${projectsUrlEndpoint}/add-comment/${project.id}/${issue.id}`)
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

    const addCommentField = () => {
        let col = document.getElementById('activity-info')
        let addButton = document.getElementById("addCommentButton")
        addButton.style.display = 'none'
        let form = document.createElement("form")
        let saveButton = document.createElement('button')
        saveButton.value = 'submit'
        saveButton.innerText = 'Save'
        saveButton.addEventListener('click', (e) => {
            handleCommentSubmit(e)
        })
        let cancelButton = document.createElement('button')
        cancelButton.innerText = 'Cancel'
        let commentArea = document.createElement('textarea')
        commentArea.id = 'commentText'
        let creatorIDInput = document.createElement('input')
        creatorIDInput.type = 'hidden'
        creatorIDInput.value = currentUser.id

        form.appendChild(commentArea)
        form.appendChild(saveButton)
        form.appendChild(cancelButton)
        form.appendChild(creatorIDInput)
        col.appendChild(form)
        // console.log('adding new comment')
    }


    // console.log(issue.history)

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{issue.text}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Description</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Add a description...</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Activity</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>Show: 
                        <span id="all" onClick={(e) =>{
                            setActivityState('all')
                        }}>All</span>
                        <span id='comments' onClick={(e) => {
                            setActivityState('comments')
                        }}>Comments</span>
                        <span id="history" onClick={(e) => {
                            setActivityState('history')
                        }}>History</span></h6>
                </Col>
            </Row>
            <Row>
                <Col id="activity-info">
                    {activityState === 'comments' && issue.comments && (
                        <div>
                            {issue.comments.map((comment, index) => {
                                return <p key={index}>{comment.text}</p>
                            })}
                            
                            <p id="addCommentButton" onClick={(e) => {
                                addCommentField()
                            }}>+ Add Comment</p>
                        </div>
                    )}
                    {activityState === 'history' && issue.history && (
                        <div>
                            {issue.history.map((history, index) => {
                                return <p key={index}>{history.statement} {history.createdAt}</p>
                            })}
                        </div>
                    )}
                </Col>
            </Row>

        
        </Container>
    )
}

export default SingleIssue