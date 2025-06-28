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


const InfoSector:React.FC <InfoSectorProps> = ({userData, error}) => {

  const genderFlag = userData.gender === "female";

  if (error) <div>{error}</div>
  
  return (
    <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[20%_80%] gap-2 text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-26 h-26 md:w-32 md:h-32 rounded-full border-4 border-base-content">
            <img src={`/animals/${userData.avatar}.png`} alt="user" className="object-cover p-2" />
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