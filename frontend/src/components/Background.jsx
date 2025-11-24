import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Create multiple layers of stars for depth
    const starLayers = [
      Array.from({ length: 150 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        color: '#ffffff',
        layer: 1
      })),
      Array.from({ length: 100 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.7 ? '#00f2ff' : '#ffffff',
        layer: 2
      })),
      Array.from({ length: 50 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1.5,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.9 + 0.5,
        color: Math.random() > 0.6 ? '#bc13fe' : Math.random() > 0.3 ? '#00f2ff' : '#ffffff',
        layer: 3
      }))
    ];

    const stars = starLayers.flat();

    // Shooting stars
    const shootingStars = [];
    const createShootingStar = () => {
      if (Math.random() > 0.98) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          opacity: 1,
          angle: Math.PI / 4
        });
      }
    };

    const drawNebula = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, 'rgba(20, 10, 40, 0.95)');
      gradient.addColorStop(0.5, 'rgba(10, 5, 20, 0.98)');
      gradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add colorful nebula blobs with mouse parallax
      const parallaxX1 = (mouseX / canvas.width - 0.5) * 50;
      const parallaxY1 = (mouseY / canvas.height - 0.5) * 50;
      
      const blob1 = ctx.createRadialGradient(
        canvas.width * 0.2 + parallaxX1, 
        canvas.height * 0.3 + parallaxY1, 
        0, 
        canvas.width * 0.2 + parallaxX1, 
        canvas.height * 0.3 + parallaxY1, 
        500
      );
      blob1.addColorStop(0, 'rgba(188, 19, 254, 0.15)');
      blob1.addColorStop(1, 'transparent');
      ctx.fillStyle = blob1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const parallaxX2 = (mouseX / canvas.width - 0.5) * -40;
      const parallaxY2 = (mouseY / canvas.height - 0.5) * -40;
      
      const blob2 = ctx.createRadialGradient(
        canvas.width * 0.8 + parallaxX2, 
        canvas.height * 0.7 + parallaxY2, 
        0, 
        canvas.width * 0.8 + parallaxX2, 
        canvas.height * 0.7 + parallaxY2, 
        500
      );
      blob2.addColorStop(0, 'rgba(0, 242, 255, 0.12)');
      blob2.addColorStop(1, 'transparent');
      ctx.fillStyle = blob2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Additional nebula blob
      const blob3 = ctx.createRadialGradient(
        canvas.width * 0.5, 
        canvas.height * 0.5, 
        0, 
        canvas.width * 0.5, 
        canvas.height * 0.5, 
        600
      );
      blob3.addColorStop(0, 'rgba(138, 43, 226, 0.08)');
      blob3.addColorStop(1, 'transparent');
      ctx.fillStyle = blob3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawNebula();

      // Draw stars with parallax effect
      stars.forEach(star => {
        const parallaxX = (mouseX / canvas.width - 0.5) * star.layer * 10;
        const parallaxY = (mouseY / canvas.height - 0.5) * star.layer * 10;

        ctx.beginPath();
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        
        // Add glow to brighter stars
        if (star.size > 2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = star.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        ctx.globalAlpha = 1;

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Create and draw shooting stars
      createShootingStar();
      shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
        ctx.shadowBlur = 0;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.01;

        if (star.opacity <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default Background;
