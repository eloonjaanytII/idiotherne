import React from 'react'

const PictureRegistration = () => {
  return (
    <div className='relative w-1/2 bg-[url(/ezhiki.webp)] m-3 rounded-md bg-cover opacity-85 bg-center hidden md:block'>
        <div>
          <p className='font-idiotherne font-bold text-6xl text-center pt-6 '>Idiotherne</p>
        </div>
        <div className="absolute inset-0 bg-black/50 rounded-md flex justify-end items-end p-4">
          <div className="text-2xl w-[80%] text-end hover:cursor-default">
            <div className="tooltip" data-tip="А. Введенский 'Потец'">
              <p>Обнародуй нам, отец, <br/>что такое есть потец</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PictureRegistration