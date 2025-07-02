import {Link} from 'react-router-dom';
import { useUsersListQuery } from '../../services/users'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { useAppSelector } from '../../store/hooks';

const UsersList = () => {

    const {data, error, isLoading} = useUsersListQuery();
    const onlineUsers = useAppSelector(state => state.onlineStatus.ids);

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
                    <img alt="pickha" 
                         src={`/animals/${user.avatar}.png`} 
                         className=''/>
                    <div className='flex gap-2 justify-center items-center'>
                        <p>{user.username}</p>
                        {onlineUsers.includes(user.id)
                            ? <div className="status status-lg status-success"></div> 
                            : <div className="status status-lg status-error"></div>}
                    </div>
                    
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