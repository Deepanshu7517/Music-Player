// Controls.tsx (Optimized & Synced with MusicPlayer logic)
import React from 'react';
import { BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';

interface ControlsProps {
  IsPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  PlayOrPauseSong: (url: string, index: number) => void;
  CurrentIndex: number;
  AudioFiles: string[];
}

const Controls: React.FC<ControlsProps> = ({
  IsPlaying,
  setIsPlaying,
  PlayOrPauseSong,
  CurrentIndex,
  AudioFiles,
}) => {
  const isValidIndex = (index: number) => index >= 0 && index < AudioFiles.length;

  const handlePlayPause = () => {
    if (isValidIndex(CurrentIndex)) {
      PlayOrPauseSong(AudioFiles[CurrentIndex], CurrentIndex);
    }
  };

  const handleSkip = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' ? CurrentIndex + 1 : CurrentIndex - 1;
    if (isValidIndex(newIndex)) {
      PlayOrPauseSong(AudioFiles[newIndex], newIndex);
    }
  };

  return (
    <div className="controls w-2/3 flex justify-around items-center">
      <TbPlayerTrackPrevFilled
        onClick={() => handleSkip('prev')}
        size={25}
        className="cursor-pointer"
        title="Previous"
      />

      {IsPlaying ? (
        <BsPauseCircleFill
          onClick={()=> {
            handlePlayPause()
            setIsPlaying(false);
          }}
          size={30}
          className="cursor-pointer"
          title="Pause"
        />
      ) : (
        <BsPlayCircleFill
          onClick={()=>{
            handlePlayPause()
            setIsPlaying(true);
          }}
          size={30}
          className="cursor-pointer"
          title="Play"
        />
      )}

      <TbPlayerTrackNextFilled
        onClick={() => handleSkip('next')}
        size={25}
        className="cursor-pointer"
        title="Next"
      />
    </div>
  );
};

export default Controls;