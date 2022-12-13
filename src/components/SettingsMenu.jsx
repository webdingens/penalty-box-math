import {useContext} from 'react'
import classNames from 'classnames'
import SettingsContext from '../SettingsContext'
import {FiSettings, FiX} from 'react-icons/fi'
import styles from './SettingsMenu.module.scss'

function SettingsMenu() {
  const settings = useContext(SettingsContext.Context);

  const onClick = () => {
    settings.setSettingsMenuOpen(!settings.settingsMenuOpen)
    if (settings.helpOpen) settings.setHelpOpen(false)
  }

  return (
    <div className={styles.settingsMenu}>
      <button type="button"
        className={
          classNames(
            styles.toggleBtn,
            {
              [styles.toggleBtnActive]: settings.settingsMenuOpen
            }
          )
        }
        onClick={onClick}
      >{settings.settingsMenuOpen ? <FiX /> : <FiSettings />}</button>

      <div
        className={
          classNames(
            styles.offCanvas,
            {
              [styles.offCanvasActive]: settings.settingsMenuOpen
            }
          )
        }
      >
        <label>
          <input type="checkbox" checked={settings.splitInput}
            onChange={(evt) => {
              settings.setSplitInput(evt.target.checked)
            }}
          />
          Two fields per input
        </label>
        <label>
          <input type="checkbox" checked={settings.virtualNumblock}
            onChange={(evt) => {
              settings.setVirtualNumblock(evt.target.checked)
            }}
          />
          Use virtual numblock
        </label>
        <label>
          Mode
          <select
            onChange={(evt) => {
              settings.setMode(evt.target.value)
            }}
            value={settings.mode}
          >
            {Object.keys(SettingsContext.modes).map(key => {
              return (
                <option value={SettingsContext.modes[key]} key={key}>{SettingsContext.modes[key]}</option>
              )
            })}
          </select>
        </label>
      </div>
    </div>
  )
}

export default SettingsMenu