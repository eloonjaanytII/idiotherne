import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import useMovieQuery from "../../hooks/useMovieQuery";
import { useMoviesCarousel } from "../../hooks/useMoviesCarousel";
import ErrorMessage from "../../ui/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Movies = () => {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseFilms,
    responseSerial,
    responseCartoons,
  } = useMovieQuery();

  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const carouselFilmData = useMemo(() => 
  [
    {
      title: "Популярные фильмы",
      url: "popular",
      data: responsePopular?.data?.items.slice(0, 8) || [],
    },
    {
      title: "Лучшие фильмы",
      url: "films",
      data: responseFilms?.data?.items.slice(0, 8) || [],
    },
    {
      title: "Лучшие сериалы",
      url: "serials",
      data: responseSerial?.data?.items.slice(0, 8) || [],
    },
    {
      title: "Лучшие мультфильмы",
      url: "cartoons",
      data: responseCartoons?.data?.items.slice(0, 8) || [],
    },
  ], [responsePopular, responseFilms, responseSerial, responseCartoons]) 

  const { containerRef, imagesRef, currentData, setCurrentData } =
    useMoviesCarousel(carouselFilmData);

  // Анимация кнопок
  useEffect(() => {
    if (!isLoading && buttonsRef.current.length) {
      const buttons = buttonsRef.current.filter(Boolean);
      gsap.from(buttons, {
        y: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, [isLoading]);

  if (isLoading) return <div>Загрузка...</div>;
  if (hasError) return <ErrorMessage />;

  return (
    <div className="flex flex-col min-h-[80vh] gap-5">
      <div className="flex gap-3 flex-col md:flex-row justify-center flex-wrap">
        {(() => buttonsRef.current = [])()}
        {carouselFilmData.map((f, i) => (
          <button
            key={f.url}
            className=" btn btn-dash text-xl font-bold btn-xl p-4"
            ref={(el) => {
              if (el) buttonsRef.current[i] = el;
            }}
            onClick={() => setCurrentData(f.data)}
          >
            {f.title.toUpperCase()}
          </button>
        ))}
      </div>
      {!isMobile 
      ? 
        <div
        ref={containerRef}
        className="w-full h-140 flex justify-center items-center overflow-hidden cursor-grab relative mt-10"
        style={{
          transform: "rotateX(-20deg) translateY(-70px)",
          transformStyle: "preserve-3d",
          perspective: "800px",
          userSelect: "none",
        }}
      >
        {currentData.map((row: any, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) imagesRef.current[i] = el;
            }}
            className="absolute w-20 h-30 md:w-50 md:h-80 overflow-hidden rounded-lg shadow-lg top"
            style={{
              top: "50%",
              left: "50%",
              margin: "-150px 0 0 -100px",
            }}
          >
            <Link key={row.kinopoiskId} to={`/movies/${row.kinopoiskId}`}>
              <img
                src={row.posterUrl}
                alt=""
                className="w-full h-full object-cover hover:scale-98 hover:opacity-90"
              />
            </Link>
          </div>
        ))}
      </div>
      :
      <div>
        <ul className="grid grid-cols-2 gap-2">
          {currentData.map((row: any) => (
            <li key={row.kinopoiskId}>
              <Link to={`/movies/${row.kinopoiskId}`}>
                <img
                  src={row.posterUrl}
                  alt=""
                  className="w-full h-full object-cover hover:scale-98 hover:opacity-90"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      }
    </div>
  );
  
};

export default Movies;