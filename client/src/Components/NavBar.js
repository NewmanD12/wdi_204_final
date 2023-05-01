import Nav from 'react-bootstrap/Nav'
import './NavBar.css'
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const NavBar = (props) => {
    
    const { setShowNav } = props
    const auth = useAuth();
    const navigate = useNavigate();

    const changeMenu = () =>  {
        const button = document.getElementById('menu-button-container')
        const bar1 = document.getElementById('bar1')
        const bar2 = document.getElementById('bar2')
        const bar3 = document.getElementById('bar3')
        bar1.classList.toggle('change')
        bar2.classList.toggle('change')
        bar3.classList.toggle('change')
        console.log(bar1)
        console.log(bar2)
        console.log(bar3)
    }

    return (
        <Container id='complete-nav-wrapper'>
            <Row id='top-nav-wrapper'>
                <Col  xs={8}>
                    <h2>Jira Clone</h2>
                </Col>
                <Col xs={3} id='menu-button-container'>
                    <div  className="menu-button-container" onClick={changeMenu}>
                        <div id='bar1' className="bar1"></div>
                        <div id='bar2' className="bar2"></div>
                        <div id='bar3' className="bar3"></div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default NavBar;