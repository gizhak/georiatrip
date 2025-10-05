// 💰 שירות הוצאות - כל הלוגיקה העסקית וחישובים
export const expenseService = {
    getCurrencySymbol,
    filterCashExpenses,
    filterCardExpenses,
    calculateMyCashSpent,
    calculateTotalCashSpent,
    calculateTotalCardSpent,
    calculateRemainingCash,
    calculateMyShare,
    calculateMyBalance,
    getExpensesByCategory,
    getSpendingByDate,
    validateExpense
}

const CURRENT_USER = 'Guy Izhak'

// סמלי מטבעות
function getCurrencySymbol(currency) {
    const symbols = {
        'GEL': 'GEL ',
        'USD': '$ ',
        'EUR': 'EUR ',
        'ILS': 'ILS '
    }
    return symbols[currency] || ''
}

// פילטר הוצאות מזומן
function filterCashExpenses(expenses) {
    return expenses.filter(exp => !exp.paidWithCard)
}

// פילטר הוצאות כרטיס
function filterCardExpenses(expenses) {
    return expenses.filter(exp => exp.paidWithCard)
}

// חישוב כמה אני הוצאתי במזומן (החלק שלי בלבד)
function calculateMyCashSpent(expenses) {
    const cashExpenses = filterCashExpenses(expenses)

    return cashExpenses.reduce((sum, exp) => {
        const amount = parseFloat(exp.amount || 0)
        const splitCount = exp.splitWith.length || 1
        const myShare = amount / splitCount

        // אם אני במי שמתחלקים, זה החלק שלי
        if (exp.splitWith.includes(CURRENT_USER)) {
            return sum + myShare
        }
        return sum
    }, 0)
}

// חישוב סך כל הוצאות המזומן
function calculateTotalCashSpent(expenses) {
    const cashExpenses = filterCashExpenses(expenses)
    return cashExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0)
}

// חישוב סך כל הוצאות הכרטיס
function calculateTotalCardSpent(expenses) {
    const cardExpenses = filterCardExpenses(expenses)
    return cardExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0)
}

// חישוב מזומן נותר
function calculateRemainingCash(budget, expenses) {
    const myCashSpent = calculateMyCashSpent(expenses)
    return budget - myCashSpent
}

// חישוב החלק שלי בכל ההוצאות
function calculateMyShare(expenses) {
    let myActualSpending = 0

    expenses.forEach(exp => {
        const amount = parseFloat(exp.amount || 0)
        const splitCount = exp.splitWith.length || 1
        const sharePerPerson = amount / splitCount

        if (exp.paidBy === CURRENT_USER) {
            myActualSpending += sharePerPerson
        } else if (exp.splitWith.includes(CURRENT_USER)) {
            myActualSpending += sharePerPerson
        }
    })

    return myActualSpending
}

// חישוב מאזן - כמה חייבים לי vs כמה אני חייב
function calculateMyBalance(expenses) {
    let iOwe = 0
    let owedToMe = 0

    expenses.forEach(exp => {
        const amount = parseFloat(exp.amount || 0)
        const splitCount = exp.splitWith.length || 1
        const sharePerPerson = amount / splitCount

        if (exp.paidBy === CURRENT_USER && splitCount > 1) {
            owedToMe += (amount - sharePerPerson)
        } else if (exp.paidBy !== CURRENT_USER && exp.splitWith.includes(CURRENT_USER)) {
            iOwe += sharePerPerson
        }
    })

    return owedToMe - iOwe
}

// קבלת הוצאות לפי קטגוריה
function getExpensesByCategory(expenses, categories) {
    return categories.map(cat => {
        const total = expenses
            .filter(exp => exp.category === cat)
            .reduce((sum, exp) => {
                const amount = parseFloat(exp.amount || 0)
                const splitCount = exp.splitWith.length || 1
                const myShare = exp.splitWith.includes(CURRENT_USER) ? amount / splitCount : 0
                return sum + myShare
            }, 0)
        return { category: cat, amount: total }
    }).filter(item => item.amount > 0)
}

// קבלת הוצאות לפי תאריך (לגרף)
function getSpendingByDate(expenses) {
    const byDate = expenses.reduce((acc, exp) => {
        const amount = parseFloat(exp.amount || 0)
        const splitCount = exp.splitWith.length || 1
        const myShare = exp.splitWith.includes(CURRENT_USER) ? amount / splitCount : 0

        const existing = acc.find(item => item.date === exp.date)
        if (existing) {
            existing.amount += myShare
        } else {
            acc.push({ date: exp.date, amount: myShare })
        }
        return acc
    }, [])

    return byDate.sort((a, b) => new Date(a.date) - new Date(b.date))
}

// ולידציה של הוצאה חדשה
function validateExpense(expense) {
    if (!expense.description || !expense.amount) {
        return { valid: false, error: 'fillDescriptionAmount' }
    }

    if (parseFloat(expense.amount) <= 0) {
        return { valid: false, error: 'invalidAmount' }
    }

    return { valid: true }
}