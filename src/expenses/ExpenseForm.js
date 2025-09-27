import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new expensee
    setExpenses([...expenses, form]);
    setForm({ amount: "", description: "", category: "Food" });
  };

  return (
    <div className="expense-form-container">
        <div className="form_layout">
      <h2 className="expense_text">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label_text">Amount:</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label_text">Description:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label_text">Category:</label>
          <select
            name="category"
            className="select_field"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <button type="submit" className="addExpense_btn">Add Expense</button>
      </form>
      <hr/>
      <ul>
        {expenses.map((exp, index) => (
          <li key={index}>
             {exp.amount} , {exp.description} ,  {exp.category}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ExpenseForm;
