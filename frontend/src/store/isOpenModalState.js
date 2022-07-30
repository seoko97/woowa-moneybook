import { initState } from "../core/store";
import { MODAL_INITIAL_STATE } from "../constants/modal";

export const isOpenModalState = initState({
  key: "isOpenModalState",
  defaultValue: MODAL_INITIAL_STATE,
});
