const { useState } = React

// ייבוא קומפוננטות
import { Header } from './cmps/Header.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { GalleryPage } from './pages/GalleryPage.jsx'
import { BudgetPage } from './pages/BudgetPage.jsx'

// 📱 App ראשי
export function App() {
    const [page, setPage] = useState('home')
    const [language, setLanguage] = useState('en') // ניהול שפה גלובלי

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

            {/* תוכן העמוד - כל עמוד מקבל את setPage + language */}
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
            </main>
        </div>
    )
}