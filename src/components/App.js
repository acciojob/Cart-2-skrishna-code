
import React from "react";
import { useCart } from "./CartContext";

function App() {
  const { state, dispatch } = useCart();
  const { cart } = state;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div id="main">
      <nav className="navbar">
        <h2>My Cart</h2>
        <div>
          <span role="img" aria-label="cart">
            🛒
          </span>
          <span id="nav-cart-item-count">
            {totalItems}
          </span>
        </div>
      </nav>

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Cart is currently empty</h2>
      ) : (
        <ul id="cart-items-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <h3>{item.title}</h3>

              <p id={`cart-item-price-${item.id}`}>
                Price: ₹{item.price}
              </p>

              <div className="quantity-controls">
                <button
                  id={`decrement-btn-${item.id}`}
                  onClick={() =>
                    dispatch({
                      type: "DECREMENT",
                      payload: item.id,
                    })
                  }
                >
                  -
                </button>

                <span id={`cart-amount-${item.id}`}>
                  {item.quantity}
                </span>

                <button
                  id={`increment-btn-${item.id}`}
                  onClick={() =>
                    dispatch({
                      type: "INCREMENT",
                      payload: item.id,
                    })
                  }
                >
                  +
                </button>
              </div>

              <p>
                Subtotal: ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE",
                    payload: item.id,
                  })
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-summary">
        <h2>
          Total: ₹
          <span id="cart-total-amount">
            {totalAmount}
          </span>
        </h2>

        <button
          id="clear-all-cart"
          onClick={() => dispatch({ type: "CLEAR" })}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default App;
