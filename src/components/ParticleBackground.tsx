// src/components/ParticlesBackground.js
import Particles from "react-tsparticles";

const ParticlesBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,  // Ensures particles stay in the background
        },
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",  // Particle color
          },
          shape: {
            type: "circle",  // Particle shape
          },
          opacity: {
            value: 0.5,  // Transparency of particles
            random: true,  // Enable random opacity
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
            },
          },
          size: {
            value: 3,
            random: true,  // Randomize particle size
            anim: {
              enable: true,
              speed: 4,
              size_min: 0.1,
            },
          },
          links: {
            enable: true,
            distance: 150,
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",  // Change particles behavior when hovered
            },
            onclick: {
              enable: true,
              mode: "push",  // Push particles on click
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

export default ParticlesBackground;
