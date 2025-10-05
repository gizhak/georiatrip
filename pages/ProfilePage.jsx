// 👤 דף פרופיל
export function ProfilePage({ setPage, language, setLanguage }) {
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
            tripPreferencesDesc: 'החשבון שלך מוגדר לטיול הרפתקת גאורגיה 2024. כל ההוצאות והתמונות שלך משוייכים אוטומטית לטיול זה.',
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

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--clr-bg-cream)' }} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
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
                {/* Profile Information */}
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

                {/* Quick Actions */}
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
                                <span className="text-3xl"></span>
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
                                <span className="text-3xl"></span>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">{t.tripGallery}</h4>
                                    <p className="text-sm text-gray-600">{t.tripGalleryDesc}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t.accountSettings}
                    </h3>

                    <div className="mb-6">
                        <h4 className="font-bold mb-2">{t.tripPreferences}</h4>
                        <p className="text-sm text-gray-600">{t.tripPreferencesDesc}</p>
                    </div>

                    <div className="pt-6 border-t">
                        <h4 className="font-bold text-red-600 mb-2">{t.signOut}</h4>
                        <p className="text-sm text-gray-600 mb-4">{t.signOutDesc}</p>
                        <button
                            onClick={() => setPage('home')}
                            className="flex items-center gap-2 px-6 py-2 border-2 border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                        >
                            <span>↪</span>
                            {t.signOutButton}
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
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