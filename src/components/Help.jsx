import {useEffect, useState} from 'react'
import classNames from 'classnames'
import { FiX, FiHelpCircle } from 'react-icons/fi';

import styles from './Help.module.scss'

function Help({children}) {
  const [isOpen, setIsOpen] = useState(false)
  const [hideLastSecondsDigit, setHideLastSecondsDigit] = useState(false)

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  const getTableDisplay = (key, add, hideLastSecondsDigit = false) => {
    let sum = key + add
    let minutes = Math.floor(sum / 60)
    let seconds = String(sum % 60).padStart(2, '0')
    if (hideLastSecondsDigit) seconds = seconds.substring(0,1)
    return `${minutes}:${seconds}`
  }

  useEffect(() => {
    const onClickOutside = (evt) => {
      if (!evt.target.closest(`.${styles.help}`)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => {
      document.removeEventListener('click', onClickOutside)
    }
  }, [])

  return (
    <div className={styles.help}>
      <button type="button"
        className={
          classNames(
            styles.toggleBtn,
            {
              [styles.toggleBtnActive]: isOpen
            }
          )
        }
        onClick={onClick}
      >{isOpen ? <FiX /> : <FiHelpCircle />}</button>

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
        {/* Specific help can be passed as children */}
        {children}

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