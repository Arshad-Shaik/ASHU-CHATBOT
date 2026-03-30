import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import useSound from '../hooks/useSound';
import CustomCursor from './CustomCursor';

function Bot() {

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4002";

    // ✅ Load messages from sessionStorage (persists on refresh, clears on tab close)
    const [messages, setMessages] = useState(() => {
        const saved = sessionStorage.getItem('chatMessages')
        return saved ? JSON.parse(saved) : []
    })
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [showWelcome, setShowWelcome] = useState(() => {
        const saved = sessionStorage.getItem('chatMessages')
        return !saved || JSON.parse(saved).length === 0
    })
    const [typedText, setTypedText] = useState("")
    const [isTypingDone, setIsTypingDone] = useState(() => {
        const saved = sessionStorage.getItem('typingDone')
        return saved === 'true'
    })
    const [showThread, setShowThread] = useState(false)
    const [hasSpokenOnce, setHasSpokenOnce] = useState(() => {
        return sessionStorage.getItem('hasSpoken') === 'true'
    })

    // ✅ Notepad-List States
    const [showNotepad, setShowNotepad] = useState(false)
    const [notepadSections, setNotepadSections] = useState([])
    const [isVibrating, setIsVibrating] = useState(false)

    const messagesEndRef = useRef(null)
    const notepadRef = useRef(null)

    const welcomeFullText = "👋 🤩 Hi, I'm 🤖 Ashu the Great ChatBot with Limited Knowledge Base."

    // ✅ ADD THIS LINE (after all useState declarations)
    const { playSound } = useSound()

    // ✅ Known questions list (to detect irrelevant questions)
    const knownQuestions = [
        "hello", "hi", "hey", "can we become friend", "how are you",
        "what is your name", "who made you", "tell me a joke", "what is the time",
        "bye", "thank you", "thanks", "i love you", "where are you from", "what can you do",
        "what is python", "what is java", "what is javascript", "what is c language",
        "what is c++", "what is typescript", "what is html", "what is css", "what is sql",
        "what is go language", "what is rust", "what is kotlin", "what is swift",
        "what is php", "what is ruby", "what is r language", "what is scala", "what is perl",
        "what is data structure", "what is array", "what is linked list", "what is stack",
        "what is queue", "what is tree", "what is binary search tree", "what is graph",
        "what is hash table", "what is heap", "what is trie", "what is recursion",
        "what is an algorithm", "what is sorting", "what is binary search",
        "what is dynamic programming", "what is greedy algorithm", "what is backtracking",
        "what is bfs", "what is dfs", "what is time complexity", "what is space complexity",
        "what is big o notation", "what is bubble sort", "what is merge sort",
        "what is quick sort", "what is dijkstra algorithm", "what is two pointer technique",
        "what is sliding window", "what is topological sort",
        "what is react", "what is reactjs", "what is nodejs", "what is expressjs",
        "what is mongodb", "what is nosql", "what is mongoose", "what is rest api",
        "what is mern stack", "what is jwt", "what is middleware", "what is virtual dom",
        "what are react hooks", "what is redux",
        "who is prime minister of india", "what is president of india",
        "who is president of india", "who is president of usa", "what is democracy",
        "what is constitution of india", "what is g20", "what is united nations",
        "what is nato", "what is brics", "what is parliament of india",
        "what is supreme court of india", "what is election commission of india",
        "who is chief minister",
        "what is software engineer", "what is frontend developer", "what is backend developer",
        "what is fullstack developer", "what is devops engineer", "what is data scientist",
        "what is data analyst", "what is machine learning engineer", "what is cloud engineer",
        "what is cybersecurity analyst", "what is product manager", "what is qa engineer",
        "what is ui ux designer", "what is blockchain developer",
        "what is docker", "what is kubernetes", "what is git", "what is github",
        "what is ci cd", "what is agile", "what is api", "what is microservices",
        "what is cloud computing", "what is aws", "what is linux",
        "what is oops", "what is encapsulation", "what is inheritance",
        "what is polymorphism", "what is abstraction", "what is design pattern",
        "what is thinkly labs", "who is the founder of thinkly labs",
        "where is thinkly labs located", "when was thinkly labs started",
        "why was thinkly labs established", "tell me about thinkly labs",
        "what services does thinkly labs provide", "what technologies does thinkly labs use",
        "tell me about yourself", "why should we hire you", "what is leadership",
        "who is virat kohli", "what is ipl"
    ]

    // ✅ Check if question is known
    const isKnownQuestion = useCallback((text) => {
        return knownQuestions.includes(text.trim().toLowerCase())
    }, [])

    // ============================== 
    // NOTEPAD-LIST: All Questions Organized by Sections
    // ============================== 
    const allSections = [
        {
            title: "💬 General / Greetings",
            icon: "👋",
            questions: [
                "hello", "hi", "hey", "can we become friend", "how are you",
                "what is your name", "who made you", "tell me a joke",
                "what is the time", "bye", "thank you", "thanks",
                "i love you", "where are you from", "what can you do"
            ]
        },
        {
            title: "💻 Programming Languages",
            icon: "🖥️",
            questions: [
                "what is python", "what is java", "what is javascript",
                "what is c language", "what is c++", "what is typescript",
                "what is html", "what is css", "what is sql",
                "what is go language", "what is rust", "what is kotlin",
                "what is swift", "what is php", "what is ruby",
                "what is r language", "what is scala", "what is perl"
            ]
        },
        {
            title: "📊 Data Structures",
            icon: "🏗️",
            questions: [
                "what is data structure", "what is array", "what is linked list",
                "what is stack", "what is queue", "what is tree",
                "what is binary search tree", "what is graph", "what is hash table",
                "what is heap", "what is trie", "what is recursion"
            ]
        },
        {
            title: "⚡ Algorithms",
            icon: "🧮",
            questions: [
                "what is an algorithm", "what is sorting", "what is binary search",
                "what is dynamic programming", "what is greedy algorithm",
                "what is backtracking", "what is bfs", "what is dfs",
                "what is time complexity", "what is space complexity",
                "what is big o notation", "what is bubble sort", "what is merge sort",
                "what is quick sort", "what is dijkstra algorithm",
                "what is two pointer technique", "what is sliding window",
                "what is topological sort"
            ]
        },
        {
            title: "🌐 Web Development (MERN Stack)",
            icon: "🚀",
            questions: [
                "what is react", "what is reactjs", "what is nodejs",
                "what is expressjs", "what is mongodb", "what is nosql",
                "what is mongoose", "what is rest api", "what is mern stack",
                "what is jwt", "what is middleware", "what is virtual dom",
                "what are react hooks", "what is redux"
            ]
        },
        {
            title: "🏛️ Political Knowledge",
            icon: "🗳️",
            questions: [
                "who is prime minister of india", "what is president of india",
                "who is president of india", "who is president of usa",
                "what is democracy", "what is constitution of india",
                "what is g20", "what is united nations", "what is nato",
                "what is brics", "what is parliament of india",
                "what is supreme court of india", "what is election commission of india",
                "who is chief minister"
            ]
        },
        {
            title: "👨‍💻 IT Tech Roles",
            icon: "💼",
            questions: [
                "what is software engineer", "what is frontend developer",
                "what is backend developer", "what is fullstack developer",
                "what is devops engineer", "what is data scientist",
                "what is data analyst", "what is machine learning engineer",
                "what is cloud engineer", "what is cybersecurity analyst",
                "what is product manager", "what is qa engineer",
                "what is ui ux designer", "what is blockchain developer"
            ]
        },
        {
            title: "🔧 Tools & Technologies",
            icon: "⚙️",
            questions: [
                "what is docker", "what is kubernetes", "what is git",
                "what is github", "what is ci cd", "what is agile",
                "what is api", "what is microservices", "what is cloud computing",
                "what is aws", "what is linux"
            ]
        },
        {
            title: "🧱 OOP Concepts",
            icon: "🏗️",
            questions: [
                "what is oops", "what is encapsulation", "what is inheritance",
                "what is polymorphism", "what is abstraction", "what is design pattern"
            ]
        },
        {
            title: "🏢 Thinkly Labs",
            icon: "🔬",
            questions: [
                "what is thinkly labs", "who is the founder of thinkly labs",
                "where is thinkly labs located", "when was thinkly labs started",
                "why was thinkly labs established", "tell me about thinkly labs",
                "what services does thinkly labs provide",
                "what technologies does thinkly labs use"
            ]
        },
        {
            title: "🎤 Interview Preparation",
            icon: "📝",
            questions: [
                "tell me about yourself", "why should we hire you", "what is leadership"
            ]
        },
        {
            title: "🏏 Sports",
            icon: "⚽",
            questions: [
                "who is virat kohli", "what is ipl"
            ]
        }
    ]

    // ✅ Fisher-Yates Shuffle Algorithm
    const shuffleArray = useCallback((array) => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }, [])

    // ✅ Initialize sections
    useEffect(() => {
        setNotepadSections(shuffleArray(allSections))
    }, [])

    // ✅ Shuffle sections every 30 seconds
    useEffect(() => {
        const shuffleInterval = setInterval(() => {
            setNotepadSections(prev => shuffleArray(prev))
        }, 30000)

        return () => clearInterval(shuffleInterval)
    }, [shuffleArray])

    // ✅ Vibrate notepad icon every 15 seconds
    useEffect(() => {
        const vibrateInterval = setInterval(() => {
            setIsVibrating(true)
            setTimeout(() => setIsVibrating(false), 1000)
        }, 15000)

        const initialTimeout = setTimeout(() => {
            setIsVibrating(true)
            setTimeout(() => setIsVibrating(false), 1000)
        }, 2000)

        return () => {
            clearInterval(vibrateInterval)
            clearTimeout(initialTimeout)
        }
    }, [])

    // ✅ Close notepad when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notepadRef.current && !notepadRef.current.contains(event.target)) {
                if (!event.target.closest('.notepad-trigger-btn')) {
                    setShowNotepad(false)
                }
            }
        }

        if (showNotepad) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showNotepad])

    // ✅ Handle question click from Notepad-List
    const handleQuestionClick = (question) => {
        setInput(question)
        setShowNotepad(false)
    }

    // ✅ Save messages to sessionStorage whenever they change
    useEffect(() => {
        sessionStorage.setItem('chatMessages', JSON.stringify(messages))
    }, [messages])

    // ✅ Save typing done state
    useEffect(() => {
        if (isTypingDone) {
            sessionStorage.setItem('typingDone', 'true')
        }
    }, [isTypingDone])

    // ✅ Get current time in 12-hour format
    const getCurrentTime = () => {
        const now = new Date()
        let hours = now.getHours()
        const minutes = now.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12
        return `${hours}:${minutes} ${ampm}`
    }

    // ✅ TypeWriter Effect — runs only once on first visit
    useEffect(() => {
        if (!showWelcome || isTypingDone) {
            if (isTypingDone && showWelcome) {
                setTypedText(welcomeFullText)
            }
            return
        }

        let index = 0
        const timer = setInterval(() => {
            if (index < welcomeFullText.length) {
                setTypedText(welcomeFullText.slice(0, index + 1))
                index++
            } else {
                clearInterval(timer)
                setIsTypingDone(true)
            }
        }, 50)

        return () => clearInterval(timer)
    }, [showWelcome, isTypingDone])

    // ✅ Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    // ✅ Hide welcome text when user sends first message
    useEffect(() => {
        if (messages.length > 0) {
            setShowWelcome(false)
        }
    }, [messages])

    // ✅ Speak function — FIRST CLICK ONLY (ever)
    const speakOnce = useCallback(() => {
        if (hasSpokenOnce) return

        const utterance = new SpeechSynthesisUtterance(
            "I'm Ashu The Great ChatBot with Limited Knowledge Base"
        )

        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices()
            const maleVoice = voices.find(voice =>
                voice.name.toLowerCase().includes('david') ||
                voice.name.toLowerCase().includes('james') ||
                voice.name.toLowerCase().includes('mark') ||
                voice.name.toLowerCase().includes('google uk english male') ||
                voice.name.toLowerCase().includes('microsoft david') ||
                voice.name.toLowerCase().includes('microsoft mark') ||
                voice.name.toLowerCase().includes('daniel') ||
                voice.name.toLowerCase().includes('male')
            )

            if (maleVoice) {
                utterance.voice = maleVoice
            }

            utterance.rate = 0.9
            utterance.pitch = 0.8
            utterance.volume = 1.0
            utterance.lang = 'en-US'

            window.speechSynthesis.cancel()
            window.speechSynthesis.speak(utterance)
        }

        if (window.speechSynthesis.getVoices().length > 0) {
            setVoice()
        } else {
            window.speechSynthesis.onvoiceschanged = setVoice
        }

        setHasSpokenOnce(true)
        sessionStorage.setItem('hasSpoken', 'true')
    }, [hasSpokenOnce])

    // ✅ Robot Circle Click Handler
    const handleRobotClick = useCallback(() => {
        setShowThread(prev => !prev)

        if (!showThread && !hasSpokenOnce) {
            speakOnce()
        }
    }, [showThread, hasSpokenOnce, speakOnce])

    // ✅ Send Message with Tick Marks + Sounds
    const handleSendMessage = async () => {
        if (!input.trim()) return
        const timestamp = getCurrentTime()
        const isKnown = isKnownQuestion(input)

        // ✅ Play SEND sound
        playSound('send')

        // ✅ Add user message with 'sent' tick status
        const userMsg = {
            text: input.trim(),
            sender: 'user',
            time: timestamp,
            tickStatus: 'sent',       // Single tick initially
            isKnown: isKnown          // Track if question was known
        }
        setMessages(prev => [...prev, userMsg])
        const userInput = input
        setInput("")
        setLoading(true)

        try {
            const res = await axios.post(`${API_URL}/bot/v1/message`, {
                text: userInput
            })

            if (res.status === 200) {
                const thinkingDelay = Math.floor(Math.random() * 1500) + 1500

                setTimeout(() => {
                    // ✅ Play RECEIVE sound
                    playSound('receive')

                    const botTimestamp = getCurrentTime()

                    // ✅ Check if bot gave default response (irrelevant question)
                    const isDefaultResponse = res.data.botMessage.startsWith("I'm sorry, I didn't understand")

                    // ✅ Update USER message tick: sent → delivered OR sent → error
                    setMessages(prev => {
                        const updated = [...prev]
                        // Find the last user message and update its tick
                        for (let i = updated.length - 1; i >= 0; i--) {
                            if (updated[i].sender === 'user' && updated[i].tickStatus === 'sent') {
                                updated[i] = {
                                    ...updated[i],
                                    tickStatus: isDefaultResponse ? 'error' : 'delivered'
                                }
                                break
                            }
                        }
                        return updated
                    })

                    // ✅ Add bot message with appropriate tick
                    const botMsg = {
                        text: res.data.botMessage,
                        sender: 'bot',
                        time: botTimestamp,
                        tickStatus: isDefaultResponse ? 'error' : 'delivered',
                        isKnown: !isDefaultResponse
                    }
                    setMessages(prev => [...prev, botMsg])
                    setLoading(false)
                }, thinkingDelay)
            }
        } catch (error) {
            console.log("Error sending message:", error)

            setTimeout(() => {
                playSound('receive')

                // ✅ Update user message tick to error
                setMessages(prev => {
                    const updated = [...prev]
                    for (let i = updated.length - 1; i >= 0; i--) {
                        if (updated[i].sender === 'user' && updated[i].tickStatus === 'sent') {
                            updated[i] = { ...updated[i], tickStatus: 'error' }
                            break
                        }
                    }
                    return updated
                })

                const errorMsg = {
                    text: "Sorry, something went wrong! Please try again.",
                    sender: 'bot',
                    time: getCurrentTime(),
                    tickStatus: 'error',
                    isKnown: false
                }
                setMessages(prev => [...prev, errorMsg])
                setLoading(false)
            }, 1500)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    const currentYear = new Date().getFullYear()

    // ✅ Tick Mark SVG Component (inline for simplicity)
    const TickMark = ({ status, type }) => {
        const color = type === 'user' ? '#3B82F6' : '#EF4444'

        // ✅ ERROR — Pulsing dot
        if (status === 'error') {
            return (
                <span className="inline-flex items-center ml-1" style={{ verticalAlign: 'middle' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
                        <circle cx="7" cy="7" r="3" fill={color}>
                            <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </span>
            )
        }

        // ✅ SENT — Single tick with draw animation
        if (status === 'sent') {
            return (
                <span className="inline-flex items-center ml-1" style={{ verticalAlign: 'middle' }}>
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                        <path d="M2 7.5L6 11.5L16 2" stroke={color} strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" fill="none">
                            <animate attributeName="stroke-dasharray" from="0 30" to="30 0" dur="0.4s" fill="freeze" />
                        </path>
                        <circle cx="16" cy="2" r="1.5" fill={color} opacity="0">
                            <animate attributeName="opacity" values="0;1;0" dur="0.8s" begin="0.3s" fill="freeze" />
                            <animate attributeName="r" values="0;2;1" dur="0.6s" begin="0.3s" fill="freeze" />
                        </circle>
                    </svg>
                </span>
            )
        }

        // ✅ DELIVERED — Double tick with staggered animation
        if (status === 'delivered') {
            return (
                <span className="inline-flex items-center ml-1" style={{ verticalAlign: 'middle' }}>
                    <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                        <path d="M2 7.5L5.5 11L14 2.5" stroke={color} strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" fill="none">
                            <animate attributeName="stroke-dasharray" from="0 25" to="25 0" dur="0.3s" fill="freeze" />
                        </path>
                        <path d="M7 7.5L10.5 11L19 2.5" stroke={color} strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0">
                            <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="0.3s" fill="freeze" />
                            <animate attributeName="stroke-dasharray" from="0 25" to="25 0" dur="0.3s" begin="0.3s" fill="freeze" />
                        </path>
                        <circle cx="19" cy="2.5" r="0" fill={color} opacity="0.3">
                            <animate attributeName="r" values="0;3;0" dur="0.6s" begin="0.5s" fill="freeze" />
                        </circle>
                    </svg>
                </span>
            )
        }

        return null
    }

    return (
        <div className='flex flex-col min-h-screen text-white'
            style={{ background: '#ffffff' }}
        >

            <CustomCursor />
            {/* ============================== */}
            {/* HEADER */}
            {/* ============================== */}
            <header className="fixed top-0 left-0 w-full z-10"
                style={{
                    background: 'rgba(10, 10, 30, 0.95)',
                    borderBottom: '1px solid rgba(0, 150, 255, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                <div className="container mx-auto flex justify-between items-center px-6 py-4">

                    {/* ✅ Blueish Holographic Label with Spark */}
                    <div className="spark-border-blue"
                        style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, rgba(0, 100, 255, 0.25) 0%, rgba(0, 200, 255, 0.15) 50%, rgba(0, 100, 255, 0.25) 100%)',
                            borderRadius: '8px',
                            padding: '8px 20px',
                            backdropFilter: 'blur(15px)',
                            WebkitBackdropFilter: 'blur(15px)',
                            boxShadow: '0 0 15px rgba(0, 150, 255, 0.3), inset 0 0 15px rgba(0, 150, 255, 0.1)',
                            overflow: 'hidden',
                        }}
                    >
                        <h1
                            style={{
                                fontFamily: "'Orbitron', 'Courier New', monospace",
                                fontSize: '14px',
                                fontWeight: '800',
                                letterSpacing: '3px',
                                color: '#ffffff',
                                textShadow: '0 0 10px rgba(0, 180, 255, 0.6), 0 0 20px rgba(0, 180, 255, 0.3)',
                                margin: 0,
                                position: 'relative',
                                zIndex: 2,
                            }}
                        >
                             ASHU THE GREAT CHATBOT 
                        </h1>
                    </div>

                    {/* ✅ Robot Circle + Hanging Thread */}
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <div
                            className="spark-border-circle cursor-pointer"
                            onClick={handleRobotClick}
                            title="Click to interact!"
                            style={{
                                position: 'relative',
                                width: '46px',
                                height: '46px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, rgba(0, 100, 255, 0.3), rgba(0, 200, 255, 0.2))',
                                boxShadow: '0 0 15px rgba(0, 150, 255, 0.4), inset 0 0 10px rgba(0, 150, 255, 0.15)',
                                overflow: 'hidden',
                                zIndex: 5,
                            }}
                        >
                            <span style={{ fontSize: '24px', position: 'relative', zIndex: 2 }} role="img" aria-label="robot">
                                🤖
                            </span>
                        </div>

                        {/* ✅ Hanging Greenish Thread */}
                        <div
                            className={`thread-wrapper ${showThread ? 'thread-drop' : 'thread-fold'}`}
                            style={{
                                position: 'absolute',
                                top: '46px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                zIndex: 4,
                                transformOrigin: 'top center',
                            }}
                        >
                            <div
                                className="thread-line"
                                style={{
                                    width: '2px',
                                    height: '65px',
                                    background: 'linear-gradient(180deg, rgba(0, 255, 100, 0.9), rgba(0, 255, 150, 0.6), rgba(0, 255, 100, 0.3))',
                                    borderRadius: '2px',
                                }}
                            />

                            <div
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#00ff64',
                                    boxShadow: '0 0 8px rgba(0, 255, 100, 0.8), 0 0 15px rgba(0, 255, 100, 0.4)',
                                    marginBottom: '6px',
                                }}
                            />

                            <div
                                className="email-label-swing"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 255, 100, 0.15) 0%, rgba(0, 200, 80, 0.1) 50%, rgba(0, 255, 100, 0.15) 100%)',
                                    border: '1px solid rgba(0, 255, 100, 0.5)',
                                    borderRadius: '8px',
                                    padding: '8px 16px',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    boxShadow: '0 0 12px rgba(0, 255, 100, 0.4), inset 0 0 8px rgba(0, 255, 100, 0.1)',
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Orbitron', 'Courier New', monospace",
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px',
                                        color: '#1a1a1a',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    📧 arshadshaik641@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ============================== */}
            {/* CHAT AREA */}
            {/* ============================== */}
            <main className="flex-1 overflow-y-auto pt-20 pb-32 flex items-center justify-center"
                style={{ background: '#ffffff' }}
            >
                <div className="w-full max-w-4xl mx-auto px-4 flex flex-col space-y-4">

                    {showWelcome ? (
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <div
                                className="text-center text-xl"
                                style={{
                                    fontFamily: "'Orbitron', 'Courier New', monospace",
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: '#0066ff',
                                    textShadow: '0 0 10px rgba(0, 100, 255, 0.4), 0 0 20px rgba(0, 100, 255, 0.2)',
                                    letterSpacing: '1px',
                                }}
                            >
                                {typedText}
                                {!isTypingDone && (
                                    <span
                                        style={{
                                            animation: 'blink 0.7s infinite',
                                            color: '#0066ff',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        |
                                    </span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className="px-5 py-3 max-w-[75%]"
                                        style={{
                                            position: 'relative',
                                            background: msg.sender === 'user'
                                                ? 'linear-gradient(135deg, rgba(255, 50, 50, 0.15) 0%, rgba(255, 100, 100, 0.1) 50%, rgba(255, 50, 50, 0.15) 100%)'
                                                : 'linear-gradient(135deg, rgba(0, 100, 255, 0.1) 0%, rgba(0, 200, 255, 0.06) 50%, rgba(0, 100, 255, 0.1) 100%)',
                                            border: msg.sender === 'user'
                                                ? '1px solid rgba(255, 80, 80, 0.3)'
                                                : '1px solid rgba(0, 150, 255, 0.25)',
                                            borderRadius: '12px',
                                            backdropFilter: 'blur(10px)',
                                            WebkitBackdropFilter: 'blur(10px)',
                                            boxShadow: msg.sender === 'user'
                                                ? '0 4px 15px rgba(255, 50, 50, 0.15)'
                                                : '0 4px 15px rgba(0, 100, 255, 0.1)',
                                            fontSize: '15px',
                                            lineHeight: '1.6',
                                            fontFamily: "'Segoe UI', sans-serif",
                                            whiteSpace: 'pre-line',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '11px',
                                                fontWeight: '700',
                                                letterSpacing: '1.5px',
                                                marginBottom: '4px',
                                                color: msg.sender === 'user' ? '#cc0000' : '#0055aa',
                                                fontFamily: "'Orbitron', 'Courier New', monospace",
                                            }}
                                        >
                                            {msg.sender === 'user' ? '👤 YOU' : '🤖 ASHU-BOT'}
                                        </div>

                                        <div style={{
                                            color: '#1a1a1a',
                                            fontWeight: msg.sender === 'bot' ? '500' : '400',
                                        }}>
                                            {msg.text}
                                        </div>

                                        {/* ✅ Time + Tick Mark */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                gap: '4px',
                                                marginTop: '6px',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: '10px',
                                                    fontWeight: '500',
                                                    color: '#555555',
                                                    fontFamily: "'Segoe UI', sans-serif",
                                                    letterSpacing: '0.5px',
                                                }}
                                            >
                                                {msg.time}
                                            </span>

                                            {/* ✅ Tick Mark Component */}
                                            {msg.tickStatus && (
                                                <TickMark
                                                    status={msg.tickStatus}
                                                    type={msg.sender === 'user' ? 'user' : 'bot'}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div
                                        className="px-5 py-3"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            background: 'transparent',
                                            border: 'none',
                                        }}
                                    >
                                        <div className="thinking-dots">
                                            <span className="dot dot1"></span>
                                            <span className="dot dot2"></span>
                                            <span className="dot dot3"></span>
                                        </div>

                                        <span
                                            style={{
                                                fontFamily: "'Orbitron', 'Courier New', monospace",
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                letterSpacing: '1.5px',
                                                background: 'linear-gradient(90deg, #00d4ff, #0066ff, #ff4444, #00d4ff)',
                                                backgroundSize: '300% 300%',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                animation: 'gradientShift 2s ease infinite',
                                            }}
                                        >
                                            🤖 Ashu-Bot is thinking....
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>
            </main>

            {/* ============================== */}
            {/* NOTEPAD-LIST MODAL/POPUP */}
            {/* ============================== */}
            {showNotepad && (
                <div
                    className="notepad-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        zIndex: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        animation: 'notepadOverlayIn 0.3s ease forwards',
                    }}
                >
                    <div
                        ref={notepadRef}
                        className="notepad-container"
                        style={{
                            width: '100%',
                            maxWidth: '600px',
                            maxHeight: '75vh',
                            background: 'linear-gradient(135deg, rgba(10, 10, 40, 0.97) 0%, rgba(15, 15, 50, 0.97) 100%)',
                            border: '1px solid rgba(0, 180, 255, 0.4)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 0 30px rgba(0, 150, 255, 0.3), 0 0 60px rgba(0, 100, 255, 0.15), inset 0 0 30px rgba(0, 100, 255, 0.05)',
                            animation: 'notepadFloatUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                        }}
                    >
                        {/* ✅ Notepad Header */}
                        <div
                            style={{
                                padding: '16px 20px',
                                background: 'linear-gradient(135deg, rgba(0, 100, 255, 0.3) 0%, rgba(0, 200, 255, 0.2) 100%)',
                                borderBottom: '1px solid rgba(0, 180, 255, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexShrink: 0,
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '22px' }}>📋</span>
                                <span
                                    style={{
                                        fontFamily: "'Orbitron', 'Courier New', monospace",
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        letterSpacing: '2px',
                                        color: '#ffffff',
                                        textShadow: '0 0 8px rgba(0, 180, 255, 0.5)',
                                    }}
                                >
                                    QUESTION LIST
                                </span>
                                <span
                                    style={{
                                        fontSize: '10px',
                                        color: 'rgba(0, 220, 255, 0.7)',
                                        fontFamily: "'Segoe UI', sans-serif",
                                        fontWeight: '500',
                                    }}
                                >
                                    (Click any question to ask)
                                </span>
                            </div>

                            <button
                                onClick={() => setShowNotepad(false)}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(255, 80, 80, 0.5)',
                                    background: 'rgba(255, 50, 50, 0.2)',
                                    color: '#ff6666',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0,
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(255, 50, 50, 0.5)'
                                    e.target.style.color = '#ffffff'
                                    e.target.style.boxShadow = '0 0 15px rgba(255, 50, 50, 0.5)'
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(255, 50, 50, 0.2)'
                                    e.target.style.color = '#ff6666'
                                    e.target.style.boxShadow = 'none'
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* ✅ Notepad Body */}
                        <div
                            className="notepad-body"
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: '12px 16px',
                            }}
                        >
                            {notepadSections.map((section, sIdx) => (
                                <div
                                    key={`${section.title}-${sIdx}`}
                                    style={{
                                        marginBottom: '16px',
                                        animation: `notepadSectionFade 0.4s ease ${sIdx * 0.05}s both`,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "'Orbitron', 'Courier New', monospace",
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            letterSpacing: '1.5px',
                                            color: '#00d4ff',
                                            textShadow: '0 0 8px rgba(0, 200, 255, 0.4)',
                                            marginBottom: '8px',
                                            paddingBottom: '6px',
                                            borderBottom: '1px solid rgba(0, 180, 255, 0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}
                                    >
                                        <span style={{ fontSize: '16px' }}>{section.icon}</span>
                                        {section.title}
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {section.questions.map((q, qIdx) => (
                                            <button
                                                key={qIdx}
                                                onClick={() => handleQuestionClick(q)}
                                                className="notepad-question-btn"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(0, 100, 255, 0.12) 0%, rgba(0, 180, 255, 0.08) 100%)',
                                                    border: '1px solid rgba(0, 150, 255, 0.25)',
                                                    borderRadius: '20px',
                                                    padding: '6px 14px',
                                                    color: '#e0e8ff',
                                                    fontSize: '12px',
                                                    fontFamily: "'Segoe UI', sans-serif",
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    whiteSpace: 'nowrap',
                                                    textTransform: 'capitalize',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = 'linear-gradient(135deg, rgba(0, 150, 255, 0.35) 0%, rgba(0, 220, 255, 0.25) 100%)'
                                                    e.target.style.border = '1px solid rgba(0, 200, 255, 0.6)'
                                                    e.target.style.color = '#ffffff'
                                                    e.target.style.boxShadow = '0 0 12px rgba(0, 180, 255, 0.3)'
                                                    e.target.style.transform = 'translateY(-1px)'
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'linear-gradient(135deg, rgba(0, 100, 255, 0.12) 0%, rgba(0, 180, 255, 0.08) 100%)'
                                                    e.target.style.border = '1px solid rgba(0, 150, 255, 0.25)'
                                                    e.target.style.color = '#e0e8ff'
                                                    e.target.style.boxShadow = 'none'
                                                    e.target.style.transform = 'translateY(0)'
                                                }}
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                padding: '10px 16px',
                                borderTop: '1px solid rgba(0, 180, 255, 0.2)',
                                textAlign: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Segoe UI', sans-serif",
                                    fontSize: '10px',
                                    color: 'rgba(0, 200, 255, 0.5)',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                📝 Sections shuffle every 30 seconds • Total: {allSections.reduce((acc, s) => acc + s.questions.length, 0)} questions
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================== */}
            {/* FOOTER */}
            {/* ============================== */}
            <footer className="fixed bottom-0 left-0 w-full z-10"
                style={{
                    background: 'rgba(10, 10, 30, 0.95)',
                    borderTop: '1px solid rgba(255, 80, 80, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div
                        className="w-full flex items-center px-4 py-2 spark-border-red"
                        style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, rgba(255, 50, 50, 0.2) 0%, rgba(255, 100, 100, 0.1) 50%, rgba(255, 50, 50, 0.2) 100%)',
                            borderRadius: '50px',
                            backdropFilter: 'blur(15px)',
                            WebkitBackdropFilter: 'blur(15px)',
                            boxShadow: '0 0 15px rgba(255, 50, 50, 0.2), inset 0 0 15px rgba(255, 50, 50, 0.1)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* ✅ Notepad-List Button */}
                        <button
                            className={`notepad-trigger-btn ${isVibrating ? 'notepad-vibrate' : ''}`}
                            onClick={() => setShowNotepad(prev => !prev)}
                            title="View Question List"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '1px solid rgba(0, 255, 150, 0.5)',
                                background: 'linear-gradient(135deg, rgba(0, 255, 150, 0.2) 0%, rgba(0, 200, 100, 0.15) 100%)',
                                color: '#00ff96',
                                fontSize: '18px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginRight: '8px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 0 10px rgba(0, 255, 150, 0.2)',
                                position: 'relative',
                                zIndex: 2,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 255, 150, 0.4) 0%, rgba(0, 200, 100, 0.3) 100%)'
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 150, 0.4)'
                                e.currentTarget.style.transform = 'scale(1.1)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 255, 150, 0.2) 0%, rgba(0, 200, 100, 0.15) 100%)'
                                e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 150, 0.2)'
                                e.currentTarget.style.transform = 'scale(1)'
                            }}
                        >
                            📋
                        </button>

                        <input
                            type="text"
                            className="flex-1 bg-transparent outline-none px-3 py-1"
                            placeholder="Ask ASHU-CHATBOT....."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            style={{
                                color: '#ffffff',
                                fontSize: '15px',
                                fontFamily: "'Segoe UI', sans-serif",
                                caretColor: '#ff6666',
                                position: 'relative',
                                zIndex: 2,
                                minWidth: 0,
                            }}
                        />

                        <button
                            onClick={handleSendMessage}
                            className="transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0, 200, 255, 0.5) 0%, rgba(0, 150, 255, 0.7) 100%)',
                                border: '1px solid rgba(0, 200, 255, 0.5)',
                                borderRadius: '50px',
                                padding: '8px 24px',
                                color: '#ffffff',
                                fontFamily: "'Orbitron', 'Courier New', monospace",
                                fontSize: '13px',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                boxShadow: '0 0 15px rgba(0, 200, 255, 0.4), inset 0 0 10px rgba(0, 200, 255, 0.15)',
                                textShadow: '0 0 8px rgba(0, 200, 255, 0.5)',
                                position: 'relative',
                                zIndex: 2,
                                flexShrink: 0,
                            }}
                        >
                            SEND
                        </button>
                    </div>

                    <div
                        style={{
                            textAlign: 'right',
                            marginTop: '6px',
                            paddingRight: '10px',
                            fontFamily: "'Orbitron', 'Courier New', monospace",
                            fontSize: '9px',
                            fontWeight: '500',
                            letterSpacing: '1px',
                            color: '#ffff',
                        }}
                    >
                        © {currentYear} All Rights Reserved — Arshad Wasib Shaik
                    </div>
                </div>
            </footer>

            {/* ============================== */}
            {/* CSS ANIMATIONS */}
            {/* ============================== */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

                    .spark-border-blue::before {
                        content: '';
                        position: absolute;
                        top: -2px; left: -2px; right: -2px; bottom: -2px;
                        border-radius: inherit;
                        background: conic-gradient(from var(--spark-angle, 0deg), transparent 0%, transparent 70%, rgba(0, 180, 255, 0.8) 75%, rgba(0, 220, 255, 1) 80%, rgba(0, 180, 255, 0.8) 85%, transparent 90%, transparent 100%);
                        animation: sparkRotate 3s linear infinite;
                        z-index: 0;
                    }
                    .spark-border-blue::after {
                        content: '';
                        position: absolute;
                        top: 1px; left: 1px; right: 1px; bottom: 1px;
                        border-radius: inherit;
                        background: inherit;
                        z-index: 1;
                    }

                    .spark-border-red::before {
                        content: '';
                        position: absolute;
                        top: -2px; left: -2px; right: -2px; bottom: -2px;
                        border-radius: inherit;
                        background: conic-gradient(from var(--spark-angle, 0deg), transparent 0%, transparent 70%, rgba(255, 80, 80, 0.8) 75%, rgba(255, 120, 120, 1) 80%, rgba(255, 80, 80, 0.8) 85%, transparent 90%, transparent 100%);
                        animation: sparkRotate 3s linear infinite;
                        z-index: 0;
                    }
                    .spark-border-red::after {
                        content: '';
                        position: absolute;
                        top: 1px; left: 1px; right: 1px; bottom: 1px;
                        border-radius: inherit;
                        background: inherit;
                        z-index: 1;
                    }

                    .spark-border-circle::before {
                        content: '';
                        position: absolute;
                        top: -3px; left: -3px; right: -3px; bottom: -3px;
                        border-radius: 50%;
                        background: conic-gradient(from var(--spark-angle, 0deg), transparent 0%, transparent 65%, rgba(0, 200, 255, 0.9) 72%, rgba(255, 255, 255, 1) 78%, rgba(0, 200, 255, 0.9) 84%, transparent 90%, transparent 100%);
                        animation: sparkRotate 2s linear infinite;
                        z-index: 0;
                    }
                    .spark-border-circle::after {
                        content: '';
                        position: absolute;
                        top: 2px; left: 2px; right: 2px; bottom: 2px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, rgba(0, 100, 255, 0.3), rgba(0, 200, 255, 0.2));
                        z-index: 1;
                    }

                    @keyframes sparkRotate {
                        0% { --spark-angle: 0deg; }
                        100% { --spark-angle: 360deg; }
                    }
                    @property --spark-angle {
                        syntax: '<angle>';
                        initial-value: 0deg;
                        inherits: false;
                    }

                    .thread-wrapper { overflow: hidden; }
                    .thread-drop {
                        max-height: 200px; opacity: 1;
                        animation: threadFall 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    }
                    .thread-fold {
                        max-height: 0px; opacity: 0;
                        animation: threadRetract 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    }
                    @keyframes threadFall {
                        0% { max-height: 0px; opacity: 0; transform: scaleY(0) translateY(-20px); }
                        40% { opacity: 0.7; transform: scaleY(1.1) translateY(5px); }
                        70% { transform: scaleY(0.95) translateY(-2px); }
                        85% { transform: scaleY(1.02) translateY(1px); }
                        100% { max-height: 200px; opacity: 1; transform: scaleY(1) translateY(0); }
                    }
                    @keyframes threadRetract {
                        0% { max-height: 200px; opacity: 1; transform: scaleY(1) translateY(0); }
                        100% { max-height: 0px; opacity: 0; transform: scaleY(0) translateY(-20px); }
                    }
                    .thread-drop .email-label-swing { animation: labelSwing 2s ease-in-out 0.8s infinite; }
                    @keyframes labelSwing {
                        0%, 100% { transform: rotate(0deg); }
                        25% { transform: rotate(2deg); }
                        75% { transform: rotate(-2deg); }
                    }
                    .thread-drop .thread-line { animation: threadGlow 2s ease-in-out infinite; }
                    @keyframes threadGlow {
                        0%, 100% { box-shadow: 0 0 6px rgba(0, 255, 100, 0.5), 0 0 12px rgba(0, 255, 100, 0.2); }
                        50% { box-shadow: 0 0 12px rgba(0, 255, 100, 0.8), 0 0 25px rgba(0, 255, 100, 0.4); }
                    }

                    @keyframes notepadVibrate {
                        0% { transform: translateX(0) rotate(0deg); }
                        10% { transform: translateX(-2px) rotate(-3deg); }
                        20% { transform: translateX(2px) rotate(3deg); }
                        30% { transform: translateX(-2px) rotate(-2deg); }
                        40% { transform: translateX(2px) rotate(2deg); }
                        50% { transform: translateX(-1px) rotate(-1deg); }
                        60% { transform: translateX(1px) rotate(1deg); }
                        70% { transform: translateX(-1px) rotate(-1deg); }
                        80% { transform: translateX(1px) rotate(1deg); }
                        90% { transform: translateX(0) rotate(0deg); }
                        100% { transform: translateX(0) rotate(0deg); }
                    }
                    .notepad-vibrate { animation: notepadVibrate 0.6s ease-in-out 3 !important; }

                    .notepad-trigger-btn { animation: notepadGlowPulse 3s ease-in-out infinite; }
                    @keyframes notepadGlowPulse {
                        0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 150, 0.2); }
                        50% { box-shadow: 0 0 18px rgba(0, 255, 150, 0.5), 0 0 30px rgba(0, 255, 150, 0.2); }
                    }

                    @keyframes notepadOverlayIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                    @keyframes notepadFloatUp {
                        0% { opacity: 0; transform: translateY(80px) scale(0.85); }
                        60% { opacity: 1; transform: translateY(-8px) scale(1.02); }
                        80% { transform: translateY(3px) scale(0.99); }
                        100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @keyframes notepadSectionFade {
                        0% { opacity: 0; transform: translateY(10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }

                    .notepad-body::-webkit-scrollbar { width: 5px; }
                    .notepad-body::-webkit-scrollbar-track { background: rgba(0, 50, 100, 0.2); border-radius: 10px; }
                    .notepad-body::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(0, 180, 255, 0.5), rgba(0, 100, 255, 0.5)); border-radius: 10px; }
                    .notepad-body::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, rgba(0, 180, 255, 0.8), rgba(0, 100, 255, 0.8)); }

                    .notepad-question-btn:active {
                        transform: scale(0.95) !important;
                        background: linear-gradient(135deg, rgba(0, 200, 255, 0.4) 0%, rgba(0, 255, 200, 0.3) 100%) !important;
                    }

                    .thinking-dots { display: flex; align-items: center; gap: 6px; }
                    .dot { width: 10px; height: 10px; border-radius: 50%; animation: dotBounce 1.4s ease-in-out infinite; }
                    .dot1 { background: #00d4ff; box-shadow: 0 0 10px rgba(0, 212, 255, 0.6); animation-delay: 0s; }
                    .dot2 { background: #0066ff; box-shadow: 0 0 10px rgba(0, 102, 255, 0.6); animation-delay: 0.2s; }
                    .dot3 { background: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.6); animation-delay: 0.4s; }
                    @keyframes dotBounce {
                        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                        40% { transform: scale(1.2); opacity: 1; }
                    }

                    @keyframes gradientShift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

                    ::-webkit-scrollbar { width: 6px; }
                    ::-webkit-scrollbar-track { background: rgba(240, 240, 255, 0.3); }
                    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(0, 150, 255, 0.5), rgba(255, 50, 50, 0.5)); border-radius: 10px; }
                    ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, rgba(0, 150, 255, 0.7), rgba(255, 50, 50, 0.7)); }

                    input::placeholder { color: rgba(255, 150, 150, 0.5) !important; font-style: italic; }
                    input:focus { outline: none !important; box-shadow: none !important; }

                    body { margin: 0; padding: 0; background: #ffffff; }
                    button, .cursor-pointer { transition: transform 0.3s ease, box-shadow 0.3s ease; }

                    @media (max-width: 480px) {
                        .notepad-container { max-height: 80vh !important; border-radius: 12px !important; margin: 8px !important; }
                        .notepad-question-btn { font-size: 11px !important; padding: 5px 10px !important; }
                        .notepad-trigger-btn { width: 32px !important; height: 32px !important; font-size: 16px !important; }
                    }
                    @media (min-width: 481px) and (max-width: 768px) {
                        .notepad-container { max-width: 90% !important; max-height: 78vh !important; }
                    }
                    @media (min-width: 769px) and (max-width: 1024px) {
                        .notepad-container { max-width: 650px !important; max-height: 75vh !important; }
                    }
                    @media (min-width: 1025px) {
                        .notepad-container { max-width: 700px !important; max-height: 70vh !important; }
                        .notepad-question-btn { font-size: 13px !important; padding: 7px 16px !important; }
                    }
                    body.notepad-open { overflow: hidden !important; }
                `}
            </style>
        </div>
    )
}

export default Bot