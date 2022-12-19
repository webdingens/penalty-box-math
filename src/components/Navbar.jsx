import {Link, useLocation} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import styles from './Navbar.module.scss'
import SettingsMenu from './SettingsMenu'
import Help from './Help'
import FullScreenToggle from './FullScreenToggle'

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
        {location.pathname !== '/' ? <Help /> : null}
      </div>
    </div>
  )
}

export default Navbar