// 📸 דף גלריה
export function GalleryPage({ setPage, language, setLanguage }) {
    const translations = {
        en: {
            title: 'Trip Gallery',
            subtitle: 'Memories from our Georgia Adventure',
            uploadPhoto: 'Upload Photo',
            noPhotos: 'No photos yet',
            beFirst: 'Be the first to share a memory from your trip!',
            uploadFirst: 'Upload First Photo',
            footerTitle: 'Georgia Trip Tracker',
            footerDesc: 'Making group travel expenses simple and memories lasting.',
            home: 'Home',
            gallery: 'Gallery',
            budget: 'Budget',
            copyright: '© 2024 Georgia Trip Tracker. Built for amazing adventures.'
        },
        he: {
            title: 'גלריית הטיול',
            subtitle: 'זיכרונות מההרפתקה שלנו בגאורגיה',
            uploadPhoto: 'העלה תמונה',
            noPhotos: 'עדיין אין תמונות',
            beFirst: 'היה הראשון לשתף זיכרון מהטיול שלך!',
            uploadFirst: 'העלה תמונה ראשונה',
            footerTitle: 'מעקב טיול גאורגיה',
            footerDesc: 'הופכים הוצאות טיולים קבוצתיים לפשוטות וזיכרונות לנצחיים.',
            home: 'בית',
            gallery: 'גלריה',
            budget: 'תקציב',
            copyright: '© 2024 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.'
        }
    }

    const t = translations[language]

    return (
        <div className="min-h-screen bg-white">
            <div className="py-12" style={{ backgroundColor: 'var(--clr-bg-dark)' }}>
                <div className="max-w-7xl mx-auto px-4 text-white">
                    <h1
                        className="text-4xl font-bold mb-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {t.title}
                    </h1>
                    <p style={{ color: 'var(--clr-text-light)', fontFamily: 'var(--font-body)' }}>
                        {t.subtitle}
                    </p>
                </div>
            </div>

            {/* כפתור העלאה */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <button
                    className="flex items-center gap-2 px-6 py-3 rounded-lg transition"
                    style={{
                        backgroundColor: 'var(--clr-primary)',
                        color: 'white',
                        fontFamily: 'var(--font-body)'
                    }}
                >
                    <span>↑</span>
                    {t.uploadPhoto}
                </button>
            </div>

            {/* תוכן ריק */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-6">📸</div>
                    <h2
                        className="text-2xl font-bold mb-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {t.noPhotos}
                    </h2>
                    <p
                        className="text-gray-600 mb-6"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {t.beFirst}
                    </p>
                    <button
                        className="flex items-center gap-2 px-6 py-3 rounded-lg"
                        style={{
                            backgroundColor: 'var(--clr-primary)',
                            color: 'white',
                            fontFamily: 'var(--font-body)'
                        }}
                    >
                        <span>↑</span>
                        {t.uploadFirst}
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 mt-auto" style={{ backgroundColor: 'var(--clr-bg-cream)' }}>
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
                            <button onClick={() => setPage('home')} className="hover:underline">{t.home}</button>
                            <button onClick={() => setPage('gallery')} className="hover:underline">{t.gallery}</button>
                            <button onClick={() => setPage('budget')} className="hover:underline">{t.budget}</button>
                        </div>
                    </div>

                    <div
                        className="mt-6 pt-6 border-t text-center text-sm text-gray-600"
                        style={{ borderColor: 'var(--clr-primary)', fontFamily: 'var(--font-body)' }}
                    >
                        {t.copyright}
                    </div>
                </div>
            </footer>
        </div>
    )
}