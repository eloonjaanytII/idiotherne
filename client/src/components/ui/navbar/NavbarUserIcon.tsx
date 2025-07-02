import { Link } from "react-router-dom"
import { useUserDataQuery } from "../../services/users"
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";

interface NavbarUserIconProps {
  userId: number | null;
  handlerLogout: () => void;
}

const NavbarUserIcon: React.FC <NavbarUserIconProps> = ({userId, handlerLogout}) => {

  const {data} = useUserDataQuery(userId as number, {skip: userId === null})

  const bgTheme = localStorage.getItem("isDark") === "true" ? "" : "bg-accent";
  const onlineUsers = useAppSelector(state => state.onlineStatus.ids);
  
  const isOnline = userId !== null && onlineUsers.includes(userId);

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
        <div tabIndex={0} role="button" className={`mb-3 flex items-end border-2 border-accent w-14 h-14 rounded-[50%] cursor-pointer hover:bg-accent-content ${bgTheme}`}>
            <img src={`/animals/${data.avatar}.png`} alt={data.avatar} className="object-cover p-2 relative"/>
            {isOnline 
            ? <div className="absolute right-0 status status-lg status-success"></div> 
            : <div className="absolute right-0 status status-lg status-error"></div>}
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