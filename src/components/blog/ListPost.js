import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "../Navbar";
import PostListItem from "./PostListItem";
import checkAuth from "../auth/checkAuth";

const styles = {
  searchForm: {
    marginBottom: "20px",
  },
  body: {
    backgroundImage: 'url("https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  },
  button: {
    backgroundColor: '#8A9965', // Rose leaf color
    color: '#fff', // Text color
    marginLeft: '2px',
  },
};

function ListPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(store => store.auth.user);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredPosts(allPosts);
    } else {
      const filteredItems = allPosts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };

  function fetchPosts() {
    if (user && user.token) {
      axios
        .get('https://medicalstore.mashupstack.com/api/medicine/', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        })
        .then((response) => {
          setAllPosts(response.data);
          setFilteredPosts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    } else {
      console.error('User or user token is null or undefined');
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.body}>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form style={styles.searchForm}>
              <label>Search Blog: </label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button
                className="btn btn-success ml-2"
                type="button"
                onClick={handleSearch}
                style={styles.button}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
          <h1 className="text-center my-4" style={{ color: 'white' }}>E BOOK</h1>

          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/blog/posts/create" className="btn btn-info mb-2" style={styles.button}>
              ADD Post
            </Link>
            {filteredPosts.length === 0 ? (
              <p className="text-center">No matching posts found.</p>
            ) : (
              filteredPosts.map((post) => (
                <PostListItem key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListPosts);
