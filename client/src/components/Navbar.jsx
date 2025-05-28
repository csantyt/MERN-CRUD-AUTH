import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import './Navbar.css';

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-title">
                <h1>Tasks Manager</h1>
            </Link>
            <ul className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <li className="navbar-user">BIENVENIDO {user.username}</li>
                        <li>
                            <Link to="/add-task" className="navbar-link">Crear Tarea</Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="navbar-link"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="navbar-link">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="navbar-link">Registrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
