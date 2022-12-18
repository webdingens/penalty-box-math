import styles from './Sheet.module.scss'
import classNames from 'classnames'
import {FiX} from 'react-icons/fi'
import {
  toDisplayTime
} from '../utils/utils'

export const SHEET_TYPES = {
  FULL: 'FULL',
  SHORT: 'SHORT',
}

function Sheet({
  rows,
  type = SHEET_TYPES.FULL
}) {
  return (
    <>
      {type === SHEET_TYPES.FULL ? (
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
              {rows.map(({
                jam,
                inBetween,
                skaterNumber,
                skaterPosition,
                penalties,
                time
              }, idx) => (
                <tr key={idx}>
                  <td></td>
                  <td>{jam}</td>
                  <td>
                    {inBetween ? (
                      <FiX />
                    ): null}
                  </td>
                  <td></td>
                  <td>{skaterNumber}</td>
                  <td>{skaterPosition[0]}</td>
                  <td>{toDisplayTime(time)}</td>
                  <td>{toDisplayTime(time + (penalties - 1) * 30 + 20)}</td>
                  <td>{toDisplayTime(time + penalties * 30)}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ): null}

      {type === SHEET_TYPES.SHORT ? (
        <div className={styles.tableWrapper}>
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
              {rows.map(({
                jam,
                inBetween,
                skaterNumber,
                skaterPosition,
                penalties,
                time
              }, idx) => (
                <tr key={idx}>
                  <td>{jam}</td>
                  <td>
                    {inBetween ? (
                      <FiX />
                    ): null}
                  </td>
                  <td className={styles.emptyColumn}></td>
                  <td>{skaterNumber}</td>
                  <td>{skaterPosition[0]}</td>
                  <td>{toDisplayTime(time)}</td>
                  <td>{toDisplayTime(time + (penalties - 1) * 30 + 20)}</td>
                  <td>{toDisplayTime(time + penalties * 30)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ): null}
    </>
  )
}

export default Sheet