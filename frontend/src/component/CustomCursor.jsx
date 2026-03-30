import React, { useEffect, useRef, useState, useCallback } from 'react'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const cursorRingRef = useRef(null)
    const trailCanvasRef = useRef(null)
    const particlesRef = useRef([])
    const mousePos = useRef({ x: -100, y: -100 })
    const cursorPos = useRef({ x: -100, y: -100 })
    const ringPos = useRef({ x: -100, y: -100 })
    const animFrameRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)
    const lastTrailTime = useRef(0)
    const hueRef = useRef(0)

    // ✅ Detect touch device
    useEffect(() => {
        const checkTouch = () => {
            const isTouch = 'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches
            setIsTouchDevice(isTouch)
        }
        checkTouch()
        window.addEventListener('resize', checkTouch)
        return () => window.removeEventListener('resize', checkTouch)
    }, [])

    // ✅ Particle class for trail effects
    const createParticle = useCallback((x, y, type = 'trail') => {
        const hue = hueRef.current
        return {
            x,
            y,
            vx: (Math.random() - 0.5) * (type === 'click' ? 8 : 2),
            vy: (Math.random() - 0.5) * (type === 'click' ? 8 : 2),
            life: 1,
            decay: type === 'click' ? 0.015 : 0.025,
            size: type === 'click' ? Math.random() * 6 + 2 : Math.random() * 3 + 1,
            hue: hue + Math.random() * 60,
            type,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
        }
    }, [])

    // ✅ Main animation loop — GPU optimized
    const animate = useCallback(() => {
        if (isTouchDevice) return

        const cursor = cursorRef.current
        const ring = cursorRingRef.current
        const canvas = trailCanvasRef.current

        if (!cursor || !ring || !canvas) {
            animFrameRef.current = requestAnimationFrame(animate)
            return
        }

        const ctx = canvas.getContext('2d')

        // Smooth cursor follow (lerp)
        cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15
        cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15

        // Ring follows slower for elastic effect
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.08
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.08

        // Update cursor position
        cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${isHovering ? 1.8 : isClicking ? 0.6 : 1})`

        // Update hue for holographic effect
        hueRef.current = (hueRef.current + 0.5) % 360

        // Canvas trail rendering
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        const particles = particlesRef.current
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i]
            p.x += p.vx
            p.y += p.vy
            p.life -= p.decay
            p.rotation += p.rotationSpeed
            p.vx *= 0.98
            p.vy *= 0.98

            if (p.life <= 0) {
                particles.splice(i, 1)
                continue
            }

            ctx.save()
            ctx.translate(p.x, p.y)
            ctx.rotate((p.rotation * Math.PI) / 180)
            ctx.globalAlpha = p.life * 0.8

            if (p.type === 'click') {
                // Holographic diamond shape for click burst
                ctx.beginPath()
                const s = p.size * p.life
                ctx.moveTo(0, -s)
                ctx.lineTo(s * 0.6, 0)
                ctx.moveTo(0, s)
                ctx.lineTo(-s * 0.6, 0)
                ctx.closePath()
                ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.life})`
                ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${p.life * 0.5})`
                ctx.shadowBlur = 15
                ctx.fill()
            } else {
                // Glowing circle for trail
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * p.life)
                gradient.addColorStop(0, `hsla(${p.hue}, 100%, 80%, ${p.life})`)
                gradient.addColorStop(0.5, `hsla(${p.hue + 30}, 100%, 60%, ${p.life * 0.5})`)
                gradient.addColorStop(1, `hsla(${p.hue + 60}, 100%, 40%, 0)`)

                ctx.beginPath()
                ctx.arc(0, 0, p.size * p.life * 2, 0, Math.PI * 2)
                ctx.fillStyle = gradient
                ctx.fill()
            }

            ctx.restore()
        }

        // Holographic connecting lines between nearby particles
        if (particles.length > 1) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 50) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `hsla(${hueRef.current}, 100%, 70%, ${(1 - dist / 50) * 0.15})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }
        }

        animFrameRef.current = requestAnimationFrame(animate)
    }, [isTouchDevice, isHovering, isClicking])

    // ✅ Mouse move handler — throttled trail spawning
    const handleMouseMove = useCallback((e) => {
        mousePos.current.x = e.clientX
        mousePos.current.y = e.clientY

        const now = Date.now()
        if (now - lastTrailTime.current > 30) {
            // Limit particles for performance (max 60)
            if (particlesRef.current.length < 60) {
                particlesRef.current.push(
                    createParticle(e.clientX, e.clientY, 'trail')
                )
            }
            lastTrailTime.current = now
        }
    }, [createParticle])

    // ✅ Click burst effect
    const handleMouseDown = useCallback((e) => {
        setIsClicking(true)

        // Spawn burst particles on click
        for (let i = 0; i < 12; i++) {
            particlesRef.current.push(
                createParticle(e.clientX, e.clientY, 'click')
            )
        }
    }, [createParticle])

    const handleMouseUp = useCallback(() => {
        setIsClicking(false)
    }, [])

    // ✅ Hover detection for interactive elements
    const handleElementHover = useCallback(() => {
        const interactiveElements = document.querySelectorAll(
            'button, a, input, .cursor-pointer, [role="button"], select, textarea'
        )

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => setIsHovering(true))
            el.addEventListener('mouseleave', () => setIsHovering(false))
        })

        return () => {
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', () => setIsHovering(true))
                el.removeEventListener('mouseleave', () => setIsHovering(false))
            })
        }
    }, [])

    // ✅ Canvas resize handler
    const handleResize = useCallback(() => {
        const canvas = trailCanvasRef.current
        if (canvas) {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
    }, [])

    // ✅ Touch ripple effect for mobile
    const handleTouchStart = useCallback((e) => {
        if (!isTouchDevice) return

        const touch = e.touches[0]
        const ripple = document.createElement('div')
        ripple.className = 'touch-ripple-effect'
        ripple.style.left = `${touch.clientX}px`
        ripple.style.top = `${touch.clientY}px`
        document.body.appendChild(ripple)

        setTimeout(() => {
            ripple.remove()
        }, 800)
    }, [isTouchDevice])

    // ✅ Initialize everything
    useEffect(() => {
        if (isTouchDevice) {
            // Mobile: Touch ripple only
            window.addEventListener('touchstart', handleTouchStart, { passive: true })
            return () => window.removeEventListener('touchstart', handleTouchStart)
        }

        // Desktop: Full cursor experience
        handleResize()
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        const cleanupHover = handleElementHover()

        // Start animation loop
        animFrameRef.current = requestAnimationFrame(animate)

        // Re-detect interactive elements periodically (for dynamic content)
        const hoverInterval = setInterval(handleElementHover, 2000)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            if (cleanupHover) cleanupHover()
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
            clearInterval(hoverInterval)
        }
    }, [isTouchDevice, handleMouseMove, handleMouseDown, handleMouseUp, handleElementHover, handleResize, animate, handleTouchStart])

    // Don't render cursor elements on touch devices
    if (isTouchDevice) return null

    return (
        <>
            {/* ✅ Trail Canvas — Full screen, behind everything */}
            <canvas
                ref={trailCanvasRef}
                className="cursor-trail-canvas"
            />

            {/* ✅ Main Cursor Dot — Holographic center */}
            <div
                ref={cursorRef}
                className={`custom-cursor-dot ${isHovering ? 'cursor-hover' : ''} ${isClicking ? 'cursor-click' : ''}`}
            />

            {/* ✅ Cursor Ring — Elastic following ring */}
            <div
                ref={cursorRingRef}
                className={`custom-cursor-ring ${isHovering ? 'ring-hover' : ''} ${isClicking ? 'ring-click' : ''}`}
            />
        </>
    )
}

export default CustomCursor