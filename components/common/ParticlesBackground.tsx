'use client';

import { useMemo, memo, useState, useEffect, useCallback } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";


const ParticlesBackground = memo(function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    console.log(container);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "attract",
          },
        },
        modes: {
          attract: {
            distance: 1000,
            duration: 1,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "bounce" as const,
          },
          random: false,
          speed: 2.5,
          straight: false,
        },
        number: {
          density: {
            enable: false,
          },
          value: 10,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "image",
          options: {
            image: [
              {
                src: "/images/presidents/milei.png",
              },
              {
                src: "/images/presidents/alberto.png",
              },
              {
                src: "/images/presidents/macri.png",
              },
              {
                src: "/images/presidents/cristina.png",
              },
              {
                src: "/images/presidents/menem.png",
              },
              {
                src: "/images/presidents/nestor.png",
              },
              {
                src: "/images/presidents/peron.png",
              },
              {
                src: "/images/presidents/trump.png",
              },
              {
                src: "/images/presidents/delcaño.png",
              },
              {
                src: "/images/presidents/massa.png",
              },
              {
                src: "/images/presidents/larreta.png",
              },
              {
                src: "/images/presidents/kicillof.png",
              },
            ],
          },
        },
        size: {
          value: { min: 30, max: 30 },
        },
        rotate: {
          value: { min: 0, max: 360 },
          animation: {
            enable: true,
            speed: 10,
            sync: true,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <div className="absolute inset-0 -z-0">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
});

export default ParticlesBackground;