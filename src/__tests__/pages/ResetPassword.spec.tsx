import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
let mockedLocationSearch = '';
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();
const mockedApi = new MockAdapter(api);

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: mockedLocationSearch,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
    mockedLocationSearch = '?token=change-password-token';
  });

  it('should be able to change password', async () => {
    mockedApi.onPost('/password/reset').reply(200);
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationField = getByPlaceholderText('Confirmação da senha');
    const submitButton = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(confirmationField, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to submit with no token', async () => {
    mockedLocationSearch = '';

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationField = getByPlaceholderText('Confirmação da senha');
    const submitButton = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(confirmationField, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should not be able to submit form with wrong confirmation', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationField = getByPlaceholderText('Confirmação da senha');
    const submitButton = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(confirmationField, { target: { value: '123457' } });

    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if submit fails', async () => {
    mockedApi.onPost('/password/reset').reply(500, () => {
      throw new Error('Server error');
    });

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationField = getByPlaceholderText('Confirmação da senha');
    const submitButton = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(confirmationField, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: `error`,
        }),
      );
    });
  });
});
