// CartOffCanvas.jsx
import { Offcanvas } from 'react-bootstrap';

function CartOffCanvas({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/*  cart items will go here */}
        <div className="cart-items">
          <p>Your cart is empty</p>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartOffCanvas;