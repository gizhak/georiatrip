const { useState, Fragment } = React

export function SignInModal({ isOpen, onClose, language, onSignIn }) {
    const [signInMethod, setSignInMethod] = useState(null) // null, 'email'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const translations = {
        en: {
            title: 'Log In',
            newUser: 'New to this site?',
            signUp: 'Sign Up',
            loginGoogle: 'Log in with Google',
            loginFacebook: 'Log in with Facebook',
            or: 'or',
            loginEmail: 'Log in with Email',
            email: 'Email',
            password: 'Password',
            login: 'Log In',
            back: 'Back',
            emailPlaceholder: 'your.email@example.com',
            passwordPlaceholder: 'Enter your password'
        },
        he: {
            title: 'התחברות',
            newUser: 'חדש באתר?',
            signUp: 'הרשמה',
            loginGoogle: 'התחבר עם Google',
            loginFacebook: 'התחבר עם Facebook',
            or: 'או',
            loginEmail: 'התחבר עם Email',
            email: 'אימייל',
            password: 'סיסמה',
            login: 'התחבר',
            back: 'חזור',
            emailPlaceholder: 'your.email@example.com',
            passwordPlaceholder: 'הכנס סיסמה'
        }
    }

    const t = translations[language]

    if (!isOpen) return null

    const handleGoogleLogin = () => {
        onSignIn('Guy Izhak')
        onClose()
    }

    const handleFacebookLogin = () => {
        onSignIn('Guy Izhak')
        onClose()
    }

    const handleEmailLogin = (e) => {
        e.preventDefault()
        if (email && password) {
            onSignIn('Guy Izhak')
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* כפתור סגירה */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                {/* תוכן */}
                {signInMethod === null ? (
                    <Fragment>
                        <h2 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.title}
                        </h2>
                        <p className="text-center text-sm mb-6 text-gray-600">
                            {t.newUser} <a href="#" className="text-blue-600 hover:underline">{t.signUp}</a>
                        </p>

                        <div className="space-y-3">
                            {/* Google */}
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>{t.loginGoogle}</span>
                            </button>

                            {/* Facebook */}
                            <button
                                onClick={handleFacebookLogin}
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg transition text-white"
                                style={{ backgroundColor: '#1877F2' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span>{t.loginFacebook}</span>
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-4">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="text-gray-500 text-sm">{t.or}</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            {/* Email */}
                            <button
                                onClick={() => setSignInMethod('email')}
                                className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                {t.loginEmail}
                            </button>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button
                            onClick={() => setSignInMethod(null)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                        >
                            <span>←</span>
                            <span>{t.back}</span>
                        </button>

                        <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.title}
                        </h2>

                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.email}</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.emailPlaceholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.password}</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t.passwordPlaceholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
                                style={{ backgroundColor: 'var(--clr-primary)' }}
                            >
                                {t.login}
                            </button>
                        </form>
                    </Fragment>
                )}
            </div>
        </div>
    )
}