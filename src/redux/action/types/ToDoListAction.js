import { DOMAIN } from '../../../utils/constants/setting'
import { GET_TASK_EDIT, GET_TASK_LIST, UPDATE_TASK_EDIT } from '../../constants/ToDoListConstants'
import axios from 'axios'

export const getToDoListAPI = () => {
    return async dispatch => {
        try {
            const { data } = await axios({
                url: `${DOMAIN}/api/ToDoList/GetAllTask`,
                method: 'GET'
            })


            dispatch({
                type: GET_TASK_LIST,
                taskList: data
            })
        }
        catch (errors) {
            console.log('errors', errors.response.data)
        }
    }
}

export const getTaskAPI = (taskName) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `${DOMAIN}/api/ToDoList/GetTask?taskName=${taskName}`,
                method: 'GET'
            })

            dispatch({
                type: GET_TASK_EDIT,
                taskEdit: result.data
            });
        }
        catch (errors) {
            console.log('errors', errors.response.data)
        }
    }
}


export const addTaskAPI = (taskName) => {
    return async dispatch => {
        try {

            await axios({
                url: `${DOMAIN}/api/ToDoList/AddTask`,
                method: 'POST',
                data: taskName,
            })

            dispatch(getToDoListAPI());
        }
        catch (errors) {
            console.log('errors', errors.response.data)

        }
    }
}

export const doneTaskAPI = (taskName) => {
    return async dispatch => {
        try {
            await axios({
                url: `${DOMAIN}/api/ToDoList/doneTask?taskName=${taskName}`,
                method: 'PUT'
            })
            dispatch(getToDoListAPI());
        }
        catch (errors) {
            console.log('errors', errors.response.data)
        }
    }
}

export const deleteTaskAPI = (taskName) => {
    return async dispatch => {
        try {
            await axios({
                url: `${DOMAIN}/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'DELETE'
            })
            dispatch(getToDoListAPI());
        }
        catch (errors) {
            console.log('errors', errors.response.data)
        }
    }
}

export const rejectTaskAPI = (taskName) => {
    return async dispatch => {
        try {
            await axios({
                url: `${DOMAIN}/api/ToDoList/rejectTask?taskName=${taskName}`,
                method: 'PUT'
            })
            dispatch(getToDoListAPI());
        }
        catch (errors) {
            console.log('errors', errors.response.data)
        }
    }
}

