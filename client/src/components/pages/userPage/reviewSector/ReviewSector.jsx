import { useReviewSector } from '../../../hooks/useReviewSector';
import {useGetUserReviewQuery } from '../../../services/review'

import { useSelector, useDispatch } from 'react-redux'
import {saveTabChoice} from "../../../features/userPageSlice"

import ReviewForm from './reviewForm/ReviewForm';
import ReviewList from './reviewList/ReviewList';
import WatchedList from './watchedList/WatchedList';
import FavoriteList from './favoriteList/FavoriteList';
import ScoreList from './scoreList/ScoreList';

const ReviewSector = ({isOwner, userId, userFilms}) => {

    const dispatch = useDispatch();
    const tabChoice = useSelector(state => state.userPageSlice.tabChoice);

    const {data: dataReview,
           isLoading: isLoadingReview} = useGetUserReviewQuery(userId, {skip: !userId});

    const reviewForm = useReviewSector(userId);
      
    if (reviewForm.isLoading || isLoadingReview) return <div>is Loading...</div>
  return (
    <div className="pl-4 pr-4">
      <div className="tabs tabs-lift flex justify-center">
        <input type="radio" 
               name="my_tabs_3" 
               className="tab text-xs md:text-xl [--tab-border-color:border-base-content]" 
               aria-label="Рецензии" 
               checked={tabChoice === "review"}
               onChange={() => dispatch(saveTabChoice("review"))}/>

          <div className={`tab-content border-base-content rounded-xl p-6 ${tabChoice === "review" ? 'active' : ''}`}>
              {isOwner && <ReviewForm {...reviewForm}/>}
              <ReviewList data={dataReview} isOwner={isOwner}/>
          </div>

        <input type="radio" 
               name="my_tabs_3" 
               className="tab text-xs md:text-xl [--tab-border-color:border-base-content]" 
               aria-label="Оценки"
               checked={tabChoice === "scores"}
               onChange={() => dispatch(saveTabChoice("scores"))}/>

        <div className={`tab-content border-base-content p-6 ${tabChoice === "scores" ? 'active' : ''}`}>
          {userFilms.message ? <div className="error-message">{userFilms.message}</div> : <ScoreList userId={userId}/>}
        </div>

        <input type="radio" 
               name="my_tabs_3" 
               className="tab text-xs md:text-xl [--tab-border-color:border-base-content]" 
               aria-label="Просмотренное" 
               checked={tabChoice === "watched"}
               onChange={() => dispatch(saveTabChoice("watched"))}/>

        <div className={`tab-content border-base-content p-6 ${tabChoice === "watched" ? 'active' : ''}`}>
          {userFilms.message ? <div className="error-message">{userFilms.message}</div> : <WatchedList userFilms={userFilms}/>}
        </div>

        <input type="radio" 
               name="my_tabs_3" 
               className="tab text-xs md:text-xl [--tab-border-color:border-base-content]" 
               aria-label="Избранное" 
               checked={tabChoice === "favorite"}
               onChange={() => dispatch(saveTabChoice("favorite"))}/>
        <div className={`tab-content border-base-content p-6 ${tabChoice === "favorite" ? 'active' : ''}`}>
          <FavoriteList userId={userId}/>
        </div>

      </div>

        
    </div>
  )
}

export default ReviewSector