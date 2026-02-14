import React, { useEffect, useRef } from 'react';

/* ── Spark/Bubble Cursor Effect ── */
const CursorEffect = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // ── Particle Class ──
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 2; // Bubble size
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = `hsla(${Math.random() * 60 + 160}, 100%, 70%, 0.8)`; // Cyan/Teal range
                this.life = 1.0;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.size *= 0.95; // Shrink
                this.life -= 0.02; // Fade
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;

                ctx.globalAlpha = this.life;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Optional: spark ring
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }

        // ── Mouse Move ──
        const handleMouseMove = (e) => {
            // Spawn bursts
            for (let i = 0; i < 3; i++) {
                particles.current.push(new Particle(e.clientX, e.clientY));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // ── Animation Loop ──
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Manage particles
            for (let i = 0; i < particles.current.length; i++) {
                particles.current[i].update();
                particles.current[i].draw();

                if (particles.current[i].life <= 0 || particles.current[i].size <= 0.5) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none', // Click-through
                zIndex: 99999 // On top of everything
            }}
        />
    );
};

export default CursorEffect;
