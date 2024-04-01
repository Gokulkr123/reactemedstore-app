import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const styles = {
  container: {
    marginTop: '50px',
    backgroundImage: 'url("https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Add your background image path
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white', // Set text color to white
  },
  formContainer: {
    width: '50%',
    margin: 'auto',
  },
  formGroup: {
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
  },
};

function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [password_confirmation, setpassword_confirmation] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function registerUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }
        axios.post('https://medicalstore.mashupstack.com/api/register', user)
            .then(response => {
                setErrorMessage('');
                navigate('/');
            })
            .catch(error => {
                if (error.response.data.errors) {
                    setErrorMessage(Object.values(error.response.data.errors).join(' '));
                } else {
                    setErrorMessage('Failed to connect to api');
                }
            });
    }

    return (
        <div style={styles.container}>
            <Navbar />
            <div className="container" style={styles.formContainer}>
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1>Create new Admin </h1>
                        {errorMessage && <div className="alert alert-danger" style={styles.errorMessage}>{errorMessage}</div>}
                        <div className="form-group" style={styles.formGroup}>
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onInput={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label>Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onInput={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onInput={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password_confirmation}
                                onInput={(event) => setpassword_confirmation(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={registerUser}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
