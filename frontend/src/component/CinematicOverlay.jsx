// frontend/src/component/CinematicOverlay.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react'

const CinematicOverlay = ({ onComplete }) => {
    const [phase, setPhase] = useState('waiting')
    const [displayLetters, setDisplayLetters] = useState([])
    const [lockedIndices, setLockedIndices] = useState([])
    const [subtitleVisible, setSubtitleVisible] = useState(false)
    const [flashIndex, setFlashIndex] = useState(-1)
    const hasStarted = useRef(false)
    const audioRef = useRef(null)
    const scrambleInterval = useRef(null)
    const timersRef = useRef([])

    const fullName = "ARSHAD WASIB SHAIK"
    const nameArray = fullName.split('')
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>{}[]|/\\+=*^~"

    
    // ✅ Get random scramble character
    const getRandomChar = useCallback(() => {
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
    }, [])

    // ✅ Pre-warm audio on mount
    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            audio.volume = 0.7
            audio.preload = 'auto'
            audio.load()
        }
    }, [])

    // ✅ Stop sound and cleanup
    const stopSound = useCallback(() => {
        try {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
            }
        } catch (e) {
            console.log('Sound stop error:', e)
        }
    }, [])

    // ✅ START ANIMATION — Called on user click/touch
    const startAnimation = useCallback((e) => {
        if (hasStarted.current) return
        hasStarted.current = true

        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        // ═══════════════════════════════════════════════
        // 🔊 CRITICAL: Play audio FIRST — BEFORE any state updates
        // ═══════════════════════════════════════════════
        try {
            const audio = audioRef.current
            if (audio) {
                audio.currentTime = 0
                audio.volume = 0.7

                const playPromise = audio.play()

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('✅ Audio playing successfully')
                        })
                        .catch((err) => {
                            console.log('⚠️ Audio play failed, retrying:', err)
                            setTimeout(() => {
                                audio.play().catch(() => {
                                    console.log('❌ Audio retry also failed')
                                })
                            }, 50)
                        })
                }
            }
        } catch (err) {
            console.log('Audio error:', err)
        }

        // ═══════════════════════════════════════════════
        // NOW start the visual animation
        // ═══════════════════════════════════════════════

        setDisplayLetters(nameArray.map((char) =>
            char === ' ' ? ' ' : getRandomChar()
        ))

        setPhase('black')

        const timers = []

        

        
        timers.push(setTimeout(() => {
            setPhase('scramble')
        }, 2000))

        // Start scrambling effect at 2.0s
        timers.push(setTimeout(() => {
            scrambleInterval.current = setInterval(() => {
                setDisplayLetters(prev =>
                    prev.map((char, index) => {
                        if (nameArray[index] === ' ') return ' '
                        return getRandomChar()
                    })
                )
            }, 60)
        }, 2000))

       


        nameArray.forEach((char, index) => {
            if (char === ' ') {
                timers.push(setTimeout(() => {
                    setLockedIndices(prev => [...prev, index])
                }, 3500 + index * 500))
                return
            }

            timers.push(setTimeout(() => {
                setFlashIndex(index)
                setLockedIndices(prev => [...prev, index])

                // Remove flash after 400ms (was 350ms)
                setTimeout(() => {
                    setFlashIndex(-1)
                }, 400)
            }, 3500 + index * 500))
        })

        


        const allLockedTime = 3500 + nameArray.length * 500 + 1200

        timers.push(setTimeout(() => {
            setPhase('locked')
            if (scrambleInterval.current) {
                clearInterval(scrambleInterval.current)
            }
        }, allLockedTime))

       


        timers.push(setTimeout(() => {
            setSubtitleVisible(true)
        }, allLockedTime + 1500))

    


        timers.push(setTimeout(() => {
            setPhase('shine')
        }, allLockedTime + 2500))

        


        timers.push(setTimeout(() => {
            setPhase('fadeout')
        }, allLockedTime + 5500))

      


        timers.push(setTimeout(() => {
            setPhase('done')
            stopSound()
            if (onComplete) onComplete()
        }, allLockedTime + 7500))

        timersRef.current = timers

    }, [nameArray, getRandomChar, onComplete, stopSound])

    // ✅ Update scrambling for unlocked letters
    useEffect(() => {
        if (phase === 'scramble' || phase === 'locked') {
            setDisplayLetters(prev =>
                prev.map((char, index) => {
                    if (lockedIndices.includes(index)) return nameArray[index]
                    if (nameArray[index] === ' ') return ' '
                    return char
                })
            )
        }
    }, [lockedIndices]) // eslint-disable-line react-hooks/exhaustive-deps

    // ✅ Keep scrambling unlocked letters
    useEffect(() => {
        if (phase !== 'scramble') return

        const interval = setInterval(() => {
            setDisplayLetters(prev =>
                prev.map((char, index) => {
                    if (lockedIndices.includes(index)) return nameArray[index]
                    if (nameArray[index] === ' ') return ' '
                    return getRandomChar()
                })
            )
        }, 60)

        return () => clearInterval(interval)
    }, [phase, lockedIndices, getRandomChar]) // eslint-disable-line react-hooks/exhaustive-deps

    // ✅ Cleanup on unmount
    useEffect(() => {
        return () => {
            timersRef.current.forEach(t => clearTimeout(t))
            if (scrambleInterval.current) clearInterval(scrambleInterval.current)
            stopSound()
        }
    }, [stopSound])

    if (phase === 'done') return null

    return (
        <div
            className={`decode-overlay ${phase === 'fadeout' ? 'decode-fadeout' : ''}`}
            onClick={!hasStarted.current ? startAnimation : undefined}
            onTouchEnd={!hasStarted.current ? startAnimation : undefined}
            style={{
                cursor: !hasStarted.current ? 'pointer' : 'default',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
            }}
        >

            {/* ✅ Audio — with mobile-specific attributes */}
            <audio
                ref={audioRef}
                preload="auto"
                playsInline
                webkit-playsinline="true"
                x-webkit-airplay="allow"
                controlsList="nodownload"
                style={{ display: 'none' }}
            >
                <source src="/sounds/cinematic-reveal.mp3" type="audio/mpeg" />
                <source src="/sounds/cinematic-reveal.mp3" type="audio/mp3" />
            </audio>

            {/* ═══════════════════════════════════ */}
            {/* WAITING SCREEN — Before user clicks */}
            {/* ═══════════════════════════════════ */}
            {phase === 'waiting' && (
                <div className="decode-waiting-screen">

                    {/* Pulsing outer ring */}
                    <div className="decode-click-ring decode-click-ring-outer" />
                    <div className="decode-click-ring decode-click-ring-middle" />

                    {/* Click icon */}
                    <div className="decode-click-icon">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="decode-click-svg"
                        >
                            <path
                                d="M12 1C12 1 12 1 12 1C12 1 4 5 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 5 12 1 12 1Z"
                                stroke="rgba(0, 200, 255, 0.6)"
                                strokeWidth="1"
                                fill="rgba(0, 200, 255, 0.05)"
                            />
                            <path
                                d="M8 11L11 8V16L14.5 12.5L17 18L19 17L16.5 11H20L8 11Z"
                                fill="rgba(0, 200, 255, 0.7)"
                            />
                        </svg>
                    </div>

                    {/* Click text */}
                    <div className="decode-click-text">
                        CLICK ANYWHERE TO REVEAL
                    </div>

                    {/* Subtle hint */}
                    <div className="decode-click-hint">
                        🔊 Best experience with sound on
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════ */}
            {/* ANIMATION ELEMENTS — Show after click */}
            {/* ═══════════════════════════════════ */}
            {phase !== 'waiting' && (
                <>
                    {/* Background Grid Pattern */}
                    <div className="decode-grid-bg" />

                    {/* Scan Lines */}
                    <div className="decode-scanlines" />

                    {/* Horizontal Accent Line */}
                    <div className={`decode-h-line ${phase !== 'black' ? 'decode-h-line-expand' : ''}`} />
                    <div className={`decode-h-line decode-h-line-bottom ${phase !== 'black' ? 'decode-h-line-expand' : ''}`} />

                    {/* Corner Brackets */}
                    <div className="decode-corner decode-corner-tl" />
                    <div className="decode-corner decode-corner-tr" />
                    <div className="decode-corner decode-corner-bl" />
                    <div className="decode-corner decode-corner-br" />

                    {/* Top Status Bar */}
                    <div className={`decode-status-bar ${phase !== 'black' ? 'decode-status-visible' : ''}`}>
                        <span className="decode-status-dot" />
                        <span>SYSTEM://IDENTITY_DECODE</span>
                        <span className="decode-status-progress">
                            [{lockedIndices.filter(i => nameArray[i] !== ' ').length}/{nameArray.filter(c => c !== ' ').length}]
                        </span>
                    </div>

                    {/* Main Name Display */}
                    <div className="decode-name-container">

                        {/* Decoded Label */}
                        <div className={`decode-label ${phase !== 'black' ? 'decode-label-visible' : ''}`}>
                            {lockedIndices.length >= nameArray.length ? '▶ IDENTITY CONFIRMED' : '▶ DECODING...'}
                        </div>

                        {/* Name Letters */}
                        <div className="decode-name-wrapper">
                            {displayLetters.map((char, index) => {
                                const isLocked = lockedIndices.includes(index)
                                const isFlashing = flashIndex === index
                                const isSpace = nameArray[index] === ' '

                                return (
                                    <span
                                        key={index}
                                        className={`decode-letter 
                                            ${isSpace ? 'decode-space' : ''}
                                            ${isLocked && !isSpace ? 'decode-locked' : ''}
                                            ${!isLocked && !isSpace && phase === 'scramble' ? 'decode-scrambling' : ''}
                                            ${isFlashing ? 'decode-flash' : ''}
                                            ${phase === 'shine' && isLocked ? 'decode-shine' : ''}
                                        `}
                                        style={{
                                            animationDelay: phase === 'shine' ? `${index * 0.06}s` : '0s',
                                        }}
                                    >
                                        {isSpace ? '\u00A0\u00A0' : char}
                                    </span>
                                )
                            })}
                        </div>

                        {/* Subtitle */}
                        <div className={`decode-subtitle ${subtitleVisible ? 'decode-subtitle-visible' : ''}`}>
                            <span className="decode-subtitle-bracket">[</span>
                            FULL STACK DEVELOPER
                            <span className="decode-subtitle-bracket">]</span>
                        </div>

                        {/* Bottom accent */}
                        <div className={`decode-bottom-line ${phase === 'shine' || phase === 'locked' ? 'decode-bottom-line-visible' : ''}`} />
                    </div>

                    {/* Glowing Orb Background */}
                    <div className="decode-orb decode-orb-1" />
                    <div className="decode-orb decode-orb-2" />
                </>
            )}
        </div>
    )
}

export default CinematicOverlay




