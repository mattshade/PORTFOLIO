import { useEffect, useRef } from 'react'

class Boid {
  x: number
  y: number
  vx: number
  vy: number
  maxSpeed: number
  maxForce: number
  index: number

  constructor(x: number, y: number, index: number) {
    this.x = x
    this.y = y
    this.vx = (Math.random() * 2 - 1) * 2
    this.vy = (Math.random() * 2 - 1) * 2
    this.maxSpeed = 2.5
    this.maxForce = 0.05
    this.index = index
  }

  edges(width: number, height: number) {
    if (this.x > width + 20) this.x = -20
    if (this.x < -20) this.x = width + 20
    if (this.y > height + 20) this.y = -20
    if (this.y < -20) this.y = height + 20
  }

  align(boids: Boid[]) {
    let perceptionRadius = 50
    let steeringX = 0
    let steeringY = 0
    let total = 0
    for (let other of boids) {
      if (other !== this) {
        let d = Math.hypot(this.x - other.x, this.y - other.y)
        if (d < perceptionRadius) {
          steeringX += other.vx
          steeringY += other.vy
          total++
        }
      }
    }
    if (total > 0) {
      steeringX /= total
      steeringY /= total
      let mag = Math.hypot(steeringX, steeringY)
      if (mag > 0) {
        steeringX = (steeringX / mag) * this.maxSpeed
        steeringY = (steeringY / mag) * this.maxSpeed
      }
      steeringX -= this.vx
      steeringY -= this.vy
      let steerMag = Math.hypot(steeringX, steeringY)
      if (steerMag > this.maxForce) {
        steeringX = (steeringX / steerMag) * this.maxForce
        steeringY = (steeringY / steerMag) * this.maxForce
      }
    }
    return { x: steeringX, y: steeringY }
  }

  cohesion(boids: Boid[]) {
    let perceptionRadius = 50
    let steeringX = 0
    let steeringY = 0
    let total = 0
    for (let other of boids) {
      if (other !== this) {
        let d = Math.hypot(this.x - other.x, this.y - other.y)
        if (d < perceptionRadius) {
          steeringX += other.x
          steeringY += other.y
          total++
        }
      }
    }
    if (total > 0) {
      steeringX /= total
      steeringY /= total
      steeringX -= this.x
      steeringY -= this.y
      let mag = Math.hypot(steeringX, steeringY)
      if (mag > 0) {
        steeringX = (steeringX / mag) * this.maxSpeed
        steeringY = (steeringY / mag) * this.maxSpeed
      }
      steeringX -= this.vx
      steeringY -= this.vy
      let steerMag = Math.hypot(steeringX, steeringY)
      if (steerMag > this.maxForce) {
        steeringX = (steeringX / steerMag) * this.maxForce
        steeringY = (steeringY / steerMag) * this.maxForce
      }
    }
    // Weaker cohesion (0.6) — prevents tight clustering; birds spread out more
    return { x: steeringX * 0.6, y: steeringY * 0.6 }
  }

  separation(boids: Boid[]) {
    let perceptionRadius = 24
    let steeringX = 0
    let steeringY = 0
    let total = 0
    for (let other of boids) {
      if (other !== this) {
        let d = Math.hypot(this.x - other.x, this.y - other.y)
        if (d < perceptionRadius && d > 0) {
          let diffX = this.x - other.x
          let diffY = this.y - other.y
          diffX /= d * d
          diffY /= d * d
          steeringX += diffX
          steeringY += diffY
          total++
        }
      }
    }
    if (total > 0) {
      steeringX /= total
      steeringY /= total
      let mag = Math.hypot(steeringX, steeringY)
      if (mag > 0) {
        steeringX = (steeringX / mag) * this.maxSpeed
        steeringY = (steeringY / mag) * this.maxSpeed
      }
      steeringX -= this.vx
      steeringY -= this.vy
      let steerMag = Math.hypot(steeringX, steeringY)
      if (steerMag > this.maxForce) {
        steeringX = (steeringX / steerMag) * this.maxForce
        steeringY = (steeringY / steerMag) * this.maxForce
      }
    }
    return { x: steeringX * 1.5, y: steeringY * 1.5 } // stronger separation
  }

  flock(boids: Boid[]) {
    let alignment = this.align(boids)
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids)

    // Weaker cohesion (0.4) so birds spread out instead of clustering
    this.vx += alignment.x + cohesion.x * 0.4 + separation.x
    this.vy += alignment.y + cohesion.y * 0.4 + separation.y
  }

  /**
   * When many birds are close together, gently nudge toward a loose V.
   * Kept weak and spread out so birds don't get stuck — they can easily break free.
   */
  formationSteer(boids: Boid[]): { x: number; y: number } | null {
    if (boids.length < 20) return null

    const cx = boids.reduce((s, b) => s + b.x, 0) / boids.length
    const cy = boids.reduce((s, b) => s + b.y, 0) / boids.length
    const avgVx = boids.reduce((s, b) => s + b.vx, 0) / boids.length
    const avgVy = boids.reduce((s, b) => s + b.vy, 0) / boids.length
    const angle = Math.atan2(avgVy, avgVx)

    // Stricter threshold — only form when flock is naturally very dense
    const densityRadius = 70
    const nearCount = boids.filter((b) => Math.hypot(b.x - cx, b.y - cy) < densityRadius).length
    if (nearCount < 25) return null

    // Wider spacing so birds don't cluster — spread the V out
    const scale = 22
    const formationSlots: { x: number; y: number }[] = []
    formationSlots.push({ x: 0, y: 0 })
    for (let i = 1; i <= 8; i++) {
      formationSlots.push({ x: -i * scale * 0.6, y: -i * scale * 0.45 })
      formationSlots.push({ x: i * scale * 0.6, y: -i * scale * 0.45 })
    }

    const slotIdx = this.index % formationSlots.length
    const slot = formationSlots[slotIdx]
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)
    const targetX = cx + slot.x * cosA - slot.y * sinA
    const targetY = cy + slot.x * sinA + slot.y * cosA

    const dx = targetX - this.x
    const dy = targetY - this.y
    const dist = Math.hypot(dx, dy)
    if (dist < 8) return null

    // Much weaker force — gentle nudge, not a lock (maxForce * 0.8)
    const desiredSpeed = Math.min(dist * 0.03, this.maxSpeed * 0.5)
    const steerX = (dx / dist) * desiredSpeed - this.vx
    const steerY = (dy / dist) * desiredSpeed - this.vy
    const steerMag = Math.hypot(steerX, steerY)
    const capped = Math.min(steerMag, this.maxForce * 0.8)
    if (steerMag === 0) return null
    return { x: (steerX / steerMag) * capped, y: (steerY / steerMag) * capped }
  }

  /**
   * Magnetic lens + flow — birds gently bend toward the cursor from afar,
   * then curve around it like water past a rock. No jarring scatter.
   */
  interact(
    smoothedMx: number,
    smoothedMy: number,
    influence: number,
    width: number,
    height: number,
    breath: number
  ) {
    if (influence <= 0) return
    const cx = smoothedMx * width
    const cy = smoothedMy * height
    const dx = this.x - cx
    const dy = this.y - cy
    const d = Math.hypot(dx, dy)
    const outerRadius = 260
    const innerRadius = 40
    if (d > outerRadius || d < 6) return

    const dirX = dx / d
    const dirY = dy / d
    const tangentX = -dirY
    const tangentY = dirX

    const t = d / outerRadius
    const bell = 1 - t * t
    const eff = influence * breath

    const pullZone = d > innerRadius
    const pullStrength = pullZone ? 0.055 * eff * (1 - (innerRadius / d)) : 0
    this.vx -= dirX * pullStrength
    this.vy -= dirY * pullStrength

    const flowStrength = 0.14 * eff * bell
    this.vx += tangentX * flowStrength
    this.vy += tangentY * flowStrength
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    let speed = Math.hypot(this.vx, this.vy)
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed
      this.vy = (this.vy / speed) * this.maxSpeed
    }
  }

  /** Random impulse to break up clusters — called periodically */
  scatter() {
    const angle = Math.random() * Math.PI * 2
    const mag = 0.8 + Math.random() * 1.2
    this.vx += Math.cos(angle) * mag
    this.vy += Math.sin(angle) * mag
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    const angle = Math.atan2(this.vy, this.vx)
    ctx.translate(this.x, this.y)
    ctx.rotate(angle)

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(-6, -4)
    ctx.lineTo(-4, 0)
    ctx.lineTo(-6, 4)
    ctx.closePath()

    ctx.fillStyle = 'rgba(34, 211, 238, 0.85)'
    ctx.shadowBlur = 4
    ctx.shadowColor = 'rgba(34, 211, 238, 0.5)'
    ctx.fill()

    ctx.restore()
  }
}

export function BirdsFly({ mouseX, mouseY, isHovering }: { mouseX: number; mouseY: number; isHovering: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const propsRef = useRef({ mouseX, mouseY, isHovering })
  propsRef.current = { mouseX, mouseY, isHovering }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      const w = canvas.offsetWidth || canvas.parentElement?.clientWidth || 300
      const h = canvas.offsetHeight || canvas.parentElement?.clientHeight || 300
      if (w > 0 && h > 0) {
        width = w
        height = h
        canvas.width = w
        canvas.height = h
      }
    }
    let width = 0
    let height = 0
    setSize()

    const handleResize = () => {
      setSize()
    }
    window.addEventListener('resize', handleResize)

    const flock: Boid[] = []
    const initFlock = () => {
      flock.length = 0
      const w = Math.max(1, width)
      const h = Math.max(1, height)
      for (let i = 0; i < 60; i++) {
        flock.push(new Boid(Math.random() * w, Math.random() * h, i))
      }
    }
    initFlock()

    let smoothX = 0.5
    let smoothY = 0.5
    let hoverProgress = 0
    let frame = 0
    const LERP = 0.06
    const HOVER_RAMP = 0.032

    let animationId: number
    const render = () => {
      try {
        frame++
        const w = canvas.offsetWidth || 1
        const h = canvas.offsetHeight || 1
        if (w !== width || h !== height) {
          setSize()
        }
        if (width <= 0 || height <= 0) {
          animationId = requestAnimationFrame(render)
          return
        }

        const { mouseX: mx, mouseY: my, isHovering: hovering } = propsRef.current
        smoothX += (mx - smoothX) * LERP
        smoothY += (my - smoothY) * LERP
        hoverProgress = Math.max(0, Math.min(1, hoverProgress + (hovering ? HOVER_RAMP : -HOVER_RAMP * 2)))
        const breath = 0.94 + 0.06 * Math.sin(frame * 0.02)

        // Uncluster every 60 seconds (~3600 frames @ 60fps)
        if (frame > 0 && frame % 3600 === 0) {
          for (const boid of flock) boid.scatter()
        }

        ctx.clearRect(0, 0, width, height)

        for (let boid of flock) {
          boid.edges(width, height)
          boid.flock(flock)
          boid.interact(smoothX, smoothY, hoverProgress, width, height, breath)
          boid.update()
          boid.draw(ctx)
        }
      } catch (err) {
        console.error('BirdsFly render error:', err)
      }
      animationId = requestAnimationFrame(render)
    }

    render()
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pixels-birds-container"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
