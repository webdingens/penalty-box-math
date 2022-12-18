import { useCallback, useEffect, useRef, useState, useContext } from 'react'
import {getRandomTime, getRandomPenalties, toDisplayTime} from '../../utils/utils'
import Stopwatch from '../../components/Stopwatch'
import ModeStopwatchOverlayInputKeyboard from './ModeStopwatchOverlayInputKeyboard'
import ModeStopwatchOverlayInputVirtualNumblock from './ModeStopwatchOverlayInputVirtualNumblock'
import ValidationResponse from '../../components/ValidationResponse'
import SettingsContext from '../../SettingsContext'

import {FiX, FiXSquare} from 'react-icons/fi'

import styles from './ModeStopwatchOverlay.module.scss'

const TIME_ATTACK_STATES = {
  STOPPED: 'STOPPED',
  RUNNING: 'RUNNING',
  RESULTS: 'RESULTS'
}

function ModeStopwatchOverlay() {
  const [time, setTime] = useState(getRandomTime())
  const [penalties, setPenalties] = useState(getRandomPenalties())
  const [isValid, setIsValid] = useState(null)
  const [validationCount, setValidationCount] = useState(0)
  const [timeAttackStarted, setTimeAttackStarted] = useState(TIME_ATTACK_STATES.STOPPED)
  const [timeAttackTimeRemaining, setTimeAttackTimeRemaining] = useState(null)
  const [timeAttackSolvedCount, setTimeAttackSolvedCount] = useState(0)

  const settings = useContext(SettingsContext.Context)

  const inputControl = useRef();
  const stopwatchContainer = useRef();
  const module = useRef();

  const setRandomTime = useCallback(() => {
    setTime(getRandomTime())
  }, []);

  const setRandomPenalties = useCallback(() => {
    setPenalties(getRandomPenalties())
  }, []);

  const onNext = useCallback(() => {
    setRandomTime()
    setRandomPenalties()
    setIsValid(null)
    inputControl.current.reset()
    inputControl.current.focus()
  }, []);

  const verifyInput = useCallback(() => {
    setValidationCount(validationCount + 1)

    let timeAdd1 = inputControl.current.value1.split(':')
    if (timeAdd1.length !== 2) {
      setIsValid(false)
      return
    }
    let timeAdd2 = inputControl.current.value2.split(':')
    if (timeAdd2.length !== 2) {
      setIsValid(false)
      return
    }
    timeAdd1 = (timeAdd1[0] == '' ? 0 : parseInt(timeAdd1[0])) * 60 + parseInt(timeAdd1[1])
    timeAdd2 = (timeAdd2[0] == '' ? 0 : parseInt(timeAdd2[0])) * 60 + parseInt(timeAdd2[1])

    if (timeAdd1 === time + (penalties * 30 - 10) &&
        timeAdd2 === time + (penalties * 30)) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [time, penalties, validationCount]);

  const onSubmit = useCallback((evt) => {
    evt.preventDefault()
    verifyInput()
  }, [verifyInput])

  const timeAttackStart = useCallback(() => setTimeAttackStarted(TIME_ATTACK_STATES.RUNNING), [])
  const timeAttackStop = useCallback(() => setTimeAttackStarted(TIME_ATTACK_STATES.STOPPED), [])

  // initial focus
  useEffect(() => {
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
    setTimeAttackTimeRemaining(duration)
    setTimeAttackSolvedCount(0)
    setRandomTime()
    setRandomPenalties()
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
      setTimeAttackTimeRemaining(duration - Math.floor(dt / 1000))

      raf = requestAnimationFrame(updateTime)
    }
    updateTime()

    return () => raf && cancelAnimationFrame(raf)
  }, [timeAttackStarted])

  // responsive custom property --stopwatch-container-height
  useEffect(() => {
    const onResize = () => {
      const stopwatchContainerHeight = stopwatchContainer.current.clientHeight
      module.current.style.setProperty('--stopwatch-container-height', `${stopwatchContainerHeight}px`)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [settings.smallStopwatch, settings.inFullscreen])

  return (
    <form ref={module} className={styles.form} autoComplete="off" onSubmit={onSubmit}>
      <div ref={stopwatchContainer}>
        <p className={styles.stopwatchLabel}>Time skater sat down:</p>
        <Stopwatch time={time}/>
      </div>

      {settings.virtualNumblock ? (
        <ModeStopwatchOverlayInputVirtualNumblock
          ref={inputControl}
          onNext={onNext}
          onEnter={verifyInput}
          isValid={isValid}
          penalties={penalties}
        />
      ) : (
        <ModeStopwatchOverlayInputKeyboard
          ref={inputControl}
          onNext={onNext}
          isValid={isValid}
          penalties={penalties}
        />
      )}

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
          <div>
            <p>You solved: {timeAttackSolvedCount} times ({timeAttackSolvedCount * 2 } additions)
            </p>
            <button type="button"
              onClick={timeAttackStop}
            >Great!</button>
          </div>
        </div>
      ) : null}

      <ValidationResponse
        isValid={isValid}
        validationCount={validationCount}
      />
    </form>
  )
}

export default ModeStopwatchOverlay