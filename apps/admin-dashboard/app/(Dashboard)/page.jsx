import HeadingIntro from "../components/common/headingIntro";
import ClientHomeInner from "../components/pages/home/clientHomeInner";

export default function Home() {

  return (
    <div className="home-container p-5 pt-30 lg:pl-75">

      {/* Module Intro component */}
      <HeadingIntro 
        module="Overview" 
        moduleIntro="View performance metrics and key insight at a glance" 
        buttonText="This month" 
        branches={true}
      />

      <ClientHomeInner/>

    </div>
   
  )
}
