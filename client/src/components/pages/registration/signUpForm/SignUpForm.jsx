
import {useForm} from 'react-hook-form';
import { TOTEMS } from '../../../../icons';
import { Tooltip } from 'react-tooltip';

const SignUpForm = ({handlerSubmit, registerError, step, setStep, totem, setTotem, gender, setGender}) => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onBlur"})

  return (
    <form onSubmit={handleSubmit(handlerSubmit)} className='flex flex-col w-full text-2xl'> 
        {step === 0 && 
          <div className='flex flex-col gap-2 w-[60%] m-auto'>
              <label className='mb-4'>Параметры для регистрации:</label>
              <input className="input input-neutral w-full text-xl p-5"
                  placeholder='email'
                  {...register("email", {
                      required: "Email обязателен",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Неверный формат email"
                      },
                      minLength: { value: 3, message: "Минимум 3 символа" },
                      maxLength: { value: 30, message: "Максимум 30 символов" }
                    })}/>
              {errors.email && <p className='text-sm text-red-400'>{errors.email.message}</p>}

              <input className="input input-neutral w-full text-xl p-5"
                  placeholder='username'
                  {...register("username", 
                    {required: "Введите юзернейм",
                    minLength: { value: 3, message: "Минимум 3 символа" },
                    maxLength: { value: 20, message: "Максимум 20 символов" } },
                    )}
              />
              {errors.username && <p className='text-sm text-red-400'>{errors.username.message}</p>}

              <input 
                  className="input input-neutral w-full text-xl p-5"
                  type='password'
                  placeholder='password'
                  {...register("password", {required: "Введите пароль",
                    minLength: { value: 3, message: "Минимум 3 символа" },
                    maxLength: { value: 20, message: "Максимум 20 символов" } },
                    )}
              />
              {errors.password && <p className='text-sm text-red-400'>{errors.password.message}</p>}
              <button className="btn btn-outline p-5" onClick={() => setStep(1)}>Поехало</button>
        </div>
        }
        {step === 1 && 
          <div className='flex flex-col gap-5 h-[90%]'>
              <div className='text-center'><h2>Укажите свой пол:</h2></div>
              <div className='flex w-[70%] gap m-auto bg-accent rounded-md'>
                <button type="button"
                  className={`w-1/2 p-5 btn ${gender === 'female' ? `btn-outline text-white` : `btn-ghost`}`}
                  onClick={() => setGender('female')}>
                  Женский
                </button>
                <button type="button"
                  className={`w-1/2 p-5 btn ${gender === 'male' ? `btn-outline text-white` : `btn-ghost`}`}
                  onClick={() => setGender('male')}>
                  Мужской
                </button>
              </div>
              <div className='text-center'><h2>Выберите своё тотемное животное:</h2></div>
              <div className="flex flex-wrap gap-4 mt-4">
                {TOTEMS.map(({ key, label }) => (
                  <div
                    key={key}
                    className={` w-24 h-24 border p-2 cursor-pointer rounded-[50%] ${
                      totem === key ? "bg-white border-3" : "border-gray-300"} ${key}-archon`}
                    onClick={() => setTotem(key)}
                  >
                    <img src={`/animals/${key}.png`} alt={label} className="object-cover" />
                    <Tooltip anchorSelect={`.${key}-archon`} content={label} />
                  </div>
                ))}
                
              </div>
              <div className='flex gap-2 justify-between'>
                <button className="btn btn-outline p-5" onClick={() => setStep(0)}>К первому этапу</button>
                {registerError && <div className='text-center'>{registerError.data?.message || "Произошла ошибка"}</div>}
                <button className="btn btn-outline p-5" type="submit">Признать себя</button>
              </div> 
        </div>
        }

    </form>
  )
}

export default SignUpForm