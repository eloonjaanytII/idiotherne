import { useEffect, useState } from "react"
import { useChangeStatusMutation } from "../../../services/users"

const InfoSector = ({userData, isUserDataLoading}) => {

  const [send] = useChangeStatusMutation()
  const [status, setStatus] = useState('')

  console.log(userData.status)

  useEffect(() => {
    if (!isUserDataLoading && userData.status) {
      setStatus(userData.status)
    }
  }, [userData.status, isUserDataLoading])


  const genderFlag = userData.gender === "female"

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