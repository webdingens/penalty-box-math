import {useCallback, useEffect, useRef, useState} from 'react'
import classNames from 'classnames'

import {
  getRandomTime,
  getRandomPenalties,
  getRandomSkaterNumber,
  getRandomSkaterPosition,
  toDisplayTime
} from '../../utils/utils'
import Stopwatch from '../../components/Stopwatch'

import styles from './ModeSheet.module.scss'

function ModeSheet() {
  const [time, setTime] = useState(getRandomTime())
  const [penalties, setPenalties] = useState(getRandomPenalties())
  const [skaterNumber, setSkaterNumber] = useState(getRandomSkaterNumber())
  const [skaterPosition, setSkaterPosition] = useState(getRandomSkaterPosition())

  const setRandomTime = useCallback(() => {
    setTime(getRandomTime())
  }, []);

  const setRandomPenalties = useCallback(() => {
    setPenalties(getRandomPenalties())
  }, []);

  const setRandomSkaterNumber = useCallback(() => {
    setSkaterNumber(getRandomSkaterNumber())
  }, []);

  const setRandomSkaterPosition = useCallback(() => {
    setSkaterPosition(getRandomSkaterPosition())
  }, []);

  // init
  useEffect(() => {
  }, []);

  return (
    <>
      <div>
        <p className={styles.stopwatchLabel}>Time skater sat down:</p>
        <Stopwatch time={time}/>
      </div>

      <div>
        <p>Penalties: {penalties}</p>
        <p>Skater: {skaterNumber}</p>
        <p>Position: {skaterPosition}</p>
      </div>

      <button type="button">Check</button>
      <p>if time attack started we show a next button, compare own written with summary table</p>
      <button type="button">Next</button>

      <h3>Table full width, variable cell width and scrollbar</h3>
      <div className={styles.tableWrapper}>
        <table className={classNames(
          styles.table,
          styles.tableFull,
          styles.tableVariableWidth
        )}>
          <thead>
            <tr>
              <th>Period</th>
              <th>Jam #</th>
              <th>Btwn<br/>Jams</th>
              <th>Team</th>
              <th>Skater #</th>
              <th>Pos</th>
              <th>In</th>
              <th>Stand</th>
              <th>Done</th>
              <th colSpan="3">Time at End of Jam</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td></td>
              <td></td>
              <td>-</td>
              <td>{skaterNumber}</td>
              <td>{skaterPosition[0]}</td>
              <td>{toDisplayTime(time)}</td>
              <td>{toDisplayTime(time + (penalties - 1) * 30 + 20)}</td>
              <td>{toDisplayTime(time + penalties * 30)}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Table full width black outs</h3>
      <table className={classNames(styles.table, styles.tableFull)}>
        <thead>
          <tr>
            <th className={styles.emptyColumn}><span>Period</span></th>
            <th>Jam #</th>
            <th>Btwn<br/>Jams</th>
            <th className={styles.emptyColumn}><span>Team</span></th>
            <th>Skater #</th>
            <th>Pos</th>
            <th>In</th>
            <th>Stand</th>
            <th>Done</th>
            <th colSpan="3" className={styles.emptyColumn}><span>Time at<br/>End of<br/>Jam</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.emptyColumn}>-</td>
            <td></td>
            <td></td>
            <td className={styles.emptyColumn}></td>
            <td>{skaterNumber}</td>
            <td>{skaterPosition[0]}</td>
            <td>{toDisplayTime(time)}</td>
            <td>{toDisplayTime(time + (penalties - 1) * 30 + 20)}</td>
            <td>{toDisplayTime(time + penalties * 30)}</td>
            <td className={styles.emptyColumn}>-</td>
            <td className={styles.emptyColumn}>-</td>
            <td className={styles.emptyColumn}>-</td>
          </tr>
        </tbody>
      </table>

      <h3>Short Table</h3>
      <table className={classNames(styles.table, styles.tableShort)}>
        <thead>
          <tr>
            <th>Jam #</th>
            <th>Btwn<br/>Jams</th>
            <th className={styles.emptyColumn}><span>Team</span></th>
            <th>Skater #</th>
            <th>Pos</th>
            <th>In</th>
            <th>Stand</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td className={styles.emptyColumn}></td>
            <td>{skaterNumber}</td>
            <td>{skaterPosition[0]}</td>
            <td>{toDisplayTime(time)}</td>
            <td>{toDisplayTime(time + (penalties - 1) * 30 + 20)}</td>
            <td>{toDisplayTime(time + penalties * 30)}</td>
          </tr>
        </tbody>
      </table>

      <h3>Split table single row</h3>
      <table className={classNames(styles.table, styles.tableFull)}>
        <thead>
          <tr>
            <th>Period</th>
            <th>Jam #</th>
            <th>Btwn<br/>Jams</th>
            <th>Team</th>
            <th>Skater #</th>
            <th>Pos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>{skaterNumber}</td>
            <td>{skaterPosition[0]}</td>
          </tr>
        </tbody>
      </table>
      <table className={classNames(styles.table, styles.tableFull)}>
        <thead>
          <tr>
            <th>In</th>
            <th>Stand</th>
            <th>Done</th>
            <th colSpan="3">Time at End of Jam</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{toDisplayTime(time)}</td>
            <td>{toDisplayTime(time + (penalties - 1) * 30 + 20)}</td>
            <td>{toDisplayTime(time + penalties * 30)}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

    </>
  )
}

export default ModeSheet