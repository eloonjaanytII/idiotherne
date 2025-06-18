import { Link } from "react-router-dom"
import { useUserDataQuery } from "../../services/users"
import { TOTEMS } from "../../../icons"


const NavbarUserIcon = ({userId, handlerLogout}) => {

  const {data, error, isLoading} = useUserDataQuery(userId)

  return (
    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="mb-3 flex items-center border-2 border-accent w-15 h-15 rounded-[50%] cursor-pointer hover:bg-accent">
            {
              !data && <button className='btn w-[full] h-[full] bg-blue-500 rounded-full'>User</button>
            }
            {
              data && <img src={`/animals/${data.avatar}.png`} alt={data.avatar} className="object-cover p-2" />
            }
          </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm border-2 border-accent">
          <li>
               <Link to={`/user/${userId}`} onClick={(e) => {e.currentTarget.blur()}}>
                  <p>
                      Страница идиота
                  </p>
              </Link>
          </li>
          <li onClick={() => handlerLogout()}>
            <p>
                  Покинуть бренность
              </p> 
          </li>  
        </ul>
      </div>
  )
}

export default NavbarUserIcon