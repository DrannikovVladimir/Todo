import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import colors from '../constants/colors';

interface IActiveLang {
  readonly isActive: boolean;
}

const ButtonsWrapper = styled.div`
  position: absolute;

  top: 20px;
  right: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  height: 30px;
  border: none;
`;

const Button = styled.button<IActiveLang>`
  width: 30px;
  height: 25px;
  padding: 0;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: transparent;

  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: ${props => props.isActive ? colors.simpleColorActive : colors.simpleColor};

  background-color: transparent;

  cursor: ${props => props.isActive ? 'default' : 'pointer'};

  &:hover {
    border-bottom-color: ${props => props.isActive ? 'transparent' : colors.accentColorHover};

    color: ${props => props.isActive ? colors.simpleColorActive : colors.accentColorHover};
  }
`;

const LangToggle: React.FC = () => {
  const { t, i18n } = useTranslation();
  const handleChangeLang = (newLang: string) => (): void => {
    i18n.changeLanguage(newLang);
  };

  return (
    <ButtonsWrapper>
      <Button
        onClick={handleChangeLang('en')}
        isActive={i18n.resolvedLanguage === 'en'}
      >
        {t('buttonEn')}
        <span className="visually-hidden">{t('buttonEnLabel')}</span>
      </Button>
      <Button
        onClick={handleChangeLang('ru')}
        isActive={i18n.resolvedLanguage === 'ru'}
      >
        {t('buttonRu')}
        <span className="visually-hidden">{t('buttonRuLabel')}</span>
      </Button>
    </ButtonsWrapper>
  );
};

export default observer(LangToggle);
