import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import {TOP_LISTS } from './constants';
import './App.css'

const Movies = lazy(() => import('./components/pages/movies/Movies'));
const MovieDetail = lazy(() => import('./components/pages/movieDetail/MovieDetail'));
const ActorDetail = lazy(() => import('./components/pages/actorDetail/ActorDetail'));
const MovieListTop = lazy(() => import('./components/pages/movieListTop/MovieListTop'));
const Registration = lazy(() => import('./components/pages/registration/Registration'));
const UserPage = lazy(() => import('./components/pages/userPage/UserPage'));

import Layout from './components/ui/layout/Layout'
import PrivateRouter from './components/ui/privateRouter/PrivateRouter';
import PublicRouter from './components/ui/publicRouter/PublicRouter';
import AuthProvider from './components/ui/authProvider/AuthProvider';
import UsersList from './components/pages/usersList/UsersList';
import { GlobalMap } from './components/pages/globalMap/GlobalMap';


const App = () => {
  const router = createBrowserRouter([
    {
      path: '/', element: <Layout />,
      children: [
        {
          path: '', 
          element: <Movies />
        },
        {
          element: <PrivateRouter />,
          children: [
            ...TOP_LISTS.map(elem => ({
            path: elem.url,
            element: <MovieListTop />
            })),
            ...TOP_LISTS.map(item => ({
            path: `${item.url}/:filmId`,
            element: <MovieDetail />})),
            {
              path: 'movies/:filmId', element: <MovieDetail />
            },
            {
              path: 'users-list', 
              element: <UsersList />
            },
            {
              path: 'user/:id', 
              element: <UserPage />
            },
            {
              path: 'actor/:id', 
              element: <ActorDetail />
            },
          ]
        },
      ]
    },
    {
      path: '/authorization',
      element: <PublicRouter />,
      children: [
        {path: 'register', 
         element: 
         <Suspense fallback={<div>isLoading...</div>}>
           <Registration />
         </Suspense>
         },
      ]
    },
    {
              path: 'global-map', 
              element: <GlobalMap />
            },
    {
      path: '*', element: <div>Not found error</div>
    }
  ])
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App
