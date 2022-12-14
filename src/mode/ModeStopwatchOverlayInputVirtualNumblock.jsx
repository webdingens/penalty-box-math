import React from 'react'
import Input from '../components/Input'

import styles from './ModeStopwatchOverlayInputVirtualNumblock.module.scss'

class ModeStopwatchOverlayInputVirtualNumblock extends React.Component {

  constructor(props) {
    super(props)

    this.module = React.createRef()
  }

  state = {
    value1: '',
    value2: '',
    input1Focussed: true,
    input2Focussed: false
  }

  reset() {
    this.setState({
      value1: '',
      value2: '',
    })
  }

  get value1() {
    return this.state.value1
    // return this.inputAdd1.current.value
  }

  get value2() {
    return this.state.value2
    // return this.inputAdd2.current.value
  }

  get displayValue1() {
    return this.state.value1 + (this.state.input1Focussed ? '|' : '')
  }

  get displayValue2() {
    return this.state.value2 + (this.state.input2Focussed ? '|' : '')
  }

  focus() {
    this.setState({
      input1Focussed: true,
      input2Focussed: false
    })
  }

  handleInput(key) {
    if (this.state.input1Focussed) {
      this.setState({
        value1: this.state.value1 + key
      })
    } else {
      this.setState({
        value2: this.state.value2 + key
      })
    }
  }

  handleEnter() {
    if (this.props.isValid === true) {
      this.props.onNext()
    } else {
      this.props.onEnter()
    }
  }

  handleDelete() {
    if (this.state.input1Focussed) {
      if (this.state.value1.length) {
        this.setState({
          value1: this.state.value1.substring(0, this.state.value1.length - 1)
        })
      }
    } else {
      if (this.state.value2.length) {
        this.setState({
          value2: this.state.value2.substring(0, this.state.value2.length - 1)
        })
      }
    }
  }

  render() {
    const {isValid, penalties} = this.props

    return (
      <div ref={this.module}>
        <p>{penalties ? `${penalties} ${penalties == 1 ? 'Penalty' : 'Penalties'}` : ''}</p>

        <div className={styles.inputFields}>
          <div
            onClick={() => this.setState({
              input1Focussed: true,
              input2Focussed: false,
            })}
          >
            <p className={styles.inputLabel}>{penalties ? `Add ${30 * penalties - 10} seconds` : ''}</p>
            <p className={styles.inputField}>
              {this.state.value1}
              {this.state.input1Focussed ? (
                <span>|</span>
              ) : null}
            </p>
          </div>
          <div
            onClick={() => this.setState({
              input1Focussed: false,
              input2Focussed: true
            })}
          >
            <p className={styles.inputLabel}>{penalties ? `Add ${30 * penalties} seconds` : ''}</p>
            <p className={styles.inputField}>
              {this.state.value2}
              {this.state.input2Focussed ? (
                <span>|</span>
              ) : null}
            </p>
          </div>
        </div>

        <svg className={styles.svg} viewBox="0,0 400,500"
          preserveAspectRatio="none"
        >
          {/* <rect x="0" y="0" width="450" height="500" fill="green" /> */}
          <g
            onClick={() => this.setState({
              input1Focussed: true,
              input2Focussed: false
            })}
          >
            <rect x="0" y="0" width="200" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">Left</text>
          </g>
          <g transform="translate(200, 0)"
            onClick={() => this.setState({
              input1Focussed: false,
              input2Focussed: true
            })}
          >
            <rect x="0" y="0" width="200" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">Right</text>
          </g>
          <g transform="translate(0, 400)"
            onClick={() => this.handleInput('0')}
          >
            <rect x="0" y="0" width="200" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">0</text>
          </g>
          <g transform="translate(0, 300)"
            onClick={() => this.handleInput('1')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">1</text>
          </g>
          <g transform="translate(100, 300)"
            onClick={() => this.handleInput('2')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">2</text>
          </g>
          <g transform="translate(200, 300)"
            onClick={() => this.handleInput('3')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">3</text>
          </g>
          <g transform="translate(0, 200)"
            onClick={() => this.handleInput('4')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">4</text>
          </g>
          <g transform="translate(100, 200)"
            onClick={() => this.handleInput('5')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">5</text>
          </g>
          <g transform="translate(200, 200)"
            onClick={() => this.handleInput('6')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">6</text>
          </g>
          <g transform="translate(0, 100)"
            onClick={() => this.handleInput('7')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">7</text>
          </g>
          <g transform="translate(100, 100)"
            onClick={() => this.handleInput('8')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">8</text>
          </g>
          <g transform="translate(200, 100)"
            onClick={() => this.handleInput('9')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">9</text>
          </g>
          <g transform="translate(300, 300)"
            onClick={() => this.handleEnter()}
          >
            <rect x="0" y="0" width="100" height="200" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">
              {isValid ? 'Next' : 'Enter'}
            </text>
          </g>
          <g transform="translate(200, 400)"
            onClick={() => this.handleInput(':')}
          >
            <rect x="0" y="0" width="100" height="100" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">:</text>
          </g>
          <g transform="translate(300, 100)"
            onClick={() => this.handleDelete()}
          >
            <rect x="0" y="0" width="100" height="200" vectorEffect="non-scaling-stroke"/>
            <text x="10" y="35" fontSize="32">Del</text>
          </g>
        </svg>

        <div className={styles.controls}>
          {isValid === true ? (
            <p className={styles.feedback}>Correct answer!</p>
          ) : null}
          {isValid === false ? (
            <p className={styles.feedback}>Not correct.</p>
          ) : null}
        </div>
      </div>
    )
  } 
}

export default ModeStopwatchOverlayInputVirtualNumblock