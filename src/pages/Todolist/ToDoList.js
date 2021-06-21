import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskAPI, deleteTaskAPI, doneTaskAPI, getTaskAPI, getToDoListAPI, rejectTaskAPI } from '../../redux/action/types/ToDoListAction';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ToDoListDarkTheme } from '../../theme/DarkTheme';
import { ToDoListLightTheme } from '../../theme/LightTheme';
import { ToDoListPrimaryTheme } from '../../theme/PrimaryTheme';
import { ThemeProvider } from 'styled-components';
import { Container } from '../../Containers/Container'
import { Button } from '../../Components/Button'
import { Hr } from '../../Components/Hr'
import { Table } from '../../Components/Table'
import { Input } from '../../Components/Input';
import { Select } from '../../Components/Select';




export default function ToDoList(props) {
    const { taskList, taskEdit } = useSelector(state => state.ToDoListReducer);

    const [theme, setTheme] = useState(ToDoListDarkTheme);
    const dispatch = useDispatch();


    // console.log(taskEdit.taskName)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taskName: taskEdit?.taskName || ''
        },
        validationSchema: yup.object().shape({
            taskName: yup.string().trim().required("Task Name không được để trống").matches(/^[a-zA-Z ]+$/, 'Chỉ sử dung kiểu chuỗi')
                .test('check-exist', 'Task Name đã tồn tại', (value) => !taskList.some(item => item.taskName === value))
        }),
        onSubmit: (values, action) => {
            dispatch(addTaskAPI(values));
            action.resetForm();
        }

    });
    console.log(formik.handleSubmit)
    useEffect(() => {
        const actions = getToDoListAPI();
        dispatch(actions);
    }, [])



    const renderToDoList = () => {
        return taskList.filter((task) => task.status === false).map((task, index) => {
            return <tr key={index}>
                <th>{task.taskName}</th>
                <th>
                    <Button className='btn' type='button'
                        onClick={() => {
                            dispatch(getTaskAPI(task.taskName))
                        }}
                    ><i className="fas fa-edit"></i></Button>
                    <Button className='btn' type='button'
                        onClick={() => {
                            dispatch(deleteTaskAPI(task.taskName))
                        }}
                    ><i className="fas fa-trash-alt"></i></Button>
                    <Button className='btn' type='button'
                        onClick={() => {
                            dispatch(doneTaskAPI(task.taskName))
                        }}
                    ><i className="fas fa-check"></i></Button>
                </th>
            </tr>

        })
    }

    const renderToDoListDone = () => {
        return taskList.filter((task) => task.status === true).map((task, index) => {
            return <tr key={index}>
                <th>{task.taskName}</th>
                <th>
                    <Button className='btn' type='button'
                        onClick={() => {
                            dispatch(deleteTaskAPI(task.taskName))
                        }}
                    ><i className="fas fa-trash-alt"></i></Button>
                    <Button className='btn' type='button'
                        onClick={() => {
                            dispatch(rejectTaskAPI(task.taskName))
                        }}
                    > <i className="fas fa-undo"></i></Button>
                </th>
            </tr>
        })

    }
    const { touched, errors, values } = formik;

    return (
        <ThemeProvider theme={theme}>
            <div className='mt-5'>
                <div className='col-5 mx-auto'>
                    <Container>
                        <div className='form-group'>
                            <Select
                                className="form-control" name='theme' onChange={(e) => {
                                    const themeObj = e.target.value === '3' ? ToDoListLightTheme : e.target.value === '2' ? ToDoListPrimaryTheme : ToDoListDarkTheme
                                    setTheme(themeObj)
                                }}>
                                <option value='1' >Dark Theme</option>
                                <option value='2'>Primary Theme</option>
                                <option value='3'>Light Theme</option>
                            </Select>
                        </div>
                        <form onSubmit={formik.handleSubmit} >
                            <h3>TO DO LIST</h3>
                            <div className='form-group'>
                                <p className="m-0" >Task Name</p>
                                <Input type='text' className='form-control d-inline' name='taskName' onChange={formik.handleChange} value={values.taskName} />
                                <Button className='btn' type="submit"> <i className="fas fa-plus"></i> AddTask</Button>
                                <Button className='btn' type="submit"
                                    onClick={() => {
                                        dispatch(deleteTaskAPI(taskEdit.taskName));
                                    }}><i className="fas fa-upload"></i>  UpdateTask</Button>
                                {touched.taskName && errors.taskName && <p className="text text-danger">{formik.errors.taskName}</p>}
                            </div>
                            <Hr />
                            <h5 >TASK TO DO</h5>
                            <Table className='table'>
                                <tbody>
                                    {renderToDoList()}
                                </tbody>
                            </Table>
                            <h5>TASK COMPLETED</h5>
                            <Table className='table'>
                                <tbody>
                                    {renderToDoListDone()}
                                </tbody>
                            </Table>
                        </form>
                    </Container>
                </div>
            </div >
        </ThemeProvider>
    )
}
