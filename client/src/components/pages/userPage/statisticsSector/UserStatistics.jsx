import {useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { useMediaQuery } from 'react-responsive'

const COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#66FF66', '#FF6666', '#66B2FF', '#FFB266',
  '#B266FF', '#33FFCC', '#FF33CC', '#33CCFF', '#CCFF33',
  '#FFCC33', '#CC33FF', '#33FF66', '#FF3366', '#3366FF'
]; 



const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={12} fontSize="2em" textAnchor="middle" fill={fill}>
        {value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={1} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill} className='text-xl'>{` ${payload.name}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const UserStatistics = ({userFilms}) => {


  const [activeIndex, setActiveIndex] = useState(0);
  
  const dataFilms = {}
  const genres = userFilms.map(film => film.genres.map(g => g)).flat()

  genres.forEach(item => {
    const genre = item.genre;
    dataFilms[genre] = (dataFilms[genre] || 0) + 1;
  });

  const arrayFilm = Object.entries(dataFilms).map(([key, value]) => ({name: key, value: value}));

  const handlePieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const isMobile = useMediaQuery({ maxWidth: 500 })
  const isTablet = useMediaQuery({ minWidth: 501})

  return (
    <div className=" h-[50vh] w-[100%] flex flex-col justify-center items-center p-2 text-center">
        <p className="text-2xl mb-2">Распределение просмотренных фильмов по жанрам:</p>
        <ResponsiveContainer width="100%" height="100%" className="flex items-start ">
          <PieChart >
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={arrayFilm}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 40 : isTablet ? 60 : 80}
              outerRadius={isMobile ? 60 : isTablet ? 80 : 100}
              fill="#7B1212"
              dataKey="value"
              onMouseEnter={handlePieEnter}
            >
            {arrayFilm.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        </div>
  );
};

export default UserStatistics;