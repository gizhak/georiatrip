const { useState, useEffect } = React
import { utilService } from '../services/util.service.js'
import { CurrencyChangeModal } from '../cmps/CurrencyChangeModal.jsx'

export function ProfilePage({ setPage, language, setLanguage, user, setUser }) {
    const [selectedCurrency, setSelectedCurrency] = useState('GEL')
    const [showCurrencyModal, setShowCurrencyModal] = useState(false)
    const [pendingCurrency, setPendingCurrency] = useState(null)

    useEffect(() => {
        const savedCurrency = utilService.loadFromStorage('userCurrency')
        if (savedCurrency) setSelectedCurrency(savedCurrency)
    }, [])

    const translations = {
        en: {
            title: 'Profile',
            subtitle: 'Manage your trip account',
            profileInfo: 'Profile Information',
            userName: 'Guy Izhak',
            email: 'decoding.c.t@gmail.com',
            verified: 'Verified',
            memberSince: 'Member since 5.10.2025',
            lastLogin: 'Last login: 5.10.2025',
            approved: 'APPROVED',
            quickActions: 'Quick Actions',
            viewBudget: 'View Budget',
            viewBudgetDesc: 'Track expenses and balances',
            tripGallery: 'Trip Gallery',
            tripGalleryDesc: 'View and upload photos',
            accountSettings: 'Account Settings',
            tripPreferences: 'Trip Preferences',
            tripPreferencesDesc: 'Your account is set up for the Georgia Adventure 2024 trip. All your expenses and photos are automatically associated with this trip.',
            currencyPreference: 'Currency Preference',
            currencyPreferenceDesc: 'Choose your preferred currency for the budget tracker. This will update all financial displays.',
            selectCurrency: 'Select Currency',
            saveCurrency: 'Save Currency',
            currencySaved: 'Currency preference saved successfully!',
            signOut: 'Sign Out',
            signOutDesc: 'Sign out of your account. You can always sign back in to access your trip data.',
            signOutButton: 'Sign Out',
            footerTitle: 'Georgia Trip Tracker',
            footerDesc: 'Making group travel expenses simple and memories lasting.',
            home: 'Home',
            gallery: 'Gallery',
            budget: 'Budget',
            copyright: '© 2025 Georgia Trip Tracker. Built for amazing adventures.'
        },
        he: {
            title: 'פרופיל',
            subtitle: 'נהל את חשבון הטיול שלך',
            profileInfo: 'מידע פרופיל',
            userName: 'גיא יצחק',
            email: 'decoding.c.t@gmail.com',
            verified: 'מאומת',
            memberSince: 'חבר מאז 5.10.2025',
            lastLogin: 'כניסה אחרונה: 5.10.2025',
            approved: 'מאושר',
            quickActions: 'פעולות מהירות',
            viewBudget: 'צפה בתקציב',
            viewBudgetDesc: 'עקוב אחרי הוצאות ומאזנים',
            tripGallery: 'גלריית טיול',
            tripGalleryDesc: 'צפה והעלה תמונות',
            accountSettings: 'הגדרות חשבון',
            tripPreferences: 'העדפות טיול',
            tripPreferencesDesc: 'החשבון שלך מוגדר לטיול הרפתקת גאורגיה 2024. כל ההוצאות והתמונות שלך משויכים אוטומטית לטיול זה.',
            currencyPreference: 'העדפת מטבע',
            currencyPreferenceDesc: 'בחר את המטבע המועדף עליך למעקב התקציב. זה יעדכן את כל התצוגות הכספיות.',
            selectCurrency: 'בחר מטבע',
            saveCurrency: 'שמור מטבע',
            currencySaved: 'העדפת המטבע נשמרה בהצלחה!',
            signOut: 'התנתק',
            signOutDesc: 'התנתק מהחשבון שלך. אתה תמיד יכול להתחבר בחזרה כדי לגשת לנתוני הטיול שלך.',
            signOutButton: 'התנתק',
            footerTitle: 'מעקב טיול גאורגיה',
            footerDesc: 'הופכים הוצאות טיולים קבוצתיים לפשוטות וזיכרונות לנצחיים.',
            home: 'בית',
            gallery: 'גלריה',
            budget: 'תקציב',
            copyright: '© 2025 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.'
        }
    }

    const t = translations[language]
    const isRTL = language === 'he'

    const currencies = [
        { code: 'GEL', name: 'GEL (Georgian Lari)', symbol: '₾' },
        { code: 'USD', name: 'USD (US Dollar)', symbol: '$' },
        { code: 'EUR', name: 'EUR (Euro)', symbol: '€' },
        { code: 'ILS', name: 'ILS (Israeli Shekel)', symbol: '₪' }
    ]

    const handleSaveCurrency = () => {
        const existingExpenses = utilService.loadFromStorage('expenses')
        const existingBudget = utilService.loadFromStorage('budget')

        if ((existingExpenses && existingExpenses.length > 0) || existingBudget > 0) {
            const currentCurrency = utilService.loadFromStorage('userCurrency') || 'GEL'
            if (currentCurrency !== selectedCurrency) {
                setPendingCurrency(selectedCurrency)
                setShowCurrencyModal(true)
                return
            }
        }

        utilService.saveToStorage('userCurrency', selectedCurrency)
        alert(t.currencySaved)
    }

    const handleCurrencyChange = (action) => {
        const exchangeRates = {
            'GEL': 1,
            'USD': 2.7,
            'EUR': 3.2,
            'ILS': 0.73
        }

        const currentCurrency = utilService.loadFromStorage('userCurrency') || 'GEL'

        if (action === 'convert') {
            const expenses = utilService.loadFromStorage('expenses') || []
            const budget = utilService.loadFromStorage('budget') || 0

            const conversionRate = exchangeRates[currentCurrency] / exchangeRates[pendingCurrency]

            const convertedExpenses = expenses.map(exp => ({
                ...exp,
                amount: parseFloat((exp.amount * conversionRate).toFixed(2))
            }))

            const convertedBudget = parseFloat((budget * conversionRate).toFixed(2))

            utilService.saveToStorage('expenses', convertedExpenses)
            utilService.saveToStorage('budget', convertedBudget)
            utilService.saveToStorage('userCurrency', pendingCurrency)

            alert(`${t.currencySaved}\n${expenses.length} expenses converted!`)
        } else if (action === 'reset') {
            utilService.saveToStorage('expenses', [])
            utilService.saveToStorage('budget', 0)
            utilService.saveToStorage('userCurrency', pendingCurrency)

            alert(t.currencySaved)
        }

        setSelectedCurrency(pendingCurrency)
        setPendingCurrency(null)
    }

    // ✅ פונקציה לטיפול ב-Sign Out
    const handleSignOut = () => {
        setUser(null)  // מאפס את המשתמש
        setPage('home')  // חוזר לדף הבית
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--clr-bg-cream)' }} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="py-12" style={{ backgroundColor: 'var(--clr-bg-dark)', paddingTop: '5px' }}>
                <div className="max-w-7xl mx-auto px-4 text-white">
                    <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
                        {t.title}
                    </h1>
                    <p style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}>
                        {t.subtitle}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        <span>👤</span> {t.profileInfo}
                    </h3>
                    <div className="flex items-start gap-6">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                            style={{ backgroundColor: 'var(--clr-primary)' }}
                        >
                            G
                        </div>
                        <div className="flex-1">
                            <h4 className="text-2xl font-bold mb-2">{t.userName}</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                    <span>📧</span> {t.email}
                                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'var(--clr-secondary)', color: 'var(--clr-primary)' }}>
                                        {t.verified}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span>👤</span> {t.userName}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span>📅</span> {t.memberSince}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span>📅</span> {t.lastLogin}
                                </p>
                            </div>
                            <div className="mt-4">
                                <span className="px-4 py-2 rounded font-bold text-white text-sm" style={{ backgroundColor: 'var(--clr-primary)' }}>
                                    {t.approved}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t.quickActions}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setPage('budget')}
                            className="p-6 border-2 rounded-lg text-left hover:shadow-md transition"
                            style={{ borderColor: 'var(--clr-primary)' }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">💰</span>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">{t.viewBudget}</h4>
                                    <p className="text-sm text-gray-600">{t.viewBudgetDesc}</p>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setPage('gallery')}
                            className="p-6 border-2 rounded-lg text-left hover:shadow-md transition"
                            style={{ borderColor: 'var(--clr-primary)' }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">📸</span>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">{t.tripGallery}</h4>
                                    <p className="text-sm text-gray-600">{t.tripGalleryDesc}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t.accountSettings}
                    </h3>

                    <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#f0fdf4', border: '2px solid var(--clr-primary)' }}>
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-3xl">💱</span>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">{t.currencyPreference}</h4>
                                <p className="text-sm text-gray-600 mb-4">{t.currencyPreferenceDesc}</p>

                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                                    <div className="flex-1 w-full">
                                        <label className="block text-sm font-medium mb-2">{t.selectCurrency}</label>
                                        <select
                                            value={selectedCurrency}
                                            onChange={(e) => setSelectedCurrency(e.target.value)}
                                            className="w-full px-4 py-3 border-2 rounded-lg text-lg font-semibold"
                                            style={{ borderColor: 'var(--clr-primary)' }}
                                        >
                                            {currencies.map(curr => (
                                                <option key={curr.code} value={curr.code}>
                                                    {curr.symbol} {curr.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleSaveCurrency}
                                        className="px-6 py-3 rounded-lg font-bold text-white shadow-lg hover:shadow-xl transition"
                                        style={{ backgroundColor: 'var(--clr-primary)' }}
                                    >
                                        {t.saveCurrency}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-bold mb-2">{t.tripPreferences}</h4>
                        <p className="text-sm text-gray-600">{t.tripPreferencesDesc}</p>
                    </div>

                    <div className="pt-6 border-t">
                        <h4 className="font-bold text-red-600 mb-2">{t.signOut}</h4>
                        <p className="text-sm text-gray-600 mb-4">{t.signOutDesc}</p>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-6 py-2 border-2 border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                        >
                            <span>↪</span>
                            {t.signOutButton}
                        </button>
                    </div>
                </div>
            </div>

            <CurrencyChangeModal
                isOpen={showCurrencyModal}
                onClose={() => {
                    setShowCurrencyModal(false)
                    setPendingCurrency(null)
                }}
                onConfirm={handleCurrencyChange}
                oldCurrency={utilService.loadFromStorage('userCurrency') || 'GEL'}
                newCurrency={pendingCurrency}
                language={language}
            />

            <footer className="py-8 mt-8" style={{ backgroundColor: 'var(--clr-bg-cream)' }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                {t.footerTitle}
                            </h3>
                            <p className="text-sm text-gray-700">
                                {t.footerDesc}
                            </p>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <button onClick={() => setPage('home')} className="hover:underline">{t.home}</button>
                            <button onClick={() => setPage('gallery')} className="hover:underline">{t.gallery}</button>
                            <button onClick={() => setPage('budget')} className="hover:underline">{t.budget}</button>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600" style={{ borderColor: 'var(--clr-primary)' }}>
                        {t.copyright}
                    </div>
                </div>
            </footer>
        </div>
    )
}