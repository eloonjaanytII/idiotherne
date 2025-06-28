import { useParams } from 'react-router-dom';
import ReviewSector from './reviewSector/ReviewSector';
import { useCurrentUserQuery } from '../../services/auth';
import {useGetUserFilmsQuery } from '../../services/films';
import UserStatistics from './statisticsSector/UserStatistics';
import InfoSector from './infoSector/InfoSector';
import { useUserDataQuery } from '../../services/users';
import { parseErrorMessage } from '../../utils/parseErrorMessage';

const UserPage: React.FC = () => {

  const {id} = useParams<{id: string}>();
  if (!id) return <div>Ошибка с параметром</div>;

  const paramsId = Number(id);
  if (Number.isNaN(paramsId)) return <div>Некорректный ID</div>;

  const { data: currentUser, isLoading: isUserLoading} = useCurrentUserQuery();
  const { data: userData, isLoading: isUserDataLoading} = useUserDataQuery(paramsId);
  const { data: userFilms, isLoading: isFilmsLoading} = useGetUserFilmsQuery(paramsId);

  if (isUserLoading) return <div>Профиль валидируется...</div>;
  if (isUserDataLoading) return <div>Погружается личная информация пользователя...</div>;
  if (isFilmsLoading) return <div>Подгружается информация о фильмах...</div>;
  if (!userData || !userFilms) return <div>Данные подгружаются...</div>;

  const isOwner = currentUser?.userId === paramsId;

  return (
  
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
      <div className ="md:border-r-2 flex flex-col p-4 gap-2 md:gap-10">
        <InfoSector userData = {userData}/>
        <UserStatistics userFilms={userFilms}/>
      </div>
      <ReviewSector isOwner={isOwner} userId = {paramsId} userFilms={userFilms}/>
    </div>

  )
}

export default UserPage;