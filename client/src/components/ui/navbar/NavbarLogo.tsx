import { Link } from 'react-router-dom'
import { TOP_LISTS } from '../../../constants'

const NavbarLogo = () => {
  return (
    <div className="dropdown dropdown-hover cursor-pointer">
        <div tabIndex={0} role="button" >
        <div className='flex items-end mb-2' onClick={(e) => {e.currentTarget.blur()}}>
            <img src="/logo1.png" alt="logo" className='w-12 h-12 rounded-xl border-black border p-0.5 mr-2'/>
            <p className="font-idiotherne tracking-tighter text-3xl text-red-700 hidden md:block ">Idiotherne</p>
          </div>
        </div>
        <ul 
            tabIndex={0} 
            className="dropdown-content menu bg-base-100 rounded-box z-[10] w-52 md:w[110%] p-2 shadow-sm border-2 border-accent">
          {TOP_LISTS.map(item => (
                        <li key = {item.title} >
                            <Link to={`/${item.url}`} onClick={(e) => {e.currentTarget.blur()}} className='text-lg'>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                    <div className="divider"></div>
                    <li>
                        <Link to={`/users-list`} onClick={(e) => {e.currentTarget.blur()}} className='text-lg'>
                            <p>
                                Список идиотов
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/users-list`} onClick={(e) => {e.currentTarget.blur()}} className='text-lg'>
                            <p>
                                Догма 25
                            </p>
                        </Link>
                    </li>
        </ul>
      </div>
  )
}

export default NavbarLogo