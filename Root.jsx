const { useState } = React

// ייבוא קומפוננטות
import { Header } from './cmps/Header.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { GalleryPage } from './pages/GalleryPage.jsx'
import { BudgetPage } from './pages/BudgetPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'

// 📱 App ראשי
export function App() {
    const [page, setPage] = useState('home')
    const [language, setLanguage] = useState('en')

    return (
        <div className="app">
            {/* Header - רק בעמודים שאינם דף הבית */}
            {page !== 'home' && (
                <Header
                    currentPage={page}
                    setPage={setPage}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}

            {/* תוכן העמוד */}
            <main>
                {page === 'home' && (
                    <HomePage
                        setPage={setPage}
                        language={language}
                        setLanguage={setLanguage}
                    />
                )}
                {page === 'budget' && (
                    <BudgetPage
                        setPage={setPage}
                        language={language}
                        setLanguage={setLanguage}
                    />
                )}
                {page === 'gallery' && (
                    <GalleryPage
                        setPage={setPage}
                        language={language}
                        setLanguage={setLanguage}
                    />
                )}
                {page === 'profile' && (
                    <ProfilePage
                        setPage={setPage}
                        language={language}
                        setLanguage={setLanguage}
                    />
                )}
            </main>
        </div>
    )
}