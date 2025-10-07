const { useState, useEffect } = React
import { utilService } from '../services/util.service.js'

// 📸 דף גלריה - עם שמירה ב-localStorage
export function GalleryPage({ setPage, language, setLanguage }) {
    // ✅ טוען תמונות מ-localStorage בטעינה ראשונית
    const [photos, setPhotos] = useState(() => {
        return utilService.loadFromStorage('galleryPhotos') || []
    })
    const [showUploadModal, setShowUploadModal] = useState(false)

    // ✅ שומר תמונות ב-localStorage כל פעם שהן משתנות
    useEffect(() => {
        utilService.saveToStorage('galleryPhotos', photos)
    }, [photos])

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
            copyright: '© 2025 Georgia Trip Tracker. Built for amazing adventures.',
            photoTitle: 'Photo Title',
            photoTitlePlaceholder: 'Enter photo title...',
            uploadButton: 'Choose Photo',
            cancel: 'Cancel',
            save: 'Save Photo'
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
            copyright: '© 2025 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.',
            photoTitle: 'כותרת תמונה',
            photoTitlePlaceholder: 'הכנס כותרת לתמונה...',
            uploadButton: 'בחר תמונה',
            cancel: 'ביטול',
            save: 'שמור תמונה'
        }
    }

    const t = translations[language]

    // פונקציה לטיפול בהעלאת תמונה
    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const newPhoto = {
                    id: Date.now(),
                    url: event.target.result,
                    title: '',
                    date: new Date().toLocaleDateString()
                }
                setPhotos([newPhoto, ...photos])
                setShowUploadModal(false)
            }
            reader.readAsDataURL(file)
        }
    }

    // פונקציה למחיקת תמונה
    const deletePhoto = (id) => {
        if (confirm(language === 'en' ? 'Delete this photo?' : 'למחוק תמונה זו?')) {
            setPhotos(photos.filter(photo => photo.id !== id))
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="py-12" style={{ backgroundColor: 'var(--clr-bg-dark)', paddingTop: '120px' }}>
                <div className="max-w-7xl mx-auto px-4 text-white">
                    <h1
                        className="text-4xl font-bold mb-2"
                        style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}
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
                <label htmlFor="photoUpload">
                    <div
                        className="flex items-center gap-2 px-6 py-3 rounded-lg transition cursor-pointer inline-flex"
                        style={{
                            backgroundColor: 'var(--clr-primary)',
                            color: 'white',
                            fontFamily: 'var(--font-body)'
                        }}
                    >
                        <span>↑</span>
                        {t.uploadPhoto}
                    </div>
                </label>
                <input
                    type="file"
                    id="photoUpload"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
            </div>

            {/* תוכן - תמונות או ריק */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {photos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-20">
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
                        <label htmlFor="photoUpload">
                            <div
                                className="flex items-center gap-2 px-6 py-3 rounded-lg cursor-pointer inline-flex"
                                style={{
                                    backgroundColor: 'var(--clr-primary)',
                                    color: 'white',
                                    fontFamily: 'var(--font-body)'
                                }}
                            >
                                <span>↑</span>
                                {t.uploadFirst}
                            </div>
                        </label>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {photos.map(photo => (
                            <div key={photo.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                <div className="relative group">
                                    <img
                                        src={photo.url}
                                        alt={photo.title || 'Trip photo'}
                                        className="w-full h-64 object-cover"
                                    />
                                    <button
                                        onClick={() => deletePhoto(photo.id)}
                                        className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-gray-500">{photo.date}</p>
                                    <p className="font-semibold">{photo.title || 'Untitled'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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