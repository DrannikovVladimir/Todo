import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

import IconConfirm from './icons/IconConfirm';
import IconCancel from './icons/IconCancel';
import store from '../store/index';
import colors from '../constants/colors';

const Text = styled.p`
  margin: 0;
  padding: 0;

  font-size: 18px;
  line-height: 26px;

  color: ${colors.textColor};
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
  color: ${colors.dangerColor};

  transition: color 0.2s;

  &:hover {
    color: ${colors.dangerColorHover};
  }

  &:active {
    color: ${colors.dangerColorActive};
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

const TodoRemove: React.FC = () => {
  const { t } = useTranslation();
  const removeTodo = store.removeTodo;
  const cancelEdit = store.cancelEdit;
  const currentTodo = store.currentTodo;

  const handleConfirm = (id: number) => () => {
    removeTodo(id);
  }

  const handleCancel = () => {
    cancelEdit();
  }
  return (
    <React.Fragment>
      <Text>{t('todoRemove')}</Text>
      <ButtonGroup>
        <ButtonConfirm type="button" onClick={handleConfirm(currentTodo!.id)}>
          <IconConfirm />
          <span className="visually-hidden">{t('buttonReoveLabel')}</span>
        </ButtonConfirm>
        <ButtonCancel type="button" onClick={handleCancel}>
          <IconCancel />
          <span className="visually-hidden">{t('buttonCancelLabel')}</span>
        </ButtonCancel>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default observer(TodoRemove);
