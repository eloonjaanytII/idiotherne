import { useParams } from 'react-router-dom';
import ReviewSector from './reviewSector/ReviewSector';
import { useCurrentUserQuery } from '../../services/auth';
import {useGetUserFilmsQuery } from '../../services/films';
import UserStatistics from './statisticsSector/UserStatistics';
import InfoSector from './infoSector/InfoSector';
import { useUserDataQuery } from '../../services/users';

const UserPage = () => {

  const {id: paramsId} = useParams();

  const { data: currentUser, isLoading: isUserLoading} = useCurrentUserQuery();
  const { data: userData, isLoading: isUserDataLoading} = useUserDataQuery(paramsId);
  const { data: userFilms, isLoading: isFilmsLoading} = useGetUserFilmsQuery(paramsId);
  
  if (isUserLoading || isFilmsLoading || !userFilms || isUserDataLoading || !userData) return <div>is Loading...</div>
  
  const isOwner = String(paramsId) === String(currentUser?.userId);

  return (
  
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
      <div className ="md:border-r-2 flex flex-col p-4 gap-2 md:gap-10">
        <InfoSector userData = {userData} isOwner={isOwner} isUserDataLoading={isUserDataLoading}/>
        {userFilms.message ? (
          <div className="error-message">{userFilms.message}</div>
        ) : (
          <UserStatistics userFilms={userFilms} />
        )}
      </div>
      <ReviewSector isOwner={isOwner} userId = {paramsId} userFilms={userFilms}/>
    </div>

  )
}

export default UserPage;