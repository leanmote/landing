import ComparisonTable from '../../components/sections/ComparisonTable/ComparisonTable.jsx';
import Addons from '../../components/sections/Addons/Addons.jsx';
import PricingTabs from '../../components/sections/PricingTabs/PricingTabs.jsx';
import RoiCalculator from '../../components/sections/RoiCalculator/RoiCalculator.jsx';
import Faq from '../../components/sections/Faq/Faq.jsx';
import SubscribeCTA from '../../components/sections/SubscribeCTA/SubscribeCTA.jsx';
import './PricingPage.css';

function PricingPage() {
  return (
    <main className="pricing-page">
      <PricingTabs />
      <RoiCalculator />
      <Addons />
      <ComparisonTable />
      <Faq />
      <SubscribeCTA />
    </main>
  );
}

export default PricingPage;
