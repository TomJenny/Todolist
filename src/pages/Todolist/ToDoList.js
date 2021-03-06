import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import * as yup from "yup";
import { Button } from "../../Components/Button";
import { Hr } from "../../Components/Hr";
import { Input } from "../../Components/Input";
import { Select } from "../../Components/Select";
import { Table } from "../../Components/Table";
import { Container } from "../../Containers/Container";
import {
  addTaskAPI,
  deleteTaskAPI,
  doneTaskAPI,
  getTaskAPI,
  getToDoListAPI,
  rejectTaskAPI,
  updateTaskAPI,
} from "../../redux/action/ToDoListAction";
import { ToDoListDarkTheme } from "../../theme/DarkTheme";
import { ToDoListLightTheme } from "../../theme/LightTheme";
import { ToDoListPrimaryTheme } from "../../theme/PrimaryTheme";

export default function ToDoList(props) {
  const { taskList, taskEdit } = useSelector((state) => state.ToDoListReducer);
  const [theme, setTheme] = useState(ToDoListDarkTheme);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskName: taskEdit?.taskName || "",
      submitButton: "",
    },
    validationSchema: yup.object().shape({
      taskName: yup
        .string()
        .trim()
        .required("Task Name không được để trống")
        .matches(
          /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
          "Task Name không chứa ký tự số"
        )
        .test(
          "check-exist",
          "Task Name đã tồn tại",
          (value) => !taskList.some((item) => item.taskName === value)
        ),
    }),
    onSubmit: (values, action) => {
      if (values.submitButton === "addTask") {
        dispatch(addTaskAPI(values.taskName));
      }
      if (values.submitButton === "updateTask") {
        dispatch(updateTaskAPI(taskEdit, values.taskName));
      }

      action.resetForm();
    },
  });

  useEffect(() => {
    const actions = getToDoListAPI();
    dispatch(actions);
  }, []);

  const renderToDoList = () => {
    return taskList
      ?.filter((task) => task.status === false)
      .map((task, index) => {
        return (
          <tr key={index}>
            <th>{task.taskName}</th>
            <th>
              <Button
                className="btn"
                type="button"
                onClick={() => {
                  dispatch(getTaskAPI(task.id));
                }}
              >
                <i className="fas fa-edit"></i>
              </Button>
              <Button
                className="btn"
                type="button"
                onClick={() => {
                  dispatch(deleteTaskAPI(task.id));
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </Button>
              <Button
                className="btn"
                type="button"
                onClick={() => {
                  dispatch(doneTaskAPI(task.id));
                }}
              >
                <i className="fas fa-check"></i>
              </Button>
            </th>
          </tr>
        );
      });
  };

  const renderToDoListDone = () => {
    return taskList
      .filter((task) => task.status === true)
      .map((task, index) => {
        return (
          <tr key={index}>
            <th>{task.taskName}</th>
            <th>
              <Button
                className="btn"
                type="button"
                onClick={() => {
                  dispatch(deleteTaskAPI(task.id));
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </Button>
              <Button
                className="btn"
                type="button"
                onClick={() => {
                  dispatch(rejectTaskAPI(task.id));
                }}
              >
                {" "}
                <i className="fas fa-undo"></i>
              </Button>
            </th>
          </tr>
        );
      });
  };
  const { touched, errors, values } = formik;

  return (
    <ThemeProvider theme={theme}>
      <div className="mt-5">
        <div className="col-5 mx-auto">
          <Container>
            <div className="form-group">
              <Select
                className="form-control"
                name="theme"
                onChange={(e) => {
                  const themeObj =
                    e.target.value === "3"
                      ? ToDoListLightTheme
                      : e.target.value === "2"
                      ? ToDoListPrimaryTheme
                      : ToDoListDarkTheme;
                  setTheme(themeObj);
                }}
              >
                <option value="1">Dark Theme</option>
                <option value="2">Primary Theme</option>
                <option value="3">Light Theme</option>
              </Select>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <h3>TO DO LIST</h3>
              <div className="form-group">
                <p className="m-0">Task Name</p>
                <Input
                  type="text"
                  className="form-control d-inline"
                  name="taskName"
                  onChange={formik.handleChange}
                  value={values.taskName}
                />
                <Button
                  className="btn"
                  type="submit"
                  onClick={() => {
                    formik.setFieldValue("submitButton", "addTask");
                  }}
                >
                  <i className="fas fa-plus"></i> AddTask
                </Button>
                <Button
                  className="btn"
                  type="submit"
                  onClick={() => {
                    formik.setFieldValue("submitButton", "updateTask");
                  }}
                >
                  <i className="fas fa-upload"></i> UpdateTask
                </Button>
                {touched.taskName && errors.taskName && (
                  <p className="text text-danger">{formik.errors.taskName}</p>
                )}
              </div>
              <Hr />
              <h5>TASK TO DO</h5>
              <Table className="table">
                <tbody>{renderToDoList()}</tbody>
              </Table>
              <h5>TASK COMPLETED</h5>
              <Table className="table">
                <tbody>{renderToDoListDone()}</tbody>
              </Table>
            </form>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
