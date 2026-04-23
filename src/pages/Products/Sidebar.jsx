import { useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Sidebar() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShow(true)}>
        Open Menu
      </button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Urban Threads</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="/"><HomeIcon className="me-2" /> Home</Nav.Link>
            <Nav.Link href="/products"><ShoppingBagIcon className="me-2" /> Products</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Sidebar;