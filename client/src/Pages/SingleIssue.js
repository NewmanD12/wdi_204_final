import axios from "axios"
import { useAuth } from "../Hooks/Auth"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { useParams } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import CommentCard from "../Components/CommentCard"





const SingleIssue = (props) => {

    const { projectID, issueID} = useParams()
    const { projectsUrlEndpoint, projectList, userList} = props
    const [activityState, setActivityState] = useState('comments')
    const auth = useAuth()
    const currentUser = userList.filter((user) => user.email === auth.userEmail)[0]

    let isAdmin = false

    const project = projectList.filter((project) => project.id === projectID)[0]
    let issue = {}


    if(project){
        issue = project.issues.filter((issue) => issue.id === issueID)[0]
    }
    console.log(issue)
    if(project && currentUser){
        if(project.adminIds.includes(currentUser.id)){
            isAdmin = true
        }
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        const comment = document.getElementById('commentText').value
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

    const UserDropdown = () => {
        
        return (
            <select id="user-select">
                <option value='user'>User</option>
                {userList.map((user, index) => {
                    return  <option 
                                key={index} 
                                value={user.id}
                            >
                                {user.firstName[0].toUpperCase()}{user.firstName.slice(1, user.firstName.length)} {user.lastName[0].toUpperCase()}
                            </option>
                })}
            </select>
        )
    }

    const showUserOptions = () => {
        const addAssigneePrompt = document.getElementById('add-assignee')
        const userDropdown = document.getElementById('user-dropdown')
        addAssigneePrompt.style.display = 'none'
        userDropdown.style.display = 'block'
    }

    const submitAssignee = () => {
        const assigneeID = document.getElementById('user-select').value
        console.log(assigneeID)
        console.log('project ID: ', project.id)
        console.log('issue ID: ', issue.id)
        // axios.put(`${projectsUrlEndpoint}/add-assignee/${project.id}/${issue.id}`,{
        //     assigneeID : assigneeID
        // })
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err))
        // .finally(() => {
        //     window.location.reload(false)
        // })

    }

    const IssueBody = () => {
        return  <Container >
                    <Row>
                        <Col md={6} id='issue-body'>
                            <h1>{issue.text}</h1>
                            <h3>Description</h3>
                            <p>Add a description...</p>
                            <h3>Activity</h3>
                            <h6>Show: 
                                <span id="all" onClick={(e) =>{
                                    setActivityState('all')
                                }}>All</span>
                                <span id='comments' onClick={(e) => {
                                    setActivityState('comments')
                                }}>Comments</span>
                                <span id="history" onClick={(e) => {
                                    setActivityState('history')
                                }}>History</span>
                            </h6>
                            <div id="activity-info">
                                {activityState === 'comments' && issue.comments && (
                                    <div>
                                        <p id="addCommentButton" onClick={(e) => {
                                            addCommentField()
                                        }}>+ Add Comment</p>

                                        {issue.comments.map((comment, index) => {
                                            return  <CommentCard 
                                                        key={index} 
                                                        comment={comment} 
                                                        currentUser={currentUser}
                                                        projectsUrlEndpoint={projectsUrlEndpoint}
                                                        issue={issue}
                                                        project={project}
                                                    />
                                        })}
                                    </div>
                                )}
                                {activityState === 'history' && issue.history && (
                                    <div>
                                        {issue.history.map((history, index) => {
                                            return <p key={index}>{history.statement} {history.createdAt}</p>
                                        })}
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col md={6} id='details'>
                            <h2>Details: </h2> 
                            <div >
                                <p>Priority: {issue.priority}</p>
                                <p>Stage: {issue.stage}</p>
                                
                                <p>Assignee:{isAdmin &&<span id="add-assignee" onClick={(e) => {
                                    showUserOptions()
                                }}>Click here to add assignee</span>}<span id="user-dropdown"><UserDropdown /><button onClick={submitAssignee}>Save</button></span>
                                </p>
                            </div>  
                        </Col>
                    </Row>
                    
                </Container>

    }

    return (
        <Container fluid>
            <IssueBody />
        </Container>
    )
}

export default SingleIssue