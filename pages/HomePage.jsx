// 📄 דף הבית
export function HomePage({ setPage, language, setLanguage }) {
    const translations = {
        en: {
            homeNav: ' Home',
            budgetNav: ' Budget',
            galleryNav: ' Gallery',
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
            footerCopyright: '© 2025 Georgia Trip Tracker. Built for amazing adventures.'
        },
        he: {
            homeNav: ' בית',
            budgetNav: ' תקציב',
            galleryNav: ' גלריה',
            signIn: 'התחבר',
            title: 'עקוב אחרי הוצאות ההרפתקה שלך עם חברים',
            subtitle: 'נהל את תקציב הקבוצה, חלק הוצאות בצורה הוגנת, ושמור זיכרונות חיים עם פלטפורמת מעקב הטיולים המקיפה שלנו המיועדת להרפתקה שלך בגאורגיה.',
            signInButton: 'התחבר לטיול שלך',
            galleryButton: 'צפה בגלריית הטיול',
            browsePhotos: 'רוצה לדפדף בתמונות בלי להתחבר?',
            tripFeatures: 'תכונות הטיול',
            featuresTitle: 'כל מה שאתה צריך לטיול קבוצתי',
            budgetTitle: 'מעקב תקציב',
            budgetDesc: 'עקוב אחר התקציב ההתחלתי שלך, עקוב אחר הוצאות יומיות וראה הוצאות בזמן אמת לאורך כל ההרפתקה שלך בגאורגיה.',
            shareTitle: 'חלוקת הוצאות',
            shareDesc: 'חלק עלויות בצורה הוגנת בין חברים, עקוב אחר הוצאות כרטיס אשראי וודא שכולם משלמים את החלק ההוגן שלהם.',
            photoTitle: 'גלריית תמונות',
            photoDesc: 'העלה ושתף זיכרונות טיול עם הקבוצה שלך. גישה לתמונות בכל עת, אפילו בלי להתחבר.',
            footerTitle: 'מעקב טיול גאורגיה',
            footerDesc: 'הופכים הוצאות טיולים קבוצתיים לפשוטות וזיכרונות לנצחיים.',
            footerCopyright: '© 2025 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.'
        }
    }

    const t = translations[language]

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--clr-bg-dark)' }}>
            {/* Header עליון - גם בדף הבית! */}
            <header className="bg-transparent absolute top-0 left-0 right-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    {/* לוגו */}
                    <div className="flex items-center gap-2">
                        <div
                            className="w-10 h-10 rounded flex items-center justify-center font-bold"
                            style={{ backgroundColor: 'var(--clr-secondary)', color: 'var(--clr-primary)', fontFamily: 'var(--font-heading)' }}
                        >
                            GT
                        </div>
                        <span className="font-semibold text-lg text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                            Georgia Trip
                        </span>
                    </div>

                    {/* ניווט */}
                    <nav className="flex gap-6 text-white" style={{ fontFamily: 'var(--font-body)' }}>
                        <button onClick={() => setPage('home')} className="font-bold">
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
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                            className="px-4 py-2 text-sm border rounded"
                            style={{
                                borderColor: 'var(--clr-secondary)',
                                color: 'var(--clr-secondary)',
                                fontFamily: 'var(--font-body)'
                            }}
                        >
                            {language === 'en' ? 'HE' : 'EN'}
                        </button>
                        <button
                            className="px-6 py-2 rounded"
                            style={{
                                backgroundColor: 'var(--clr-secondary)',
                                color: 'var(--clr-primary)',
                                fontFamily: 'var(--font-body)'
                            }}
                        >
                            {t.signIn}
                        </button>
                    </div>
                </div>
            </header>

            {/* תוכן מרכזי */}
            <div className="flex items-center justify-center min-h-screen pt-20">
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-4">

                    {/* צד שמאל - תמונה */}
                    <div className="hidden md:block">
                        <img
                            src="https://static.wixstatic.com/media/439555_26f790edc1944f88b866b026e77b3c15~mv2.png/v1/fill/w_580,h_1150,al_c,q_90,enc_auto/439555_26f790edc1944f88b866b026e77b3c15~mv2.png"
                            alt="Georgia landscape"
                            className="rounded-lg shadow-2xl w-full object-cover"
                            style={{ maxHeight: '100%', width: '100%' }}
                        />
                    </div>

                    {/* צד ימין - טקסט וכפתורים */}
                    <div className="text-white">
                        <p
                            className="text-sm uppercase tracking-wide mb-3"
                            style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}
                        >
                            GEORGIA TRIP TRACKER
                        </p>

                        <h1
                            className="text-5xl font-bold mb-6 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            {t.title}
                        </h1>

                        <p
                            className="text-xl mb-8 leading-relaxed"
                            style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}
                        >
                            {t.subtitle}
                        </p>

                        {/* כפתורי פעולה - עכשיו עם onClick! */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setPage('budget')}
                                className="px-8 py-4 font-semibold rounded-lg transition hover:opacity-90"
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
                                className="px-8 py-4 font-semibold rounded-lg border-2 transition hover:bg-white hover:text-green-900"
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
                            className="mt-6 text-sm"
                            style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}
                        >
                            {t.browsePhotos}
                        </p>
                    </div>
                </div>
            </div>

            {/* תכונות המערכת */}
            <div className="py-16" style={{ backgroundColor: 'var(--clr-bg-cream)' }}>
                <div className="max-w-6xl mx-auto px-4">
                    <p
                        className="text-center text-sm uppercase tracking-wide mb-3"
                        style={{ color: 'var(--clr-primary)', fontFamily: 'var(--font-body)' }}
                    >
                        {t.tripFeatures}
                    </p>
                    <h2
                        className="text-3xl font-bold text-center mb-12"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-accent)' }}
                    >
                        {t.featuresTitle}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* תכונה 1 */}
                        <div>
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                style={{ backgroundColor: 'var(--clr-primary)' }}
                            >
                                <span className="text-white text-2xl">💵</span>
                            </div>
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {t.budgetTitle}
                            </h3>
                            <p
                                className="text-gray-700"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {t.budgetDesc}
                            </p>
                        </div>

                        {/* תכונה 2 */}
                        <div>
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                style={{ backgroundColor: 'var(--clr-primary)' }}
                            >
                                <span className="text-white text-2xl">👥</span>
                            </div>
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {t.shareTitle}
                            </h3>
                            <p
                                className="text-gray-700"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {t.shareDesc}
                            </p>
                        </div>

                        {/* תכונה 3 */}
                        <div>
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                style={{ backgroundColor: 'var(--clr-primary)' }}
                            >
                                <span className="text-white text-2xl">📸</span>
                            </div>
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {t.photoTitle}
                            </h3>
                            <p
                                className="text-gray-700"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {t.photoDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer תחתון */}
            <footer className="py-8" style={{ backgroundColor: 'var(--clr-bg-cream)' }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3
                                className="font-bold text-lg mb-1"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {t.footerTitle}
                            </h3>
                            <p
                                className="text-sm text-gray-700"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {t.footerDesc}
                            </p>
                        </div>

                        <div
                            className="flex gap-6 text-sm"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            <button onClick={() => setPage('home')} className="hover:underline">{t.homeNav}</button>
                            <button onClick={() => setPage('gallery')} className="hover:underline">{t.galleryNav}</button>
                            <button onClick={() => setPage('budget')} className="hover:underline">{t.budgetNav}</button>
                        </div>
                    </div>

                    <div
                        className="mt-6 pt-6 border-t text-center text-sm text-gray-600"
                        style={{ borderColor: 'var(--clr-primary)', fontFamily: 'var(--font-body)' }}
                    >
                        {t.footerCopyright}
                    </div>
                </div>
            </footer>
        </div>
    )
}