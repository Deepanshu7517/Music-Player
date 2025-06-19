import React, { useMemo } from 'react';

interface SliderRangeProps {
  Duration: number;
  CurrentTime: number;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SliderRange: React.FC<SliderRangeProps> = ({ Duration, CurrentTime, handleSeek }) => {
  const fillPercentage = useMemo(() => {
    return Duration > 0 ? (CurrentTime / Duration) * 100 : 0;
  }, [CurrentTime, Duration]);

  return (
    <div className="w-full">
      <style>{`
        .slider-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          background: linear-gradient(
            to right,
            #8B5CF6 0%,
            #8B5CF6 ${fillPercentage}%,
            #E5E7EB ${fillPercentage}%,
            #E5E7EB 100%
          );
          border-radius: 5px;
          cursor: pointer;
          outline: none;
        }

        .slider-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          background-color: #F87171;
          border-radius: 50%;
          margin-top: 0px;
        }

        .slider-range::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background-color: #F87171;
          border-radius: 50%;
        }
      `}</style>

      <input
        type="range"
        min={0}
        max={Duration || 0}
        value={CurrentTime}
        onChange={handleSeek}
        className="slider-range"
      />
    </div>
  );
};

export default SliderRange;
