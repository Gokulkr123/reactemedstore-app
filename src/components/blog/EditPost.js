import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";

const styles = {
  container: {
    marginTop: '70px', // Adjusted the margin from the top
  },
  formTitle: {
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '20px',
  },
  submitButton: {
    float: 'right',
  },
};

function EditPost() {
    const { postId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    let navigate = useNavigate();
    const user = useSelector(store => store.auth.user);

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        .then(response => {
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_date(response.data.expiry_date);
        })
        .catch(error => {
            console.error('Error fetching post:', error);
            // Handle error if needed
        });
    }, [postId, user.token]);

    function updatePost() {
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            name: name,
            company: company,
            expiry_date: expiry_date,
        }, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        .then(response => {
            alert(response.data.message);
            navigate('/blog/posts');
        })
        .catch(error => {
            console.error('Error updating post:', error);
            // Handle error if needed
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container" style={styles.container}>
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 style={styles.formTitle}>Edit Post</h1>
                        <div className="form-group" style={styles.formGroup}>
                            <label>Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label>Content:</label>
                            <textarea 
                                className="form-control" 
                                value={company} 
                                onChange={(event) => { setCompany(event.target.value) }}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label>Expiry Date:</label>
                            <input 
                                type="date"
                                className="form-control" 
                                value={expiry_date} 
                                onChange={(event) => { setExpiry_date(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <button 
                                className="btn btn-primary" 
                                style={styles.submitButton} 
                                onClick={updatePost}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(EditPost);
