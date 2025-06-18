import React from 'react'

const SelectMovie = ({
    countriesList,
    countries,
    genres,
    genresList,
    order,
    yearFrom,
    yearTo,
    onChangeCountry,
    onChangeYear,
    onChangeOrder,
    onChangeGenre,
    onReset
}) => {

    const orderList = [{title: 'По рейтингу', value: 'RATING'}, {title: 'По оценкам', value: 'NUM_VOTE'}]
    const yearList = [
        { title: '2020–2029', yearFrom: 2020, yearTo: 2029 },
        { title: '2010–2019', yearFrom: 2010, yearTo: 2019 },
        { title: '2000–2009', yearFrom: 2000, yearTo: 2009 },
        { title: '1990–1999', yearFrom: 1990, yearTo: 1999 },
        { title: '1980–1989', yearFrom: 1980, yearTo: 1989 },
        { title: '1970–1979', yearFrom: 1970, yearTo: 1979 },
        { title: '1960–1969', yearFrom: 1960, yearTo: 1969 },
        { title: '1950–1959', yearFrom: 1950, yearTo: 1959 },
        { title: '1940–1949', yearFrom: 1940, yearTo: 1949 },
      ];
  return (
    <div className='grid md:grid-cols-5 grid-cols-2 gap-2 pr-8 pl-8'>
        <select value={countries} className="select select-accent" onChange={e => onChangeCountry(e.target.value)}>
            {countriesList.map(item => (
                <option key = {item.id} value = {item.id}>{item.country}</option>
            ))}
        </select>
        <select value={`${yearFrom}-${yearTo}`}
                className="select select-accent" 
                onChange={e => {
                    const [from, to] = e.target.value.split('-').map(Number);
                    onChangeYear({ yearFrom: from, yearTo: to });
                }}>
            {yearList.map(y => (
                <option key= {y.title} value={`${y.yearFrom}-${y.yearTo}`}>{y.title}</option>
            ))}
        </select>
        <select value={order} className="select select-accent" onChange={e => onChangeOrder(e.target.value)}>
            {orderList.map(order => (
                <option key = {order.value} value = {order.value}>{order.title}</option>
            ))}
        </select>
        <select value={genres} className="select select-accent" onChange={e => onChangeGenre(e.target.value)}>
        {genresList.map(item => (
                <option key = {item.id} value = {item.id}>{item.genre.charAt(0).toUpperCase() + item.genre.slice(1)}</option>
            ))}
        </select>
        <button className="btn btn-outline btn-accent" onClick={onReset}>Reset</button>
    </div>
    
  )
}

export default SelectMovie