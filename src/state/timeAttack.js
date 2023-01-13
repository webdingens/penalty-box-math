import create from "zustand";

export const TIME_ATTACK_STATES = {
  STOPPED: "STOPPED",
  RUNNING: "RUNNING",
  RESULTS: "RESULTS",
};

export const useTimeAttackStarted = create((set) => ({
  timeAttackStarted: TIME_ATTACK_STATES.STOPPED,
  setTimeAttackStarted: (value) => set(() => ({ timeAttackStarted: value })),
}));

export const useTimeAttackTimeRemaining = create((set) => ({
  timeAttackTimeRemaining: null,
  setTimeAttackTimeRemaining: (value) =>
    set(() => ({ timeAttackTimeRemaining: value })),
}));
