import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import IconConfirm from '../icons/IconConfirm';
import IconCancel from '../icons/IconCancel';
import store from '../store/index';

const Text = styled.p`
    margin: 0;
    padding: 0;

    font-size: 18px;
    line-height: 26px;

    color: #777777;`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const Button = styled.button`
    width: 30px;
    height: 30px;
    border: none;

    background-color: transparent;

    cursor: pointer;
`;

const ButtonConfirm = styled(Button)`
    color: #eb9a9a;

    transition: transform 0.2s, color 0.2s;

    &:hover {
        color: #e44a4a;
        transform: scale(1.2);
    }

    &:active {
        color: #c02424;
    }
`;

const ButtonCancel = styled(Button)`
    margin-left: 5px;
    color: #aaaaaa;

    transition: transform 0.2s, color 0.2s;

    &:hover {
        transform: scale(1.2);
        color: #8a8a8a;
    }

    &:active {
        color: #4b4b4b;
    }
`;

const TodoRemove: React.FC = () => {
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
            <Text>Delete this todo?</Text>
            <ButtonGroup>
                <ButtonConfirm type="button" onClick={handleConfirm(currentTodo!.id)}>
                    <IconConfirm />
                </ButtonConfirm>
                <ButtonCancel type="button" onClick={handleCancel}>
                    <IconCancel />
                </ButtonCancel>
            </ButtonGroup>
        </React.Fragment>
    );
};

export default observer(TodoRemove);