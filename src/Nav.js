import { Link } from 'react-router-dom';

const Nav = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
                <li><Link to="inscription">Inscription</Link></li>
                <li><Link to="connexion">Connexion</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
