const kinopoisk = require("../instance/kinopoisk");
const { Film } = require("../models");


async function getFilmOrFetch(kinopoiskId) {
    try {
        const existingFilm = await Film.findOne({ where: { kinopoiskId } });
        if (existingFilm) return existingFilm;

        const response = await kinopoisk.get(`/v2.2/films/${kinopoiskId}`);
        const data = response.data;

        if (!data || !data.kinopoiskId || !data.nameRu) {
        throw new Error("Некорректные данные от внешнего API");
        }

        const [newFilm] = await Film.findOrCreate({
        where: { kinopoiskId: data.kinopoiskId },
        defaults: {
            nameRu: data.nameRu,
            nameEn: data.nameEn,
            nameOriginal: data.nameOriginal,
            posterUrl: data.posterUrl,
            coverUrl: data.coverUrl,
            ratingKinopoisk: data.ratingKinopoisk,
            year: data.year,
            filmLength: data.filmLength,
            slogan: data.slogan,
            description: data.description,
            shortDescription: data.shortDescription,
            countries: data.countries,
            genres: data.genres,
        }
        });

        return newFilm;

    } catch (error) {
        console.error(`Ошибка при получении фильма [${kinopoiskId}]:`, error.message);
        throw new Error("Не удалось получить информацию о фильме");
    }
}

module.exports = getFilmOrFetch;