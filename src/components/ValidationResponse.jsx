import {useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import classNames from 'classnames'
import styles from './ValidationResponse.module.scss'

function ValidationResponse(props) {
  const {validationCount, isValid} = props;

  const [stylesSuccess, apiSuccess] = useSpring(() => ({
    opacity: 0,
    onRest: () => {
      apiSuccess.start({
        opacity: 0,
        delay: 400
      })
    }
  }))

  const [stylesError, apiError] = useSpring(() => ({
    opacity: 0,
    onRest: () => {
      apiError.start({
        opacity: 0,
        delay: 400
      })
    }
  }))

  useEffect(() => {
    if (isValid === null) {
      apiSuccess.start({
        opacity: 0
      })
      apiError.start({
        opacity: 0
      })
      return
    }
    if (isValid) {
      apiSuccess.start({
        opacity: 1
      })
      apiError.start({
        opacity: 0
      })
    } else {
      apiSuccess.start({
        opacity: 0
      })
      apiError.start({
        opacity: 1
      })
    }
    return () => {
      apiSuccess.stop()
      apiError.stop()
    }
  }, [validationCount])

  return (
    <>
      <animated.p
        className={classNames(styles.feedback, styles.feedbackSuccess)}
        style={stylesSuccess}
      >Correct</animated.p>
      <animated.p
        className={classNames(styles.feedback, styles.feedbackError)}
        style={stylesError}
      >Not Correct</animated.p>
    </>
  )
}

export default ValidationResponse