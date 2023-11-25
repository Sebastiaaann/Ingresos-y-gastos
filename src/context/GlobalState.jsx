import { useContext, useReducer, createContext, useEffect } from "react";
// Importa el reducer que maneja las acciones sobre el estado global
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
};

// Crea un contexto de React llamado Context
export const Context = createContext(initialState);

// Hook personalizado que proporciona acceso al estado global
export const useGlobalState = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useGlobalState must be used within a GlobalState");
  return context;
};

// Proveedor de contexto que envuelve la aplicación
export const GlobalProvider = ({ children }) => {
  // Utiliza useReducer para manejar el estado global y las acciones
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
     // Utiliza useEffect para almacenar y recuperar datos del almacenamiento local
    const localData = localStorage.getItem("transactions");
    return localData ? JSON.parse(localData) : initialState;
  });
  // Utiliza useEffect para almacenar el estado en el almacenamiento local cada vez que cambia
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  // Acción para eliminar una transacción
  const deleteTransaction = (id) =>
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  
  // Acción para agregar una nueva transacción
  const addTransaction = (transaction) =>
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  
    // Retorna el proveedor de contexto con el valor proporcionado
  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};
