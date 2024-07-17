
import CustomCursor from "../components/CustomCursor"
import FloatingShapes from "../components/FloatingShapes"
import LeftSide from "../components/LeftSide"
import RighSide from "../components/RighSide"


const Home = () => {

  return (
    <div className="min-h-screen w-full flex">
      <LeftSide />
      <RighSide />
      <CustomCursor />
      <FloatingShapes />
      
    </div>
  )
}

export default Home