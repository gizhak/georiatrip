// 📝 קומפוננטת טופס הוצאה
import { expenseService } from '../services/expense.service.js'

export function ExpenseForm({
    expense,
    participants,
    categories,
    currency,
    t,
    onChange,    // זה לעדכון השדות
    onSave,      // זה לשמירה סופית
    onCancel
}) {
    const getCurrencySymbol = expenseService.getCurrencySymbol
    const isEditing = !!expense.id

    const splitWith = expense.splitWith || []

    const handleToggleSplit = (person) => {
        const newSplitWith = splitWith.includes(person)
            ? splitWith.filter(p => p !== person)
            : [...splitWith, person]

        onChange({ ...expense, splitWith: newSplitWith })
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {isEditing ? t.editExpense : t.addNewExpense}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
                {/* תיאור */}
                <div>
                    <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        {t.description}
                    </label>
                    <input
                        type="text"
                        placeholder={t.dinnerPlaceholder}
                        value={expense.description}
                        onChange={(e) => onChange({ ...expense, description: e.target.value })}  // ✅ onChange!
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* סכום */}
                <div>
                    <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        {t.amount}
                    </label>
                    <input
                        type="number"
                        placeholder="50.00"
                        value={expense.amount}
                        onChange={(e) => onChange({ ...expense, amount: e.target.value })}  // ✅ onChange!
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* תאריך */}
                <div>
                    <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        {t.date}
                    </label>
                    <input
                        type="date"
                        value={expense.date}
                        onChange={(e) => onChange({ ...expense, date: e.target.value })}  // ✅ onChange!
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* שילם */}
                <div>
                    <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        {t.paidBy}
                    </label>
                    <select
                        value={expense.paidBy}
                        onChange={(e) => onChange({ ...expense, paidBy: e.target.value })}  // ✅ onChange!
                        className="w-full px-4 py-2 border rounded"
                    >
                        <option value="">{t.selectWhoPaid}</option>
                        {participants.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>

                {/* קטגוריה */}
                <div>
                    <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        {t.category}
                    </label>
                    <select
                        value={expense.category}
                        onChange={(e) => onChange({ ...expense, category: e.target.value })}  // ✅ onChange!
                        className="w-full px-4 py-2 border rounded"
                    >
                        {categories.map(c => (
                            <option key={c} value={c}>{t.categories[c]}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* חלוקה בין משתתפים */}
            <div className="mt-4">
                <label className="block text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {t.splitAmong}
                </label>
                <div className="flex flex-wrap gap-2">
                    {participants.map(person => (
                        <button
                            key={person}
                            onClick={() => handleToggleSplit(person)}
                            className="px-4 py-2 rounded transition"
                            style={{
                                backgroundColor: splitWith.includes(person) ? 'var(--clr-secondary)' : '#f3f4f6',
                                color: splitWith.includes(person) ? 'var(--clr-primary)' : '#6b7280',
                                fontWeight: splitWith.includes(person) ? 'bold' : 'normal'
                            }}
                        >
                            {person} {splitWith.includes(person) && '✓'}
                        </button>
                    ))}
                </div>

                {/* תצוגת חלוקה */}
                {splitWith.length > 0 && expense.amount && (
                    <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: '#eff6ff', borderColor: '#3b82f6' }}>
                        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--clr-primary)' }}>
                            {t.equalSplit}
                        </p>
                        <div className="space-y-2">
                            {splitWith.map(person => (
                                <div key={person} className="flex justify-between items-center text-sm">
                                    <span className="font-medium">{person}</span>
                                    <span className="font-bold" style={{ color: 'var(--clr-primary)' }}>
                                        {getCurrencySymbol(currency)}{(parseFloat(expense.amount || 0) / splitWith.length).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 pt-3 border-t" style={{ borderColor: '#3b82f6' }}>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span>{t.total}</span>
                                <span style={{ color: 'var(--clr-primary)' }}>
                                    {getCurrencySymbol(currency)}{parseFloat(expense.amount || 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                        {expense.paidBy === expenseService.getCurrentUser() && !expense.paidWithCard && (
                            <div className="mt-3 pt-3 border-t" style={{ borderColor: '#3b82f6' }}>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold" style={{ color: '#dc2626' }}>
                                        {t.iPaidCash}
                                    </span>
                                    <span className="font-bold text-lg" style={{ color: '#dc2626' }}>
                                        {getCurrencySymbol(currency)}{parseFloat(expense.amount || 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* שולם בכרטיס */}
            <div className="mt-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={expense.paidWithCard}
                        onChange={(e) => onChange({ ...expense, paidWithCard: e.target.checked })}  // ✅ onChange!
                    />
                    {t.paidWithCard}
                </label>
            </div>

            {/* כפתורים */}
            <div className="mt-6 flex gap-4">
                <button
                    onClick={onSave}  // ✅ רק כאן onSave!
                    className="px-6 py-3 rounded-lg"
                    style={{ backgroundColor: 'var(--clr-primary)', color: 'white' }}
                >
                    {isEditing ? t.saveChanges : t.addExpense}
                </button>
                <button
                    onClick={onCancel}
                    className="px-6 py-3 border rounded-lg"
                >
                    {t.cancel}
                </button>
            </div>
        </div>
    )
}