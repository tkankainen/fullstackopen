import React, { createContext, useReducer } from 'react';

export const NotificationContext = createContext();

const initialState = {
  message: null,
  timeoutId: null,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        timeoutId: action.payload.timeoutId,
      };
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        timeoutId: null,
      };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const setNotification = (message) => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);

    dispatch({ type: 'SET_NOTIFICATION', payload: message, timeoutId });
  };

  const clearNotification = () => {
    clearTimeout(state.timeoutId);
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  const contextValue = {
    message: state.message,
    setNotification,
    clearNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const { message, setNotification, clearNotification } =
    React.useContext(NotificationContext);

  return { message, setNotification, clearNotification };
};

export default NotificationContext