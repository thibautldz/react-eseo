import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import 'antd/dist/antd.css'

const Nav = ({ search, setSearch }) => {
    return (
        <Menu
          defaultSelectedKeys={['1']}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item key="1">
          <Link to="/">Mes favoris</Link>
          </Menu.Item>
          <Menu.Item key="2">
          <Link to="inscription">Inscription</Link>
          </Menu.Item>
          <Menu.Item key="3" >
          <Link to="connexion">Connexion</Link>
        </Menu.Item>
        <Menu.Item key="4">
        <Link to="popular">Les plus populaires</Link>
        </Menu.Item>
        </Menu>
    )
}

export default Nav
