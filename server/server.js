const express = require('express');
const {sequelize} = require('./db.js')

const PORT = process.env.PORT || 5000;

const authRouter = require('./routes/authRouter.js')
const reviewRouter = require('./routes/reviewRouter.js')
const usersRouter = require('./routes/usersRouter.js')
const filmsRouter = require('./routes/filmsRouter.js')

const cors = require('cors');
const {errorHandler} = require('./middleware/errorHandler.js');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/review', reviewRouter)
app.use('/api/users', usersRouter)
app.use('/api/films', filmsRouter)


app.use(errorHandler)

const start = async () => {
  try{

    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ force: false });

    app.listen(PORT, () => console.log('Сервер запущен '))
  }catch(error) {
    console.error('Unable to connect to the database:', error);
  }
}

start()