import React, { useEffect, useState } from "react";

import { Player } from "./Player";

const Home = () => {

	const [songs, setSongs] = useState([]);
	const [currentSong, setCurrentSong] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	// const [next, setNext] = useState();
	// const [prev, setPrev] = useState();

	const audioElem = useState();


	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		isPlaying ? audioElem.current.play() : audioElem.current.pause();
	}, [isPlaying])

	const getData = async () => {

		try {
			const resp = await fetch("https://playground.4geeks.com/sound/songs")
			const data = await resp.json()
			setSongs(data)
		} catch (error) {
		}
	}


	const handleSelectedSong = (el) => {
		setCurrentSong(el)
	}

	const getIndex = () => {
		const aux = songs.sound.filter((el) => el.id === currentSong.id)
		return songs.sound.indexOf(aux[0])
	}

	const next = () => {
		shuffle ?
			random()
			:
			songs.sound.length === getIndex() + 1
				?
				setCurrentSong(songs.sound[0])
				:
				setCurrentSong(songs.sound[getIndex() + 1])
		setIsPlaying(true)
	}

	const prev = () => {
		0 === getIndex() ?
			setCurrentSong(songs.sound[songs.sound.length - 1])
			:
			setCurrentSong(songs.sound[getIndex() - 1])
		setIsPlaying(true)
	}


	const random = () => {
		setCurrentSong(songs.sound[Math.floor(Math.random() * songs.sound.length)])
		setIsPlaying(true)
	}

	const onPlaying = () => {
		const duration = audioElem.current.duration;
		const current = audioElem.current.currentTime;
		setCurrentSong({
			...currentSong,
			"progress": (current / duration) * 100,
			length: duration,
			current: current
		})
	}




	return (
		<section className="text-center container bg-dark test-white d-flex align-items-center row">

			<section className="d-flex container col-2">
				<div className="playlist overflow-y-auto">
					<ul className="list-group">
						{songs.sound?.map((el, i) => <li className={`list-group-item dg-dark ${currentSong && el.name === currentSong.name ? "active" : ""}`} key={i} onClick={() => handleSelectedSong(songs.sound[i])}>{el.name}</li>)}
					</ul>
				</div>

			</section>




			<section className="container de-flex col-10">
				<audio
					hidden
					src={currentSong && "https://playground.4geeks.com/apis/fake/sound/" + currentSong.url}
					ref={audioElem}
					autoPlay
					onPlaying={onPlaying}
					onEnded={next}
					onTimeUpdate={onPlaying}
				/>
				<player
					currentSong={currentSong}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					audioElem={audioElem}
					setSong={setSongs}
					next={next}
					prev={prev}
					random={random}



				/>
			</section>



		</section>
	);
};

export default Home;