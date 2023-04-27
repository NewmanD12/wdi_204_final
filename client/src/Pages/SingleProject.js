import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from '../Hooks/Auth'
import axios from "axios"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import IssueCard from "../Components/IssueCard"
import CreateIssueForm from "../Components/CreateIssueForm"
import NavBar from "../Components/NavBar"



const SingleProject = (props) => {
    const { projectsUrlEndpoint, userURLEndpoint, userList } = props
    const { id } = useParams()
    const auth = useAuth()
    let todoIssues = []
    let inProgressIssues = []
    let inReviewIssues = []
    let doneIssues = []
    const [project, setProject] = useState({})
    const [showNav, setShowNav] = useState(false)
    const currentUser = userList.filter((user) => user.email === auth.userEmail)[0]

    // let addingIssue = false

    const [addingIssue, setAddingIssue] = useState(false)

    useEffect(() => {
        axios.get(`${projectsUrlEndpoint}/get-one/${id}`)
                .then((res) => {
                    setProject(res.data.project[0])
                })
                .catch((err) => {
                    console.log('error: ', err)
                })
    }, [])

    if(project.issues){
        todoIssues = project.issues.filter((issue) => {
            return issue.stage === 'to-do'
        })

        inProgressIssues = project.issues.filter((issue) => {
            return issue.stage === 'in-progress'
        })

        inReviewIssues = project.issues.filter((issue) => {
            return issue.stage === 'in-review'
        })

        doneIssues = project.issues.filter((issue) => {
            return issue.stage === 'done'
        })
    }

    const showForm = (stage) => {
        const form = document.getElementById(`${stage}-form`)
        // console.log(form)
        form.style.display = 'block'
    }

    return (
        <Container id="single-project-container">
            <Row>
                <Col>
                    <h1>Project: {project.title}</h1>
                </Col>
            </Row>
            <Row className="justify-content-center m-3">
                <Col    
                    lg={3}    
                    id='to-do'
                    onMouseEnter={(e) => {
                        e.preventDefault()
                        if(!addingIssue){
                            const createNew = document.getElementById('to-do-create-new')
                            createNew.style.display = 'block'
                        }
                    }}
                    onMouseLeave={(e) => {
                        const createNew = document.getElementById('to-do-create-new')
                        createNew.style.display = 'none'
                    }}
                >
                    <p>To-Do</p>
                    {todoIssues.map((issue, index) => {
                        return  <IssueCard 
                                    key={index}
                                    issue={issue}
                                    project={project}
                                    userList={userList}
                                >
                                </IssueCard>
                    })}
                    <p id="to-do-create-new" onClick={(e) => {
                        // console.log(addingIssue)
                        if(!addingIssue){
                            setAddingIssue(true)
                            showForm('to-do')
                        }
                    }}>+ Create New</p>
                    <CreateIssueForm 
                        stage='to-do'
                        projectsUrlEndpoint={projectsUrlEndpoint}
                        project={project}
                        currentUser={currentUser}
                        setAddingIssue={setAddingIssue}
                    />
                </Col>

                <Col 
                    lg={3} 
                    id='in-progress' 
                    onMouseEnter={(e) => {
                        e.preventDefault()
                        const createNew = document.getElementById('in-progress-create-new')
                        createNew.style.display = 'block'
                    }}
                    onMouseLeave={(e) => {
                        const createNew = document.getElementById('in-progress-create-new')
                        createNew.style.display = 'none'
                    }}
                >
                    <p>In Progress</p>
                    {inProgressIssues.map((issue, index) => {
                        return  <IssueCard 
                                    key={index}
                                    issue={issue}
                                    project={project}
                                >
                                </IssueCard>
                    })}
                    <p id="in-progress-create-new" onClick={(e) => {
                        if(!addingIssue){
                            setAddingIssue(true)
                            showForm('in-progress')
                        }
                    }}>+ Create New</p>
                    <CreateIssueForm 
                        stage='in-progress'
                        currentUser={currentUser}
                        projectsUrlEndpoint={projectsUrlEndpoint}
                        project={project}
                        setAddingIssue={setAddingIssue}

                    />
                </Col>

                <Col 
                    lg={3} 
                    id='in-review'
                    onMouseEnter={(e) => {
                        const createNew = document.getElementById('in-review-create-new')
                        createNew.style.display = 'block'
                    }}
                    onMouseLeave={(e) => {
                        const createNew = document.getElementById('in-review-create-new')
                        createNew.style.display = 'none'
                    }}
                >
                    <p>In Review</p>
                    {inReviewIssues.map((issue, index) => {
                        return  <IssueCard 
                                    key={index}
                                    issue={issue}
                                    project={project}
                                >
                                </IssueCard>
                    })}
                    <p id="in-review-create-new" onClick={(e) => {
                        if(!addingIssue){
                            setAddingIssue(true)
                            showForm('in-review')
                        }
                    }}>+ Create New</p>
                    <CreateIssueForm 
                        stage='in-review'
                        currentUser={currentUser}
                        projectsUrlEndpoint={projectsUrlEndpoint}
                        project={project}
                        setAddingIssue={setAddingIssue}
                    />
                </Col>

                <Col 
                    lg={3} 
                    id='done'
                    onMouseEnter={(e) => {
                        const createNew = document.getElementById('done-create-new')
                        createNew.style.display = 'block'
                    }}
                    onMouseLeave={(e) => {
                        const createNew = document.getElementById('done-create-new')
                        createNew.style.display = 'none'
                    }}
                
                >
                    <p>Done</p>
                    {doneIssues.map((issue, index) => {
                        return  <IssueCard 
                                    key={index}
                                    issue={issue}
                                    project={project}
                                >
                                </IssueCard>
                    })}
                    <p id="done-create-new" onClick={(e) => {
                        if(!addingIssue){
                            setAddingIssue(true)
                            showForm('done')
                        }
                    }}>+ Create New</p>
                    <CreateIssueForm 
                        stage='done'
                        currentUser={currentUser}
                        projectsUrlEndpoint={projectsUrlEndpoint}
                        project={project}
                        setAddingIssue={setAddingIssue}
                    />
                </Col>
            </Row>

        </Container>
    )
}

export default SingleProject