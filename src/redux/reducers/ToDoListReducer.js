import {
  GET_TASK_EDIT,
  GET_TASK_LIST,
  UPDATE_TASK_EDIT,
} from "../constants/ToDoListConstants";

const initialState = {
  taskList: [],
  taskEdit: {},
};

export const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_LIST: {
      return { ...state, taskList: action.taskList };
    }
    case GET_TASK_EDIT: {
      console.log(action.taskEdit);
      return { ...state, taskEdit: action.taskEdit };
    }
    case UPDATE_TASK_EDIT: {
      return { ...state, taskEdit: "" };
    }
    default:
      return { ...state };
  }
};
