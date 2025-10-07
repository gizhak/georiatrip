const { useState } = React
import { SignInModal } from '../cmps/SignInModal.jsx'

export function HomePage({ setPage, language, setLanguage, user, setUser }) {
    const [showSignIn, setShowSignIn] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const translations = {
        en: {
            homeNav: 'Home',
            budgetNav: 'Budget',
            galleryNav: 'Gallery',
            signIn: 'Sign In',
            title: 'Track your adventure expenses with friends',
            subtitle: 'Manage your group budget, split expenses fairly, and keep memories alive with our comprehensive trip tracking platform designed for your Georgia adventure.',
            signInButton: 'Sign In to Your Trip',
            galleryButton: 'View Trip Gallery',
            browsePhotos: 'Want to browse photos without signing in?',
            tripFeatures: 'TRIP FEATURES',
            featuresTitle: 'Everything you need for group travel',
            budgetTitle: 'Budget Tracking',
            budgetDesc: 'Monitor your initial budget, track daily expenses, and see real-time spending across your entire Georgia adventure.',
            shareTitle: 'Expense Sharing',
            shareDesc: 'Split costs fairly among friends, track credit card expenses, and ensure everyone pays their fair share.',
            photoTitle: 'Photo Gallery',
            photoDesc: 'Upload and share trip memories with your group. Access photos anytime, even without logging in.',
            footerTitle: 'Georgia Trip Tracker',
            footerDesc: 'Making group travel expenses simple and memories lasting.',
            copyright: '© 2024 Georgia Trip Tracker. Built for amazing adventures.',
            home: 'Home',
            gallery: 'Gallery',
            budget: 'Budget'
        },
        he: {
            homeNav: 'בית',
            budgetNav: 'תקציב',
            galleryNav: 'גלריה',
            signIn: 'התחבר',
            title: 'עקוב אחרי הוצאות ההרפתקה שלך עם חברים',
            subtitle: 'נהל את תקציב הקבוצה, חלק הוצאות בצורה הוגנת, ושמור זיכרונות חיים עם פלטפורמת מעקב הטיולים המקיפה שלנו.',
            signInButton: 'התחבר לטיול שלך',
            galleryButton: 'צפה בגלריית הטיול',
            browsePhotos: 'רוצה לדפדף בתמונות בלי להתחבר?',
            tripFeatures: 'תכונות הטיול',
            featuresTitle: 'כל מה שאתה צריך לטיול קבוצתי',
            budgetTitle: 'מעקב תקציב',
            budgetDesc: 'עקוב אחר התקציב ההתחלתי שלך, עקוב אחר הוצאות יומיות וראה הוצאות בזמן אמת לאורך כל ההרפתקה שלך בגאורגיה.',
            shareTitle: 'חלוקת הוצאות',
            shareDesc: 'חלק עלויות בצורה הוגנת בין חברים, עקוב אחר הוצאות כרטיס אשראי ווודא שכולם משלמים את החלק ההוגן שלהם.',
            photoTitle: 'גלריית תמונות',
            photoDesc: 'העלה ושתף זיכרונות טיול עם הקבוצה שלך. גישה לתמונות בכל עת, אפילו בלי להתחבר.',
            footerTitle: 'מעקב טיול גאורגיה',
            footerDesc: 'הופכים הוצאות טיולים קבוצתיים לפשוטות וזיכרונות לנצחיים.',
            copyright: '© 2024 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.',
            home: 'בית',
            gallery: 'גלריה',
            budget: 'תקציב'
        }
    }

    const t = translations[language]

    const handleSignIn = (name) => {
        setUser({ name }) // ✅ שמור את המשתמש
        setPage('budget')
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--clr-bg-dark)' }}>
            {/* Header רספונסיבי */}
            {/* Header רספונסיבי */}
            <header className="bg-transparent absolute top-0 left-0 right-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* לוגו */}
                        <div className="flex items-center gap-2">
                            <div
                                className="w-10 h-10 rounded flex items-center justify-center font-bold"
                                style={{ backgroundColor: 'var(--clr-secondary)', color: 'var(--clr-primary)', fontFamily: 'var(--font-heading)' }}
                            >
                                GT
                            </div>
                            <span className="font-semibold text-base sm:text-lg text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                Georgia Trip
                            </span>
                        </div>

                        {/* ניווט דסקטופ */}
                        <nav className="hidden md:flex gap-4 lg:gap-6 text-white" style={{ fontFamily: 'var(--font-body)' }}>
                            <button onClick={() => setPage('home')} className="font-bold hover:text-gray-300">
                                {t.homeNav}
                            </button>
                            <button onClick={() => setPage('budget')} className="hover:text-gray-300">
                                {t.budgetNav}
                            </button>
                            <button onClick={() => setPage('gallery')} className="hover:text-gray-300">
                                {t.galleryNav}
                            </button>
                        </nav>

                        {/* כפתורים */}
                        <div className="flex gap-2 sm:gap-3 items-center">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                                className="px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded"
                                style={{
                                    borderColor: 'var(--clr-secondary)',
                                    color: 'var(--clr-secondary)',
                                    fontFamily: 'var(--font-body)'
                                }}
                            >
                                {language === 'en' ? 'עב' : 'EN'}
                            </button>

                            {/* ✅ הצג את השם או כפתור Sign In */}
                            {user ? (
                                <button
                                    onClick={() => setPage('profile')}
                                    className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded text-sm sm:text-base"
                                    style={{
                                        backgroundColor: 'var(--clr-secondary)',
                                        color: 'var(--clr-primary)',
                                        fontFamily: 'var(--font-body)'
                                    }}
                                >
                                    <span>👤</span>
                                    <span className="hidden sm:inline">{user.name}</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowSignIn(true)}
                                    className="px-4 sm:px-6 py-2 rounded text-sm sm:text-base"
                                    style={{
                                        backgroundColor: 'var(--clr-secondary)',
                                        color: 'var(--clr-primary)',
                                        fontFamily: 'var(--font-body)'
                                    }}
                                >
                                    {t.signIn}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section רספונסיבי */}
            <div className="flex items-center justify-center min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto w-full">
                    {/* תמונה - מוסתרת במובייל, נראית בטאבלט ומעלה */}
                    <div className="hidden md:block order-1 lg:order-1">
                        <img
                            src="https://static.wixstatic.com/media/439555_26f790edc1944f88b866b026e77b3c15~mv2.png/v1/fill/w_580,h_1150,al_c,q_90,enc_auto/439555_26f790edc1944f88b866b026e77b3c15~mv2.png"
                            alt="Georgia landscape"
                            className="rounded-lg shadow-2xl w-full h-auto object-cover min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
                        />
                    </div>

                    {/* תוכן */}
                    <div className="text-white order-2 lg:order-2">
                        <p
                            className="text-xs sm:text-sm uppercase tracking-wide mb-3"
                            style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}
                        >
                            GEORGIA TRIP TRACKER
                        </p>

                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            {t.title}
                        </h1>

                        <p
                            className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed"
                            style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}
                        >
                            {t.subtitle}
                        </p>

                        {/* כפתורי פעולה - מותאם למובייל */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => setShowSignIn(true)}
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-lg transition hover:opacity-90 text-sm sm:text-base"
                                style={{
                                    backgroundColor: 'var(--clr-secondary)',
                                    color: 'var(--clr-primary)',
                                    fontFamily: 'var(--font-body)'
                                }}
                            >
                                {t.signInButton}
                            </button>
                            <button
                                onClick={() => setPage('gallery')}
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-lg border-2 transition hover:bg-white hover:text-green-900 text-sm sm:text-base"
                                style={{
                                    borderColor: 'var(--clr-secondary)',
                                    color: 'var(--clr-secondary)',
                                    fontFamily: 'var(--font-body)'
                                }}
                            >
                                {t.galleryButton}
                            </button>
                        </div>

                        <p
                            className="mt-4 sm:mt-6 text-xs sm:text-sm"
                            style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}
                        >
                            {t.browsePhotos}
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section רספונסיבי */}
            <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--clr-bg-cream)' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 uppercase tracking-wide">
                            {t.tripFeatures}
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.featuresTitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                {t.budgetTitle}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                {t.budgetDesc}
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                {t.shareTitle}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                {t.shareDesc}
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg sm:col-span-2 lg:col-span-1">
                            <div className="text-4xl mb-4">📸</div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                {t.photoTitle}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                                {t.photoDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer רספונסיבי */}
            <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--clr-bg-cream)' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="font-bold text-base sm:text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                {t.footerTitle}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-700">
                                {t.footerDesc}
                            </p>
                        </div>
                        <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                            <button onClick={() => setPage('home')} className="hover:underline">{t.home}</button>
                            <button onClick={() => setPage('gallery')} className="hover:underline">{t.gallery}</button>
                            <button onClick={() => setPage('budget')} className="hover:underline">{t.budget}</button>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm text-gray-600" style={{ borderColor: 'var(--clr-primary)' }}>
                        {t.copyright}
                    </div>
                </div>
            </footer>

            {/* Modal התחברות */}
            <SignInModal
                isOpen={showSignIn}
                onClose={() => setShowSignIn(false)}
                language={language}
                onSignIn={handleSignIn}
            />
        </div>
    )
}