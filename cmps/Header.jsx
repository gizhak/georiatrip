const { useState } = React
import { SignInModal } from './SignInModal.jsx'

export function Header({ currentPage, setPage, language, setLanguage, user, setUser }) {
    const [showSignIn, setShowSignIn] = useState(false)

    const handleSignIn = (name) => {
        setUser({ name })
        // המודאל כבר סוגר את עצמו
    }

    return (
        <div>
            <header className="sticky top-0 left-0 right-0 z-50 transition-all">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between backdrop-blur-md bg-opacity-95"
                    style={{ backgroundColor: 'var(--clr-bg-dark)', maxWidth: '150rem', rem: '10px' }}>
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
                        <button
                            onClick={() => setPage('home')}
                            className={currentPage === 'home' ? 'font-bold' : 'hover:text-gray-300'}
                        >
                            {language === 'en' ? 'Home' : 'בית'}
                        </button>
                        <button
                            onClick={() => setPage('budget')}
                            className={currentPage === 'budget' ? 'font-bold' : 'hover:text-gray-300'}
                        >
                            {language === 'en' ? 'Budget' : 'תקציב'}
                        </button>
                        <button
                            onClick={() => setPage('gallery')}
                            className={currentPage === 'gallery' ? 'font-bold' : 'hover:text-gray-300'}
                        >
                            {language === 'en' ? 'Gallery' : 'גלריה'}
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
                            {language === 'en' ? 'עב' : 'EN'}
                        </button>

                        {user ? (
                            <button
                                onClick={() => setPage('profile')}
                                className="flex items-center gap-2 px-4 py-2 rounded hover:opacity-80 transition"
                                style={{
                                    backgroundColor: 'var(--clr-secondary)',
                                    color: 'var(--clr-primary)',
                                    fontFamily: 'var(--font-body)'
                                }}
                            >
                                <span>👤</span>
                                <span>{user.name}</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowSignIn(true)}
                                className="px-4 py-2 rounded"
                                style={{
                                    backgroundColor: 'var(--clr-secondary)',
                                    color: 'var(--clr-primary)',
                                    fontFamily: 'var(--font-body)'
                                }}
                            >
                                {language === 'en' ? 'Sign In' : 'התחבר'}
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <SignInModal
                isOpen={showSignIn}
                onClose={() => setShowSignIn(false)}
                language={language}
                onSignIn={handleSignIn}
            />
        </div>
    )
}