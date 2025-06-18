import React from 'react'

const ToggleRegistration = ({mode, setMode}) => {
  return (
    <div className='flex w-[70%] gap mb-15 m-auto bg-teal-900 rounded-md'>
            <button 
              className={`w-1/2 p-5 btn hover:bg-teal-800 ${mode === 'login' ? `btn-outline btn-orange-200 text-orange-200` : `btn-ghost`}`}
              onClick={() => setMode('login')}>
              Валидация
            </button>
            <button 
              className={`w-1/2 p-5 btn hover:bg-teal-800 ${mode === 'register' ? `btn-outline btn-orange-200 text-orange-200` : `btn-ghost`}`}
              onClick={() => setMode('register')}>
              Идиотизация
            </button>
          </div>
  )
}

export default ToggleRegistration