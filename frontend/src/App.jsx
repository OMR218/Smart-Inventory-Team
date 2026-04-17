import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

const emptyProduct = { name: "", price: "", quantity: "", imageUrl: "" };

function App() {
  const [view, setView] = useState("login");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    imageUrl: ""
  });
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    if (view === "products") {
      fetchProducts();
    }
  }, [view]);

  const fetchProducts = async () => {
    setMessage("");
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data.products || []);
    } catch (error) {
      setMessage("Failed to load products");
    }
  };

  const handleAuth = async (endpoint) => {
    setMessage("");
    try {
      const response = await axios.post(`${API_URL}/auth/${endpoint}`, authForm);

      if (endpoint === "register") {
        setMessage("Registration successful. Please log in.");
        setView("login");
      } else {
        setUser(response.data.user);
        setView("products");
      }

      setAuthForm({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Request failed");
    }
  };

  const addProduct = async () => {
    setMessage("");
    try {
      await axios.post(`${API_URL}/products`, productForm);
      setProductForm(emptyProduct);
      setIsAddOpen(false);
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add product");
    }
  };

  const openEdit = (product) => {
    setEditForm({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.imageUrl || ""
    });
    setView("edit");
  };

  const saveEdit = async () => {
    setMessage("");
    try {
      await axios.put(`${API_URL}/products/${editForm.id}`, {
        name: editForm.name,
        price: editForm.price,
        quantity: editForm.quantity,
        imageUrl: editForm.imageUrl
      });
      setView("products");
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update product");
    }
  };

  const deleteProduct = async (productId) => {
    setMessage("");
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Inventory Management</h1>
        {view !== "login" && view !== "register" && user ? (
          <div className="user-bar">
            <span>Signed in as {user.name}</span>
            <button
              type="button"
              onClick={() => {
                setUser(null);
                setView("login");
              }}
            >
              Log out
            </button>
          </div>
        ) : null}
      </header>

      {message ? <p className="message">{message}</p> : null}

      {view === "login" || view === "register" ? (
        <div className="card">
          <h2>{view === "login" ? "Login" : "Register"}</h2>
          {view === "register" ? (
            <label>
              Name
              <input
                type="text"
                value={authForm.name}
                onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })}
              />
            </label>
          ) : null}
          <label>
            Email
            <input
              type="email"
              value={authForm.email}
              onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={authForm.password}
              onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
            />
          </label>
          <button
            type="button"
            onClick={() => handleAuth(view === "login" ? "login" : "register")}
          >
            {view === "login" ? "Login" : "Register"}
          </button>
          <button
            type="button"
            className="link-button"
            onClick={() => setView(view === "login" ? "register" : "login")}
          >
            {view === "login" ? "Need an account? Register" : "Already registered? Login"}
          </button>
        </div>
      ) : view === "products" ? (
        <div className="dashboard">
          <section className="card">
            <div className="list-header">
              <div className="title-group">
                <h2>Products</h2>
                <button
                  type="button"
                  className="small-button"
                  onClick={() => setIsAddOpen((prev) => !prev)}
                >
                  Add
                </button>
              </div>
              <button type="button" onClick={fetchProducts}>Refresh</button>
            </div>
            {isAddOpen ? (
              <div className="popover">
                <div className="popover-card">
                  <h3>Add Item</h3>
                  <label>
                    Name
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(event) =>
                        setProductForm({ ...productForm, name: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Price
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(event) =>
                        setProductForm({ ...productForm, price: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Quantity
                    <input
                      type="number"
                      value={productForm.quantity}
                      onChange={(event) =>
                        setProductForm({ ...productForm, quantity: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Image URL
                    <input
                      type="url"
                      value={productForm.imageUrl}
                      onChange={(event) =>
                        setProductForm({ ...productForm, imageUrl: event.target.value })
                      }
                    />
                  </label>
                  <div className="popover-actions">
                    <button type="button" onClick={addProduct}>Save</button>
                    <button type="button" className="ghost" onClick={() => setIsAddOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <ul className="product-list">
              {products.length === 0 ? (
                <li className="empty">No products yet.</li>
              ) : (
                products.map((product) => (
                  <li key={product.id} className="product-item">
                    {product.imageUrl ? (
                      <div className="thumb">
                        <img src={product.imageUrl} alt={product.name} loading="lazy" />
                      </div>
                    ) : null}
                    <div>
                      <strong>{product.name}</strong>
                      <p>
                        Price: {product.price} | Qty: {product.quantity}
                      </p>
                    </div>
                    <div className="actions">
                      <button type="button" onClick={() => openEdit(product)}>Edit</button>
                      <button type="button" onClick={() => deleteProduct(product.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      ) : (
        <div className="dashboard">
          <section className="card">
            <div className="list-header">
              <h2>Edit Product</h2>
              <button type="button" onClick={() => setView("products")}>Back</button>
            </div>
            <label>
              Name
              <input
                type="text"
                value={editForm.name}
                onChange={(event) => setEditForm({ ...editForm, name: event.target.value })}
              />
            </label>
            <label>
              Price
              <input
                type="number"
                value={editForm.price}
                onChange={(event) => setEditForm({ ...editForm, price: event.target.value })}
              />
            </label>
            <label>
              Quantity
              <input
                type="number"
                value={editForm.quantity}
                onChange={(event) => setEditForm({ ...editForm, quantity: event.target.value })}
              />
            </label>
            <label>
              Image URL
              <input
                type="url"
                value={editForm.imageUrl}
                onChange={(event) => setEditForm({ ...editForm, imageUrl: event.target.value })}
              />
            </label>
            <button type="button" onClick={saveEdit}>Save Changes</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
