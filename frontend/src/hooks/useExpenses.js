import { useState, useCallback, useEffect } from 'react';
import { DEFAULT_BUDGETS } from '../data/constants';

const API_URL = 'http://localhost:5000/api/expenses';

export function useExpenses(userEmail) {
  const [expenses, setExpenses] = useState([]);
  const [budgets] = useState(DEFAULT_BUDGETS);

  const fetchExpenses = useCallback(async () => {
    if (!userEmail) {
      setExpenses([]);
      return;
    }
    try {
      const res = await fetch(`${API_URL}?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      }
    } catch (err) {
      console.error('Failed to fetch expenses', err);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = useCallback(async (data) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userEmail })
      });
      if (res.ok) {
        const newExpense = await res.json();
        // Insert at beginning of array to reflect the sort {date: -1} (descending date)
        // or just let it sort naturally. The DB sorts it by date descending.
        setExpenses((prev) => [newExpense, ...prev]);
      }
    } catch (err) {
      console.error('Failed to add expense', err);
    }
  }, [userEmail]);

  const updateExpense = useCallback(async (id, data) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const updated = await res.json();
        setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
      }
    } catch (err) {
      console.error('Failed to update expense', err);
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete expense', err);
    }
  }, []);

  return { expenses, budgets, addExpense, updateExpense, deleteExpense };
}
