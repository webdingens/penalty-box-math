import React, {Suspense} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import styles from './Navbar.module.scss'
import SettingsMenu from './SettingsMenu'
import Help from './Help'
import FullScreenToggle from './FullScreenToggle'

const ModeStopwatchOverlayHelp = React.lazy(() => import('../mode/ModeStopwatchOverlay/ModeStopwatchOverlayHelp'))

function Navbar() {
  const location = useLocation()
  return (
    <div className={styles.navbar}>
      <div>
        {location.pathname !== '/' ? (
          <Link to="/" className={styles.button}><FiArrowLeft /></Link>
        ) : null}
        {location.pathname === '/stopwatch' ? <SettingsMenu /> : null}
      </div>


      <div>
        {location.pathname !== '/' ? <FullScreenToggle /> : null}
        {location.pathname !== '/' ? (
          <Help>
            {location.pathname === '/stopwatch' ? (
              <Suspense>
                <ModeStopwatchOverlayHelp />
              </Suspense>
            ) : null}
          </Help>
        ) : null}
      </div>
    </div>
  )
}

export default Navbar