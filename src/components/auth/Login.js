import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import checkGuest from "./checkguest";
import { useNavigate } from "react-router-dom";

// Internal CSS styles directly within the component
const styles = {
  body: {
    backgroundImage: 'url("https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Add your background image path
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: '#e6f5fa', // White background with some opacity
    padding: '20px',
    borderRadius: '10px',
    marginTop: '100px', // Set the margin-top to 100px
    width: '400px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle box shadow
  },
  formGroup: {
    marginBottom: '15px',
  },
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function attemptLogin() {
    axios
      .post("https://medicalstore.mashupstack.com/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setErrorMessage('');
        const user = {
          email: email,
          token: response.data.token,
        };
        dispatch(setUser(user));

        // Redirect to "/blog/posts" upon successful login
        navigate("/blog/posts");
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setErrorMessage(
            Object.values(error.response.data.errors).join(" ")
          );
        } else if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(
            "Failed to login user. Please contact admin"
          );
        }
      });
  }

  return (
    <div style={styles.body}>
      <Navbar />
      <div className="container" style={styles.loginContainer}>
        <div className="row">
          <div className="col-12 text-center">
            <h1>Admin Login</h1>
            {errorMessage ? (
              <div className="alert alert-danger">{errorMessage}</div>
            ) : (
              ""
            )}
            <div style={styles.formGroup}>
              <label>username:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onInput={(event) => setEmail(event.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onInput={(event) => setPassword(event.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <button
                className="btn btn-primary"
                onClick={attemptLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkGuest(Login);
