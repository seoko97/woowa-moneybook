import { initState } from "../core/store";

export const checkedDirectionState = initState({
  key: "checkedDirectionState",
  defaultValue: {
    _in: true,
    _out: true,
  },
});
