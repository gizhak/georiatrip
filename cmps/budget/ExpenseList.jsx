// 📋 קומפוננטת רשימת הוצאות
import { expenseService } from '../services/expense.service.js'

export function ExpenseList({ expenses, currency, t, language, onEdit, onDelete }) {
    const getCurrencySymbol = expenseService.getCurrencySymbol

    if (expenses.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t.recentExpenses}
                </h3>
                <p className="text-gray-500 text-center py-8">{t.noExpenses}</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {t.recentExpenses}
            </h3>
            <div className="space-y-3">
                {expenses.map(expense => (
                    <div
                        key={expense.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold">{expense.description}</h4>
                                <span
                                    className="text-xs px-2 py-1 rounded"
                                    style={{
                                        backgroundColor: 'var(--clr-secondary)',
                                        color: 'var(--clr-primary)'
                                    }}
                                >
                                    {t.categories[expense.category]}
                                </span>
                                {expense.paidWithCard && (
                                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                                        {t.card}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                {t.paidBy} {expense.paidBy} - {expense.date}
                            </p>
                            {expense.splitWith.length > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {t.splitAmong}: {expense.splitWith.join(', ')}
                                    ({getCurrencySymbol(currency)}{(expense.amount / expense.splitWith.length).toFixed(2)} {t.each})
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-xl font-bold">
                                {getCurrencySymbol(currency)}{expense.amount.toFixed(2)}
                            </p>
                            <button
                                onClick={() => onEdit(expense)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {t.edit}
                            </button>
                            <button
                                onClick={() => onDelete(expense.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                {t.delete}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}