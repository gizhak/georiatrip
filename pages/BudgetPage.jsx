const { useState, useEffect } = React

// ייבוא שירותים וקומפוננטות
import { translationService } from '../services/translation.service.js'
import { expenseService } from '../services/expense.service.js'
import { utilService } from '../services/util.service.js'
import { BudgetStats } from '../cmps/budget/BudgetStats.jsx'
import { ExpenseChart } from '../cmps/budget/ExpenseChart.jsx'
import { ExpenseForm } from '../cmps/budget/ExpenseForm.jsx'
import { ExpenseList } from '../cmps/budget/ExpenseList.jsx'

export function BudgetPage({ setPage, language, setLanguage, user, setUser }) {
    // State management
    const [showAddExpense, setShowAddExpense] = useState(false)
    const [showEditBudget, setShowEditBudget] = useState(false)
    const [showManageParticipants, setShowManageParticipants] = useState(false)
    const [editingExpense, setEditingExpense] = useState(null)

    const [budget, setBudget] = useState(() => {
        return utilService.loadFromStorage('budget') || 0
    })

    const [currency, setCurrency] = useState(() => {
        return utilService.loadFromStorage('userCurrency') || 'GEL'
    })

    const [expenses, setExpenses] = useState(() => {
        return utilService.loadFromStorage('expenses') || []
    })

    const [participants, setParticipants] = useState(['Guy Izhak', 'Alice', 'Bob', 'Charlie', 'Dana'])
    const [newParticipant, setNewParticipant] = useState('')

    const [newExpense, setNewExpense] = useState({
        description: '',
        amount: '',
        paidBy: '',
        category: 'Food',
        splitWith: [],
        paidWithCard: false,
        date: new Date().toISOString().split('T')[0]
    })

    // שמור אוטומטית כל שינוי ב-localStorage
    useEffect(() => {
        utilService.saveToStorage('expenses', expenses)
    }, [expenses])

    useEffect(() => {
        utilService.saveToStorage('budget', budget)
    }, [budget])

    // עדכן מטבע אם השתנה בפרופיל
    useEffect(() => {
        const savedCurrency = utilService.loadFromStorage('userCurrency')
        if (savedCurrency && savedCurrency !== currency) {
            setCurrency(savedCurrency)
        }
    }, [])

    // תרגומים
    const t = translationService.getTranslations('budget', language)
    const isRTL = language === 'he'

    const categories = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other']

    // חישובים
    const totalCashSpent = expenseService.calculateTotalCashSpent(expenses)
    const totalCardSpent = expenseService.calculateTotalCardSpent(expenses)
    const myShare = expenseService.calculateMyShare(expenses)
    const expensesByCategory = expenseService.getExpensesByCategory(expenses, categories)

    // פונקציות טיפול בהוצאות
    const handleSaveExpense = () => {
        const validation = expenseService.validateExpense(newExpense)
        if (!validation.valid) {
            alert(t[validation.error])
            return
        }

        const expense = {
            id: editingExpense ? editingExpense.id : Date.now(),
            ...newExpense,
            amount: parseFloat(newExpense.amount),
            date: newExpense.date
        }

        if (editingExpense) {
            setExpenses(expenses.map(exp => exp.id === editingExpense.id ? expense : exp))
        } else {
            setExpenses([expense, ...expenses])
        }

        resetExpenseForm()
    }

    const resetExpenseForm = () => {
        setNewExpense({
            description: '',
            amount: '',
            paidBy: '',
            category: 'Food',
            splitWith: [],
            paidWithCard: false,
            date: new Date().toISOString().split('T')[0]
        })
        setShowAddExpense(false)
        setEditingExpense(null)
    }

    const startEditExpense = (expense) => {
        setNewExpense(expense)
        setEditingExpense(expense)
        setShowAddExpense(true)
    }

    const deleteExpense = (id) => {
        if (confirm(t.deleteConfirm)) {
            setExpenses(expenses.filter(exp => exp.id !== id))
        }
    }

    const handleUpdateBudget = (newBudget) => {
        setBudget(parseFloat(newBudget))
        setShowEditBudget(false)
    }

    const addParticipant = () => {
        if (newParticipant.trim() && !participants.includes(newParticipant.trim())) {
            setParticipants([...participants, newParticipant.trim()])
            setNewParticipant('')
        }
    }

    const removeParticipant = (name) => {
        if (name === 'Guy Izhak') {
            alert(t.cannotRemoveYourself)
            return
        }
        if (confirm(`${t.removeConfirm} ${name}?`)) {
            setParticipants(participants.filter(p => p !== name))
        }
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--clr-bg-cream)' }} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="py-12" style={{ backgroundColor: 'var(--clr-bg-dark)', paddingTop: '1rem' }}>
                <div className="max-w-7xl mx-auto px-4 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
                                {t.title}
                            </h2>
                            <p style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}>
                                {t.subtitle}
                            </p>
                            <p className="text-sm mt-2" style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}>
                                {t.exchange}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                                className="px-4 py-2 text-sm border rounded"
                                style={{
                                    borderColor: 'var(--clr-secondary)',
                                    color: 'var(--clr-secondary)'
                                }}
                            >
                                {language === 'en' ? 'עב' : 'EN'}
                            </button>
                            {user && (
                                <button
                                    onClick={() => setPage('profile')}
                                    className="flex items-center gap-2 px-4 py-2 rounded"
                                    style={{
                                        backgroundColor: 'var(--clr-secondary)',
                                        color: 'var(--clr-primary)'
                                    }}
                                >
                                    <span>👤</span>
                                    <span>{user.name}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* סטטיסטיקות */}
                <BudgetStats budget={budget} expenses={expenses} currency={currency} t={t} />

                {/* גרף */}
                <ExpenseChart expenses={expenses} currency={currency} t={t} isRTL={isRTL} />

                {/* Budget Overview & Expenses by Category */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.budgetOverview}
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{t.cashSpent}</span>
                                    <span>{budget > 0 ? ((totalCashSpent / budget) * 100).toFixed(0) : 0}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-6">
                                    <div
                                        className="h-6 rounded-full transition-all"
                                        style={{
                                            width: budget > 0 ? `${Math.min((totalCashSpent / budget) * 100, 100)}%` : '0%',
                                            backgroundColor: totalCashSpent > budget ? 'var(--clr-danger)' : 'var(--clr-primary)'
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{t.cardSpent}</span>
                                    <span>{expenseService.getCurrencySymbol(currency)}{totalCardSpent.toFixed(2)}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-6">
                                    <div className="h-6 rounded-full transition-all bg-blue-500" style={{ width: totalCardSpent > 0 ? '100%' : '0%' }}></div>
                                </div>
                            </div>
                            <div className="pt-4 border-t">
                                <div className="flex justify-between">
                                    <span className="font-bold">{t.totalSpentMy}</span>
                                    <span className="font-bold">{expenseService.getCurrencySymbol(currency)}{myShare.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.expensesByCategory}
                        </h3>
                        {expensesByCategory.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">{t.noExpenses}</p>
                        ) : (
                            <div className="space-y-2">
                                {expensesByCategory.map(item => (
                                    <div key={item.category}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{t.categories[item.category]}</span>
                                            <span>{expenseService.getCurrencySymbol(currency)}{item.amount.toFixed(2)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div
                                                className="h-4 rounded-full"
                                                style={{
                                                    width: `${(item.amount / (totalCashSpent + totalCardSpent)) * 100}%`,
                                                    backgroundColor: 'var(--clr-primary)'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* כפתורי פעולה */}
                <div className="flex gap-4 mb-8 flex-wrap">
                    <button
                        onClick={() => { setShowAddExpense(!showAddExpense); if (editingExpense) resetExpenseForm() }}
                        className="px-6 py-3 rounded-lg transition"
                        style={{
                            backgroundColor: showAddExpense ? 'var(--clr-secondary)' : 'var(--clr-primary)',
                            color: showAddExpense ? 'var(--clr-primary)' : 'white'
                        }}
                    >
                        {showAddExpense ? t.cancel : t.addExpense}
                    </button>
                    <button
                        onClick={() => setShowEditBudget(!showEditBudget)}
                        className="px-6 py-3 border rounded-lg transition"
                        style={{
                            borderColor: 'var(--clr-primary)',
                            backgroundColor: showEditBudget ? 'var(--clr-secondary)' : 'transparent',
                            color: 'var(--clr-primary)'
                        }}
                    >
                        {showEditBudget ? t.cancel : t.editBudget}
                    </button>
                    <button
                        onClick={() => setShowManageParticipants(!showManageParticipants)}
                        className="px-6 py-3 border rounded-lg transition"
                        style={{
                            borderColor: 'var(--clr-primary)',
                            backgroundColor: showManageParticipants ? 'var(--clr-secondary)' : 'transparent',
                            color: 'var(--clr-primary)'
                        }}
                    >
                        {showManageParticipants ? t.cancel : t.manageParticipants}
                    </button>
                </div>

                {/* טופס הוצאה */}
                {showAddExpense && (
                    <ExpenseForm
                        expense={newExpense}
                        participants={participants}
                        categories={categories}
                        currency={currency}
                        t={t}
                        onSave={handleSaveExpense}
                        onChange={(updated) => setNewExpense(updated)}
                        onCancel={resetExpenseForm}
                    />
                )}

                {/* עריכת תקציב */}
                {showEditBudget && (
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.editTripBudget}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2">{t.cashBudget}</label>
                                <input
                                    type="number"
                                    placeholder="1200"
                                    defaultValue={budget}
                                    id="budgetInput"
                                    className="w-full px-4 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">{t.category}</label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                >
                                    <option value="GEL">GEL (Georgian Lari)</option>
                                    <option value="USD">USD (US Dollar)</option>
                                    <option value="EUR">EUR (Euro)</option>
                                    <option value="ILS">ILS (Israeli Shekel)</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => handleUpdateBudget(document.getElementById('budgetInput').value)}
                                className="px-6 py-3 rounded-lg"
                                style={{ backgroundColor: 'var(--clr-primary)', color: 'white' }}
                            >
                                {t.save}
                            </button>
                            <button
                                onClick={() => setShowEditBudget(false)}
                                className="px-6 py-3 border rounded-lg"
                            >
                                {t.cancel}
                            </button>
                        </div>
                    </div>
                )}

                {/* ניהול משתתפים */}
                {showManageParticipants && (
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.manageParticipants}
                        </h3>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder={t.addParticipantPlaceholder}
                                value={newParticipant}
                                onChange={(e) => setNewParticipant(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                                className="flex-1 px-4 py-2 border rounded"
                            />
                            <button
                                onClick={addParticipant}
                                className="px-6 py-2 rounded-lg"
                                style={{ backgroundColor: 'var(--clr-primary)', color: 'white' }}
                            >
                                {t.add}
                            </button>
                        </div>
                        <div className="space-y-2">
                            {participants.map(person => (
                                <div key={person} className="flex justify-between items-center p-3 border rounded">
                                    <span>{person} {person === 'Guy Izhak' && t.you}</span>
                                    {person !== 'Guy Izhak' && (
                                        <button
                                            onClick={() => removeParticipant(person)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            {t.remove}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* רשימת הוצאות */}
                <ExpenseList
                    expenses={expenses}
                    currency={currency}
                    t={t}
                    language={language}
                    onEdit={startEditExpense}
                    onDelete={deleteExpense}
                />
            </div>

            {/* Footer */}
            <footer className="py-8 mt-8" style={{ backgroundColor: 'var(--clr-bg-cream)' }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                Georgia Trip Tracker
                            </h3>
                            <p className="text-sm text-gray-700">
                                {language === 'he' ? 'הופכים הוצאות טיולים קבוצתיים לפשוטות וזיכרונות לנצחיים.' : 'Making group travel expenses simple and memories lasting.'}
                            </p>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <button onClick={() => setPage('home')} className="hover:underline">
                                {language === 'he' ? 'בית' : 'Home'}
                            </button>
                            <button onClick={() => setPage('gallery')} className="hover:underline">
                                {language === 'he' ? 'גלריה' : 'Gallery'}
                            </button>
                            <button onClick={() => setPage('budget')} className="hover:underline">
                                {language === 'he' ? 'תקציב' : 'Budget'}
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600" style={{ borderColor: 'var(--clr-primary)' }}>
                        {language === 'he' ? '© 2025 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.' : '© 2025 Georgia Trip Tracker. Built for amazing adventures.'}
                    </div>
                </div>
            </footer>
        </div>
    )
}