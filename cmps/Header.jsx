const { useState, useEffect } = React
import { SignInModal } from './SignInModal.jsx'

export function Header({ currentPage, setPage, language, setLanguage, user, setUser }) {
    const [showSignIn, setShowSignIn] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // ✨ מעקב אחרי גלילה
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSignIn = (name) => {
        setUser({ name })
    }

    return (
        <div>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    backgroundColor: scrolled ? 'rgba(21, 50, 42, 0.98)' : 'rgba(21, 50, 42, 0.95)',
                    boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : 'none',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div
                    className="max-w-7xl mx-auto px-4 transition-all duration-300"
                    style={{
                        paddingTop: scrolled ? '0.75rem' : '1rem',
                        paddingBottom: scrolled ? '0.75rem' : '1rem',
                        backgroundColor: 'var(--clr-bg-dark)'
                    }}
                >
                    <div className="flex items-center justify-between" style={{ gap: '1px' }}>
                        {/* לוגו */}
                        <div className="flex items-center gap-2">
                            <div
                                className="w-10 h-10 rounded flex items-center justify-center font-bold transition-transform duration-300 hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--clr-secondary)',
                                    color: 'var(--clr-primary)',
                                    fontFamily: 'var(--font-heading)'
                                }}
                            >
                                GT
                            </div>
                            <span
                                className="font-semibold text-lg text-white"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Georgia Trip
                            </span>
                        </div>





                        {/* ניווט */}
                        <nav
                            className=" flex gap-2 text-white"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            <button
                                onClick={() => setPage('home')}
                                className={`transition-colors ${currentPage === 'home'
                                    ? 'font-bold border-b-2 border-white'
                                    : 'hover:text-gray-300'
                                    }`}
                            >
                                {language === 'en' ? 'Home' : 'בית'}
                            </button>
                            <button
                                onClick={() => setPage('budget')}
                                className={`transition-colors ${currentPage === 'budget'
                                    ? 'font-bold border-b-2 border-white'
                                    : 'hover:text-gray-300'
                                    }`}
                            >
                                {language === 'en' ? 'Budget' : 'תקציב'}
                            </button>
                            <button
                                onClick={() => setPage('gallery')}
                                className={`transition-colors ${currentPage === 'gallery'
                                    ? 'font-bold border-b-2 border-white'
                                    : 'hover:text-gray-300'
                                    }`}
                            >
                                {language === 'en' ? 'Gallery' : 'גלריה'}
                            </button>
                        </nav>

                        {/* כפתורים */}
                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                                className="px-4 py-2 text-sm border rounded transition-all hover:bg-white hover:bg-opacity-10"
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
                                    className="flex items-center gap-2 px-4 py-2 rounded hover:opacity-80 transition-all transform hover:scale-105"
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
                                    className="px-4 py-2 rounded transition-all transform hover:scale-105"
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
                </div>

                {/* ניווט מובייל - תחתון */}
                {/* <div
                    className="md:hidden flex justify-around items-center px-4 py-2 border-t"
                    style={{
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        fontFamily: 'var(--font-body)'
                    }}
                >
                    <button
                        onClick={() => setPage('home')}
                        className={`flex flex-col items-center gap-1 text-xs transition-colors ${currentPage === 'home' ? 'text-white font-bold' : 'text-gray-400'
                            }`}
                    >
                        <span className="text-lg"></span>
                        <span>{language === 'en' ? 'Home' : 'בית'}</span>
                    </button>
                    <button
                        onClick={() => setPage('budget')}
                        className={`flex flex-col items-center gap-1 text-xs transition-colors ${currentPage === 'budget' ? 'text-white font-bold' : 'text-gray-400'
                            }`}
                    >
                        <span className="text-lg"></span>
                        <span>{language === 'en' ? 'Budget' : 'תקציב'}</span>
                    </button>
                    <button
                        onClick={() => setPage('gallery')}
                        className={`flex flex-col items-center gap-1 text-xs transition-colors ${currentPage === 'gallery' ? 'text-white font-bold' : 'text-gray-400'
                            }`}
                    >
                        <span className="text-lg"></span>
                        <span>{language === 'en' ? 'Gallery' : 'גלריה'}</span>
                    </button>
                </div> */}
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