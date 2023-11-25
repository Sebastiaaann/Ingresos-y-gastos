import { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";

// Componente para el formulario de transacciones
export function TransactionForm() {
  // Obtener la función para agregar transacciones del estado global
  const { addTransaction } = useGlobalState();

  // Estados locales para la descripción y el monto
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  // Función para manejar el envío del formulario
  const onSubmit = (e) => {
    e.preventDefault();
    // Agregar una nueva transacción al estado global
    addTransaction({
      id: window.crypto.randomUUID(), // Generar un ID único
      description,
      amount: +amount, // Convertir a número
    });

    // Limpiar los campos después de agregar la transacción
    setDescription("");
    setAmount(0);
  };

  // Renderizar el formulario de transacciones
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ingrese un monto"
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={description}
        />
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          placeholder="0.00"
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={amount}
        />
        <button
          className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full disabled:opacity-50"
          disabled={!description || !amount}
        >Add Transaction</button>
      </form>
    </div>
  );
}
