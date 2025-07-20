import { useRef, useState } from "react"
import { FetchApi } from "../utils/FetchApi"
import MediaPLayer from '../assets/MediaPlayer.png'
import { CaretRightOutlined, MutedOutlined, PauseOutlined, SoundOutlined } from "@ant-design/icons"

const RadioPlayer = () => {
    const streamUrl = 'https://tupanel.info:8780/stream'
    const [playing, SetPlaying] = useState(false)
    const [muted, SetMuted] = useState(false)
    const AudioRef = useRef<HTMLAudioElement>(null)

    const tigger = () => {
        if (!AudioRef.current) return

        playing ? AudioRef.current.pause() : AudioRef.current.play()

        SetPlaying(!playing)
        SetMuted(!muted)
        FetchApi()
    }
    const tiggerMuted = () => {
        if (!AudioRef.current) return

        playing ? AudioRef.current.muted = false : AudioRef.current.muted = true
        // console.log(muted)
        SetMuted(!muted)
    }
    const now = new Date()
    const hour = now.getHours()
    const minuts = now.getMinutes()


    /* https://de1.api.radio-browser.info/json/stations/bycountry/Peru */

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="relative w-[80%] max-w-md">
                <img
                    src={MediaPLayer}
                    alt="Radiomar Logo"
                    className="w-full shadow-lg rounded-xl"
                />
                <div className="flex">
                    <div>
                        <h2 className="text-2xl font-bold uppercase">Viva FM</h2>
                        <p>PE</p>
                    </div>
                    <div>
                        <h2 className="font-light">tag</h2>
                    </div>
                    <div>
                        <p></p>
                    </div>
                </div>

                <button
                    onClick={tigger}
                    className="absolute top-48 left-33  bg-transparent  text-zinc-500 text-4xl px-6 py-6 rounded-full  hover:bg-purple-700 transition-all"
                >
                    {playing ? <PauseOutlined /> : <CaretRightOutlined />}
                </button>
                <button
                    onClick={tiggerMuted}
                    className="absolute top-48 left-61  bg-transparent  text-zinc-500 text-4xl px-6 py-6 rounded-full"
                >
                    {muted ? <SoundOutlined /> : <MutedOutlined />}
                </button>
            </div>

            <audio ref={AudioRef} src={streamUrl} preload="none" />
        </div>
    )
}

export default RadioPlayer