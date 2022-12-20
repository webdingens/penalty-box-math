import {useCallback, useEffect, useRef, useState} from 'react'
import {
  getRandomTime,
  getRandomPenalties,
  getRandomJam,
  getRandomSkaterNumber,
  getRandomSkaterPosition,
  getRandomInBetween,
} from '../../utils/utils'
import Stopwatch from '../../components/Stopwatch'
import Sheet, {SHEET_TYPES} from '../../components/Sheet'
import {
  TIME_ATTACK_STATES,
  useTimeAttackStarted,
  useTimeAttackTimeRemaining
} from '../../state/timeAttack'

import {FiX} from 'react-icons/fi'

import styles from './ModeSheet.module.scss'

function ModeSheet() {
  const [time, setTime] = useState(getRandomTime())
  const [penalties, setPenalties] = useState(getRandomPenalties())
  const [jam, setJam] = useState(getRandomJam())
  const [checking, setChecking] = useState(false)
  const [showFullTable, setShowFullTable] = useState(false)
  const [skaterNumber, setSkaterNumber] = useState(getRandomSkaterNumber())
  const [skaterPosition, setSkaterPosition] = useState(getRandomSkaterPosition())
  const [inBetween, setInBetween] = useState(getRandomInBetween())
  const [
    timeAttackStarted,
    setTimeAttackStarted
  ] = useTimeAttackStarted(
      (state) => [
        state.timeAttackStarted,
        state.setTimeAttackStarted
      ]
    )
  const setTimeAttackTimeRemaining = useTimeAttackTimeRemaining(
      (state) => state.setTimeAttackTimeRemaining
    )
  const [timeAttackPrompts, setTimeAttackPrompts] = useState([])

  const initialFocus = useRef();

  const onClickShowFullTable = useCallback(() => {
    setShowFullTable(!showFullTable)
  }, [showFullTable]);

  const initNewPrompt = useCallback(() => {
    setTime(getRandomTime())
    setPenalties(getRandomPenalties())
    setJam(getRandomJam())
    setSkaterNumber(getRandomSkaterNumber())
    setSkaterPosition(getRandomSkaterPosition())
    setInBetween(getRandomInBetween())
  }, [])

  const onClickControl = () => {
    if (checking || timeAttackStarted === TIME_ATTACK_STATES.RUNNING) {
      setChecking(false)
      if (timeAttackStarted) {
        // store current prompt
        setTimeAttackPrompts([
          ...timeAttackPrompts,
          {
            time,
            penalties,
            jam,
            skaterNumber,
            skaterPosition,
            inBetween,
          }
        ])
      }
      initNewPrompt()
    } else {
      setChecking(true)
    }
  }

  // initial focus
  useEffect(() => {
    initialFocus.current.focus()
  }, []);

  const timeAttackStop = useCallback(() => setTimeAttackStarted(TIME_ATTACK_STATES.STOPPED), [])

  // stop time attack on unmount
  useEffect(() => {
    return () => {
      timeAttackStop()
    }
  }, [])

  // onChange timeAttackStarted
  useEffect(() => {
    if (timeAttackStarted !== TIME_ATTACK_STATES.RUNNING) return

    // init
    const startTimeStamp = Date.now()
    const duration = 120 // 2 * 60  // seconds
    setTimeAttackTimeRemaining(duration)
    setTimeAttackPrompts([])
    setChecking(false)
    initNewPrompt()
    initialFocus.current.focus()
    let raf

    // update loop
    const updateTime = () => {
      const nextTimeStamp = Date.now()

      // break condition
      if (nextTimeStamp > startTimeStamp + duration * 1000) {
        setTimeAttackStarted(TIME_ATTACK_STATES.RESULTS)
        return
      }

      // update
      const dt = nextTimeStamp - startTimeStamp
      setTimeAttackTimeRemaining(duration - Math.floor(dt / 1000))

      raf = requestAnimationFrame(updateTime)
    }
    updateTime()

    return () => raf && cancelAnimationFrame(raf)
  }, [timeAttackStarted])

  return (
    <div className={styles.module}>
      <div>
        <p className={styles.stopwatchLabel}>Time skater sat down:</p>
        <Stopwatch
          time={time}
          zoomable={false}
          smallStopwatch={true}
        />
      </div>

      <div>
        <p>
          Penalties: {penalties}<br/>
          Skater: {skaterNumber}<br/>
          Position: {skaterPosition}<br/>
          Jam: {jam}<br/>
          {inBetween ? 'In Between' : 'Not In Between'}
        </p>
      </div>

      <button type="button"
        onClick={onClickControl}
        ref={initialFocus}
      >{checking || timeAttackStarted === TIME_ATTACK_STATES.RUNNING ? 'Next': 'Check'}</button>

      {checking ? (
        <div className={styles.tableView}>
          <Sheet
            type={showFullTable ? SHEET_TYPES.FULL : SHEET_TYPES.SHORT}
            rows={[
              {
                jam,
                inBetween,
                skaterNumber,
                skaterPosition,
                penalties,
                time
              }
            ]}
          />

          <div className={styles.toggleFullTableWrapper}>
            <button type="button"
              onClick={onClickShowFullTable}
              title={showFullTable ? 'Show short table' : 'Show full table'}
              className={styles.toggleFullTable}
            >{showFullTable ? 'Short' : 'Full'}</button>
          </div>
        </div>
      ) : null}

      {/* Results overlay after time attack */}
      {timeAttackStarted === TIME_ATTACK_STATES.RESULTS ? (
        <div className={styles.resultsOverlay}>
          <button type="button"
            className={styles.resultsOverlay__closeButton}
            onClick={timeAttackStop}
          ><FiX /></button>
          <div className={styles.tableView}>
            <p>You had <strong>{timeAttackPrompts.length}</strong> skaters in the box.</p>
            <p>Compare with your paperwork:</p>
            <Sheet
              type={showFullTable ? SHEET_TYPES.FULL : SHEET_TYPES.SHORT}
              rows={timeAttackPrompts}
            />

            <div className={styles.toggleFullTableWrapper}>
              <button type="button"
                onClick={onClickShowFullTable}
                title={showFullTable ? 'Show short table' : 'Show full table'}
                className={styles.toggleFullTable}
                >{showFullTable ? 'Short' : 'Full'}</button>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  )
}

export default ModeSheet