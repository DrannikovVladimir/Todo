import React, {useState, useEffect, useRef} from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import store from '../store';
import IconConfirm from '../icons/IconConfirm';
import IconCancel from '../icons/IconCancel';

const Input = styled.input`
    width: 100%;
    margin-right: 40px;
    border: none;
    border-bottom: 1px solid #e5e5e5;

    font-size: 18px;
    line-height: 26px;

    color: #777777;

    &:focus, &:active {
        outline: none;

        border-color: #999999;
    }
`;

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
    color: #93cce2;

    transition: transform 0.2s, color 0.2s;

    &:hover {
        transform: scale(1.2);
        color: #59bce4;
    }

    &:active {
        color: #1c95c5;
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

const TodoEditing:React.FC = () => {
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
            <label htmlFor="todoInput" className="visually-hidden">Todo name</label>
            <Input ref={inputRef} type="text" id="todoInput" name="todoInput" value={value} onChange={handleChange} />
            <ButtonGroup>
                <ButtonConfirm type="button" onClick={handleConfirm}>
                    <IconConfirm />
                </ButtonConfirm>
                <ButtonCancel type="button" onClick={handleCancel}>
                    <IconCancel />
                </ButtonCancel>
            </ButtonGroup>
        </React.Fragment>
    )
};

export default observer(TodoEditing);