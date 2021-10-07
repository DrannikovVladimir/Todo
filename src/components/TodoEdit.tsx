import React, {useState, useEffect, useRef} from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

import store from '../store';
import IconConfirm from './icons/IconConfirm';
import IconCancel from './icons/IconCancel';
import colors from '../constants/colors';

const Input = styled.input`
  width: 100%;
  margin-right: 40px;
  border: none;
  border-bottom: 1px solid #e5e5e5;

  font-size: 18px;
  line-height: 26px;

  color: ${colors.textColor};

  &:focus, &:active {
    outline: none;

    border-color: #b3b3b3;
  }
`;

const ButtonGroup = styled.div`
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

const ButtonConfirm = styled(Button)`
  color: ${colors.accentColor};

  transition: color 0.2s;

  &:hover {
    color: ${colors.accentColorHover};
  }

  &:active {
    color: ${colors.accentColorActive};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 1px ${colors.accentColor};
  }
`;

const ButtonCancel = styled(Button)`
  margin-left: 5px;
  color: ${colors.simpleColor};

  transition: color 0.2s;

  &:hover {
    color: ${colors.simpleColorHover};
  }

  &:active {
    color: ${colors.simpleColorActive};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 1px ${colors.accentColor};
  }
`;

const TodoEditing:React.FC = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null);
  const editedTodo = store.editedTodo;
  const cancelEdit = store.cancelEdit;
  const currentTodo = store.currentTodo;
  const [value, setValue] = useState<string>(currentTodo!.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  }

  const handleConfirm = () => {
    editedTodo(value);
  }

  const handleCancel = () => {
    cancelEdit();
  }

  useEffect(() => {
    inputRef.current!.select();
  }, []);

  return (
    <React.Fragment>
      <label htmlFor="todoEditing" className="visually-hidden">{t('labelEdit')}</label>
      <Input
        ref={inputRef}
        type="text"
        id="todoEditing"
        name="todoEditing"
        value={value}
        onChange={handleChange}
      />
      <ButtonGroup>
        <ButtonConfirm type="button" onClick={handleConfirm}>
          <IconConfirm />
          <span className="visually-hidden">{t('buttonOkLabel')}</span>
        </ButtonConfirm>
        <ButtonCancel type="button" onClick={handleCancel}>
          <IconCancel />
          <span className="visually-hidden">{t('buttonCancelLabel')}</span>
        </ButtonCancel>
      </ButtonGroup>
    </React.Fragment>
  )
};

export default observer(TodoEditing);
