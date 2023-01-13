import React from "react";
import classNames from "classnames";
import Input from "../../components/Input";

import styles from "./ModeStopwatchOverlayInputKeyboard.module.scss";

class ModeStopwatchOverlayInputKeyboard extends React.Component {
  constructor(props) {
    super(props);

    this.inputAdd1 = React.createRef();
    this.inputAdd2 = React.createRef();
    this.nextButton = React.createRef();
  }

  reset() {
    this.inputAdd1.current.reset();
    this.inputAdd2.current.reset();
  }

  get value1() {
    return this.inputAdd1.current.value;
  }

  get value2() {
    return this.inputAdd2.current.value;
  }

  componentDidUpdate(prevProps) {
    if (this.props.isValid && !prevProps.isValid) {
      this.nextButton.current.focus();
    }
  }

  focus() {
    this.inputAdd1.current.focus();
  }

  render() {
    const { onNext, isValid, penalties } = this.props;

    return (
      <>
        <p>
          {penalties ? (
            <>
              <span
                className={classNames(styles.penaltyAmount, {
                  [styles.trickyPenaltyAmount]: penalties > 1,
                })}
              >
                {penalties}
              </span>{" "}
              {penalties == 1 ? "Penalty" : "Penalties"}
            </>
          ) : null}
        </p>
        <div className={styles.inputFields}>
          <Input
            label={
              penalties ? (
                <>
                  Add{" "}
                  <span
                    className={classNames(styles.penaltyAmount, {
                      [styles.trickyPenaltyAmount]: penalties > 1,
                    })}
                  >
                    {30 * penalties - 10}
                  </span>{" "}
                  seconds
                </>
              ) : null
            }
            ref={this.inputAdd1}
          />
          <Input
            label={
              penalties ? (
                <>
                  Add{" "}
                  <span
                    className={classNames(styles.penaltyAmount, {
                      [styles.trickyPenaltyAmount]: penalties > 1,
                    })}
                  >
                    {30 * penalties}
                  </span>{" "}
                  seconds
                </>
              ) : null
            }
            ref={this.inputAdd2}
          />
        </div>
        <div className={styles.controls}>
          {isValid === false || isValid === null ? (
            <button type="submit">Check answer</button>
          ) : null}
          {isValid === true ? (
            <>
              <button onClick={onNext} type="button" ref={this.nextButton}>
                Next
              </button>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default ModeStopwatchOverlayInputKeyboard;
