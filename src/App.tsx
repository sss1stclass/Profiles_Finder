import ParticlesBackground from "./components/ParticleBackground";
import Tabs from "./components/Tabs";
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <>
      <ParticlesBackground />
      <Tabs />
      <Analytics />
    </>
  )
};

export default App;
