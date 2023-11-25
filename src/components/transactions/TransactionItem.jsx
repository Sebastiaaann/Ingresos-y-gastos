import { useGlobalState } from "../../context/GlobalState";
import {BiTrash} from 'react-icons/bi'

// Componente que representa un elemento de la lista de transacciones
export function TransactionItem({ transaction: { id, description, amount } }) {
  // Obtener la función de eliminar transacción del estado global
  const { deleteTransaction } = useGlobalState();

  // Determinar el signo (+ o -) en función del monto
  const sign = amount < 0 ? "-" : "+";

  // Renderizar un elemento de la lista de transacciones
  return (
    <li
      key={id}
      className={
        `bg-zinc-600 text-white px-3 py-1 rounded-lg mb-2 w-full flex justify-between items-center` +
        ` ${amount < 0 ? "bg-red-700" : "bg-green-700"}`
      }
    >
      {description}
      <div>
        <span>
          {sign}${Math.abs(amount)}
        </span>
        <button
          onClick={() => deleteTransaction(id)}
          className="font-bold text-white rounded-lg ml-2"
        >
          <BiTrash />
        </button>
      </div>
    </li>
  );
}
