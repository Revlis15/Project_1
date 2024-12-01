
import { Banner } from './Banner'
import New from './New'
import Recommended from './Recommended'
import TopSell from './TopSell'

const Home = () => {
  return (
    <>
        <Banner/>
        <TopSell/>
        <Recommended/>
        <New/>
    </>
  )
}

export default Home