import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from '../Hooks/Auth'
import axios from "axios"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"



const SingleProject = (props) => {
    
    const { projectsUrlEndpoint, userURLEndpoint, userList } = props
    const { id } = useParams()
    const auth = useAuth()
    let todoIssues = []
    const [project, setProject] = useState({})
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const issue = document.getElementById('text').value
        console.log(`${projectsUrlEndpoint}/add-issue/${id}`)
        axios.put(`${projectsUrlEndpoint}/add-issue/${id}`, {
            text : issue,
            priority : 'high',
            creatorID : currentUser.id
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err.toString()))
        .finally(() => {
            window.location.reload(false)
        })
    }

    const addNewIssue = (e) => {
        let col = document.getElementById('todo-col')
        let form = document.createElement("form")
        let button = document.createElement('button')
        button.value = 'submit'
        button.innerText = 'Submit'
        let creatorIDInput = document.createElement('input')
        creatorIDInput.type = 'hidden'
        creatorIDInput.value = currentUser.id

        console.log(creatorIDInput)
        let textArea = document.createElement('textarea')
        textArea.id = 'text'
        
        // console.log(textArea)
        button.addEventListener('click', (e) => {
            handleSubmit(e)
        })

        form.appendChild(textArea)
        form.appendChild(button)
        col.appendChild(form)
        console.log(col)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Title: {project.title}</h1>
                </Col>
            </Row>
            <Row className="justify-content-center m-3">
                <Col md={3} id='todo-col'>
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
                    <p onClick={(e) => {
                        // console.log('add new')
                        addNewIssue()
                    }}>+ Create New</p>

                </Col>
                <Col md={3}>
                    <p>In Progress</p>
                </Col>
                <Col md={3}>
                    <p>In Review</p>
                </Col>
                <Col md={3}>
                    <p>Done</p>
                </Col>
            </Row>

        </Container>
    )
}

export default SingleProject