// MusicPlayer.tsx (Optimized Integration with Mute Memory)
import React, { useState, useRef, useEffect, useCallback } from 'react';
import SliderRange from './sliderRange';
import VolumeRange from './volumeRange';
import Controls from './Controls';
import MenuIcon from './MenuIcon';

const MusicPlayer = () => {
  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const [previousVolume, setPreviousVolume] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCheckboxChange = () => setIsChecked(prev => !prev);

  const handleVolumeChange = useCallback((vol: number) => {
    if (vol === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setPreviousVolume(vol);
    }
    setVolume(vol);
  }, []);

  useEffect(() => {
    const modules = import.meta.glob('../../**/*.{mp3,mp4a,wav,ogg,flac}', {
      eager: true,
      import: 'default',
    });
    const paths = Object.values(modules) as string[];
    setAudioFiles(paths);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioRef.current]);

  const playOrPauseSong = (url: string, index: number) => {
    if (!audioRef.current || currentIndex !== index) {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const newAudio = new Audio(url);
      newAudio.volume = volume / 100;
      audioRef.current = newAudio;

      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
        newAudio.play().then(() => {
          setIsPlaying(true);
          setCurrentIndex(index);
        }).catch(err => console.error('Playback error:', err));
      });
    } else {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  return (
    <div className="absolute p-2 h-96 w-96 rounded-2xl bg-white/25 flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className={`absolute left-0 top-0 rounded-2xl transition-all duration-300 ${isChecked ? 'h-full p-2' : 'h-0'} w-full bg-white z-10`}>
        <div className={`text-white mt-16 rounded-2xl overflow-y-scroll ${isChecked ? 'h-4/5 ' : 'h-0'} w-full`}>
          {audioFiles.map((url, index) => (
            <div
              key={index}
              onClick={() => playOrPauseSong(url, index)}
              className="transition duration-300 cursor-pointer bg-gradient-to-tl from-purple-700 via-fuchsia-500 to-rose-500 my-1 px-2 rounded-xl font-sans font-semibold text-2xl flex justify-start items-center w-full h-1/4 hover:scale-95"
            >
              <h3 className="flex gap-2 overflow-hidden">
                {index + 1}) <span className="text-ellipsis uppercase">{url.replace("/src/assets/audio/", "")}</span>
              </h3>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .songName::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>

      <MenuIcon isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} />

      <div className="songInfo flex justify-center items-center gap-2 mb-2 h-2/3 bg-white rounded-2xl">
        <div className="h-40 flex items-center justify-center w-40 bg-black rounded-full">
          <img
            className="object-cover animate-spin rounded-full h-full w-full"
            src="https://images.unsplash.com/photo-1747171232839-a5fea879ca59?w=600&auto=format&fit=crop&q=60"
            style={{ animationDuration: '3s' }}
            alt="Album Art"
          />
        </div>

        <div className="h-full gap-2 flex flex-col justify-center items-center w-40 text-black">
          <div className="songName flex justify-center items-center h-45 overflow-y-scroll text-xl font-serif">Music Player</div>
          <div className="authorName w-full flex justify-center gap-1">
            by <span className="font-extrabold text-gray-600 overflow-hidden text-ellipsis">Deepanshu</span>
          </div>
        </div>
      </div>

      <div className="features h-1/3 bg-white rounded-2xl flex flex-col justify-center gap-2 px-2">
        <SliderRange Duration={duration} CurrentTime={currentTime} handleSeek={handleSeek} />
        <div className="flex mt-5 justify-around">
          <VolumeRange 
            volume={volume} 
            onVolumeChange={handleVolumeChange} 
            isMuted={isMuted} 
            setIsMuted={setIsMuted} 
            previousVolume={previousVolume} 
          />
          <Controls
            CurrentIndex={currentIndex}
            AudioFiles={audioFiles}
            PlayOrPauseSong={playOrPauseSong}
            IsPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
