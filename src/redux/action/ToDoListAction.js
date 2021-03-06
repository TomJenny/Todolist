import axios from "axios";
import { DOMAIN } from "../../utils/constants/setting";
import {
  GET_TASK_EDIT,
  GET_TASK_LIST,
  UPDATE_TASK_EDIT,
} from "../constants/ToDoListConstants";

export const getToDoListAPI = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${DOMAIN}/api/Todolist`,
        method: "GET",
      });

      dispatch({
        type: GET_TASK_LIST,
        taskList: data,
      });
    } catch (errors) {
      console.log("errors", errors.response.data);
    }
  };
};

export const getTaskAPI = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${DOMAIN}/api/Todolist/${id}`,
        method: "GET",
      });

      dispatch({
        type: GET_TASK_EDIT,
        taskEdit: data,
      });
    } catch (errors) {
      console.log("errors", errors.response.data);
    }
  };
};

export const addTaskAPI = (taskName) => {
  return async (dispatch) => {
    console.log(taskName);
    try {
      await axios({
        url: `${DOMAIN}/api/Todolist`,
        method: "POST",
        data: { taskName, status: false },
      });

      dispatch(getToDoListAPI());
    } catch (errors) {
      console.log("errors", errors.response.data);
    }
  };
};

export const doneTaskAPI = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `${DOMAIN}/api/Todolist/${id}`,
        method: "PUT",
        data: { status: true },
      });
      dispatch(getToDoListAPI());
    } catch (errors) {
      console.log("errors", errors.response.data);
    }
  };
};

export const deleteTaskAPI = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `${DOMAIN}/api/Todolist/${id}`,
        method: "DELETE",
      });
      dispatch(getToDoListAPI());
    } catch (errors) {
      console.log("errors", errors.response.data);
    }
  };
};

export const rejectTaskAPI = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `${DOMAIN}/api/Todolist/${id}`,
        method: "PUT",
        data: { status: false },
      });

      dispatch(getToDoListAPI());
    } catch (errors) {
      console.log("errors", errors.response.data);
    }
  };
};

// V?? l?? do kh??ng c?? api updatetask n??n gi??? l???p vi???c update b???ng vi???c x??a task c?? v?? add task m???i v??o
export const updateTaskAPI = (taskEdit, taskName) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `${DOMAIN}/api/Todolist/${taskEdit.id}`,
        method: "PUT",
        data: { taskName },
      });

      await dispatch({
        type: UPDATE_TASK_EDIT,
      });
      await dispatch(getToDoListAPI());
    } catch (errors) {
      console.log("errors", errors.response.data);
    }
  };
};
