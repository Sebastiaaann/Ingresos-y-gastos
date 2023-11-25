import { VictoryPie, VictoryLabel } from "victory";
import { useGlobalState } from "../context/GlobalState";
import { BsPieChartFill } from "react-icons/bs";

export function ExpenseChart() {
  // Obtener las transacciones del estado global
  const { transactions } = useGlobalState();

  // Calcular el total de ingresos y gastos
  const totalIncomes = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0) * -1;

  console.log({
    totalIncomes,
    totalExpenses,
  });

  // Calcular el porcentaje de gastos e ingresos
  const expensesPercentage = Math.round((totalExpenses / totalIncomes) * 100);
  const incomesPercentage = 100 - (expensesPercentage);

  // Si no hay datos, mostrar un mensaje informativo
  if (totalIncomes === 0 && totalExpenses === 0) {
    return (
      <div className="bg-zinc-900 p-4 my-2">
        <div className="h-full flex items-center justify-center w-full flex-col">
          <BsPieChartFill className="text-9xl" />
          <h1 className="text-3xl font-bold my-2">Aún no hay datos</h1>
        </div>
      </div>
    );
  }
  // Renderizar el gráfico de pastel usando VictoryPie
  return (
    <div className="bg-zinc-950">
      <VictoryPie
        colorScale={["#e74c3c", "#2ecc71"]}
        data={[
          { x: "Gastos", y: expensesPercentage },
          { x: "Ingreso", y: incomesPercentage },
        ]}
        animate={{
          duration: 2000,
        }}
        labels={({ datum }) => datum.y}
        labelComponent={
          <VictoryLabel
            angle={45}
            style={{
              fill: "white",
            }}
          />
        }
      />
    </div>
  );
}
