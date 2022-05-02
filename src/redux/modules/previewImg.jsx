//기존에 쓰던 방식이 아직 편해서 프로필 preview용 모듈을 우선 따로 만들었습니다.
//추후에 수정하거나 다른 모듈과 합치겠습니다.

import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SETTING_PREVIEW = "SETTING_PREVIEW";
const RESET_PREVIEW = "RESET_PREVIEW";

const settingPreview = createAction(SETTING_PREVIEW, (preview) => ({
  preview,
}));
const resetPreview = createAction(RESET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  preview: null,
};

export default handleActions(
  {
    [SETTING_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [RESET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = null;
      }),
  },
  initialState
);

const actionCreators = {
  settingPreview,
  resetPreview,
};

export { actionCreators };
