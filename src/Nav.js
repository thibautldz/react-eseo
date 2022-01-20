import { Link } from 'react-router-dom';

const Nav = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <ul>
                <li><Link to="/">Mes favoris</Link></li>
                <li><Link to="inscription">Inscription</Link></li>
                <li><Link to="connexion">Connexion</Link></li>
                <li><Link to="popular">Les plus populaires</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
