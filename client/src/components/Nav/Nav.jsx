import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css'; 
import { FiHelpCircle } from "react-icons/fi";
import { FaHome} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NavComponent() {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="brand-title">
          📝 Time Management Coach
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home" className="nav-link-custom">
                <FaHome /> Home
           </Nav.Link>
            <Nav.Link as={Link} to="/help" className="nav-link-custom">
               <FiHelpCircle/> Help
           </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
