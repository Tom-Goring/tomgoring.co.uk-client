import axios from "axios";
import { GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, TODOS_LOADING } from "./types";

let url;

if (process.env.NODE_ENV === "development") {
  url = "";
}
if (process.env.NODE_ENV === "production") {
  url = "https://api.tomgoring.co.uk/";
}

export const getTodos = () => (dispatch) => {
  dispatch(setTodosLoading());
  axios.get(`${url}/todos`).then((res) => {
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  });
};

export const addTodo = (description) => {
  return (dispatch) => {
    console.log(`Posting ${url}/todo`);
    return axios.post(`${url}/todo`, { description: description, done: 0 }).then((res) => {
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
    });
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
    axios.delete(`${url}/todo/${id}`).then((res) => {
      dispatch({ type: DELETE_TODO, payload: id });
    });
  };
};

export const updateTodo = (id, description, done) => {
  // TODO: Add functionality to update todos
  return {
    type: UPDATE_TODO,
    payload: { id, description, done },
  };
};

export const setTodosLoading = () => {
  return {
    type: TODOS_LOADING,
  };
};
