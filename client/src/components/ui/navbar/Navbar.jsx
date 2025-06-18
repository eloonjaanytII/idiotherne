
import {useNavigate } from 'react-router-dom'
import SearchInput from '../searchInput/SearchInput'
import ThemeController from '../themeController/ThemeController'
import NavbarLogo from './NavbarLogo'
import NavbarUserIcon from './NavbarUserIcon'

const Navbar = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId')

  const handlerLogout = () => {
    localStorage.removeItem('token');
    navigate('/authorization/register');
  } 

  return (
    <div className="navbar p-5 pb-0 pt-2 flex justify-between border-b-2">
        <NavbarLogo />
        <SearchInput mode = 'navbar'/>
        <ThemeController />
        <NavbarUserIcon {...{userId, handlerLogout}}/>
    </div>
  )
}

export default Navbar