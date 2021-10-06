import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

import store from '../store';
import ITodo from '../interfaces';
import TodoItem from './TodoItem';

const ListContainer = styled.div`
  min-height: 100px;
`;

const List = styled.ul`
  width: 100%;
  margin: 0;
  margin-bottom: 50px;
  padding: 0;
  padding-bottom: 35px;
  border-bottom: 1px solid #e2e2e2;

  list-style: none;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const Feedback = styled.span`
  font-size: 20px;
  line-height: 30px;
  color: #c7c7c7;
`;

const TodoList: React.FC = () => {
  const { t } = useTranslation();
  const todos = store.todos;
  const status = store.status;
  const todosNotCompleted = todos.filter((todo) => !todo.completed);
  const todosCompleted = todos.filter((todo) => todo.completed);

  if ((status === 'initialization') && (todos.length === 0)) {
    return null;
  }

  return (
    <ListContainer>
      <List>
        {todosNotCompleted.length > 0
          ? todosNotCompleted.map((todo: ITodo) => <TodoItem key={todo.id} todo={todo}/>)
          : <Feedback>{t('emptyListUnCompleted')}</Feedback>}
      </List>
      <List>
        {todosCompleted.length > 0
          ? todosCompleted.map((todo: ITodo) => <TodoItem key={todo.id} todo={todo}/>)
          : <Feedback>{t('emptyListCompleted')}</Feedback>}
      </List>
    </ListContainer>
  )
};

export default observer(TodoList);
