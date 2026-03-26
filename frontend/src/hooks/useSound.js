// frontend/src/hooks/useSound.js
import { useRef, useEffect, useCallback } from 'react'

const useSound = () => {
    const sendAudioRef = useRef(null)
    const receiveAudioRef = useRef(null)
    const isUnlockedRef = useRef(false)

    // ✅ Preload sounds on mount
    useEffect(() => {
        // Create audio elements
        sendAudioRef.current = new Audio()
        receiveAudioRef.current = new Audio()

        // Set sources
        sendAudioRef.current.src = '/sounds/send.mp3'
        receiveAudioRef.current.src = '/sounds/receive.mp3'

        // Preload
        sendAudioRef.current.preload = 'auto'
        receiveAudioRef.current.preload = 'auto'

        // Set volume
        sendAudioRef.current.volume = 0.5
        receiveAudioRef.current.volume = 0.5

        // ✅ Force load the audio files
        sendAudioRef.current.load()
        receiveAudioRef.current.load()

        // Cleanup
        return () => {
            if (sendAudioRef.current) {
                sendAudioRef.current.pause()
                sendAudioRef.current = null
            }
            if (receiveAudioRef.current) {
                receiveAudioRef.current.pause()
                receiveAudioRef.current = null
            }
        }
    }, [])

    // ✅ Unlock audio on first user interaction (required by mobile browsers)
    useEffect(() => {
        const unlockAudio = () => {
            if (isUnlockedRef.current) return

            // Play and immediately pause to unlock audio context
            if (sendAudioRef.current) {
                sendAudioRef.current.play().then(() => {
                    sendAudioRef.current.pause()
                    sendAudioRef.current.currentTime = 0
                }).catch(() => {})
            }
            if (receiveAudioRef.current) {
                receiveAudioRef.current.play().then(() => {
                    receiveAudioRef.current.pause()
                    receiveAudioRef.current.currentTime = 0
                }).catch(() => {})
            }

            isUnlockedRef.current = true
        }

        // Listen for first interaction
        document.addEventListener('click', unlockAudio, { once: true })
        document.addEventListener('touchstart', unlockAudio, { once: true })
        document.addEventListener('keydown', unlockAudio, { once: true })

        return () => {
            document.removeEventListener('click', unlockAudio)
            document.removeEventListener('touchstart', unlockAudio)
            document.removeEventListener('keydown', unlockAudio)
        }
    }, [])

    // ✅ Play sound function
    const playSound = useCallback((type) => {
        try {
            const audio = type === 'send' ? sendAudioRef.current : receiveAudioRef.current

            if (!audio) return

            // Reset to beginning (allows rapid replays)
            audio.currentTime = 0

            const playPromise = audio.play()

            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log(`Sound (${type}) blocked:`, error.message)
                })
            }
        } catch (error) {
            // Non-critical — don't crash the app
            console.log('Sound error:', error.message)
        }
    }, [])

    return { playSound }
}

export default useSound