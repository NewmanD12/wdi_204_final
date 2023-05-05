import './NavBar.css'
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const NavBar = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        if(menuOpen){
            setMenuOpen(false)
        }
        else {
            setMenuOpen(true)
        }
    }

    return (
        <Container id='complete-nav-wrapper'>
            <Row id='top-nav-wrapper'>
                <Col  xs={8}>
                    <h2>Jira Clone</h2>
                </Col>
                <Col xs={3} id='menu-button-container'
                onClick={(e) => {
                    toggleMenu()
                }}>
                    <div  className="menu-button-container">
                        <div id='bar1' className={`bar1 ${menuOpen ? "change" : ""}`}></div>
                        <div id='bar2' className={`bar2 ${menuOpen ? "change" : ""}`}></div>
                        <div id='bar3' className={`bar3 ${menuOpen ? "change" : ""}`}></div>
                    </div>
                </Col>
            </Row>

            {menuOpen && <Row id='nav-links'>
                            <Col className='vertical-menu'>
                                <a onClick={(e) => {
                                    navigate('/dashboard')
                                    setMenuOpen(false)
                                }}>Dashboard</a>
                                <a onClick={() => {
                                    auth.logout()
                                    navigate('/')
                                }}>Logout</a>
                            </Col>
                        </Row>
            }
            
        </Container>
    )
}
export default NavBar;