import { Link } from "react-router-dom"
import { useUserDataQuery } from "../../services/users"

const NavbarUserIcon = ({userId, handlerLogout}) => {

  const {data, error, isLoading} = useUserDataQuery(userId, {skip: !userId})
  const bgTheme = localStorage.getItem("isDark") === "true" ? "" : "bg-accent";

  return (
    <>
      {
      !data && 
        <div
        onClick={() => handlerLogout()}
        className={`mb-3 flex items-center border-2 border-accent w-14 h-14 rounded-[50%] cursor-pointer hover:bg-accent-content ${bgTheme}`}>
          <img src={`/signIn.png`} alt="Вход" className="object-cover p-2" />
        </div>
    }
    {
      data &&
      <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className={`mb-3 flex items-center border-2 border-accent w-14 h-14 rounded-[50%] cursor-pointer hover:bg-accent-content ${bgTheme}`}>
            <img src={`/animals/${data.avatar}.png`} alt={data.avatar} className="object-cover p-2"/>
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
    }
    </>
  )
}

export default NavbarUserIcon