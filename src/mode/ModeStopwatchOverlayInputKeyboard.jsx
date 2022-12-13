import React from 'react'
import Input from '../components/Input'

import styles from './ModeStopwatchOverlayInputKeyboard.module.scss'

class ModeStopwatchOverlayInputKeyboard extends React.Component {

  constructor(props) {
    super(props)

    this.inputAdd1 = React.createRef()
    this.inputAdd2 = React.createRef()
    this.nextButton = React.createRef()
  }

  reset() {
    this.inputAdd1.current.reset()
    this.inputAdd2.current.reset()
  }

  get value1() {
    return this.inputAdd1.current.value
  }

  get value2() {
    return this.inputAdd2.current.value
  }

  componentDidUpdate(prevProps) {
    if (this.props.isValid && !prevProps.isValid) {
      this.nextButton.current.focus()
    }
  }

  focus() {
    this.inputAdd1.current.focus()
  }

  render() {
    const {onClickNext, isValid, penalties} = this.props

    return (
      <>
        <p>{penalties ? `${penalties} ${penalties == 1 ? 'Penalty' : 'Penalties'}` : ''}</p>
        <Input
          label={penalties ? `Add ${30 * penalties - 10} seconds` : ''}
          ref={this.inputAdd1}
        />
        <Input
          label={penalties ? `Add ${30 * penalties} seconds` : ''}
          ref={this.inputAdd2}
        />
        <div className={styles.controls}>
          {isValid === false || isValid === null ? (
            <button type="submit">Check answer</button>
          ) : null}
          {isValid === true ? (
            <>
              <button onClick={onClickNext} type="button" ref={this.nextButton}>Next</button>
              <p className={styles.feedback}>Correct answer!</p>
            </>
          ) : null}
          {isValid === false ? (
            <p className={styles.feedback}>Not correct.</p>
          ) : null}
        </div>
      </>
    )
  } 
}

export default ModeStopwatchOverlayInputKeyboard