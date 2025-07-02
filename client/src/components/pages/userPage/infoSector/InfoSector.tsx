import { useAppSelector } from "../../../store/hooks";

interface IUserData {
  avatar: string;
  gender: string;
  id: number;
  status: string | null;
  username: string;
}

interface InfoSectorProps {
  userData: IUserData;
  error?: string;
}


const InfoSector:React.FC <InfoSectorProps> = ({userData}) => {

  const genderFlag = userData.gender === "female";
  const onlineUsers = useAppSelector(state => state.onlineStatus.ids);

  const isOnline = userData.id !== null && onlineUsers.includes(userData.id);

  return (
    <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[20%_80%] gap-2 text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-26 h-26 lg:w-32 lg:h-32 rounded-xl border-4 border-base-content relative gap-2">
            <img src={`/animals/${userData.avatar}.png`} alt="user" className="h-full w-full object-cover p-2" />
             {isOnline 
            ? <div>
                <div className="absolute right-0 top-0 status status-xl status-success animate-ping"></div> 
                <div className="absolute right-0 top-0 status status-xl status-success"></div> 
              </div>
            : <div className="absolute right-0 top-0 status status-xl status-error"></div> 
             }
          </div>
        </div>
        <div className='flex flex-col items-center justify-start gap-4 md:gap-8'>
          {genderFlag && <p className='text-3xl'>Владения госпожи {userData.username}</p>}
          {!genderFlag && <p>Владения господина {userData.username}</p>}
          <div className="flex gap-2">
            <input type="text" placeholder="думское место" className="input input-md border-2"/>
          </div>
        </div>
    </div>
  )
}

export default InfoSector