const MusicPlayer = () => {
    return (
        <div className="absolute p-2 h-96 w-96 rounded-2xl bg-white/25 flex flex-col  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <div className="songInfo flex justify-center items-center gap-2 mb-2 h-2/3 bg-white rounded-2xl">
                <div className="h-40 flex items-center justify-center w-40 bg-black rounded-full">
                    <img className="object-cover animate-spinSlow rounded-full h-full w-full" src="https://images.unsplash.com/photo-1747171232839-a5fea879ca59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8" alt="" />
                </div>
                <div className="h-full gap-2 flex flex-col justify-center items-center w-40 text-black">
                    <div className="songName text-center h-45 overflow-y-scroll text-xl font-serif">TU HAI KAHA</div>
                    <div className="authorName">by <span className="font-extrabold text-gray-600">AUR</span></div>
                </div>
            </div>
            <div className="features h-1/3 bg-white rounded-2xl"></div>
        </div>
    );
}

export default MusicPlayer;