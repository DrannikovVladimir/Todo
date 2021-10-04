import React, {useState, useRef, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import store from '../store';
import ITodo from '../interfaces';

interface IValid {
  readonly isValid: boolean,
};

const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input<IValid>`
    height: 50px;
    min-width: 300px;
    margin-right: 20px;
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.isValid ? '#e5e5e5' : '#e44a4a'};
    border-radius: 5px;

    font-size: 18px;
    line-height: 28px;
    color: #777777;

    &:focus {
        outline: none;
        box-shadow: 0 0 1px 1px #d3d3d3;
    }
`;

const Button = styled.button`
    min-height: 50px;
    width: 100%;
    min-width: 100px;
    border: 2px solid transparent;
    border-radius: 5px;

    text-transform: uppercase;
    font-size: 18px;
    line-height: 24px;
    color: #FFFFFF;

    background-color: #89cce7;
    cursor: pointer;

    &:hover {
        background-color: #41bbeb;
    }

    &:active {
        background-color: #1298ce;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 2px 1px #a6d6e9;
    }
`;

const Feedback = styled.span`
  position: absolute;
  left: 0;
  bottom: -25px;

  font-size: 14px;
  line-height: 24px;
  color: #e44a4a;
`;

const validation = (value: string) => (value.trim().length === 0);

const TodoForm:React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>('');
    const [valid, setValid] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formValid = validation(value);
        if (formValid) {
          setValid(false);
          return;
        }
        setValid(true);
        const newTodo: ITodo = {
            name: value,
            id: Date.now(),
            complited: false,
        }
        store.addTodo(newTodo);
        setValue('');
    }
    console.log(valid);

    useEffect(() => {
        inputRef.current!.focus();
    }, [])

    return (
        <FormWrapper>
            <form style={{width: '100%'}} onSubmit={handleSubmit}>
                <InputGroup>
                    <label className="visually-hidden" htmlFor="todo">Enter Todo</label>
                    <Input
                      ref={inputRef}
                      type="text"
                      id="todo"
                      name="todo"
                      value={value}
                      onChange={handleChange}
                      isValid={valid}
                    />
                    <Button type="submit">Add todo</Button>
                </InputGroup>
                {!valid && <Feedback>Empty field</Feedback>}
            </form>
        </FormWrapper>
    )
}

export default observer(TodoForm);
