import axios from "axios"
import { useAuth } from "../Hooks/Auth"
import { useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { useParams } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import CommentCard from "../Components/CommentCard"
import AddCommentForm from "../Components/AddCommentForm"

import './SingleIssue.css'





const SingleIssue = (props) => {

    const { projectID, issueID} = useParams()
    const { projectsUrlEndpoint, projectList, userList} = props
    const [activityState, setActivityState] = useState('comments')
    const auth = useAuth()
    const currentUser = userList.filter((user) => user.email === auth.userEmail)[0]

    let isAdmin = false
    let hasAssignee = false
    const [isCommenting, setIsCommenting] = useState(false)
    
    const project = projectList.filter((project) => project.id === projectID)[0]
    let issue = {}
    let assignee = {}

    const findAssignee = (id) => {
        const assignee = userList.filter((user) => {
            return user.id === id
        })[0]
        return assignee.firstName[0].toUpperCase() + assignee.firstName.slice(1, assignee.firstName.length) + ' ' + assignee.lastName[0].toUpperCase()
    }

    if(project){
        issue = project.issues.filter((issue) => issue.id === issueID)[0]
    }
    // console.log(issue)
    if(project && currentUser){
        if(project.adminIds.includes(currentUser.id)){
            isAdmin = true
        }
        if(issue.assigneeID){
            hasAssignee = true
            assignee = findAssignee(issue.assigneeID)
        }
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
        axios.put(`${projectsUrlEndpoint}/add-assignee/${project.id}/${issue.id}`,{
            assigneeID : assigneeID
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
            window.location.reload(false)
        })

    }

    const IssueBody = () => {
        return  <Container className="single-issue-body">
                    <Row>
                        <Col md={6} id='issue-body'>
                            <h1>{issue.text}</h1>
                            <h5>Description</h5>
                            <p>Add a description...</p>
                            <h5>Activity</h5>
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
                                        {issue.comments.map((comment, index) => {
                                            return  <CommentCard 
                                                        key={index} 
                                                        comment={comment} 
                                                        currentUser={currentUser}
                                                        projectsUrlEndpoint={projectsUrlEndpoint}
                                                        issue={issue}
                                                        project={project}
                                                        userList={userList}
                                                    />
                                        })}
                                        {isCommenting &&    <AddCommentForm 
                                            setIsCommenting={setIsCommenting}
                                            projectsUrlEndpoint={projectsUrlEndpoint}
                                            project={project}
                                            issue={issue}
                                            currentUser={currentUser}
                                        />}
                                        <p id="addCommentButton" onClick={(e) => {
                                            setIsCommenting(true)
                                            console.log('clicked')
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
                            </div>
                        </Col>
                        <Col md={6} id='details'>
                            <h5>Details: </h5> 
                            <div >
                                <p>Priority: {issue.priority}</p>
                                <p>Stage: {issue.stage}</p>
                                
                                <p>Assignee: {isAdmin && !hasAssignee &&<span id="add-assignee" onClick={(e) => {
                                    showUserOptions()
                                }}>Click here to add assignee</span>}<span id="user-dropdown"><UserDropdown /><button onClick={submitAssignee}>Save</button></span>
                                {isAdmin && hasAssignee &&<span>{assignee}</span>}
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