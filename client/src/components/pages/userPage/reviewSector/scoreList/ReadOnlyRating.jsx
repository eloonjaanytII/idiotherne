import React from 'react'

const ReadOnlyRating = ({ rating }) => {
  return (
    <div className="rating rating-half pointer-events-none flex items-center justify-center h-6">
      {[...Array(10)].map((_, i) => {
        const value = i + 1;
        const isLeftHalf = i % 2 === 0;
        return (
          <input
            key={i}
            type="radio"
            className={`mask mask-star-2 ${isLeftHalf ? 'mask-half-1' : 'mask-half-2'} bg-[#000000]`}
            value={value}
            defaultChecked={rating === value}
            disabled
          />
        );
      })}
    </div>
  );
};
export default ReadOnlyRating