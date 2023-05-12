import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import AddTaskForm from "../AddTaskForm/AddTaskForm";
import Task from "./Task";
import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompletedTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch(`http://localhost:3001/lists/${list.id}`, {
          name: newTitle,
        })
        .catch(() => {
          console.log("error patch task title");
        });
    }
  };

  return (
    <div className="tasks">
      <NavLink to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          <img onClick={editTitle} src={editSvg} alt="edit icon" />
          {list.name}
        </h2>
      </NavLink>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => {
            return (
              <Task
                key={task.id}
                {...task}
                onRemove={onRemoveTask}
                onCompleted={onCompletedTask}
                list={list}
                onEdit={onEditTask}
              />
            );
          })}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
