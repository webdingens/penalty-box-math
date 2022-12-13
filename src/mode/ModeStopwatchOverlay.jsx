import { useCallback, useEffect, useRef, useState } from 'react'
import gaussian from 'gaussian'
import Stopwatch from '../components/Stopwatch'
import ModeStopwatchOverlayInputKeyboard from './ModeStopwatchOverlayInputKeyboard'

import {FiX, FiXSquare} from 'react-icons/fi'

import styles from './ModeStopwatchOverlay.module.scss'

const gaussdistribution = gaussian(0, Math.pow(2 * 60, 2))

const TIME_ATTACK_STATES = {
  STOPPED: 'STOPPED',
  RUNNING: 'RUNNING',
  RESULTS: 'RESULTS'
}

function ModeStopwatchOverlay() {
  const [time, setTime] = useState(null)
  const [isValid, setIsValid] = useState(null)
  const [timeAttackStarted, setTimeAttackStarted] = useState(TIME_ATTACK_STATES.STOPPED)
  const [timeAttackDisplayTime, setTimeAttackDisplayTime] = useState(null)
  const [timeAttackSolvedCount, setTimeAttackSolvedCount] = useState(0)

  const inputControl = useRef();

  const setRandomTime = useCallback(() => {
    // const newTime = Math.floor(Math.random() * (5 * 60 + 1)) // 5 minutes
    const newTime = Math.floor(Math.abs(gaussdistribution.random(1)[0])) // 5 minutes
    setTime(newTime)
  }, []);

  const onClickNext = useCallback(() => {
    setRandomTime()
    setIsValid(null)
    inputControl.current.reset()
    inputControl.current.focus()
  }, []);

  const verifyInput = useCallback(() => {
    let timeAdd20 = inputControl.current.value20.split(':')
    if (timeAdd20.length !== 2) {
      setIsValid(false)
      return
    }
    let timeAdd30 = inputControl.current.value30.split(':')
    if (timeAdd30.length !== 2) {
      setIsValid(false)
      return
    }
    timeAdd20 = (timeAdd20[0] == '' ? 0 : parseInt(timeAdd20[0])) * 60 + parseInt(timeAdd20[1])
    timeAdd30 = (timeAdd30[0] == '' ? 0 : parseInt(timeAdd30[0])) * 60 + parseInt(timeAdd30[1])

    if (timeAdd20 === time + 20 && timeAdd30 === time + 30) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [time]);

  const onSubmit = useCallback((evt) => {
    evt.preventDefault()
    verifyInput()
  }, [verifyInput])

  const timeAttackStart = useCallback((evt) => setTimeAttackStarted(TIME_ATTACK_STATES.RUNNING), [])
  const timeAttackStop = useCallback((evt) => setTimeAttackStarted(TIME_ATTACK_STATES.STOPPED), [])

  // init
  useEffect(() => {
    setRandomTime()
    inputControl.current.focus()
  }, []);

  // onChange isValid
  useEffect(() => {
    if (isValid) {
      if (timeAttackStarted === TIME_ATTACK_STATES.RUNNING) {
        setTimeAttackSolvedCount(timeAttackSolvedCount + 1)
      }
    }
  }, [isValid])

  // onChange timeAttackStarted
  useEffect(() => {
    if (timeAttackStarted !== TIME_ATTACK_STATES.RUNNING) return

    // init
    const startTimeStamp = Date.now()
    const duration = 120 // 2 * 60  // seconds
    setTimeAttackDisplayTime(duration)
    setTimeAttackSolvedCount(0)
    setRandomTime()
    inputControl.current.reset()
    inputControl.current.focus()
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
      setTimeAttackDisplayTime(duration - Math.floor(dt / 1000))

      raf = requestAnimationFrame(updateTime)
    }
    updateTime()

    return () => raf && cancelAnimationFrame(raf)
  }, [timeAttackStarted])

  return (
    <form className={styles.form} onSubmit={onSubmit} autoComplete="off">
      <p><strong>Time skater sat down:</strong></p>
      <Stopwatch time={time}/>


      <ModeStopwatchOverlayInputKeyboard
        ref={inputControl}
        onClickNext={onClickNext}
        isValid={isValid}
      />


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
          {Math.floor(timeAttackDisplayTime / 60)}:{String(timeAttackDisplayTime % 60).padStart(2,'0')}
          <FiXSquare />
        </button>
      )}

      {timeAttackStarted === TIME_ATTACK_STATES.RESULTS ? (
        <div className={styles.resultsOverlay}>
          <button type="button"
            className={styles.resultsOverlay__closeButton}
            onClick={timeAttackStop}
          ><FiX /></button>
          <div>
            <p>You solved: {timeAttackSolvedCount} times ({timeAttackSolvedCount * 2 } additions)
            </p>
            <button type="button"
              onClick={timeAttackStop}
            >Great!</button>
          </div>
        </div>
      ) : null}
    </form>
  )
}

export default ModeStopwatchOverlay