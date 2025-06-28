
export interface TOP_LISTS_TYPE {
  title: string;
  url: string;
  value: string;
  useCollections: boolean;
}


export const TOP_LISTS: TOP_LISTS_TYPE[] = [
    {
      title: 'ТОП 100 популярных фильмов',
      url: 'popular',
      value: 'TOP_POPULAR_MOVIES',
      useCollections: true
    },
    {
      title: 'ТОП 250 лучших фильмов',
      url: 'best',
      value: 'TOP_250_MOVIES',
      useCollections: true
    },
    {
      title: 'Популярные сериалы',
      url: 'popular_serials',
      value: 'POPULAR_SERIES',
      useCollections: true
    },
    {
      title: 'Фильмы',
      url: 'films',
      value: 'FILM',
      useCollections: false
    },
    {
      title: 'Сериалы',
      url: 'tv_series',
      value: 'TV_SERIES',
      useCollections: false
    },
    {
      title: 'Мультфильмы',
      url: 'cartoons',
      value: 'FILM',
      useCollections: false
    },
  ];
