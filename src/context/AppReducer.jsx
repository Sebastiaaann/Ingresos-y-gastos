export default (state, action) => {
  switch (action.type) {
     // Utiliza un switch para determinar la acción a realizar
    case "DELETE_TRANSACTION":
      return {
        // Retorna un nuevo estado con las transacciones actualizadas
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    // Caso para agregar una nueva transacción
    case "ADD_TRANSACTION":
      return {
        // Retorna un nuevo estado con las transacciones actualizadas
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};
