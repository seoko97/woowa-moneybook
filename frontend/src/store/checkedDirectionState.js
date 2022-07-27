import { initState } from "../core/store";
import { DIRECTION_INITIAL_STATE } from "../constants/direction";

export const checkedDirectionState = initState({
  key: "checkedDirectionState",
  defaultValue: DIRECTION_INITIAL_STATE,
});
