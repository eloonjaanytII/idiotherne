export interface ReviewResponse {
    message: string;
}

export interface ReviewBody {
    kinopoiskId: number;
    userId: number,
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewFilmBody extends ReviewBody {
  avatar: string;
  username: string;
}

export interface GetReviewFilmBodyResponse {
    reviews: ReviewFilmBody[];
}

export interface GetUserReviewsResponse {
  reviews: ReviewBody[];
}