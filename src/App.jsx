import { GlobalProvider } from "./context/GlobalState";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/transactions/TransactionList";
import { TransactionForm } from "./components/transactions/TransactionForm";
import { ExpenseChart } from "./components/ExpenseChart";

// Define el componente principal 'App'
function App() {
  return (
    // Usa el contexto GlobalProvider para envolver la aplicación
    <GlobalProvider>
      <div className="bg-neutral-950 text-white h-screen flex justify-center items-center">
        <div className="w-2/5 flex justify-center items-center">
          <div className="bg-neutral-800 p-10 rounded-md w-full">
            <Header />
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <IncomeExpenses />
                <Balance />
                <TransactionForm />
                {/* Agrega el botón con el enlace externo */}
                <a href="http://127.0.0.1:8000/" target="_blank" rel="noopener noreferrer">
                  <button className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full">
                    Volver a inicio
                  </button>
                </a>
              </div>
              <div className="flex-1 flex flex-col">
                <ExpenseChart />
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}
// Exporta el componente 'App' para su uso en otros componentes
export default App;
