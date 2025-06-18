import {useForm} from 'react-hook-form';

const SignInForm = ({handlerSubmit, loginError}) => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onBlur"});


  return (
    <form onSubmit={handleSubmit(handlerSubmit)} className='flex flex-col gap-3 w-[60%] m-auto text-2xl'> 
        <label>Параметры для входа:</label>
        <input className="input input-neutral w-full text-xl p-5"
            placeholder='username'
            pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30"
            {...register("username", 
            {required: "Введите юзернейм",
            minLength: { value: 3, message: "Минимум 3 символа" },
            maxLength: { value: 20, message: "Максимум 20 символов" } },
            )}/>
        {errors.username && <p className='text-sm text-red-400'>{errors.username.message}</p>}

        <input 
            className="input input-neutral w-full text-xl p-5"
            placeholder='password'
            type="password"
            {...register("password", {required: "Введите пароль",
            minLength: { value: 3, message: "Минимум 3 символа" },
            maxLength: { value: 20, message: "Максимум 20 символов" } },
            )}
        />
        {errors.password && <p className='text-sm text-red-400'>{errors.password.message}</p>}

        <button 
          className="btn btn-outline p-5" 
          type="submit"
          >Признать себя</button>
        {loginError && <p className='text-center text-md text-accent'>Подумайте ещё раз</p>}

    </form>
  )
}

export default SignInForm;
