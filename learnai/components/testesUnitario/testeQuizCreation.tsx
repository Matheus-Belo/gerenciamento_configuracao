// src/components/testeUnitario/testeQuizCreation.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuizCreation from '../QuizCreation';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

// Mock de dependências externas
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('axios', () => ({
  post: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('QuizCreation Component', () => {
  let setBlankAnswerMock: jest.Mock;
  let getQuestionsMock: jest.Mock;

  beforeEach(() => {
    setBlankAnswerMock = jest.fn();
    getQuestionsMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: getQuestionsMock,
      isLoading: false,
    });
  });

  test('renders the component', () => {
    render(<QuizCreation />);

    expect(screen.getByText('Novo Quiz')).toBeInTheDocument();
    expect(screen.getByText('Escolha um tópico')).toBeInTheDocument();
    expect(screen.getByText('Criar Quiz!')).toBeInTheDocument();
  });

  test('submits the form with correct values', async () => {
    render(<QuizCreation />);

    const topicInput = screen.getByPlaceholderText('Digite o tópico...');
    const amountInput = screen.getByPlaceholderText('Quantas perguntas?');
    const createQuizButton = screen.getByText('Criar Quiz!');

    fireEvent.change(topicInput, { target: { value: 'Science' } });
    fireEvent.change(amountInput, { target: { value: '5' } });

    fireEvent.click(createQuizButton);

    await waitFor(() => {
      expect(getQuestionsMock).toHaveBeenCalledWith(
        { amount: 5, topic: 'Science', type: 'closed' },
        expect.any(Object)
      );
    });
  });

  test('handles submission error', async () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: getQuestionsMock,
      isLoading: false,
      onError: jest.fn(),
    });

    getQuestionsMock.mockImplementation((_, { onError }) => {
      onError(new Error('Submission error'));
    });

    render(<QuizCreation />);

    const topicInput = screen.getByPlaceholderText('Digite o tópico...');
    const amountInput = screen.getByPlaceholderText('Quantas perguntas?');
    const createQuizButton = screen.getByText('Criar Quiz!');

    fireEvent.change(topicInput, { target: { value: 'Science' } });
    fireEvent.change(amountInput, { target: { value: '5' } });

    fireEvent.click(createQuizButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Algo deu errado, tente novamente mais tarde.");
    });
  });
});
