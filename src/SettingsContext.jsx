import React, {useEffect} from 'react'
export const Context = React.createContext()

export const modes = {
  STOPWATCH_OVERLAY: 'Stopwatch Overlay',
  SHEET: 'Sheet',
}

const initialState = {
  splitInput: false,
  mode: modes.SHEET,
  smallStopwatch: window.innerHeight < 1000,
  virtualNumblock: window.innerWidth < 600,
  inFullscreen: false,
}

const actions = {
  SET_SPLIT_INPUT: 'SET_SPLIT_INPUT',
  SET_MODE: 'SET_MODE',
  SET_SMALL_STOPWATCH: 'SET_SMALL_STOPWATCH',
  SET_VIRTUAL_NUMBLOCK: 'SET_VIRTUAL_NUMBLOCK',
  SET_IN_FULLSCREEN: 'SET_IN_FULLSCREEN',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SPLIT_INPUT:
      return {
        ...state,
        splitInput: action.splitInput
      };
    case actions.SET_MODE:
      return {
        ...state,
        mode: action.mode
      };
    case actions.SET_SMALL_STOPWATCH:
      return {
        ...state,
        smallStopwatch: action.smallStopwatch
      };
    case actions.SET_VIRTUAL_NUMBLOCK:
      return {
        ...state,
        virtualNumblock: action.virtualNumblock
      };
    case actions.SET_IN_FULLSCREEN:
      return {
        ...state,
        inFullscreen: action.inFullscreen
      };
    default:
      return state;
  }
}

// persistence localstorage
const saveState = (state) => localStorage.setItem('settings', JSON.stringify(state))
const loadState = () => {
  const storedState = localStorage.getItem('settings');
  if (!storedState) return initialState
  return Object.assign({}, initialState, JSON.parse(localStorage.getItem('settings')), {
    inFullscreen: initialState.inFullscreen,
  })
}

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const value = {
    ...state,
    setSplitInput: (splitInput) => {
      dispatch({ type: actions.SET_SPLIT_INPUT, splitInput })
    },
    setSettingsMenuOpen: (settingsMenuOpen) => {
      dispatch({ type: actions.SET_SETTINGS_MENU_OPEN, settingsMenuOpen })
    },
    setHelpOpen: (helpOpen) => {
      dispatch({ type: actions.SET_HELP_OPEN, helpOpen })
    },
    setMode: (mode) => {
      dispatch({ type: actions.SET_MODE, mode })
    },
    setSmallStopwatch: (smallStopwatch) => {
      dispatch({ type: actions.SET_SMALL_STOPWATCH, smallStopwatch })
    },
    setVirtualNumblock: (virtualNumblock) => {
      dispatch({ type: actions.SET_VIRTUAL_NUMBLOCK, virtualNumblock })
    },
    setInFullscreen: (inFullscreen) => {
      dispatch({ type: actions.SET_IN_FULLSCREEN, inFullscreen })
    },
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Context,
  modes
}