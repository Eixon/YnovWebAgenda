import * as types from "./actionTypes";

export function addTask(task) {
  return {
    type: types.ADD_TASK,
    task
  };
}

export function removeTask(task) {
  return {
    type: types.REMOVE_TASK,
    task
  };
}
