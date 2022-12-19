import {useCallback, useEffect, useRef, useState} from 'react'
import {
  getRandomTime,
  getRandomPenalties,
  getRandomJam,
  getRandomSkaterNumber,
  getRandomSkaterPosition,
  getRandomInBetween,
  toDisplayTime,
} from '../../utils/utils'
import Stopwatch from '../../components/Stopwatch'
import Sheet, {SHEET_TYPES} from '../../components/Sheet'

import {FiX, FiXSquare} from 'react-icons/fi'

import styles from './ModeSheet.module.scss'

const TIME_ATTACK_STATES = {
  STOPPED: 'STOPPED',
  RUNNING: 'RUNNING',
  RESULTS: 'RESULTS'
}

function ModeSheet() {
  const [time, setTime] = useState(getRandomTime())
  const [penalties, setPenalties] = useState(getRandomPenalties())
  const [jam, setJam] = useState(getRandomJam())
  const [checking, setChecking] = useState(false)
  const [showFullTable, setShowFullTable] = useState(false)
  const [skaterNumber, setSkaterNumber] = useState(getRandomSkaterNumber())
  const [skaterPosition, setSkaterPosition] = useState(getRandomSkaterPosition())
  const [inBetween, setInBetween] = useState(getRandomInBetween())
  const [timeAttackStarted, setTimeAttackStarted] = useState(TIME_ATTACK_STATES.STOPPED)
  const [timeAttackTimeRemaining, setTimeAttackTimeRemaining] = useState(null)
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

  const timeAttackStart = useCallback(() => {
    setTimeAttackStarted(TIME_ATTACK_STATES.RUNNING)
    setChecking(false)
  }, [])
  const timeAttackStop = useCallback(() => setTimeAttackStarted(TIME_ATTACK_STATES.STOPPED), [])

  // onChange timeAttackStarted
  useEffect(() => {
    if (timeAttackStarted !== TIME_ATTACK_STATES.RUNNING) return

    // init
    const startTimeStamp = Date.now()
    const duration = 120 // 2 * 60  // seconds
    setTimeAttackTimeRemaining(duration)
    setTimeAttackPrompts([])
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

          <button type="button" onClick={onClickShowFullTable} title={showFullTable ? 'Show short table' : 'Show full table'}>{showFullTable ? 'Short' : 'Full'}</button>
        </div>
      ) : null}

      {/* Red time attack button at top */}
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

            <div>
              <button type="button" onClick={onClickShowFullTable} title={showFullTable ? 'Show short table' : 'Show full table'}>{showFullTable ? 'Short' : 'Full'}</button>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  )
}

export default ModeSheet