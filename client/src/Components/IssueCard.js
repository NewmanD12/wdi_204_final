import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const IssueCard = (props) => {
    const { issue } = props

    console.log(issue)

    return (
        <Card style={{ width: '14rem' }}>
            <Card.Body>
                <Card.Title>{issue.text}</Card.Title>
                {issue.assignee}
            
            </Card.Body>
        </Card>
    )
}

export default IssueCard