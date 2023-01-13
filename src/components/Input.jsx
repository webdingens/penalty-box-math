import React, { useContext } from "react";
import classNames from "classnames";
import SettingsContext from "../SettingsContext";

import styles from "./Input.module.scss";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.input1Ref = React.createRef();
    this.input2Ref = React.createRef();
  }

  state = {
    value1: "",
    value2: "",
  };

  get value() {
    if (this.props.settings.splitInput) {
      return `${this.input1Ref.current.value}:${this.input2Ref.current.value}`;
    }
    return this.state.value1;
  }

  reset() {
    this.setState({
      value1: "",
      value2: "",
    });
  }

  onChange = () => {
    if (!this.props.settings.splitInput) {
      this.setState({ value1: this.input1Ref.current.value });
    } else {
      this.setState({
        value1: this.input1Ref.current.value,
        value2: this.input2Ref.current.value,
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.settings.splitInput &&
      !this.props.settings.splitInput &&
      this.state.value2 !== ""
    ) {
      this.setState({
        value1: this.state.value1 + ":" + this.state.value2,
        value2: "",
      });
    }
    if (
      !prevProps.settings.splitInput &&
      this.props.settings.splitInput &&
      this.input1Ref.current.value !== ""
    ) {
      const splitValue = this.input1Ref.current.value.split(":");
      if (splitValue.length > 1) {
        this.setState({
          value1: splitValue[0],
          value2: splitValue[1],
        });
      }
    }
  }

  focus() {
    this.input1Ref.current.focus();
  }

  render() {
    const { id, label, settings } = this.props;
    const { value1, value2 } = this.state;
    return (
      <div
        className={classNames(styles.input, {
          [styles.splitInput]: settings.splitInput,
        })}
      >
        <label htmlFor={id}>{label}</label>
        <div className={styles.inputFieldWrapper}>
          <input
            id={id}
            type="text"
            name={id}
            ref={this.input1Ref}
            onChange={this.onChange}
            value={value1}
          />
          {settings.splitInput ? (
            <>
              <span>:</span>
              <input
                id={id}
                type="text"
                name={id}
                ref={this.input2Ref}
                onChange={this.onChange}
                value={value2}
              />
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => {
  const settings = useContext(SettingsContext.Context);
  return <Input {...props} settings={settings} ref={ref} />;
});
