import React, { useEffect, useState } from "react";

import { Player } from "./Player";

const Home = () => {

	const [songs, setSongs] = useState([]);
	const [currentSong, setCurrentSong] = useState();
	const [isPlaying, setIsPlaying] = useState(false);

	const audioElem = useRef()

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {

		try {
			const resp = await ferch("https://playground.4geeks.com/sound/songs")
			const data = await resp.json()
			setSongs(await data)
		} catch (error) {
			console.error("error----> ", error)
		}
	}


	const handleSelectedSong = (el) => {
		setCurrentSong(el)
	}






	return (
		<section className="text-center container bg-dark test-white">

			<section>

				<ul>
					{songs.sound?.map((el, i) => <li key={i} onClick={() => handleSelectedSong(songs.sound[i])}>{el.name}</li>)}
				</ul>

			</section>




			<section>
				<audio  
					hidden
					src={currentSong && "https://playground.4geeks.com/apis/fake/sound/" + currentSong.url}
					ref={audioElem}
					autoPlay
				/>
				<player
					currentSong={currentSong}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
			</section>



		</section>
	);
};

export default Home;