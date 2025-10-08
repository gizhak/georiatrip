const { useState, useEffect } = React

// ייבוא קומפוננטות
import { Header } from './cmps/Header.jsx'
import { Toast } from './cmps/Toast.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { GalleryPage } from './pages/GalleryPage.jsx'
import { BudgetPage } from './pages/BudgetPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { utilService } from './services/util.service.js'

// 📱 App ראשי
export function App() {
    const [page, setPage] = useState('home')
    const [language, setLanguage] = useState('en')

    // 🎉 מערכת Toast
    const [toast, setToast] = useState(null)

    // ✅ טוען את המשתמש מ-localStorage בטעינה ראשונית
    const [user, setUser] = useState(() => {
        return utilService.loadFromStorage('currentUser') || null
    })

    // ✅ שומר את המשתמש ב-localStorage כל פעם שהוא משתנה
    useEffect(() => {
        if (user) {
            utilService.saveToStorage('currentUser', user)
        } else {
            localStorage.removeItem('currentUser')
        }
    }, [user])

    // 🎉 פונקציה להצגת Toast
    const showToast = (message, type = 'info', duration = 3000) => {
        setToast({ message, type, duration })
    }

    // ✅ פונקציה מותאמת ל-setPage עם הגנה על דפים מוגנים
    const navigateToPage = (pageName) => {
        // דפים שדורשים התחברות
        const protectedPages = ['budget', 'gallery', 'profile']

        if (protectedPages.includes(pageName) && !user) {
            // הצגת הודעה יפה במקום alert
            showToast(
                language === 'en'
                    ? '⚠️ Please sign in to access this page'
                    : '⚠️ נא להתחבר כדי לגשת לדף זה',
                'warning',
                4000
            )
            setPage('home')
            return
        }

        setPage(pageName)
    }

    return (
        <div className="app">
            {/* 🎉 Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Header - רק בעמודים שאינם דף הבית */}
            {page !== 'home' && (
                <Header
                    currentPage={page}
                    setPage={navigateToPage}
                    language={language}
                    setLanguage={setLanguage}
                    user={user}
                    setUser={setUser}
                />
            )}

            {/* תוכן העמוד */}
            <main>
                {page === 'home' && (
                    <HomePage
                        setPage={navigateToPage}
                        language={language}
                        setLanguage={setLanguage}
                        user={user}
                        setUser={setUser}
                        showToast={showToast}
                    />
                )}
                {page === 'budget' && user && (
                    <BudgetPage
                        setPage={navigateToPage}
                        language={language}
                        setLanguage={setLanguage}
                        user={user}
                        setUser={setUser}
                        showToast={showToast}
                    />
                )}
                {page === 'gallery' && user && (
                    <GalleryPage
                        setPage={navigateToPage}
                        language={language}
                        setLanguage={setLanguage}
                        user={user}
                        setUser={setUser}
                        showToast={showToast}
                    />
                )}
                {page === 'profile' && user && (
                    <ProfilePage
                        setPage={navigateToPage}
                        language={language}
                        setLanguage={setLanguage}
                        user={user}
                        setUser={setUser}
                        showToast={showToast}
                    />
                )}
            </main>
        </div>
    )
}