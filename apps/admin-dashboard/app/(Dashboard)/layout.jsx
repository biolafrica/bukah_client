import Header from "../components/layout/header";
import Sider from "../components/layout/sider";

export default function DashboardLayout({children}){
  return(
    <div className="flex">
      <Sider/>

      <div className="sider_content_container">
        <Header/>
        <main>
          {children}
        </main>
      </div>
  
    </div>
  )
}