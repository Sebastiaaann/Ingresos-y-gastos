import { useGlobalState } from "../context/GlobalState";

export function IncomeExpenses() {
  // Obtener las transacciones desde el estado global
  const { transactions } = useGlobalState();
  
  // Obtener solo los montos de las transacciones
  const amounts = transactions.map((transaction) => transaction.amount);

  // Calcular el total de ingresos sumando montos positivos
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  // Calcular el total de gastos sumando montos negativos y convirtiéndolos a positivos
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  
  // Renderizar los elementos de ingresos y gastos
  return (
    <>
      <div className="flex justify-between my-2">
        <h4>Ingreso</h4>
        <p>{income}</p>
      </div>
      <div className="flex justify-between my-2">
        <h4>Gastos</h4>
        <p>{expense}</p>
      </div>
    </>
  );
}
