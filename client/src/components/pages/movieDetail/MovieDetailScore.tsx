import { memo } from "react";
interface MovieScore {
  rate : number;
  rateHandler: (rate: number) => void;
}

const MovieDetailScore: React.FC<MovieScore> = ({rate, rateHandler}) => {

  return (
    <div className="rating rating-lg rating-half">
      {[...Array(10)].map((_, i) => {
        const value = i + 1;
        const isLeftHalf = i % 2 === 0;
        return (
          <input
            key={i}
            type="radio"
            className={`mask mask-star-2 ${isLeftHalf ? 'mask-half-1' : 'mask-half-2'} bg-orange-400`}
            value={value}
            checked={rate === value}
            onChange={() => rateHandler(value)}
          />
        );
      })}
    </div>
  );
};

export default memo(MovieDetailScore);