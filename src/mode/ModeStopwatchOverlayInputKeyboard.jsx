import React from 'react'
import Input from '../components/Input'

import styles from './ModeStopwatchOverlayInputKeyboard.module.scss'

class ModeStopwatchOverlayInputKeyboard extends React.Component {

  constructor(props) {
    super(props)

    this.inputAdd20 = React.createRef()
    this.inputAdd30 = React.createRef()
    this.nextButton = React.createRef()
  }

  reset() {
    this.inputAdd20.current.reset()
    this.inputAdd30.current.reset()
  }

  get value20() {
    return this.inputAdd20.current.value
  }

  get value30() {
    return this.inputAdd30.current.value
  }

  componentDidUpdate(prevProps) {
    if (this.props.isValid && !prevProps.isValid) {
      this.nextButton.current.focus()
    }
  }

  focus() {
    this.inputAdd20.current.focus()
  }

  render() {
    const {onClickNext, isValid} = this.props

    return (
      <>
        <Input
          id="add20"
          label="Add 20 seconds"
          ref={this.inputAdd20}
        />
        <Input
          id="add30"
          label="Add 30 seconds"
          ref={this.inputAdd30}
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