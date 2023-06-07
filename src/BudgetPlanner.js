import React, { useState } from "react";

const BudgetPlanner = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = () => {
    if (reason && amount) {
      const newExpense = {
        id: Date.now(),
        reason,
        amount: parseFloat(amount)
      };

      setExpenses([...expenses, newExpense]);
      setReason("");
      setAmount("");
    }
  };

  const handleEditExpense = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setReason(expenseToEdit.reason);
      setAmount(expenseToEdit.amount.toString());
      handleDeleteExpense(id); 
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateRemainingBudget = () => {
    return income - calculateTotalExpenses();
  };

  return (
    <div>
      <h1>Budget Planner</h1>
      <div>
        <label htmlFor="income">Income: </label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span>{expense.reason}</span>
              <span>{expense.amount}</span>
              <button onClick={() => handleEditExpense(expense.id)}>
                Edit
              </button>
              <button onClick={() => handleDeleteExpense(expense.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add Expense</h2>
        <label htmlFor="reason">Reason: </label>
        <input
          typ="text"
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="amount">Amount: </label>
        <input
          typ="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      <div>
        <h2>Total </h2>
        <p>TotalExpenses : {calculateTotalExpenses()} </p>
        <p>Remaining Budget : {calculateRemainingBudget()} </p>
      </div>
    </div>
  );
};
export default BudgetPlanner;
