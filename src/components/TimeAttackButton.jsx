import { useCallback } from 'react'
import {
  TIME_ATTACK_STATES,
  useTimeAttackStarted,
  useTimeAttackTimeRemaining
} from '../state/timeAttack'
import {toDisplayTime} from '../utils/utils'

import {FiXSquare} from 'react-icons/fi'

import styles from './TimeAttackButton.module.scss'

function TimeAttackButton() {
  const [timeAttackStarted, setTimeAttackStarted] = useTimeAttackStarted((state) => [state.timeAttackStarted, state.setTimeAttackStarted])
  const timeAttackTimeRemaining = useTimeAttackTimeRemaining(
      (state) => state.timeAttackTimeRemaining
    )

  const timeAttackStart = useCallback(() => setTimeAttackStarted(TIME_ATTACK_STATES.RUNNING), [])
  const timeAttackStop = useCallback(() => setTimeAttackStarted(TIME_ATTACK_STATES.STOPPED), [])

  return (
    <>
      {timeAttackStarted !== TIME_ATTACK_STATES.RUNNING ? (
        <button type="button"
          className={styles.timeAttackButton}
          title="Starts the 2 minute time attack mode"
          onClick={timeAttackStart}
        >Time Attack</button>
      ) : (
        <button type="button"
          className={styles.timeAttackButton}
          title="Current time, abort time attack mode"
          onClick={timeAttackStop}
        >
          {toDisplayTime(timeAttackTimeRemaining)}
          <FiXSquare />
        </button>
      )}
    </>
  )
}

export default TimeAttackButton