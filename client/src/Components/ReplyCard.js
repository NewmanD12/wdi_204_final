import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import './ReplyCard.css'


const ReplyCard = (props) => {

    const { reply, userList } = props



      const findCreator = (id) => {
        const creator = userList.filter((user) => {
            return user.id === id
        })[0]
        return creator.firstName[0].toUpperCase() + creator.firstName.slice(1, creator.firstName.length) + ' ' + creator.lastName[0].toUpperCase()
    }

    return  <Container className="single-reply">
                <Row>
                    <Col className="single-reply-wrapper">
                        <p>{reply.text}</p>
                        <p className="user-reply">- {findCreator(reply.creatorID)}</p>
                    </Col>
                </Row>
            </Container>

}

export default ReplyCard