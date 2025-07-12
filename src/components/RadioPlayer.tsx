import { useRef, useState } from "react"

const RadioPlayer = () => {
    const streamUrl = 'https://us-b4-p-e-zs14-audio.cdn.mdstrm.com/live-audio-aw/6598b62dded1380470f4e539?aid=658ddcc0b2c7835d48fee06d&pid=XLFiuJSjaTqslpJK7KcUKZdfbeWg3C2G&sid=pzSMpF45o58PiHchC84Kkk42G1960xHw&uid=5DfC18rbwPSz6buBsxC8sZoTRfoSl60S&es=us-b4-p-e-zs14-audio.cdn.mdstrm.com&ote=1752088208835&ot=6sheWchU9zwMUhIFYkU-6w&proto=https&pz=us&cP=128000&awCollectionId=658ddcc0b2c7835d48fee06d&liveId=6598b62dded1380470f4e539&listenerId=5DfC18rbwPSz6buBsxC8sZoTRfoSl60S'
    const [playing, SetPlaying] = useState(false)
    const AudioRef = useRef<HTMLAudioElement>(null)

    const tigger = () => {
        if (!AudioRef.current) return

        playing ? AudioRef.current.pause() : AudioRef.current.play()
        SetPlaying(!playing)
    }
    /* https://de1.api.radio-browser.info/json/stations/bycountry/Peru */

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl text-center">
            <img
                src="https://cdn.radios.com.pe/logos/radiomar.png"
                alt="Radiomar Logo"
                className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">Stereo Lima</h2>
            <p className="text-gray-600 mb-4">¡Escucha Rock n Pop en vivo desde Lima, Perú!</p>

            <button
                onClick={tigger}
                className="bg-purple-600 text-white px-6 py-2 rounded-full text-lg hover:bg-purple-700 transition-all"
            >
                {playing ? "⏸️ Pausar" : "▶️ Reproducir Radiomar"}
            </button>

            <audio ref={AudioRef} src={streamUrl} preload="none" />
        </div>
    )
}

export default RadioPlayer