import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import store from '../store';
import ITodo from '../interfaces';
import TodoItem from './TodoItem';


const List = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;

  list-style: none;
`;

const Feedback = styled.span`
  font-size: 20px;
  line-height: 30px;
  color: #c7c7c7;
`;

const TodoList: React.FC = () => {
  const todos = store.todos;

  if (todos.length === 0) {
    return (
      <Feedback>Todo List is empty!</Feedback>
    )
  }

  return (
    <List>
      {todos.map((todo: ITodo) => <TodoItem key={todo.id} todo={todo} />)}
    </List>
  )
};

export default observer(TodoList);
