import axios from "axios"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { useParams } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"





const SingleIssue = (props) => {

    const { projectID, issueID} = useParams()
    const { projectsUrlEndpoint } = props
    const [issue, setIssue] = useState({})

    console.log(issue)



    useEffect(() => {
        axios.get(`${projectsUrlEndpoint}/get-issue/${projectID}/${issueID}`)
                .then(res => setIssue(res.data.issue))
                .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{issue.text}</h1>
                </Col>
            </Row>

        
        </Container>
    )
}

export default SingleIssue