import HeadingIntro from "../components/pages/headingIntro";
import * as outline  from "@heroicons/react/24/outline"

export default function Home() {
  return (
    <div className="home-container p-24 pt-30 lg:pl-75">

      <HeadingIntro 
        module="Overview" 
        moduleIntro="View performance metrics and key insight at a glance" 
        Icon={outline.ChevronDownIcon} 
        buttonText="This month" 
        branches={true}
      />

    </div>
   
  )
}
