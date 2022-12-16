import {useState, useEffect} from 'react'

import {FiMaximize, FiMinimize} from 'react-icons/fi'
import styles from './FullScreenToggle.module.scss'

function FullScreenToggle() {
  const [inFullscreen, setInFullscreen] = useState(false)

  if (!inFullscreen && document.fullscreenElement) document.exitFullscreen()  // navigate back using android nav leaves page in fullscreen hiding top

  const onClick = () => {
    if (inFullscreen) {
      document.exitFullscreen()
      setInFullscreen(false)
    } else {
      document.documentElement.requestFullscreen()
      setInFullscreen(true)
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setInFullscreen(!!document.fullscreenElement)
    }
    if (document.fullscreenEnabled) document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => {
      if (document.fullscreenEnabled) document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [])

  return document.fullscreenEnabled ? (
    <button className={styles.toggleButton}
      type="button"
      onClick={onClick}
      title="Enter Fullscreen Mode"
    >
      {inFullscreen ? <FiMinimize /> : <FiMaximize />}
    </button>
  ) : null
}

export default FullScreenToggle