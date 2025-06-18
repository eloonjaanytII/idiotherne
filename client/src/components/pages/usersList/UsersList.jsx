import React from 'react'

import {Link} from 'react-router-dom';

import { useUsersListQuery } from '../../services/users'

const UsersList = () => {

    const {data, isLoading} = useUsersListQuery();

    if (isLoading || !data) return <div>is Loading...</div>

    console.log(data)

  return (
    <div>
        <div className='mb-8 text-center text-3xl' >
            <p >ЗООПАРК:</p>
            <p>( Всего голов: { data.countUsers} )</p>
        </div>
        <ul className='flex flex-wrap gap-5 m-auto justify-center'>
            {data.usersList.map(user => (
                <Link to={`/user/${user.id}`}>
                <li key={user.id} className='border-2 rounded-xl border-accent-content p-6 flex flex-col justify-center items-center text-xl hover:bg-accent'>
                    
                        <img alt="pickha" src={`/animals/${user.avatar}.png`}/>
                    <p>{user.username}</p>
                </li>
                </Link>
                ))
            }
        </ul>
    </div>
  )
}

export default UsersList