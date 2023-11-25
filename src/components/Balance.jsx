import { useGlobalState } from "../context/GlobalState";

export function Balance() {
  // Obtener las transacciones del estado global
  const { transactions } = useGlobalState();

  // Obtener los montos de todas las transacciones
  const amounts = transactions.map((transaction) => transaction.amount);
  
  // Calcular el total de los montos
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // Renderizar el componente de balance
  return (
    <div className="flex justify-between items-center my-2">
      <h4 className="text-slate-400">Tu Balance</h4>
      <h1 className="text-2xl font-bold">${total}</h1>
    </div>
  );
}
