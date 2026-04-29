import React, { useState } from 'react';

import LoginPage    from './components/LoginPage';
import Sidebar      from './components/Sidebar';
import Dashboard    from './components/Dashboard';
import ExpensesPage from './components/ExpensesPage';
import BudgetPage   from './components/BudgetPage';
import ProfilePage  from './components/ProfilePage';
import ExpenseModal from './components/ExpenseModal';
import Toast        from './components/Toast';

import { useExpenses } from './hooks/useExpenses';
import { useToast }    from './hooks/useToast';

import './components/Dashboard.css';

export default function App() {
  const [user, setUser]       = useState(null);
  const [page, setPage]       = useState('dashboard');
  const [modal, setModal]     = useState(null);   // null | 'add' | 'edit'
  const [editing, setEditing] = useState(null);   // expense object being edited

  const { expenses, budgets, addExpense, updateExpense, deleteExpense } = useExpenses(user?.email);
  const { toast, showToast } = useToast();

 
  const handleLogin = (userData) => {
    setUser(userData);
    setPage('dashboard');
    showToast(`Welcome, ${userData.name.split(' ')[0]}! 🎉`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out successfully');
  };

  
  const openAdd  = ()       => { setEditing(null); setModal('add');  };
  const openEdit = (expense) => { setEditing(expense); setModal('edit'); };
  const closeModal = ()     => { setModal(null); setEditing(null); };

 
  const handleSave = (data) => {
    if (modal === 'add') {
      addExpense(data);
      showToast('Expense added ✓');
    } else {
      updateExpense(editing.id, data);
      showToast('Expense updated ✓');
    }
  };

  const handleDelete = (id) => {
    deleteExpense(id);
    showToast('Expense deleted', 'error');
  };

  const handleProfileUpdate = (updated) => {
    setUser(updated);
    showToast('Profile saved ✓');
  };

  if (!user) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toast toast={toast} />
      </>
    );
  }

  const pageComponents = {
    dashboard: (
      <Dashboard
        user={user}
        expenses={expenses}
        onAddClick={openAdd}
      />
    ),
    expenses: (
      <ExpensesPage
        expenses={expenses}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
    ),
    budget: (
      <BudgetPage expenses={expenses} budgets={budgets} />
    ),
    profile: (
      <ProfilePage user={user} onUpdate={handleProfileUpdate} />
    ),
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        page={page}
        user={user}
        onNavigate={setPage}
        onLogout={handleLogout}
      />

      <main style={{ marginLeft: 240, padding: 32, flex: 1 }}>
        {pageComponents[page] || pageComponents.dashboard}
      </main>

      {modal && (
        <ExpenseModal
          mode={modal}
          expense={editing}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
