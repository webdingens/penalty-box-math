import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import ModeStopwatchOverlay from '../mode/ModeStopwatchOverlay/ModeStopwatchOverlay'

function StopwatchOverlayPage() {
  return (
    <Layout>
      <Navbar />
      <main>
        <ModeStopwatchOverlay />
      </main>
    </Layout>
  )
}

export default StopwatchOverlayPage