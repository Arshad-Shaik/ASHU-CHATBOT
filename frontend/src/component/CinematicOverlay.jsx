// // import React, { useEffect, useState, useRef, useCallback } from 'react'

// // const CinematicOverlay = ({ onComplete }) => {
// //     const [phase, setPhase] = useState('black')
// //     const [displayLetters, setDisplayLetters] = useState([])
// //     const [lockedIndices, setLockedIndices] = useState([])
// //     const [subtitleVisible, setSubtitleVisible] = useState(false)
// //     const [flashIndex, setFlashIndex] = useState(-1)
// //     const audioRef = useRef(null)
// //     const hasInteracted = useRef(false)
// //     const scrambleInterval = useRef(null)

// //     const fullName = "ARSHAD WASIB SHAIK"
// //     const nameArray = fullName.split('')
// //     const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>{}[]|/\\+=*^~"

// //     // ✅ Get random scramble character
// //     const getRandomChar = useCallback(() => {
// //         return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
// //     }, [])

// //     // ✅ Play sound
// //     const playSound = useCallback(() => {
// //         try {
// //             if (audioRef.current) {
// //                 audioRef.current.currentTime = 0
// //                 audioRef.current.volume = 0.6
// //                 audioRef.current.play().catch(() => {})
// //             }
// //         } catch (e) {
// //             console.log('Sound error:', e)
// //         }
// //     }, [])

// //     // ✅ Handle user interaction for sound
// //     useEffect(() => {
// //         const handleInteraction = () => {
// //             if (!hasInteracted.current) {
// //                 hasInteracted.current = true
// //                 playSound()
// //             }
// //         }

// //         window.addEventListener('click', handleInteraction, { once: true })
// //         window.addEventListener('touchstart', handleInteraction, { once: true })

// //         const autoTimer = setTimeout(() => playSound(), 300)

// //         return () => {
// //             window.removeEventListener('click', handleInteraction)
// //             window.removeEventListener('touchstart', handleInteraction)
// //             clearTimeout(autoTimer)
// //         }
// //     }, [playSound])

// //     // ✅ MAIN ANIMATION SEQUENCE
// //     useEffect(() => {
// //         const timers = []

// //         // Initialize all letters as random characters
// //         setDisplayLetters(nameArray.map((char) =>
// //             char === ' ' ? ' ' : getRandomChar()
// //         ))

// //         // Phase 1: Black screen (0 - 0.8s)
// //         // Phase 2: Show scrambling text (0.8s)
// //         timers.push(setTimeout(() => {
// //             setPhase('scramble')
// //         }, 800))

// //         // Start scrambling effect
// //         timers.push(setTimeout(() => {
// //             scrambleInterval.current = setInterval(() => {
// //                 setDisplayLetters(prev =>
// //                     prev.map((char, index) => {
// //                         if (lockedIndices.includes(index)) return nameArray[index]
// //                         if (nameArray[index] === ' ') return ' '
// //                         return getRandomChar()
// //                     })
// //                 )
// //             }, 60)
// //         }, 800))

// //         // Phase 3: Lock letters one by one (1.5s onwards)
// //         nameArray.forEach((char, index) => {
// //             if (char === ' ') {
// //                 timers.push(setTimeout(() => {
// //                     setLockedIndices(prev => [...prev, index])
// //                 }, 1500 + index * 250))
// //                 return
// //             }

// //             timers.push(setTimeout(() => {
// //                 setFlashIndex(index)
// //                 setLockedIndices(prev => [...prev, index])

// //                 // Remove flash after 300ms
// //                 setTimeout(() => {
// //                     setFlashIndex(-1)
// //                 }, 300)
// //             }, 1500 + index * 250))
// //         })

// //         // Phase 4: All locked — show shine (after all letters)
// //         const allLockedTime = 1500 + nameArray.length * 250 + 500
// //         timers.push(setTimeout(() => {
// //             setPhase('locked')
// //             if (scrambleInterval.current) {
// //                 clearInterval(scrambleInterval.current)
// //             }
// //         }, allLockedTime))

// //         // Phase 5: Show subtitle
// //         timers.push(setTimeout(() => {
// //             setSubtitleVisible(true)
// //         }, allLockedTime + 600))

// //         // Phase 6: Shine sweep
// //         timers.push(setTimeout(() => {
// //             setPhase('shine')
// //         }, allLockedTime + 1200))

// //         // Phase 7: Fade out
// //         timers.push(setTimeout(() => {
// //             setPhase('fadeout')
// //         }, allLockedTime + 3000))

// //         // Phase 8: Complete
// //         timers.push(setTimeout(() => {
// //             setPhase('done')
// //             if (onComplete) onComplete()
// //         }, allLockedTime + 4500))

// //         return () => {
// //             timers.forEach(t => clearTimeout(t))
// //             if (scrambleInterval.current) clearInterval(scrambleInterval.current)
// //         }
// //     }, []) // eslint-disable-line react-hooks/exhaustive-deps

// //     // ✅ Update scrambling for unlocked letters
// //     useEffect(() => {
// //         if (phase === 'scramble' || phase === 'locked') {
// //             // Update display letters based on locked state
// //             setDisplayLetters(prev =>
// //                 prev.map((char, index) => {
// //                     if (lockedIndices.includes(index)) return nameArray[index]
// //                     if (nameArray[index] === ' ') return ' '
// //                     return char
// //                 })
// //             )
// //         }
// //     }, [lockedIndices]) // eslint-disable-line react-hooks/exhaustive-deps

// //     // ✅ Keep scrambling unlocked letters
// //     useEffect(() => {
// //         if (phase !== 'scramble') return

// //         const interval = setInterval(() => {
// //             setDisplayLetters(prev =>
// //                 prev.map((char, index) => {
// //                     if (lockedIndices.includes(index)) return nameArray[index]
// //                     if (nameArray[index] === ' ') return ' '
// //                     return getRandomChar()
// //                 })
// //             )
// //         }, 60)

// //         return () => clearInterval(interval)
// //     }, [phase, lockedIndices, getRandomChar]) // eslint-disable-line react-hooks/exhaustive-deps

// //     if (phase === 'done') return null

// //     return (
// //         <div className={`decode-overlay ${phase === 'fadeout' ? 'decode-fadeout' : ''}`}>

// //             {/* Audio */}
// //             <audio ref={audioRef} preload="auto">
// //                 <source src="/sounds/cinematic-reveal.mp3" type="audio/mpeg" />
// //             </audio>

// //             {/* Background Grid Pattern */}
// //             <div className="decode-grid-bg" />

// //             {/* Scan Lines */}
// //             <div className="decode-scanlines" />

// //             {/* Horizontal Accent Line */}
// //             <div className={`decode-h-line ${phase !== 'black' ? 'decode-h-line-expand' : ''}`} />
// //             <div className={`decode-h-line decode-h-line-bottom ${phase !== 'black' ? 'decode-h-line-expand' : ''}`} />

// //             {/* Corner Brackets */}
// //             <div className="decode-corner decode-corner-tl" />
// //             <div className="decode-corner decode-corner-tr" />
// //             <div className="decode-corner decode-corner-bl" />
// //             <div className="decode-corner decode-corner-br" />

// //             {/* Top Status Bar */}
// //             <div className={`decode-status-bar ${phase !== 'black' ? 'decode-status-visible' : ''}`}>
// //                 <span className="decode-status-dot" />
// //                 <span>SYSTEM://IDENTITY_DECODE</span>
// //                 <span className="decode-status-progress">
// //                     [{lockedIndices.filter(i => nameArray[i] !== ' ').length}/{nameArray.filter(c => c !== ' ').length}]
// //                 </span>
// //             </div>

// //             {/* Main Name Display */}
// //             <div className="decode-name-container">

// //                 {/* Decoded Label */}
// //                 <div className={`decode-label ${phase !== 'black' ? 'decode-label-visible' : ''}`}>
// //                     {lockedIndices.length >= nameArray.length ? '▶ IDENTITY CONFIRMED' : '▶ DECODING...'}
// //                 </div>

// //                 {/* Name Letters */}
// //                 <div className="decode-name-wrapper">
// //                     {displayLetters.map((char, index) => {
// //                         const isLocked = lockedIndices.includes(index)
// //                         const isFlashing = flashIndex === index
// //                         const isSpace = nameArray[index] === ' '

// //                         return (
// //                             <span
// //                                 key={index}
// //                                 className={`decode-letter 
// //                                     ${isSpace ? 'decode-space' : ''}
// //                                     ${isLocked && !isSpace ? 'decode-locked' : ''}
// //                                     ${!isLocked && !isSpace && phase === 'scramble' ? 'decode-scrambling' : ''}
// //                                     ${isFlashing ? 'decode-flash' : ''}
// //                                     ${phase === 'shine' && isLocked ? 'decode-shine' : ''}
// //                                 `}
// //                                 style={{
// //                                     animationDelay: phase === 'shine' ? `${index * 0.06}s` : '0s',
// //                                 }}
// //                             >
// //                                 {isSpace ? '\u00A0\u00A0' : char}
// //                             </span>
// //                         )
// //                     })}
// //                 </div>

// //                 {/* Subtitle */}
// //                 <div className={`decode-subtitle ${subtitleVisible ? 'decode-subtitle-visible' : ''}`}>
// //                     <span className="decode-subtitle-bracket">[</span>
// //                     FULL STACK DEVELOPER
// //                     <span className="decode-subtitle-bracket">]</span>
// //                 </div>

// //                 {/* Bottom accent */}
// //                 <div className={`decode-bottom-line ${phase === 'shine' || phase === 'locked' ? 'decode-bottom-line-visible' : ''}`} />
// //             </div>

// //             {/* Glowing Orb Background */}
// //             <div className="decode-orb decode-orb-1" />
// //             <div className="decode-orb decode-orb-2" />

// //             {/* Mobile Tap Hint */}
// //             {phase === 'black' && (
// //                 <div className="decode-tap-hint">
// //                     TAP FOR SOUND
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }

// // export default CinematicOverlay
























// // frontend/src/component/CinematicOverlay.jsx
// import React, { useEffect, useState, useRef, useCallback } from 'react'

// const CinematicOverlay = ({ onComplete }) => {
//     const [phase, setPhase] = useState('waiting')  // 'waiting' = wait for click
//     const [displayLetters, setDisplayLetters] = useState([])
//     const [lockedIndices, setLockedIndices] = useState([])
//     const [subtitleVisible, setSubtitleVisible] = useState(false)
//     const [flashIndex, setFlashIndex] = useState(-1)
//     const [hasStarted, setHasStarted] = useState(false)
//     const audioRef = useRef(null)
//     const scrambleInterval = useRef(null)
//     const timersRef = useRef([])

//     const fullName = "ARSHAD WASIB SHAIK"
//     const nameArray = fullName.split('')
//     const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>{}[]|/\\+=*^~"

//     // ✅ Get random scramble character
//     const getRandomChar = useCallback(() => {
//         return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
//     }, [])

//     // ✅ Play cinematic sound
//     const playSound = useCallback(() => {
//         try {
//             if (audioRef.current) {
//                 audioRef.current.currentTime = 0
//                 audioRef.current.volume = 0.7
//                 audioRef.current.play().catch((err) => {
//                     console.log('Sound play blocked:', err)
//                 })
//             }
//         } catch (e) {
//             console.log('Sound error:', e)
//         }
//     }, [])

//     // ✅ Stop sound and cleanup
//     const stopSound = useCallback(() => {
//         try {
//             if (audioRef.current) {
//                 audioRef.current.pause()
//                 audioRef.current.currentTime = 0
//             }
//         } catch (e) {
//             console.log('Sound stop error:', e)
//         }
//     }, [])

//     // ✅ START ANIMATION — Only called on user click
//     const startAnimation = useCallback(() => {
//         if (hasStarted) return
//         setHasStarted(true)

//         // 🔊 Play sound IMMEDIATELY on click
//         playSound()

//         // Initialize all letters as random characters
//         setDisplayLetters(nameArray.map((char) =>
//             char === ' ' ? ' ' : getRandomChar()
//         ))

//         // Move from 'waiting' to 'black' phase
//         setPhase('black')

//         const timers = []

//         // ═══════════════════════════════════════════════
//         // PHASE 1: Black screen with subtle build (0 - 1.2s)
//         //          (slowed from 0.8s → 1.2s)
//         // ═══════════════════════════════════════════════
//         timers.push(setTimeout(() => {
//             setPhase('scramble')
//         }, 1200))

//         // Start scrambling effect at 1.2s
//         timers.push(setTimeout(() => {
//             scrambleInterval.current = setInterval(() => {
//                 setDisplayLetters(prev =>
//                     prev.map((char, index) => {
//                         if (nameArray[index] === ' ') return ' '
//                         return getRandomChar()
//                     })
//                 )
//             }, 60)
//         }, 1200))

//         // ═══════════════════════════════════════════════
//         // PHASE 2: Lock letters one by one (2.2s onwards)
//         //          (slowed from 1.5s start → 2.2s start)
//         //          (slowed letter gap from 250ms → 350ms)
//         // ═══════════════════════════════════════════════
//         nameArray.forEach((char, index) => {
//             if (char === ' ') {
//                 timers.push(setTimeout(() => {
//                     setLockedIndices(prev => [...prev, index])
//                 }, 2200 + index * 350))
//                 return
//             }

//             timers.push(setTimeout(() => {
//                 setFlashIndex(index)
//                 setLockedIndices(prev => [...prev, index])

//                 // Remove flash after 350ms (slowed from 300ms)
//                 setTimeout(() => {
//                     setFlashIndex(-1)
//                 }, 350)
//             }, 2200 + index * 350))
//         })

//         // ═══════════════════════════════════════════════
//         // PHASE 3: All locked — stop scrambling
//         //          (calculated: 2200 + 18*350 + 800 = ~9300ms)
//         // ═══════════════════════════════════════════════
//         const allLockedTime = 2200 + nameArray.length * 350 + 800

//         timers.push(setTimeout(() => {
//             setPhase('locked')
//             if (scrambleInterval.current) {
//                 clearInterval(scrambleInterval.current)
//             }
//         }, allLockedTime))

//         // ═══════════════════════════════════════════════
//         // PHASE 4: Show subtitle (slowed gap: +900ms)
//         // ═══════════════════════════════════════════════
//         timers.push(setTimeout(() => {
//             setSubtitleVisible(true)
//         }, allLockedTime + 900))

//         // ═══════════════════════════════════════════════
//         // PHASE 5: Shine sweep (slowed gap: +1800ms)
//         // ═══════════════════════════════════════════════
//         timers.push(setTimeout(() => {
//             setPhase('shine')
//         }, allLockedTime + 1800))

//         // ═══════════════════════════════════════════════
//         // PHASE 6: Fade out (slowed gap: +4000ms)
//         // ═══════════════════════════════════════════════
//         timers.push(setTimeout(() => {
//             setPhase('fadeout')
//         }, allLockedTime + 4000))

//         // ═══════════════════════════════════════════════
//         // PHASE 7: Complete — remove overlay
//         //          (slowed gap: +5800ms)
//         // ═══════════════════════════════════════════════
//         timers.push(setTimeout(() => {
//             setPhase('done')
//             stopSound()
//             if (onComplete) onComplete()
//         }, allLockedTime + 5800))

//         timersRef.current = timers

//     }, [hasStarted, playSound, stopSound, nameArray, getRandomChar, onComplete])

//     // ✅ Update scrambling for unlocked letters
//     useEffect(() => {
//         if (phase === 'scramble' || phase === 'locked') {
//             setDisplayLetters(prev =>
//                 prev.map((char, index) => {
//                     if (lockedIndices.includes(index)) return nameArray[index]
//                     if (nameArray[index] === ' ') return ' '
//                     return char
//                 })
//             )
//         }
//     }, [lockedIndices]) // eslint-disable-line react-hooks/exhaustive-deps

//     // ✅ Keep scrambling unlocked letters
//     useEffect(() => {
//         if (phase !== 'scramble') return

//         const interval = setInterval(() => {
//             setDisplayLetters(prev =>
//                 prev.map((char, index) => {
//                     if (lockedIndices.includes(index)) return nameArray[index]
//                     if (nameArray[index] === ' ') return ' '
//                     return getRandomChar()
//                 })
//             )
//         }, 60)

//         return () => clearInterval(interval)
//     }, [phase, lockedIndices, getRandomChar]) // eslint-disable-line react-hooks/exhaustive-deps

//     // ✅ Cleanup on unmount
//     useEffect(() => {
//         return () => {
//             timersRef.current.forEach(t => clearTimeout(t))
//             if (scrambleInterval.current) clearInterval(scrambleInterval.current)
//             stopSound()
//         }
//     }, [stopSound])

//     if (phase === 'done') return null

//     return (
//         <div
//             className={`decode-overlay ${phase === 'fadeout' ? 'decode-fadeout' : ''}`}
//             onClick={!hasStarted ? startAnimation : undefined}
//             onTouchStart={!hasStarted ? startAnimation : undefined}
//             style={{ cursor: !hasStarted ? 'pointer' : 'default' }}
//         >

//             {/* Audio */}
//             <audio ref={audioRef} preload="auto">
//                 <source src="/sounds/cinematic-reveal.mp3" type="audio/mpeg" />
//             </audio>

//             {/* ═══════════════════════════════════ */}
//             {/* WAITING SCREEN — Before user clicks */}
//             {/* ═══════════════════════════════════ */}
//             {phase === 'waiting' && (
//                 <div className="decode-waiting-screen">

//                     {/* Pulsing outer ring */}
//                     <div className="decode-click-ring decode-click-ring-outer" />
//                     <div className="decode-click-ring decode-click-ring-middle" />

//                     {/* Click icon */}
//                     <div className="decode-click-icon">
//                         <svg
//                             width="48"
//                             height="48"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="decode-click-svg"
//                         >
//                             <path
//                                 d="M12 1C12 1 12 1 12 1C12 1 4 5 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 5 12 1 12 1Z"
//                                 stroke="rgba(0, 200, 255, 0.6)"
//                                 strokeWidth="1"
//                                 fill="rgba(0, 200, 255, 0.05)"
//                             />
//                             <path
//                                 d="M8 11L11 8V16L14.5 12.5L17 18L19 17L16.5 11H20L8 11Z"
//                                 fill="rgba(0, 200, 255, 0.7)"
//                             />
//                         </svg>
//                     </div>

//                     {/* Click text */}
//                     <div className="decode-click-text">
//                         CLICK ANYWHERE TO REVEAL
//                     </div>

//                     {/* Subtle hint */}
//                     <div className="decode-click-hint">
//                         🔊 Best experience with sound on
//                     </div>
//                 </div>
//             )}

//             {/* ═══════════════════════════════════ */}
//             {/* ANIMATION ELEMENTS — Show after click */}
//             {/* ═══════════════════════════════════ */}
//             {phase !== 'waiting' && (
//                 <>
//                     {/* Background Grid Pattern */}
//                     <div className="decode-grid-bg" />

//                     {/* Scan Lines */}
//                     <div className="decode-scanlines" />

//                     {/* Horizontal Accent Line */}
//                     <div className={`decode-h-line ${phase !== 'black' ? 'decode-h-line-expand' : ''}`} />
//                     <div className={`decode-h-line decode-h-line-bottom ${phase !== 'black' ? 'decode-h-line-expand' : ''}`} />

//                     {/* Corner Brackets */}
//                     <div className="decode-corner decode-corner-tl" />
//                     <div className="decode-corner decode-corner-tr" />
//                     <div className="decode-corner decode-corner-bl" />
//                     <div className="decode-corner decode-corner-br" />

//                     {/* Top Status Bar */}
//                     <div className={`decode-status-bar ${phase !== 'black' ? 'decode-status-visible' : ''}`}>
//                         <span className="decode-status-dot" />
//                         <span>SYSTEM://IDENTITY_DECODE</span>
//                         <span className="decode-status-progress">
//                             [{lockedIndices.filter(i => nameArray[i] !== ' ').length}/{nameArray.filter(c => c !== ' ').length}]
//                         </span>
//                     </div>

//                     {/* Main Name Display */}
//                     <div className="decode-name-container">

//                         {/* Decoded Label */}
//                         <div className={`decode-label ${phase !== 'black' ? 'decode-label-visible' : ''}`}>
//                             {lockedIndices.length >= nameArray.length ? '▶ IDENTITY CONFIRMED' : '▶ DECODING...'}
//                         </div>

//                         {/* Name Letters */}
//                         <div className="decode-name-wrapper">
//                             {displayLetters.map((char, index) => {
//                                 const isLocked = lockedIndices.includes(index)
//                                 const isFlashing = flashIndex === index
//                                 const isSpace = nameArray[index] === ' '

//                                 return (
//                                     <span
//                                         key={index}
//                                         className={`decode-letter 
//                                             ${isSpace ? 'decode-space' : ''}
//                                             ${isLocked && !isSpace ? 'decode-locked' : ''}
//                                             ${!isLocked && !isSpace && phase === 'scramble' ? 'decode-scrambling' : ''}
//                                             ${isFlashing ? 'decode-flash' : ''}
//                                             ${phase === 'shine' && isLocked ? 'decode-shine' : ''}
//                                         `}
//                                         style={{
//                                             animationDelay: phase === 'shine' ? `${index * 0.06}s` : '0s',
//                                         }}
//                                     >
//                                         {isSpace ? '\u00A0\u00A0' : char}
//                                     </span>
//                                 )
//                             })}
//                         </div>

//                         {/* Subtitle */}
//                         <div className={`decode-subtitle ${subtitleVisible ? 'decode-subtitle-visible' : ''}`}>
//                             <span className="decode-subtitle-bracket">[</span>
//                             FULL STACK DEVELOPER
//                             <span className="decode-subtitle-bracket">]</span>
//                         </div>

//                         {/* Bottom accent */}
//                         <div className={`decode-bottom-line ${phase === 'shine' || phase === 'locked' ? 'decode-bottom-line-visible' : ''}`} />
//                     </div>

//                     {/* Glowing Orb Background */}
//                     <div className="decode-orb decode-orb-1" />
//                     <div className="decode-orb decode-orb-2" />
//                 </>
//             )}
//         </div>
//     )
// }

// export default CinematicOverlay





























// frontend/src/component/CinematicOverlay.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react'

const CinematicOverlay = ({ onComplete }) => {
    const [phase, setPhase] = useState('waiting')
    const [displayLetters, setDisplayLetters] = useState([])
    const [lockedIndices, setLockedIndices] = useState([])
    const [subtitleVisible, setSubtitleVisible] = useState(false)
    const [flashIndex, setFlashIndex] = useState(-1)
    const hasStarted = useRef(false)  // ← Changed to useRef (not useState)
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

    // ✅ Pre-warm audio on mount — so it's ready for instant play on mobile
    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            // Set properties immediately
            audio.volume = 0.7
            audio.preload = 'auto'

            // Force load the audio file
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
        // Prevent double trigger
        if (hasStarted.current) return
        hasStarted.current = true  // ← useRef = synchronous, no re-render delay

        // Prevent event bubbling & default behavior
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        // ═══════════════════════════════════════════════
        // 🔊 CRITICAL: Play audio FIRST — BEFORE any state updates
        //    This MUST be synchronous with the user gesture
        //    No setState, no async, no setTimeout before this
        // ═══════════════════════════════════════════════
        try {
            const audio = audioRef.current
            if (audio) {
                // Reset to beginning
                audio.currentTime = 0
                audio.volume = 0.7

                // Create a play promise — handle both success and failure
                const playPromise = audio.play()

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('✅ Audio playing successfully')
                        })
                        .catch((err) => {
                            console.log('⚠️ Audio play failed, retrying:', err)

                            // Retry once after a tiny delay (still within gesture window on most browsers)
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
        // NOW start the visual animation (after audio.play() is called)
        // ═══════════════════════════════════════════════

        // Initialize all letters as random characters
        setDisplayLetters(nameArray.map((char) =>
            char === ' ' ? ' ' : getRandomChar()
        ))

        // Move from 'waiting' to 'black' phase
        setPhase('black')

        const timers = []

        // ═══════════════════════════════════════════════
        // PHASE 1: Black screen with subtle build (0 - 1.2s)
        // ═══════════════════════════════════════════════
        timers.push(setTimeout(() => {
            setPhase('scramble')
        }, 1200))

        // Start scrambling effect at 1.2s
        timers.push(setTimeout(() => {
            scrambleInterval.current = setInterval(() => {
                setDisplayLetters(prev =>
                    prev.map((char, index) => {
                        if (nameArray[index] === ' ') return ' '
                        return getRandomChar()
                    })
                )
            }, 60)
        }, 1200))

        // ═══════════════════════════════════════════════
        // PHASE 2: Lock letters one by one (2.2s onwards)
        // ═══════════════════════════════════════════════
        nameArray.forEach((char, index) => {
            if (char === ' ') {
                timers.push(setTimeout(() => {
                    setLockedIndices(prev => [...prev, index])
                }, 2200 + index * 350))
                return
            }

            timers.push(setTimeout(() => {
                setFlashIndex(index)
                setLockedIndices(prev => [...prev, index])

                // Remove flash after 350ms
                setTimeout(() => {
                    setFlashIndex(-1)
                }, 350)
            }, 2200 + index * 350))
        })

        // ═══════════════════════════════════════════════
        // PHASE 3: All locked — stop scrambling
        // ═══════════════════════════════════════════════
        const allLockedTime = 2200 + nameArray.length * 350 + 800

        timers.push(setTimeout(() => {
            setPhase('locked')
            if (scrambleInterval.current) {
                clearInterval(scrambleInterval.current)
            }
        }, allLockedTime))

        // ═══════════════════════════════════════════════
        // PHASE 4: Show subtitle
        // ═══════════════════════════════════════════════
        timers.push(setTimeout(() => {
            setSubtitleVisible(true)
        }, allLockedTime + 900))

        // ═══════════════════════════════════════════════
        // PHASE 5: Shine sweep
        // ═══════════════════════════════════════════════
        timers.push(setTimeout(() => {
            setPhase('shine')
        }, allLockedTime + 1800))

        // ═══════════════════════════════════════════════
        // PHASE 6: Fade out
        // ═══════════════════════════════════════════════
        timers.push(setTimeout(() => {
            setPhase('fadeout')
        }, allLockedTime + 4000))

        // ═══════════════════════════════════════════════
        // PHASE 7: Complete — remove overlay
        // ═══════════════════════════════════════════════
        timers.push(setTimeout(() => {
            setPhase('done')
            stopSound()
            if (onComplete) onComplete()
        }, allLockedTime + 5800))

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