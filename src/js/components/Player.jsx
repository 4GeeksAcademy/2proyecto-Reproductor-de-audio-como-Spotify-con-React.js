import React from "react";


export const Player = ({ currentSong, isPlaying, setIsPlaying }) => {

    console.log(isPlaying)


    const PlayPause = () => {

        setIsPlaying(!isPlaying)

    }

    return (

        <div>

            <div>tracker</div>
            <div className="d-flex justify-content-center">

                <div className="mx-2">
                    <span>
                        <i class="fa-solid fa-forward-step"></i>
                    </span>
                </div>

                <div className="mx-2">
                    <span onClick={PlayPause}>
                        <i class={`${isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}`} />
                    </span>
                </div>
                <div className="mx-2">
                    <span>
                        <i class="fa-solid fa-backward-step"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}