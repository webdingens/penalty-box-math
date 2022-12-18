import gaussian from 'gaussian'

const gaussdistributionTime = gaussian(0, Math.pow(2 * 60, 2))
const gaussdistributionNumber = gaussian(0, Math.pow(2 * 800, 2))
const penaltyProbabilities = [
  {
    penalties: 1,
    probability: .8
  },
  {
    penalties: 2,
    probability: .2
  },
]

const positions = {
  BLOCKER: 'BLOCKER',
  PIVOT: 'PIVOT',
  JAMMER: 'JAMMER'
}

const positionProbabilities = [
  {
    position: positions.BLOCKER,
    probability: 3 / 5
  },
  {
    position: positions.PIVOT,
    probability: 1 / 5
  },
  {
    position: positions.JAMMER,
    probability: 1 / 5
  }
]

export const getRandomTime = () => {
  // const newTime = Math.floor(Math.random() * (5 * 60 + 1)) // 5 minutes
  const newTime = Math.floor(Math.abs(gaussdistributionTime.random(1)[0])) // 5 minutes
  return newTime
}

export const getRandomPenalties = () => {
  // draw randomly
  const sample = Math.random();
  let penalties = penaltyProbabilities.reduce((prev, current) => {
    if (typeof prev === 'object') return prev;
    if (prev + current.probability > sample) return current
    return prev + current.probability
  }, 0)

  // if nothing gets selected because of rounding errors near the end, select last entry
  if (typeof penalties !== 'object') penalties = penaltyProbabilities[penaltyProbabilities.length -1]

  return penalties.penalties
}

export const getRandomSkaterNumber = () => {
  // return Math.floor(Math.random() * 9999)
  return Math.floor(Math.abs(gaussdistributionNumber.random(1)[0]))
}

export const getRandomSkaterPosition = () => {
  // draw randomly
  const sample = Math.random();
  let position = positionProbabilities.reduce((prev, current) => {
    if (typeof prev === 'object') return prev;
    if (prev + current.probability > sample) return current
    return prev + current.probability
  }, 0)

  // if nothing gets selected because of rounding errors near the end, select last entry
  if (typeof position !== 'object') position = positionProbabilities[positionProbabilities.length -1]

  return position.position
}

export function toDisplayTime(time) {
  return `${Math.floor(time / 60)}:${String(time % 60).padStart(2,'0')}`
}

export default {
  getRandomTime,
  getRandomPenalties,
  getRandomSkaterNumber,
  getRandomSkaterPosition
}