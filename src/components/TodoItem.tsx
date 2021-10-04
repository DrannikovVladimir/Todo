import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import store from '../store';
import TodoEditing from './TodoEditing';
import IconRemove from './icons/IconRemove';
import IconEdit from './icons/IconEdit';
import TodoRemove from './TodoRemove';
import ITodo from '../interfaces';
import colors from '../constans/colors';

interface ICheck {
  readonly isActive: boolean;
}

const Item = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 10px;

  box-shadow: 0 1px 2px 1px #dadada;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
  line-height: 26px;

  color: ${colors.textColor};
`;

const InputCheckbox = styled.div`
  position: absolute;

  top: 18px;
  left: 24px;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border: 1px solid #cccccc;
  border-radius: 3px;

  cursor: pointer;

  z-index: 1;
`;

const InputCheck = styled.div<ICheck>`
  position: absolute;

  display: ${(props) => props.isActive ? 'block' : 'none'};
  left: 7px;
  width: 10px;
  height: 18px;

  border-bottom: 2px solid #75c7e7;
  border-right: 2px solid #75c7e7;

  transform: rotate(45deg);
`;

const Input = styled.input`
  position: relative;

  width: 25px;
  height: 25px;
  margin-right: 10px;

  opacity: 0;

  z-index: 10;

  &:focus + ${InputCheckbox} {
    border: 2px solid #75c7e7;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;

  background-color: transparent;

  cursor: pointer;
`;

const ButtonRemove = styled(Button)`
  margin-left: 5px;
  color: #eb9a9a;

  transition: color 0.2s;

  &:hover {
    color: #e44a4a;
  }

  &:active {
    color: #c02424;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 1px #59bce4;
  }
`;

const ButtonEdit = styled(Button)`
  color: #adadad;

  transition: color 0.2s;

  &:hover {
    color: #777676;
  }

  &:active {
    color: #4b4b4b;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 1px #59bce4;
  }
`;

const TodoItem: React.FC<{todo: ITodo}> = ({todo}) => {
  const status = store.status;
  const currentTodo = store.currentTodo;
  const openRemoveConfirm = store.openRemoveConfirm;
  const doneTodo = store.doneTodo;
  const openEditor = store.openEditor;
  const removeTodo = store.removeTodo;

  const handleRemove = (todo: ITodo) => ():void => {
    openRemoveConfirm(todo);
  }

  const handleCheckbox = (id: number) => () => {
    doneTodo(id);
    setTimeout(() => {
      removeTodo(id);
    }, 1000);
  }

  const handleEdit = (todo: ITodo) => (): void => {
    openEditor(todo);
  }

  return (
    <Item>
      {(status !== 'working' && (todo.id === currentTodo!.id))
        ? (status === 'editing' ? <TodoEditing /> : <TodoRemove />)
        : (
        <>
          <InputGroup>
            <Input type="checkbox" id={todo.name} checked={todo.completed} onChange={handleCheckbox(todo.id)} />
            <InputCheckbox>
              <InputCheck isActive={todo.completed}></InputCheck>
            </InputCheckbox>
            <Label htmlFor={todo.name}>
              {todo.completed ? <s>{todo.name}</s> : todo.name}
            </Label>
          </InputGroup>
          <ButtonWrapper>
            <ButtonEdit type="button" onClick={handleEdit(todo)}>
              <IconEdit />
            </ButtonEdit>
            <ButtonRemove type="button" onClick={handleRemove(todo)}>
              <IconRemove />
            </ButtonRemove>
          </ButtonWrapper>
        </>
      )}
    </Item>
  );
};

export default observer(TodoItem);
