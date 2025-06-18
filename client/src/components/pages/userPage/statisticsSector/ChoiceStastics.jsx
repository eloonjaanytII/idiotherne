import React, { useState } from 'react'

const ChoiceStastics = () => {

  const [value, setValue] = useState(0)

  return (
    <div className="w-full max-w-xs">
        <input type="range" min="0" max="50" value={value} className="range [--range-fill:0]" onChange={e => setValue(e.target.value)} />
        <div className="flex justify-between px-10 mt-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
        </div>
        <div className="flex justify-between px-5 mt-2 text-x text-center">
            <span>жанрам</span>
            <span>годам</span>
            <span>режиссёрам</span>
        </div>
    </div>
  )
}

export default ChoiceStastics