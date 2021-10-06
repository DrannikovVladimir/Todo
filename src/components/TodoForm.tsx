import React, {useState, useRef, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

import store from '../store';
import ITodo from '../interfaces';
import colors from '../constants/colors';

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
  border-color: ${props => props.isValid ? '#e5e5e5' : colors.dangerColor};
  border-radius: 5px;

  font-size: 18px;
  line-height: 28px;
  color: ${colors.textColor};

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${colors.simpleColor};
  }
  :-ms-input-placeholder {
     color: red;
  }

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
  color: ${colors.primeColor};

  background-color: ${colors.accentColor};
  cursor: pointer;

  &:hover {
    background-color: ${colors.accentColorHover};
  }

  &:active {
    background-color: ${colors.accentColorActive};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 1px ${colors.accentColorHover};
  }
`;

const Feedback = styled.span`
  position: absolute;
  left: 0;
  bottom: -25px;

  font-size: 14px;
  line-height: 24px;
  color: ${colors.dangerColor};
`;

const validation = (value: string) => (value.trim().length === 0);

const TodoForm:React.FC = () => {
  const { t } = useTranslation();
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
      completed: false,
    }
    store.addTodo(newTodo);
    setValue('');
  }

  useEffect(() => {
      inputRef.current!.focus();
  }, [])

  return (
    <FormWrapper>
      <form style={{width: '100%'}} onSubmit={handleSubmit}>
        <InputGroup>
          <label className="visually-hidden" htmlFor="todo">{t('labelAdd')}</label>
          <Input
            ref={inputRef}
            type="text"
            id="todo"
            name="todo"
            value={value}
            onChange={handleChange}
            isValid={valid}
            placeholder={t('placeholder')}
          />
          <Button type="submit">{t('buttonAdd')}</Button>
        </InputGroup>
        {!valid && <Feedback>{t('emptyField')}</Feedback>}
      </form>
    </FormWrapper>
  )
}

export default observer(TodoForm);
