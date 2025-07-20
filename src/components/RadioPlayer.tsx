import { useEffect, useRef, useState } from "react"
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

    const [hour, setHour] = useState('')
    const [minut, setMinut] = useState('')
    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const hours = now.getHours()
            const minuts = now.getMinutes()

            const format2digits = (num: number) => num < 10 ? '0' + num : '' + num

            const hours12 = hours % 12
            const minuts60 = minuts % 60

            const hourswithformat = format2digits(hours12 ? hours12 : 12)
            const minutswithformat = format2digits(minuts60 ? minuts60 : 60)

            setHour(hourswithformat)
            setMinut(minutswithformat)
            setDate(now)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000 * 60)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const month = date.getMonth() + 1
    const day = date.getDate()

    const monthname = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ]

    const monthtoname = monthname[month - 1]



    /* https://de1.api.radio-browser.info/json/stations/bycountry/Peru */

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="relative w-[80%] max-w-md">
                <img
                    src={MediaPLayer}
                    alt="Radiomar Logo"
                    className="w-full shadow-lg rounded-xl"
                />
                <div className="flex w-full px-4 absolute top-24 ">
                    <div className="w-[33%] flex-col justify-center">
                        <h2 className="text-zinc-400 text-xl font-bold
  [text-shadow:1px_1px_0_white,-1px_-1px_0_white,-1px_1px_0_white,1px_-1px_0_white]">Viva FM</h2>
                        <p className="inline text-zinc-500">PE</p>
                    </div>
                    <div className="w-[33%] flex justify-center">
                        <h2 className="font-light">tag</h2>
                    </div>
                    <div className="w-[33%] flex flex-col items-end">
                        <p className="inline">{`${hour}:${minut}`}</p>
                        {<p className="inline text-zinc-500">{`${day} ${monthtoname}`}</p>}

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