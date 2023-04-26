import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


const IssueCard = (props) => {
    const { issue, project, userList } = props
    const url = `/dashboard/issue/${project.id}`


    
    const findAssignee = (id) => {

        try{
            const assignee = userList.filter((user) => {
                return user.id === id
            })[0]
            // console.log(assignee)
            return assignee.firstName[0].toUpperCase() + assignee.firstName.slice(1, assignee.firstName.length) + ' ' + assignee.lastName[0].toUpperCase()

        }
        catch (e) {
            console.log(e)
        }
        // console.log(id)
        
    }

    const navigate = useNavigate()

    return (
        <Container className='single-issue' onClick={(e) => {
            navigate(`${url}/${issue.id}`)
        }}>
            <Row>
                <Col>
                    <p>{issue.text}</p>
                    {issue.assigneeID && <p>Assignee: {findAssignee(issue.assigneeID)}</p>}
                    
                </Col>
            </Row>
            
        </Container>
    )
}

export default IssueCard