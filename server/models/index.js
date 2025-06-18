const {Film} = require('./Film');
const {User} = require('./User');
const {Review} = require('./Review');
const {UserFilms} = require('./UserFilms');


// Связь пользователя с его рецензиями
User.hasMany(Review, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Review.belongsTo(User, {
  foreignKey: 'userId',
})

// Связь пользователя с фильмами
User.belongsToMany(Film, {
  through: UserFilms,
  foreignKey: 'userId',
  otherKey: 'kinopoiskId',
  onDelete: 'CASCADE'
})

Film.belongsToMany(User, {
  through: UserFilms,
  foreignKey: 'kinopoiskId',
  otherKey: 'userId',
  onDelete: 'CASCADE'
})

module.exports = {
    Film,
    User,
    Review,
    UserFilms,
}