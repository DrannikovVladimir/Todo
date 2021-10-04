import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import store from './store';
import ITodo from './interfaces';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 550px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 40px;
  box-shadow: 0 0 10px 1px #e5e5e5;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  margin-bottom: 20px;

  color: #777777;
  font-size: 42px;
  line-height: 52px;
`;

const App:React.FC = () => {
  const todos = store.todos;
  const initTodos = store.initTodos;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
    initTodos(saved);
  }, [initTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <Title>Todo List</Title>
      <TodoForm />
      <TodoList />
    </Container>
  )
}

export default observer(App);
