import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";

// Internal CSS styles directly within the component
const styles = {
  navbar: {
    backgroundColor: "#8F9779", // Set the background color to a rose leaf green shade
  },
  brand: {
    color: "#fff", // Set the text color
    fontSize: "1.5rem", // Set the font size
  },
  navLink: {
    color: "#fff", // Set the text color
    marginLeft: "15px", // Add some spacing between nav links
  },
  activeLink: {
    color: "#ffc107", // Set the text color for active links
  },
};

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    if (user) {
      axios
        .post(
          "https://medicalstore.mashupstack.com/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((response) => {
          dispatch(removeUser());
          navigate("/login");
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          navigate("/login");
        });
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark" style={styles.navbar}>
      <div className="navbar-brand" style={styles.brand}>
        <h4>E-MedStore</h4>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              to={"/"}
              className="nav-link"
              style={styles.navLink}
              activeClassName="active-link"
              exact
            >
            User Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/aboutus"}
              className="nav-link"
              style={styles.navLink}
              activeClassName="active-link"
            >
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/blog/posts"}
              className="nav-link"
              style={styles.navLink}
              activeClassName="active-link"
            >
              View
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/register"}
              className="nav-link"
              style={styles.navLink}
              activeClassName="active-link"
            >
              Register
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <NavLink
                  to="#"
                  className="nav-link"
                  style={styles.navLink}
                  onClick={logout}
                >
                  Logout
                </NavLink>
              </li>
              {/* You can add additional navigation links for logged-in users here */}
            </>
          ) : (
            <li className="nav-item">
              <NavLink
                to={"/login"}
                className="nav-link"
                style={styles.navLink}
                activeClassName="active-link"
              >
              
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
