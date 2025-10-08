// 📈 קומפוננטת גרף הוצאות
import { expenseService } from '../services/expense.service.js'

export function ExpenseChart({ expenses, currency, t, isRTL }) {
    const spendingByDate = expenseService.getSpendingByDate(expenses)
    const myBalance = expenseService.calculateMyBalance(expenses)
    const myShare = expenseService.calculateMyShare(expenses)
    const getCurrencySymbol = expenseService.getCurrencySymbol
    const currentUserName = expenseService.getCurrentUser()

    if (expenses.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t.spendingOverTime}
                </h3>
                <p className="text-gray-500 text-center py-8" style={{ fontFamily: 'var(--font-body)' }}>
                    {t.noExpenses}
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {t.spendingOverTime} ({currentUserName})
            </h3>

            {/* סטטיסטיקות מעל הגרף */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {t.totalActualSpending}
                    </p>
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                        {getCurrencySymbol(currency)}{myShare.toFixed(2)}
                    </p>
                </div>
                <div className={isRTL ? 'text-left' : 'text-right'}>
                    <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {t.balance}
                    </p>
                    <p
                        className="text-2xl font-bold"
                        style={{
                            fontFamily: 'var(--font-heading)',
                            color: myBalance >= 0 ? 'var(--clr-primary)' : 'var(--clr-danger)'
                        }}
                    >
                        {myBalance >= 0 ? '+' : ''}{getCurrencySymbol(currency)}{myBalance.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>
                        {myBalance >= 0 ? t.othersOweYou : t.youOweOthers}
                    </p>
                </div>
            </div>

            {/* הגרף */}
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
    )
}