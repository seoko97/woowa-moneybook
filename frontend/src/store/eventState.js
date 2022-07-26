import { initState } from "../core/store";

export const pathState = initState({
  key: "pathState",
  defaultValue: null,
});

// 페이지 등록시 등록된 이벤트를 제거해주는 함수
// () => $target.removeEventListener(action, callback);
