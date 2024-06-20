// src/components/testeUnitario/testeBlankAnswerInput.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlankAnswerInput from '../BlankAnswerInput';

describe('BlankAnswerInput', () => {
  test('deve renderizar o componente com a resposta transformada', () => {
    const setBlankAnswer = jest.fn();
    render(<BlankAnswerInput answer="This is a test answer" setBlankAnswer={setBlankAnswer} />);

    // Verifica se a função setBlankAnswer foi chamada
    expect(setBlankAnswer).toHaveBeenCalled();

    // Verifica se os espaços em branco foram inseridos
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
  });

  test('deve atualizar a resposta com inputs em branco', () => {
    const setBlankAnswer = jest.fn();
    render(<BlankAnswerInput answer="Another test answer here" setBlankAnswer={setBlankAnswer} />);

    // Verifica se a função setBlankAnswer foi chamada
    expect(setBlankAnswer).toHaveBeenCalled();

    // Verifica se os espaços em branco foram inseridos
    expect(screen.getAllByRole('textbox')).toHaveLength(2);

    // Verifica se os textos parciais são exibidos corretamente
    const partialTexts = screen.getByText(/Another|test|answer|here/);
    expect(partialTexts).toBeInTheDocument();
  });
});
