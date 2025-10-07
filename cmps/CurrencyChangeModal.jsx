const { useState } = React

export function CurrencyChangeModal({ isOpen, onClose, onConfirm, oldCurrency, newCurrency, language }) {
    const [action, setAction] = useState('convert') // 'convert' או 'reset'

    const translations = {
        en: {
            title: 'Change Currency',
            warning: 'You have existing expenses in',
            question: 'What would you like to do?',
            convertOption: 'Convert existing expenses',
            convertDesc: 'All expenses will be converted to the new currency using exchange rates',
            resetOption: 'Reset all data',
            resetDesc: 'Delete all expenses and start fresh with the new currency',
            warningReset: '⚠️ Warning: This action cannot be undone!',
            cancel: 'Cancel',
            confirm: 'Confirm'
        },
        he: {
            title: 'שינוי מטבע',
            warning: 'יש לך הוצאות קיימות ב',
            question: 'מה תרצה לעשות?',
            convertOption: 'המר הוצאות קיימות',
            convertDesc: 'כל ההוצאות יומרו למטבע החדש לפי שערי החליפין',
            resetOption: 'אפס את כל הנתונים',
            resetDesc: 'מחק את כל ההוצאות והתחל מחדש עם המטבע החדש',
            warningReset: '⚠️ אזהרה: פעולה זו לא ניתנת לביטול!',
            cancel: 'ביטול',
            confirm: 'אישור'
        }
    }

    const t = translations[language]

    if (!isOpen) return null

    const handleConfirm = () => {
        onConfirm(action)
        onClose()
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-8 max-w-lg w-full mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t.title}
                </h2>

                <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <p className="text-center text-gray-700">
                        {t.warning} <strong>{oldCurrency}</strong>
                    </p>
                    <p className="text-center text-gray-600 mt-2">
                        {t.question}
                    </p>
                </div>

                <div className="space-y-4 mb-6">
                    {/* אפשרות 1: המרה */}
                    <label
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition ${action === 'convert'
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-green-300'
                            }`}
                    >
                        <input
                            type="radio"
                            name="action"
                            value="convert"
                            checked={action === 'convert'}
                            onChange={(e) => setAction(e.target.value)}
                            className="mr-3"
                        />
                        <span className="font-bold text-lg">{t.convertOption}</span>
                        <p className="text-sm text-gray-600 mt-1 ml-6">{t.convertDesc}</p>
                        <p className="text-xs text-gray-500 mt-2 ml-6">
                            {oldCurrency} → {newCurrency}
                        </p>
                    </label>

                    {/* אפשרות 2: איפוס */}
                    <label
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition ${action === 'reset'
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-red-300'
                            }`}
                    >
                        <input
                            type="radio"
                            name="action"
                            value="reset"
                            checked={action === 'reset'}
                            onChange={(e) => setAction(e.target.value)}
                            className="mr-3"
                        />
                        <span className="font-bold text-lg text-red-600">{t.resetOption}</span>
                        <p className="text-sm text-gray-600 mt-1 ml-6">{t.resetDesc}</p>
                        {action === 'reset' && (
                            <p className="text-sm font-bold text-red-600 mt-2 ml-6">
                                {t.warningReset}
                            </p>
                        )}
                    </label>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        {t.cancel}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 px-6 py-3 rounded-lg text-white font-semibold transition"
                        style={{
                            backgroundColor: action === 'reset' ? '#dc2626' : 'var(--clr-primary)'
                        }}
                    >
                        {t.confirm}
                    </button>
                </div>
            </div>
        </div>
    )
}