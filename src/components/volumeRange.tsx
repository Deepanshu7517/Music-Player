import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

interface VolumeRangeProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  previousVolume: number;
}

const VolumeRange: React.FC<VolumeRangeProps> = ({
  volume,
  onVolumeChange,
  isMuted,
  setIsMuted,
  previousVolume,
}) => {
  const fillPercentage = useMemo(() => (volume / 100) * 100, [volume]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      onVolumeChange(previousVolume || 100);
      setIsMuted(false);
    } else {
      setIsMuted(true);
      onVolumeChange(0);
    }
  }, [isMuted, previousVolume, setIsMuted, onVolumeChange]);

  const VolumeIcon = useMemo(() => {
    const iconProps = {
      onClick: toggleMute,
      className: 'text-gray-700 cursor-pointer',
    };
    if (volume === 0 || isMuted) return <FaVolumeMute {...iconProps} />;
    if (volume < 50) return <FaVolumeDown {...iconProps} />;
    return <FaVolumeUp {...iconProps} />;
  }, [volume, isMuted, toggleMute]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (newVolume > 0 && isMuted) setIsMuted(false);
    onVolumeChange(newVolume);
  };

  return (
    <div className="w-[120px] flex justify-between items-center">
      <style>
        {`
        .volume-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100px;
          height: 8px;
          background: transparent;
          cursor: pointer;
        }

        .volume-range::-webkit-slider-runnable-track {
          height: 8px;
          background: linear-gradient(
            to right,
            var(--range-fill-color) 0%,
            var(--range-fill-color) var(--fill-percentage),
            var(--range-unfill-color) var(--fill-percentage),
            var(--range-unfill-color) 100%
          );
          border-radius: 5px;
        }

        .volume-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 0;
          width: 0;
          background: transparent;
          border: none;
          box-shadow: none;
        }
      `}
      </style>

      {VolumeIcon}
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-range"
        style={{
          '--range-fill-color': '#8B5CF6',
          '--range-unfill-color': '#E5E7EB',
          '--fill-percentage': `${fillPercentage}%`,
        } as React.CSSProperties}
      />
    </div>
  );
};

export default VolumeRange;
