import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


const IssueCard = (props) => {
    const { issue, project } = props
    const url = `/dashboard/issue/${project.id}`
    // console.log(project)

    // console.log(issue)

    const navigate = useNavigate()

    return (
        <Container className='single-issue' onClick={(e) => {
            navigate(`${url}/${issue.id}`)
        }}>
            <Row>
                <Col>
                    <p>{issue.text}</p>
                    {issue.assigneeID && <p>Assignee: </p>}
                    
                </Col>
            </Row>
            
        </Container>
    )
}

export default IssueCard