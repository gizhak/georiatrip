// 📊 קומפוננטת סטטיסטיקות תקציב
import { expenseService } from '../services/expense.service.js'

export function BudgetStats({ budget, expenses, currency, t }) {
    const myCashSpent = expenseService.calculateMyCashSpent(expenses)
    const totalCardSpent = expenseService.calculateTotalCardSpent(expenses)
    const remainingCash = budget - myCashSpent
    const getCurrencySymbol = expenseService.getCurrencySymbol

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* תקציב מזומן */}
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {t.cashBudget}
                </p>
                <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {getCurrencySymbol(currency)}{budget.toFixed(2)}
                </p>
            </div>

            {/* הוצאתי במזומן */}
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {t.cashSpentMy}
                </p>
                <p className="text-3xl font-bold text-red-600" style={{ fontFamily: 'var(--font-heading)' }}>
                    {getCurrencySymbol(currency)}{myCashSpent.toFixed(2)}
                </p>
            </div>

            {/* נותר במזומן */}
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {t.cashRemaining}
                </p>
                <p
                    className="text-3xl font-bold"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        color: remainingCash >= 0 ? 'var(--clr-primary)' : 'var(--clr-danger)'
                    }}
                >
                    {getCurrencySymbol(currency)}{remainingCash.toFixed(2)}
                </p>
            </div>

            {/* הוצאתי בכרטיס */}
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {t.cardSpent}
                </p>
                <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'var(--font-heading)' }}>
                    {getCurrencySymbol(currency)}{totalCardSpent.toFixed(2)}
                </p>
            </div>
        </div>
    )
}