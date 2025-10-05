const { useState } = React

export function BudgetPage({ setPage, language, setLanguage }) {
    const [showAddExpense, setShowAddExpense] = useState(false)
    const [showEditBudget, setShowEditBudget] = useState(false)
    const [showManageParticipants, setShowManageParticipants] = useState(false)
    const [editingExpense, setEditingExpense] = useState(null)

    const [budget, setBudget] = useState(0)
    const [currency, setCurrency] = useState('GEL')
    const [expenses, setExpenses] = useState([])
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

    // אובייקט תרגומים
    const translations = {
        en: {
            title: 'Trip Budget Tracker',
            subtitle: 'Georgia Adventure 2024',
            exchange: 'Exchange: 1 EUR = 3.2 GEL | 1 USD = 2.7 GEL | 1 ILS = 0.73 GEL',
            cashBudget: 'Cash Budget',
            cashSpentMy: 'Cash Spent (My)',
            cashRemaining: 'Cash Remaining',
            cardSpent: 'Card Spent',
            spendingOverTime: 'Your Spending Over Time (Guy Izhak)',
            noExpenses: 'No expenses recorded yet',
            totalActualSpending: 'Total Actual Spending',
            balance: 'Balance',
            othersOweYou: 'Others owe you',
            youOweOthers: 'You owe others',
            budgetOverview: 'Budget Overview',
            cashSpent: 'Cash Spent',
            totalSpentMy: 'Total Spent (My):',
            expensesByCategory: 'Expenses by Category',
            addExpense: '+ Add Expense',
            cancel: 'Cancel',
            editBudget: 'Edit Budget',
            manageParticipants: 'Manage Participants',
            addNewExpense: 'Add New Expense',
            editExpense: 'Edit Expense',
            description: 'Description',
            amount: 'Amount',
            date: 'Date',
            paidBy: 'Paid By',
            selectWhoPaid: '-- Select who paid --',
            category: 'Category',
            splitAmong: 'Split Among',
            equalSplit: 'Equal Split:',
            total: 'Total:',
            iPaidCash: '💵 I paid in cash:',
            paidWithCard: 'Paid with Credit Card',
            saveChanges: 'Save Changes',
            editTripBudget: 'Edit Trip Budget',
            save: 'Save',
            addParticipantPlaceholder: 'Add participant name...',
            add: 'Add',
            you: '(You)',
            remove: 'Remove',
            cannotRemoveYourself: 'Cannot remove yourself!',
            recentExpenses: 'Recent Expenses',
            card: 'Card',
            edit: 'Edit',
            delete: 'Delete',
            deleteConfirm: 'Delete this expense?',
            removeConfirm: 'Remove',
            fillDescriptionAmount: 'Please fill in description and amount',
            dinnerPlaceholder: 'Dinner at restaurant',
            categories: {
                Food: 'Food',
                Transport: 'Transport',
                Accommodation: 'Accommodation',
                Activities: 'Activities',
                Shopping: 'Shopping',
                Other: 'Other'
            }
        },
        he: {
            title: 'מעקב תקציב טיול',
            subtitle: 'הרפתקה בגאורגיה 2024',
            exchange: 'שער חליפין: 1 EUR = 3.2 GEL | 1 USD = 2.7 GEL | 1 ILS = 0.73 GEL',
            cashBudget: 'תקציב מזומן',
            cashSpentMy: 'הוצאתי במזומן',
            cashRemaining: 'נותר במזומן',
            cardSpent: 'הוצאתי בכרטיס',
            spendingOverTime: 'ההוצאות שלך לאורך זמן (גיא יצחק)',
            noExpenses: 'עדיין אין הוצאות רשומות',
            totalActualSpending: 'סך ההוצאות שלי',
            balance: 'מאזן',
            othersOweYou: 'חייבים לך',
            youOweOthers: 'אתה חייב',
            budgetOverview: 'סקירת תקציב',
            cashSpent: 'הוצאתי במזומן',
            totalSpentMy: 'סה"כ הוצאתי:',
            expensesByCategory: 'הוצאות לפי קטגוריה',
            addExpense: '+ הוסף הוצאה',
            cancel: 'ביטול',
            editBudget: 'ערוך תקציב',
            manageParticipants: 'נהל משתתפים',
            addNewExpense: 'הוסף הוצאה חדשה',
            editExpense: 'ערוך הוצאה',
            description: 'תיאור',
            amount: 'סכום',
            date: 'תאריך',
            paidBy: 'שילם',
            selectWhoPaid: '-- בחר מי שילם --',
            category: 'קטגוריה',
            splitAmong: 'חלוקה בין',
            equalSplit: 'חלוקה שווה:',
            total: 'סה"כ:',
            iPaidCash: '💵 שילמתי במזומן:',
            paidWithCard: 'שולם בכרטיס אשראי',
            saveChanges: 'שמור שינויים',
            editTripBudget: 'ערוך תקציב טיול',
            save: 'שמור',
            addParticipantPlaceholder: 'הוסף שם משתתף...',
            add: 'הוסף',
            you: '(אתה)',
            remove: 'הסר',
            cannotRemoveYourself: 'לא ניתן להסיר את עצמך!',
            recentExpenses: 'הוצאות אחרונות',
            card: 'כרטיס',
            edit: 'ערוך',
            delete: 'מחק',
            deleteConfirm: 'למחוק הוצאה זו?',
            removeConfirm: 'להסיר',
            fillDescriptionAmount: 'נא למלא תיאור וסכום',
            dinnerPlaceholder: 'ארוחת ערב במסעדה',
            categories: {
                Food: 'אוכל',
                Transport: 'תחבורה',
                Accommodation: 'לינה',
                Activities: 'פעילויות',
                Shopping: 'קניות',
                Other: 'אחר'
            }
        }
    }

    const t = translations[language]
    const isRTL = language === 'he'

    const categories = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other']

    const getCurrencySymbol = (curr) => {
        const symbols = {
            'GEL': 'GEL ',
            'USD': '$ ',
            'EUR': 'EUR ',
            'ILS': 'ILS '
        }
        return symbols[curr] || ''
    }

    const cashExpenses = expenses.filter(exp => !exp.paidWithCard)
    const cardExpenses = expenses.filter(exp => exp.paidWithCard)

    // חישוב כמה אני הוצאתי בפועל במזומן (החלק שלי בלבד)
    const myCashSpent = cashExpenses.reduce((sum, exp) => {
        const amount = parseFloat(exp.amount || 0)
        const splitCount = exp.splitWith.length || 1
        const myShare = amount / splitCount
        // אם אני במי שמתחלקים, זה החלק שלי
        if (exp.splitWith.includes('Guy Izhak')) {
            return sum + myShare
        }
        return sum
    }, 0)

    const totalCashSpent = cashExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0)
    const totalCardSpent = cardExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0)
    const remainingCash = budget - myCashSpent

    const calculateMyShare = () => {
        let myActualSpending = 0
        expenses.forEach(exp => {
            const amount = parseFloat(exp.amount || 0)
            const splitCount = exp.splitWith.length || 1
            const sharePerPerson = amount / splitCount
            if (exp.paidBy === 'Guy Izhak') {
                myActualSpending += sharePerPerson
            } else if (exp.splitWith.includes('Guy Izhak')) {
                myActualSpending += sharePerPerson
            }
        })
        return myActualSpending
    }

    const myBalance = () => {
        let iOwe = 0
        let owedToMe = 0
        expenses.forEach(exp => {
            const amount = parseFloat(exp.amount || 0)
            const splitCount = exp.splitWith.length || 1
            const sharePerPerson = amount / splitCount
            if (exp.paidBy === 'Guy Izhak' && splitCount > 1) {
                owedToMe += (amount - sharePerPerson)
            } else if (exp.paidBy !== 'Guy Izhak' && exp.splitWith.includes('Guy Izhak')) {
                iOwe += sharePerPerson
            }
        })
        return owedToMe - iOwe
    }

    const handleSaveExpense = () => {
        if (!newExpense.description || !newExpense.amount) {
            alert(t.fillDescriptionAmount)
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
        setNewExpense({ description: '', amount: '', paidBy: '', category: 'Food', splitWith: [], paidWithCard: false, date: new Date().toISOString().split('T')[0] })
        setShowAddExpense(false)
        setEditingExpense(null)
    }

    const startEditExpense = (expense) => {
        setNewExpense(expense)
        setEditingExpense(expense)
        setShowAddExpense(true)
    }

    const cancelExpense = () => {
        setNewExpense({ description: '', amount: '', paidBy: '', category: 'Food', splitWith: [], paidWithCard: false, date: new Date().toISOString().split('T')[0] })
        setShowAddExpense(false)
        setEditingExpense(null)
    }

    const handleUpdateBudget = (newBudget) => {
        setBudget(parseFloat(newBudget))
        setShowEditBudget(false)
    }

    const toggleSplitWith = (person) => {
        if (newExpense.splitWith.includes(person)) {
            setNewExpense({ ...newExpense, splitWith: newExpense.splitWith.filter(p => p !== person) })
        } else {
            setNewExpense({ ...newExpense, splitWith: [...newExpense.splitWith, person] })
        }
    }

    const deleteExpense = (id) => {
        if (confirm(t.deleteConfirm)) {
            setExpenses(expenses.filter(exp => exp.id !== id))
        }
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

    const expensesByCategory = categories.map(cat => {
        const total = expenses
            .filter(exp => exp.category === cat)
            .reduce((sum, exp) => {
                const amount = parseFloat(exp.amount || 0)
                const splitCount = exp.splitWith.length || 1
                const myShare = exp.splitWith.includes('Guy Izhak') ? amount / splitCount : 0
                return sum + myShare
            }, 0)
        return { category: cat, amount: total }
    }).filter(item => item.amount > 0)

    // נתונים לגרף - הוצאות לפי תאריך
    const spendingByDate = expenses.reduce((acc, exp) => {
        const amount = parseFloat(exp.amount || 0)
        const splitCount = exp.splitWith.length || 1
        const myShare = exp.splitWith.includes('Guy Izhak') ? amount / splitCount : 0

        const existing = acc.find(item => item.date === exp.date)
        if (existing) {
            existing.amount += myShare
        } else {
            acc.push({ date: exp.date, amount: myShare })
        }
        return acc
    }, []).sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--clr-bg-cream)' }} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="py-12" style={{ backgroundColor: 'var(--clr-bg-dark)' }}>
                <div className="max-w-7xl mx-auto px-4 text-white">
                    <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t.title}</h1>
                    <p style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}>{t.subtitle}</p>
                    <p className="text-sm mt-2" style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}>{t.exchange}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.cashBudget}</p>
                        <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{getCurrencySymbol(currency)}{budget.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.cashSpentMy}</p>
                        <p className="text-3xl font-bold text-red-600" style={{ fontFamily: 'var(--font-heading)' }}>{getCurrencySymbol(currency)}{myCashSpent.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.cashRemaining}</p>
                        <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: remainingCash >= 0 ? 'var(--clr-primary)' : 'var(--clr-danger)' }}>{getCurrencySymbol(currency)}{remainingCash.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.cardSpent}</p>
                        <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'var(--font-heading)' }}>{getCurrencySymbol(currency)}{totalCardSpent.toFixed(2)}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t.spendingOverTime}</h3>
                    {expenses.length === 0 ? (
                        <p className="text-gray-500 text-center py-8" style={{ fontFamily: 'var(--font-body)' }}>{t.noExpenses}</p>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{t.totalActualSpending}</p>
                                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{getCurrencySymbol(currency)}{calculateMyShare().toFixed(2)}</p>
                                </div>
                                <div className={isRTL ? 'text-left' : 'text-right'}>
                                    <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{t.balance}</p>
                                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: myBalance() >= 0 ? 'var(--clr-primary)' : 'var(--clr-danger)' }}>
                                        {myBalance() >= 0 ? '+' : ''}{getCurrencySymbol(currency)}{myBalance().toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>{myBalance() >= 0 ? t.othersOweYou : t.youOweOthers}</p>
                                </div>
                            </div>
                            <div className="flex items-end justify-around gap-4 h-80 border-b-2 border-gray-300 pb-2">
                                {spendingByDate.map((item, index) => {
                                    const maxAmount = Math.max(...spendingByDate.map(d => d.amount))
                                    const heightPercentage = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0
                                    const colors = ['#2d5f4c', '#3d7f6c', '#4d9f8c', '#5dbfac', '#6ddfcc', '#7dffdc']
                                    const color = colors[index % colors.length]
                                    return (
                                        <div key={index} className="flex flex-col items-center justify-end gap-2" style={{ flex: '1', height: '100%' }}>
                                            <div className="text-xs font-bold text-center mb-1" style={{ color: color }}>
                                                {getCurrencySymbol(currency)}{item.amount.toFixed(2)}
                                            </div>
                                            <div
                                                className="w-full rounded-t-lg transition-all"
                                                style={{
                                                    height: `${heightPercentage}%`,
                                                    backgroundColor: color,
                                                    minHeight: '30px',
                                                    maxWidth: '120px'
                                                }}
                                            ></div>
                                            <div className="text-xs font-medium text-gray-700 text-center mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                                                {item.date}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t.budgetOverview}</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                                    <span>{t.cashSpent}</span>
                                    <span>{budget > 0 ? ((totalCashSpent / budget) * 100).toFixed(0) : 0}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-6">
                                    <div className="h-6 rounded-full transition-all" style={{ width: budget > 0 ? `${Math.min((totalCashSpent / budget) * 100, 100)}%` : '0%', backgroundColor: totalCashSpent > budget ? 'var(--clr-danger)' : 'var(--clr-primary)' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                                    <span>{t.cardSpent}</span>
                                    <span>{getCurrencySymbol(currency)}{totalCardSpent.toFixed(2)}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-6">
                                    <div className="h-6 rounded-full transition-all bg-blue-500" style={{ width: totalCardSpent > 0 ? '100%' : '0%' }}></div>
                                </div>
                            </div>
                            <div className="pt-4 border-t">
                                <div className="flex justify-between" style={{ fontFamily: 'var(--font-body)' }}>
                                    <span className="font-bold">{t.totalSpentMy}</span>
                                    <span className="font-bold">{getCurrencySymbol(currency)}{calculateMyShare().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t.expensesByCategory}</h3>
                        {expensesByCategory.length === 0 ? (
                            <p className="text-gray-500 text-center py-8" style={{ fontFamily: 'var(--font-body)' }}>{t.noExpenses}</p>
                        ) : (
                            <div className="space-y-2">
                                {expensesByCategory.map(item => (
                                    <div key={item.category}>
                                        <div className="flex justify-between text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                                            <span>{t.categories[item.category]}</span>
                                            <span>{getCurrencySymbol(currency)}{item.amount.toFixed(2)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div className="h-4 rounded-full" style={{ width: `${(item.amount / (totalCashSpent + totalCardSpent)) * 100}%`, backgroundColor: 'var(--clr-primary)' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 mb-8 flex-wrap">
                    <button onClick={() => { setShowAddExpense(!showAddExpense); if (editingExpense) cancelExpense() }} className="px-6 py-3 rounded-lg transition" style={{ backgroundColor: showAddExpense ? 'var(--clr-secondary)' : 'var(--clr-primary)', color: showAddExpense ? 'var(--clr-primary)' : 'white', fontFamily: 'var(--font-body)' }}>
                        {showAddExpense ? t.cancel : t.addExpense}
                    </button>
                    <button onClick={() => setShowEditBudget(!showEditBudget)} className="px-6 py-3 border rounded-lg transition" style={{ borderColor: 'var(--clr-primary)', backgroundColor: showEditBudget ? 'var(--clr-secondary)' : 'transparent', color: 'var(--clr-primary)', fontFamily: 'var(--font-body)' }}>
                        {showEditBudget ? t.cancel : t.editBudget}
                    </button>
                    <button onClick={() => setShowManageParticipants(!showManageParticipants)} className="px-6 py-3 border rounded-lg transition" style={{ borderColor: 'var(--clr-primary)', backgroundColor: showManageParticipants ? 'var(--clr-secondary)' : 'transparent', color: 'var(--clr-primary)', fontFamily: 'var(--font-body)' }}>
                        {showManageParticipants ? t.cancel : t.manageParticipants}
                    </button>
                </div>

                {showAddExpense && (
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{editingExpense ? t.editExpense : t.addNewExpense}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.description}</label>
                                <input type="text" placeholder={t.dinnerPlaceholder} value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} className="w-full px-4 py-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.amount}</label>
                                <input type="number" placeholder="50.00" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="w-full px-4 py-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.date}</label>
                                <input type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} className="w-full px-4 py-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.paidBy}</label>
                                <select value={newExpense.paidBy} onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })} className="w-full px-4 py-2 border rounded">
                                    <option value="">{t.selectWhoPaid}</option>
                                    {participants.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.category}</label>
                                <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="w-full px-4 py-2 border rounded">
                                    {categories.map(c => <option key={c} value={c}>{t.categories[c]}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>{t.splitAmong}</label>
                            <div className="flex flex-wrap gap-2">
                                {participants.map(person => (
                                    <button key={person} onClick={() => toggleSplitWith(person)} className="px-4 py-2 rounded transition" style={{ backgroundColor: newExpense.splitWith.includes(person) ? 'var(--clr-secondary)' : '#f3f4f6', color: newExpense.splitWith.includes(person) ? 'var(--clr-primary)' : '#6b7280', fontWeight: newExpense.splitWith.includes(person) ? 'bold' : 'normal' }}>
                                        {person} {newExpense.splitWith.includes(person) && '✓'}
                                    </button>
                                ))}
                            </div>
                            {newExpense.splitWith.length > 0 && newExpense.amount && (
                                <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: '#eff6ff', borderColor: '#3b82f6' }}>
                                    <p className="text-sm font-semibold mb-3" style={{ color: 'var(--clr-primary)' }}>{t.equalSplit}</p>
                                    <div className="space-y-2">
                                        {newExpense.splitWith.map(person => (
                                            <div key={person} className="flex justify-between items-center text-sm">
                                                <span className="font-medium">{person}</span>
                                                <span className="font-bold" style={{ color: 'var(--clr-primary)' }}>
                                                    {getCurrencySymbol(currency)}{(parseFloat(newExpense.amount || 0) / newExpense.splitWith.length).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 pt-3 border-t" style={{ borderColor: '#3b82f6' }}>
                                        <div className="flex justify-between items-center text-sm font-bold">
                                            <span>{t.total}</span>
                                            <span style={{ color: 'var(--clr-primary)' }}>
                                                {getCurrencySymbol(currency)}{parseFloat(newExpense.amount || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    {newExpense.paidBy === 'Guy Izhak' && !newExpense.paidWithCard && (
                                        <div className="mt-3 pt-3 border-t" style={{ borderColor: '#3b82f6' }}>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="font-bold" style={{ color: '#dc2626' }}>{t.iPaidCash}</span>
                                                <span className="font-bold text-lg" style={{ color: '#dc2626' }}>
                                                    {getCurrencySymbol(currency)}{parseFloat(newExpense.amount || 0).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={newExpense.paidWithCard} onChange={(e) => setNewExpense({ ...newExpense, paidWithCard: e.target.checked })} />
                                {t.paidWithCard}
                            </label>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button onClick={handleSaveExpense} className="px-6 py-3 rounded-lg" style={{ backgroundColor: 'var(--clr-primary)', color: 'white' }}>
                                {editingExpense ? t.saveChanges : t.addExpense}
                            </button>
                            <button onClick={cancelExpense} className="px-6 py-3 border rounded-lg">{t.cancel}</button>
                        </div>
                    </div>
                )}

                {showEditBudget && (
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t.editTripBudget}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2">{t.cashBudget}</label>
                                <input type="number" placeholder="1200" defaultValue={budget} id="budgetInput" className="w-full px-4 py-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">{t.category}</label>
                                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-4 py-2 border rounded">
                                    <option value="GEL">GEL (Georgian Lari)</option>
                                    <option value="USD">USD (US Dollar)</option>
                                    <option value="EUR">EUR (Euro)</option>
                                    <option value="ILS">ILS (Israeli Shekel)</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button onClick={() => handleUpdateBudget(document.getElementById('budgetInput').value)} className="px-6 py-3 rounded-lg" style={{ backgroundColor: 'var(--clr-primary)', color: 'white' }}>{t.save}</button>
                            <button onClick={() => setShowEditBudget(false)} className="px-6 py-3 border rounded-lg">{t.cancel}</button>
                        </div>
                    </div>
                )}

                {showManageParticipants && (
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t.manageParticipants}</h3>
                        <div className="flex gap-2 mb-4">
                            <input type="text" placeholder={t.addParticipantPlaceholder} value={newParticipant} onChange={(e) => setNewParticipant(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addParticipant()} className="flex-1 px-4 py-2 border rounded" />
                            <button onClick={addParticipant} className="px-6 py-2 rounded-lg" style={{ backgroundColor: 'var(--clr-primary)', color: 'white' }}>{t.add}</button>
                        </div>
                        <div className="space-y-2">
                            {participants.map(person => (
                                <div key={person} className="flex justify-between items-center p-3 border rounded">
                                    <span>{person} {person === 'Guy Izhak' && t.you}</span>
                                    {person !== 'Guy Izhak' && (<button onClick={() => removeParticipant(person)} className="text-red-600 hover:text-red-800">{t.remove}</button>)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t.recentExpenses}</h3>
                    {expenses.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">{t.noExpenses}</p>
                    ) : (
                        <div className="space-y-3">
                            {expenses.map(expense => (
                                <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-semibold">{expense.description}</h4>
                                            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--clr-secondary)', color: 'var(--clr-primary)' }}>{t.categories[expense.category]}</span>
                                            {expense.paidWithCard && <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">{t.card}</span>}
                                        </div>
                                        <p className="text-sm text-gray-600">{t.paidBy} {expense.paidBy} - {expense.date}</p>
                                        {expense.splitWith.length > 0 && (
                                            <p className="text-xs text-gray-500 mt-1">{t.splitAmong}: {expense.splitWith.join(', ')} ({getCurrencySymbol(currency)}{(expense.amount / expense.splitWith.length).toFixed(2)} {language === 'he' ? 'לכל אחד' : 'each'})</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-xl font-bold">{getCurrencySymbol(currency)}{expense.amount.toFixed(2)}</p>
                                        <button onClick={() => startEditExpense(expense)} className="text-blue-600 hover:text-blue-800">{t.edit}</button>
                                        <button onClick={() => deleteExpense(expense.id)} className="text-red-600 hover:text-red-800">{t.delete}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <footer className="py-8 mt-8" style={{ backgroundColor: 'var(--clr-bg-cream)' }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Georgia Trip Tracker</h3>
                            <p className="text-sm text-gray-700">{language === 'he' ? 'הופכים הוצאות טיולים קבוצתיים לפשוטות וזיכרונות לנצחיים.' : 'Making group travel expenses simple and memories lasting.'}</p>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <button onClick={() => setPage('home')} className="hover:underline">{language === 'he' ? 'בית' : 'Home'}</button>
                            <button onClick={() => setPage('gallery')} className="hover:underline">{language === 'he' ? 'גלריה' : 'Gallery'}</button>
                            <button onClick={() => setPage('budget')} className="hover:underline">{language === 'he' ? 'תקציב' : 'Budget'}</button>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600" style={{ borderColor: 'var(--clr-primary)' }}>
                        {language === 'he' ? '© 2024 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.' : '© 2024 Georgia Trip Tracker. Built for amazing adventures.'}
                    </div>
                </div>
            </footer>
        </div>
    )
}