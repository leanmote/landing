import Hero from '../../components/sections/Hero/Hero.jsx';
import ClientLogos from '../../components/sections/ClientLogos/ClientLogos.jsx';
import F1Engine from '../../components/sections/F1Engine/F1Engine.jsx';
import SprintTrack from '../../components/sections/SprintTrack/SprintTrack.jsx';
import F1PrecisionDashboard from '../../components/sections/F1PrecisionDashboard/F1PrecisionDashboard.jsx';
import KnowledgeGraph from '../../components/sections/KnowledgeGraph/KnowledgeGraph.jsx';
import SecurityIntegrations from '../../components/sections/SecurityIntegrations/SecurityIntegrations.jsx';
import SubscribeCTA from '../../components/sections/SubscribeCTA/SubscribeCTA.jsx';
import './LandingPage.css';

function LandingPage() {
  return (
    <main className="landing-page">
      <Hero />
      <ClientLogos />
      <F1Engine />
      <SprintTrack />
      {/* <F1PrecisionDashboard /> */}
      <KnowledgeGraph />
      <SecurityIntegrations />
      <SubscribeCTA />
    </main>
  );
}

export default LandingPage;
