import {useContext, useState} from 'react'
import classNames from 'classnames'
import { FiX, FiHelpCircle } from 'react-icons/fi';

import SettingsContext from '../SettingsContext'
import styles from './Help.module.scss'

function Help() {
  const settings = useContext(SettingsContext.Context)
  const [hideLastSecondsDigit, setHideLastSecondsDigit] = useState(false)

  const onClick = () => {
    settings.setHelpOpen(!settings.helpOpen)
    if (settings.settingsMenuOpen) settings.setSettingsMenuOpen(false)
  }

  const getTableDisplay = (key, add, hideLastSecondsDigit = false) => {
    let sum = key + add
    let minutes = Math.floor(sum / 60)
    let seconds = String(sum % 60).padStart(2, '0')
    if (hideLastSecondsDigit) seconds = seconds.substring(0,1)
    return `${minutes}:${seconds}`
  }

  return (
    <div className={styles.help}>
      <button type="button"
        className={
          classNames(
            styles.toggleBtn,
            {
              [styles.toggleBtnActive]: settings.helpOpen
            }
          )
        }
        onClick={onClick}
      >{settings.helpOpen ? <FiX /> : <FiHelpCircle />}</button>

      <div
        className={
          classNames(
            styles.offCanvas,
            {
              [styles.offCanvasActive]: settings.helpOpen
            }
          )
        }
      >
        <h2>Accepted inputs</h2>
        <p>
          :00 - 0:59 <br />
          0:00 - 0:59 <br />
          1:00 - 1:59 <br />
          2:00 - 2:59 <br />
          3:00 - 3:59 <br />
          4:00 - 4:59 <br />
        </p>
        <p>You can press Enter/Return to submit the input.</p>

        <h2>Tip 1:</h2>
        <p>You can reuse the addition of 20 and add 10 in the second step.</p>

        <h2>Tip 2:</h2>
        <p>The right digit of the seconds part gets carried over and doesn't change. (1 penalty)</p>

        <h2>Tip 3:</h2>
        <p>With two penalties it might be easier to add the full minute first, then subtract 10 seconds.</p>

        <h2>Addition table</h2>
        <button type="button"
          onClick={() => setHideLastSecondsDigit(!hideLastSecondsDigit)}
        >
          {hideLastSecondsDigit ? 'Show' : 'Hide'} right seconds digit
        </button>
        <table>
          <tbody>
            <tr>
              <th>Sits @</th>
              <th>+20</th>
              <th>+30</th>
              <th>+50</th>
              <th>+60</th>
            </tr>
            {!hideLastSecondsDigit ? [...Array(61).keys()].map(key => (
              <tr key={key}>
                <td>{getTableDisplay(key, 0, hideLastSecondsDigit)}</td>
                <td>{getTableDisplay(key, 20, hideLastSecondsDigit)}</td>
                <td>{getTableDisplay(key, 30, hideLastSecondsDigit)}</td>
                <td>{getTableDisplay(key, 50, hideLastSecondsDigit)}</td>
                <td>{getTableDisplay(key, 60, hideLastSecondsDigit)}</td>
              </tr>
            )) : [...Array(7).keys()].map(key => (
              <tr key={key}>
                <td>{getTableDisplay(key * 10, 0, hideLastSecondsDigit)}</td>
                <td>{getTableDisplay(key * 10, 20, hideLastSecondsDigit)}</td>
                <td>{getTableDisplay(key * 10, 30, hideLastSecondsDigit)}</td>
                <td>{getTableDisplay(key * 10, 50, hideLastSecondsDigit)}</td>
                <td>{getTableDisplay(key * 10, 60, hideLastSecondsDigit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Help