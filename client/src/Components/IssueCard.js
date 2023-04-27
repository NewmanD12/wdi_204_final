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
            return assignee.firstName[0].toUpperCase() + assignee.lastName[0].toUpperCase()

        }
        catch (e) {
        }
        
    }

    const navigate = useNavigate()

    return (
        <Container className='single-issue' onClick={(e) => {
            navigate(`${url}/${issue.id}`)
        }}>
            <Row>
                <Col className='m-3'>
                    <p>{issue.text}</p>
                </Col>
            {issue.assigneeID &&    <Col xs={2} className='assignee-initials-col m-2'>
                                        <p className='assignee-initials'>{findAssignee(issue.assigneeID)}</p>
                                    </Col>
            }
                
            </Row>
            
        </Container>
    )
}

export default IssueCard