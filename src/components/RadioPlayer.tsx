import { useRef, useState } from "react"
import { FetchApi } from "../utils/FetchApi"
import MediaPLayer from '../assets/MediaPlayer.png'

const RadioPlayer = () => {
    const streamUrl = 'https://tupanel.info:8780/stream'
    const [playing, SetPlaying] = useState(false)
    const AudioRef = useRef<HTMLAudioElement>(null)

    const tigger = () => {
        if (!AudioRef.current) return

        playing ? AudioRef.current.pause() : AudioRef.current.play()
        SetPlaying(!playing)
        FetchApi()
    }

    /* https://de1.api.radio-browser.info/json/stations/bycountry/Peru */

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="relative w-[80%] max-w-md">
                <img
                    src={MediaPLayer}
                    alt="Radiomar Logo"
                    className="w-full shadow-lg rounded-xl"
                />

                <button
                    onClick={tigger}
                    className="absolute bottom-96 right-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition-all"
                >
                    {playing ? "⏸️" : "▶️"}
                </button>
            </div>

            <audio ref={AudioRef} src={streamUrl} preload="none" />
        </div>
    )
}

export default RadioPlayer