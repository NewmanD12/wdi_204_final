import Nav from 'react-bootstrap/Nav'
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    // <Nav.Item>
    //             <Nav.Link href="/dashboard/create-new">Create New</Nav.Link>
    //         </Nav.Item>
    //         <Nav.Item>
    //             <Nav.Link onClick={() => {
    //                 auth.logout()
    //                 navigate('/')
    //             }}>
    //                 Log Out
    //             </Nav.Link>
    // </Nav.Item>

    const auth = useAuth();
    const navigate = useNavigate();
    return (
        <Nav className="justify-content-center">
            <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => {
                    auth.logout()
                    navigate('/')
                }}>
                    Log Out
                </Nav.Link>
            </Nav.Item>
            
        </Nav>
    )
}
export default NavBar;