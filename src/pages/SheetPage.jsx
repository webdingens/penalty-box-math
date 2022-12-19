import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import ModeSheet from '../mode/ModeSheet/ModeSheet'

function SheetPage() {
  return (
    <Layout>
      <Navbar />
      <main>
        <ModeSheet />
      </main>
    </Layout>
  )
}

export default SheetPage