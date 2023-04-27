import Nav from 'react-bootstrap/Nav'
import './NavBar.css'
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from 'react-router-dom';

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
        // console.log(bar1)
        // console.log(bar2)
        // console.log(bar3)
    }

    return (
        <div id='nav-wrapper'>
            <div>
                <p>Jira Clone</p>
            </div>
            <div>
                <div id='menu-button-container' className="menu-button-container" onClick={changeMenu}>
                    <div id='bar1' className="bar1"></div>
                    <div id='bar2' className="bar2"></div>
                    <div id='bar3' className="bar3"></div>
                </div>
            </div>
        </div>
    )
}
export default NavBar;