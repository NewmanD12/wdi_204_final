import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from '../Hooks/Auth'
import axios from "axios"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"



const SingleProject = (props) => {
    const rightNow = Date.now()
    const { projectsUrlEndpoint, userURLEndpoint, userList } = props
    const { id } = useParams()
    const auth = useAuth()
    let todoIssues = []
    let inProgressIssues = []
    const [project, setProject] = useState({})
    const [stage, setStage] = useState('')

    const [newIssue, setNewIssue] = useState('')
    const currentUser = userList.filter((user) => user.email === auth.userEmail)[0]
    const navigate = useNavigate()

    // console.log(props.userList)

    const url = `/dashboard/issue/${project.id}`
    // console.log(auth)



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
        
       

    }


    const handleSubmit = async (e, issue, stage) => {
        e.preventDefault()
        // console.log(`${projectsUrlEndpoint}/add-issue/${id}`)
        console.log(stage)
        axios.put(`${projectsUrlEndpoint}/add-issue/${id}`, {
            text : issue,
            priority : 'high',
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

    const generateForm = (stage) => {
        let form = document.createElement('form')
        let button = document.createElement('button')
        button.value = 'submit'
        button.innerText = 'Submit'
        let creatorIDInput = document.createElement('input')
        creatorIDInput.type = 'hidden'
        creatorIDInput.value = currentUser.id
        let stageInput = document.createElement('input')
        stageInput.type = 'hidden'
        stageInput.value = stage
        let textArea = document.createElement('textarea')
        textArea.id = 'text'
        
        form.appendChild(textArea)
        form.appendChild(button)
        form.appendChild(creatorIDInput)
        form.appendChild(stageInput)
        
        button.addEventListener('click', (e) => {
            e.preventDefault()
            console.log(textArea.value)
            handleSubmit(e, textArea.value, stage)
        })

        console.log(stage)
        let column = document.getElementById(stage)
        column.appendChild(form)
        console.log(form)

    }


    return (
        <Container>
            <Row>
                <Col>
                    <h1>Title: {project.title}</h1>
                </Col>
            </Row>
            <Row className="justify-content-center m-3">

                <Col md={3} id='to-do'>
                    <p>To-Do</p>
                    {todoIssues.map((issue, index) => {
                        return  <div 
                                    key={index}
                                    onClick={(e) => {
                                        navigate(`${url}/${issue.id}`)
                                    }}
                                >
                                    <h6>{issue.text}</h6>
                                </div>
                    })}
                    <p id="to-do-create-new" onClick={(e) => {
                        generateForm('to-do')
                        

                    }}>+ Create New</p>
                </Col>

                <Col md={3} 
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
                        return  <div
                                    key={index}
                                    onClick={(e) => {
                                        navigate(`${url}/${issue.id}`)
                                    }}
                                >
                                    <h6>{issue.text}</h6>
                                </div>
                    })}
                    <p id="in-progress-create-new" onClick={(e) => {
                        generateForm('in-progress')
                    }}>+ Create New</p>
                    <div id="in-progress-div">
                        <textarea id='in-progress-issue'></textarea>
                        <button onSubmit={(e) => {

                        }}>Submit</button>
                    </div>
                </Col>

                <Col md={3} 
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
                    <p id="in-review-create-new" onClick={(e) => {
                        // console.log(e)
                    }}>+ Create New</p>
                </Col>

                <Col md={3} 
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
                    <p id="done-create-new" onClick={(e) => {
                        // console.log(e)
                    }}>+ Create New</p>
                </Col>
            </Row>

        </Container>
    )
}

export default SingleProject