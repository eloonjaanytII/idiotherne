import {Link} from 'react-router-dom';
import { useUsersListQuery } from '../../services/users'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';

const UsersList = () => {

    const {data, error, isLoading} = useUsersListQuery();

    if (isLoading || !data) return <div>Загрузка зоопарка...</div>
    if (error) return <ErrorMessage />

    return (
    <div>
        <div className='mb-8 text-center text-3xl' >
            <p >ЗООПАРК:</p>
            <p>( Всего голов: { data.countUsers} )</p>
        </div>
        {data.countUsers > 0 
        ?
             <ul className='flex flex-wrap gap-5 m-auto justify-center'>
            {data.usersList.map(user => (
                <Link to={`/user/${user.id}`} key={user.id}>
                <li className='border-2 rounded-xl border-accent-content p-6 flex flex-col justify-center items-center text-xl hover:bg-accent'>
                        <img alt="pickha" src={`/animals/${user.avatar}.png`}/>
                    <p>{user.username}</p>
                </li>
                </Link>
                ))
            }
        </ul>
        :
        <div>{data.message}</div>
        }
       
    </div>
  )
}

export default UsersList