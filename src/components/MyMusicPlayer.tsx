import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
const MyMusicPlayer = () => {
    const [IsMenuOpen, setIsMenuOpen] = useState(false);
    const [audioFiles, setAudioFiles] = useState<string[]>([]);
    // Here we made a audioFiles state which saves the array filled with songs path
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    // This shows the currentIndex of the file we are playing
    const [duration, setDuration] = useState(0);
    // Here we set the duration of the current song we are playing
    const [currentTime, setCurrentTime] = useState(0);
    // This shows the current time spend of the currentSong
    const [isPlaying, setIsPlaying] = useState(false);
    // This state saves if the song is playing or not
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // Here we made a audioref ref which saves two elements either html audio element or a null value

    useEffect(() => {
        const modules = import.meta.glob("../../**/*.{mp3,mp4a,wav,ogg,flac}", {
            eager: true,
            import: "default"
        });
        // This is how we import the all kind of audio files from folders and subfolders
        const paths = Object.values(modules) as string[];
        // Here is the path of the object of modules in a array form
        setAudioFiles(paths);
        // here we set those files path as AudioFiles state
    }, []);

    // Attach listeners
    useEffect(() => {
        const audio = audioRef.current;
        // Here we made a audio as audioRef
        if (!audio) return;
        // If not audio then return

        const handleLoadedMetadata = () => setDuration(audio.duration);
        // Here we made a function to set the song duration
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        // Here we made a function to set the song current time
        const handleEnded = () => setIsPlaying(false);
        // Here we made a function to set the playing as false

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        // here we add an event listener to the audio and when metadata get loaded then it will run handleLoadedMetaData
        audio.addEventListener("timeupdate", handleTimeUpdate);
        // here we add an event listener to the audio and when timeupdate then handleTimeUpdate
        audio.addEventListener("ended", handleEnded);
        // here we add an event listener to the audio and when ended then run gandleEnded

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audioRef.current]);
    // This useEffect takes place0 when audioRef.current changes

    const playOrPauseSong = (url: string, index: number) => {
        // Here we made a play and pause function which takes two arguments 
        // 1) url which is file audio path
        // 2) index which is the index of that url
        if (currentIndex !== index) {
            // If the currentIndex is not equal to the index argument then
            if (audioRef.current) {
                // If audioRfe.current si not null then 
                audioRef.current.pause();
                // it will pause the current audio
            }

            const audio = new Audio(url);
            // Here it makes a new Audio and gave the url argument
            audioRef.current = audio;
            // Here we set the const audio as audioRef.current

            // Wait for metadata to load before playing
            audio.addEventListener("loadedmetadata", () => {
                // When the meta data gets loaded then it will run the function
                setDuration(audio.duration); // Set duration here
                // Here we set the duration as the audio
                audio.play().then(() => {
                    // Here we play the audio and the  run a function which sets the isPlaying as true
                    setIsPlaying(true);
                    setCurrentIndex(index);
                    // here we set the currentIndex as the argument index
                }).catch(err => console.error("Playback failed:", err));
                // if we fails to play audio then run an error playback failed
            });
        } else {
            // if current index is same then we will play and pause the song as usual
            if (audioRef.current) {
                if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                } else {
                    audioRef.current.play();
                    setIsPlaying(true);
                }
            }
        }
    };


    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Here we take the argument event
        const newTime = Number(e.target.value);
        // Here we made  a variable name newTime and set the value as e.target.value
        if (audioRef.current) {
            // If the audioRef.current then
            audioRef.current.currentTime = newTime;
            // audioRef.current.currentTime will be newTime
        }
        setCurrentTime(newTime);
        // Here we set the Current Time as newTime
    };
    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full">
            <h2 className="text-lg font-bold mb-4">🎵 My Music Player</h2>
            {audioFiles.map((item, index) => (
                <div className="songContainer my-3 p-2 border rounded" key={index}>
                    <h3 className="font-medium mb-2 text-black">Audio {index + 1}</h3>
                    {/* Here we set the audio anem as  index + 1 so the audio name doesnt include 0 */}
                    <button
                        onClick={() => playOrPauseSong(item, index)}
                        // Here we made a button that runs the funciton playOrPauseSong
                        className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    >
                        {currentIndex === index && isPlaying ? 'Pause' : 'Play'}
                        {/* If the CurrentIndex is equal to the index and isPlaying then pause otherwise Play */}
                    </button>

                    {currentIndex === index && (
                        // If the currentIndex is eqaul to the index then we display the TSX
                        <>
                            <input
                                type="range"
                                min={0}
                                // The minumum value of range is 0
                                max={duration}
                                // The max value is equal to the duration
                                value={currentTime}
                                // The value will be eqaul to the currentTime
                                onChange={handleSeek}
                                // onChnage it truggers the function handleSeek
                                className="w-full mt-2"
                            />
                            <div className="text-sm text-gray-600">
                                {formatTime(currentTime)} / {formatTime(duration)}
                                {/* At first it show the CurrentTime spend and at second it shows the song duration */}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${(hours)}:${minutes}:${seconds}`;
};

export default MyMusicPlayer;