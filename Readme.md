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
- click outside should close menu
- menu open shouldn't be part of the initial state of settings
  - should stay part of settings because of each menu toggling off the other when opening (mutually exclusive to share space)

## Stopwatch

X option for smaller Stopwatch (+/- Icon, Stop), smaller Stopwatch is just the display as CSS
X Time Attack mode
X use 2 penalties at random
X add virtual keyboard to type directly (mobile)
  - optimize layout to fit onto mobile screens
    - maybe style the enter button differently for feedback, add status message below "Enter"
    - fit numblock into lower part responsively

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
- Add better responses / brighter button
- show instructions after switching the mode
  - move the input field help from the help overlay to the mode overlay
- add error tracking (correctness of input)
- add highscores
- Stopwatch: add probability settings option (0-100% only one penalty, rest two penalties) Input how?