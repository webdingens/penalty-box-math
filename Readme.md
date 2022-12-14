# Penalty Box Math

App to train additions coming up during the role of penalty box timer.

## TODO

X display time
X input fields
X verification of math
X add bright mode
X add nice looking css library
X add settings
X option for all input fields: Split into minute and seconds fields (might be better for mobile)
X add addition tables
X change page title
X use invariable font face of noto sans
- click outside should close menu
- menu open shouldn't be part of the initial state of settings
  - should stay part of settings because of each menu toggling off the other when opening (mutually exclusive to share space)
- add favicon

## Stopwatch

X option for smaller Stopwatch (+/- Icon, Stop), smaller Stopwatch is just the display as CSS
X Time Attack mode
X use 2 penalties at random
  X make it more visible that we have more than one penalty
X make small stopwatch and virtual numpad initial state on mobile / low viewport
X add virtual keyboard to type directly (mobile)
  X test on real phone whether the keys work or not
  X fix styling of light mode virtual numblock
  X add "active" state to keys
    - use different color
  - optimize layout to fit onto mobile screens so we can't scroll (which absorbs clicks sometimes)
    - maybe style the enter button differently for feedback, add status message below "Enter"
    - fit numblock into lower part responsively
  - add some visual response (maybe auditory?)
  - add error/success feedback
  - Delete button should become left button when right is focussed and nothing is left to delete
  - add finer cursor control, like click at the beginning of the button
  - replace svg with css grid and real buttons
- Add better responses / brighter button

## Variations

- Sheet
- Stopwatch + Sheet
- Prompt question with a "reveal" button, switches to (("next") or ("got it": "right" and "wrong")) button
- Stopwatch "Tetris" / Stack
- Time Attack: enter as many as you can in 2 minutes


## Backlog

- check if input only has correct character e.g. matches either regex of
  - \d{0,1} : \d{2}
  - [:\d]{3,4}
- show instructions after switching the mode
  - move the input field help from the help overlay to the mode overlay
- add error tracking (correctness of input)
- add highscores (same as statistics?)
- Stopwatch: add probability settings option (0-100% only one penalty, rest two penalties) Input how?
- make page work offline, add serviceworker