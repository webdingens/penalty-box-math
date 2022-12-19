import {useContext, useEffect, useState} from 'react'
import classNames from 'classnames'
import SettingsContext from '../SettingsContext'
import {FiSettings, FiX} from 'react-icons/fi'
import styles from './SettingsMenu.module.scss'

function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const settings = useContext(SettingsContext.Context);

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const onClickOutside = (evt) => {
      if (!evt.target.closest(`.${styles.settingsMenu}`)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => {
      document.removeEventListener('click', onClickOutside)
    }
  }, [])

  return (
    <div className={styles.settingsMenu}>
      <button type="button"
        className={styles.toggleBtn}
        onClick={onClick}
      >{isOpen ? <FiX /> : <FiSettings />}</button>

      <div
        className={
          classNames(
            styles.offCanvas,
            {
              [styles.offCanvasActive]: isOpen
            }
          )
        }
      >
        <label>
          <input type="checkbox" checked={settings.virtualNumblock}
            onChange={(evt) => {
              settings.setVirtualNumblock(evt.target.checked)
            }}
          />
          Use virtual numblock (Touch/Mobile)
        </label>
        {settings.virtualNumblock ? null : (
          <label>
            <input type="checkbox" checked={settings.splitInput}
              onChange={(evt) => {
                settings.setSplitInput(evt.target.checked)
              }}
            />
            Two fields per input (keyboard)
          </label>
        )}
      </div>
    </div>
  )
}

export default SettingsMenu