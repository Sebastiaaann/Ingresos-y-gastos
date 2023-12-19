import { GlobalProvider, useGlobalState } from "./context/GlobalState";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/transactions/TransactionList";
import { TransactionForm } from "./components/transactions/TransactionForm";
import { ExpenseChart } from "./components/ExpenseChart";
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';

function App() {
  const { transactions, balance } = useGlobalState();

  function downloadTransactions() {
    // Calcula los ingresos y gastos
    const income = transactions
      .filter(transaction => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions
      .filter(transaction => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    // Crea un array con los datos que quieres guardar
    const dataToSave = transactions.map(transaction => ({
      description: transaction.text,
      amount: transaction.amount,
      income: transaction.amount > 0 ? transaction.amount : 0,
      expense: transaction.amount < 0 ? transaction.amount : 0,
    }));

    // Añade los totales al final del array
    dataToSave.push({
      description: 'Total',
      amount: balance,
      income,
      expense,
    });

    // Convierte los datos a una hoja de cálculo
    const worksheet = utils.json_to_sheet(dataToSave, { header: ['description', 'amount', 'income', 'expense'] });

    // Crea un nuevo libro y añade la hoja de cálculo a él
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Transactions');

    // Escribe el libro a un archivo y lo guarda
    const excelBuffer = writeFile(workbook, 'transactions.xlsx', { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'transactions.xlsx');
  }

  return (
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
                <a href="http://127.0.0.1:8000/" target="_blank" rel="noopener noreferrer">
                  <button className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full">
                    Volver a inicio
                  </button>
                </a>
                <button onClick={downloadTransactions} className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full">
                  Descargar montos de transacciones
                </button>
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

export default App;