import HeadingIntro from "../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"
import { formatNaira, formatNumber } from "../utils/format";
import MetricsContainer from "../components/pages/metricsCont";

export default function Home() {
  return (
    <div className="home-container p-24 pt-30 lg:pl-75">
      {/* Module Intro component */}
      <HeadingIntro 
        module="Overview" 
        moduleIntro="View performance metrics and key insight at a glance" 
        Icon={outline.ChevronDownIcon} 
        buttonText="This month" 
        branches={true}
      />

      {/* Transaction Metrics components */}
      <MetricsContainer
        metrics={[
          { label: 'Total Sales', value: formatNaira(125500000), percentage: '+11.02%', comparison: 'vs last month', trend: 'up' },
          { label: 'Total Orders', value: formatNumber(2500), percentage: '+5.00%', comparison: 'vs last month', trend: 'up' },
          { label: 'Total Customers', value: formatNumber(312), percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
          { label: 'Customer Satisfaction', value: "89%", percentage: '-3.50%', comparison: 'vs last month', trend: 'down' },
        ]}
      />

    </div>
   
  )
}
