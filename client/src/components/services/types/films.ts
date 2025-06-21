export interface FilmData {
    kinopoiskId: number;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    posterUrl: string | null;
    coverUrl: string | null;
    ratingKinopoisk: number | null;
    year: number | null;
    filmLength: number | null;
    slogan: string | null;
    description: string | null;
    shortDescription: string | null;
    countries: { country: string }[] | null;
    genres: { genre: string }[] | null;
    createdAt: string; 
    updatedAt: string;
}

export interface UserFilmFlags {
    kinopoiskId : number;
    userId: number;
    rating: number;
    isWatched: boolean;
    favorite: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserFilmWithScore {
    kinopoiskId: number;
    nameRu: string;
    rating: number;
    posterUrl: string;
}

export interface FilmMessageResponse {
    message: string;
}


