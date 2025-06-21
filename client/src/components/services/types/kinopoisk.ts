export interface Country {
    id?: number;
    country: string;
}

export interface Genre {
    id?: number;
    genre: string;
}

export interface CountryAndGenres {
    genres: Genre[];
    countries: Country[];
}

export interface FilmItem {
    kinopoiskId: number;
    imdbId?: string | null,
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    countries: Country[];
    genres: Genre[];
    ratingKinopoisk: number | null;
    ratingImdb: number | null;
    year: number | null;
    type: string | null;
    posterUrl: string | null;
    posterUrlPreview: string | null;
}

export interface FilmFullDetail extends FilmItem {
  kinopoiskHDId?: string;
  imdbId?: string | null;

  coverUrl?: string | null;
  logoUrl?: string | null;

  reviewsCount?: number;
  ratingGoodReview?: number | null;
  ratingGoodReviewVoteCount?: number | null;
  ratingKinopoiskVoteCount?: number | null;
  ratingImdbVoteCount?: number | null;
  ratingFilmCritics?: number | null;
  ratingFilmCriticsVoteCount?: number | null;
  ratingAwait?: number | null;
  ratingAwaitCount?: number | null;
  ratingRfCritics?: number | null;
  ratingRfCriticsVoteCount?: number | null;

  webUrl?: string | null;

  filmLength?: number | null;
  slogan?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  editorAnnotation?: string | null;

  isTicketsAvailable?: boolean;
  productionStatus?: string | null;
  
  ratingMpaa?: string | null;
  ratingAgeLimits?: string | null;

  startYear?: number | null;
  endYear?: number | null;

  serial?: boolean;
  shortFilm?: boolean;
  completed?: boolean;
  hasImax?: boolean;
  has3D?: boolean;

  lastSync?: string | null;
}


export interface FilmsCollectionsResponse {
    total: number;
    totalPages: number;
    items: FilmItem[];
}

export interface getFilmsQuery {
     countries: string;
     genres: string;
     order: string;
     type: string;
     yearFrom: number | null;
     yearTo: number | null;
     page: number | null;
     keyword: string,
}

export interface StaffPerson {
    staffId: number;
    nameRu: string | null;
    nameEn: string | null;
    description: string | null,
    posterUrl: string | null,
    professionText: string | null,
    professionKey: string | null,
}

export interface ActorSpouses {
    personId: number;
    name: string;
    divorced: boolean;
    divorcedReason: string;
    sex: string;
    children: number;
    webUrl: string;
    relation: string;
}

export interface ActorFilms {
    filmId: number;
    nameRu: string | null;
    nameEn: string | null;
    rating: string;
    general: boolean;
    description: string | null;
    professionKey: string;
}

export interface Actor {
    personId: number;
    webUrl: string | null;
    nameRu: string | null;
    nameEn: string | null;
    sex: string;
    posterUrl: string | null;
    growth: number | null;
    birthday: string | null;
    death: string | null;
    age: number | null;
    birthplace: string | null;
    deathplace: string | null;
    spouses: ActorSpouses[];
    hasAwards: number | null;
    profession: string | null;
    facts: string[];
    films: ActorFilms[];
}

export interface RawFiltersResponse {
  genres: Genre[];
  countries: Country[];
}