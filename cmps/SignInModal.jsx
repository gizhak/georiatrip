const { useState, useEffect, Fragment } = React
import { utilService } from '../services/util.service.js'

export function SignInModal({ isOpen, onClose, language, onSignIn }) {
    const [signInMethod, setSignInMethod] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [savedGoogleAccounts, setSavedGoogleAccounts] = useState([])

    useEffect(() => {
        const accounts = utilService.loadFromStorage('googleAccounts') || []
        setSavedGoogleAccounts(accounts)
    }, [])

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
            name: 'Your Name',
            namePlaceholder: 'Enter your name',
            login: 'Log In',
            back: 'Back',
            continue: 'Continue',
            emailPlaceholder: 'your.email@example.com',
            passwordPlaceholder: 'Enter your password',
            googleTitle: 'Choose an account',
            googleSubtitle: 'to continue to Georgia Trip Tracker',
            facebookTitle: 'Sign in with Facebook',
            enterName: 'Please enter your name to continue',
            useAnotherAccount: 'Use another account',
            addAccount: 'Add another account'
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
            name: 'השם שלך',
            namePlaceholder: 'הכנס את שמך',
            login: 'התחבר',
            back: 'חזור',
            continue: 'המשך',
            emailPlaceholder: 'your.email@example.com',
            passwordPlaceholder: 'הכנס סיסמה',
            googleTitle: 'בחר חשבון',
            googleSubtitle: 'כדי להמשיך אל Georgia Trip Tracker',
            facebookTitle: 'התחבר עם Facebook',
            enterName: 'נא להזין את שמך כדי להמשיך',
            useAnotherAccount: 'השתמש בחשבון אחר',
            addAccount: 'הוסף חשבון נוסף'
        }
    }

    const t = translations[language]

    if (!isOpen) return null

    const handleGoogleAccountSelect = (account) => {
        // עדכן תאריך כניסה אחרונה
        const updatedAccount = {
            ...account,
            lastLogin: new Date().toISOString()
        }

        // עדכן ב-localStorage
        const updatedAccounts = savedGoogleAccounts.map(acc =>
            acc.id === account.id ? updatedAccount : acc
        )
        setSavedGoogleAccounts(updatedAccounts)
        utilService.saveToStorage('googleAccounts', updatedAccounts)

        // התחבר
        onSignIn({
            name: account.name,
            email: account.email,
            createdAt: account.createdAt,
            lastLogin: updatedAccount.lastLogin
        })
        resetAndClose()
    }

    const handleNewGoogleAccount = () => {
        setSignInMethod('google-new')
    }

    const saveGoogleAccount = (name, email) => {
        const now = new Date().toISOString()
        const newAccount = {
            id: Date.now(),
            name,
            email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
            avatar: name.charAt(0).toUpperCase(),
            createdAt: now,
            lastLogin: now
        }

        const accounts = [...savedGoogleAccounts, newAccount]
        setSavedGoogleAccounts(accounts)
        utilService.saveToStorage('googleAccounts', accounts)

        onSignIn({
            name: newAccount.name,
            email: newAccount.email,
            createdAt: newAccount.createdAt,
            lastLogin: newAccount.lastLogin
        })
        resetAndClose()
    }

    const handleGoogleLogin = () => {
        if (userName.trim()) {
            saveGoogleAccount(userName.trim(), email)
        }
    }

    const handleSocialLogin = () => {
        if (userName.trim()) {
            const now = new Date().toISOString()
            onSignIn({
                name: userName.trim(),
                email: `${userName.trim().toLowerCase().replace(/\s+/g, '')}@${signInMethod}.com`,
                createdAt: now,
                lastLogin: now
            })
            resetAndClose()
        }
    }

    const handleEmailLogin = () => {
        if (email && password && userName.trim()) {
            const now = new Date().toISOString()
            onSignIn({
                name: userName.trim(),
                email: email,
                createdAt: now,
                lastLogin: now
            })
            resetAndClose()
        }
    }

    const resetAndClose = () => {
        setSignInMethod(null)
        setUserName('')
        setEmail('')
        setPassword('')
        onClose()
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={resetAndClose}
        >
            <div
                className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={resetAndClose}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                {signInMethod === null ? (
                    <Fragment>
                        <h2 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.title}
                        </h2>
                        <p className="text-center text-sm mb-6 text-gray-600">
                            {t.newUser} <a href="#" className="text-blue-600 hover:underline">{t.signUp}</a>
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => setSignInMethod('google-accounts')}
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

                            <button
                                onClick={() => setSignInMethod('facebook')}
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg transition text-white"
                                style={{ backgroundColor: '#1877F2' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span>{t.loginFacebook}</span>
                            </button>

                            <div className="flex items-center gap-3 my-4">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="text-gray-500 text-sm">{t.or}</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <button
                                onClick={() => setSignInMethod('email')}
                                className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                {t.loginEmail}
                            </button>
                        </div>
                    </Fragment>
                ) : signInMethod === 'google-accounts' ? (
                    <Fragment>
                        <div className="text-center mb-6">
                            <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                {t.googleTitle}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {t.googleSubtitle}
                            </p>
                        </div>

                        <div className="space-y-2 mb-4">
                            {savedGoogleAccounts.map(account => (
                                <button
                                    key={account.id}
                                    onClick={() => handleGoogleAccountSelect(account)}
                                    className="w-full flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                        style={{ backgroundColor: '#1a73e8' }}
                                    >
                                        {account.avatar}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold">{account.name}</div>
                                        <div className="text-sm text-gray-600">{account.email}</div>
                                    </div>
                                </button>
                            ))}

                            <button
                                onClick={handleNewGoogleAccount}
                                className="w-full flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition"
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-300">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-semibold text-gray-700">{t.useAnotherAccount}</div>
                                </div>
                            </button>
                        </div>

                        <button
                            onClick={() => setSignInMethod(null)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            {t.back}
                        </button>
                    </Fragment>
                ) : signInMethod === 'google-new' ? (
                    <Fragment>
                        <button
                            onClick={() => setSignInMethod('google-accounts')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                        >
                            <span>←</span>
                            <span>{t.back}</span>
                        </button>

                        <div className="text-center mb-6">
                            <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                {t.addAccount}
                            </h2>
                            <p className="text-sm text-gray-600 mb-6">
                                {t.enterName}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.name}</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && email && handleGoogleLogin()}
                                    placeholder={t.namePlaceholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.email} (optional)</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && userName && handleGoogleLogin()}
                                    placeholder={t.emailPlaceholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
                                style={{ backgroundColor: '#1a73e8' }}
                            >
                                {t.continue}
                            </button>
                        </div>
                    </Fragment>
                ) : signInMethod === 'facebook' ? (
                    <Fragment>
                        <button
                            onClick={() => setSignInMethod(null)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                        >
                            <span>←</span>
                            <span>{t.back}</span>
                        </button>

                        <h2 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                            {t.facebookTitle}
                        </h2>
                        <p className="text-center text-sm mb-6 text-gray-600">
                            {t.enterName}
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.name}</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSocialLogin()}
                                    placeholder={t.namePlaceholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={handleSocialLogin}
                                className="w-full px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
                                style={{ backgroundColor: '#1877F2' }}
                            >
                                {t.continue}
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

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.name}</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder={t.namePlaceholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.email}</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.emailPlaceholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.password}</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleEmailLogin()}
                                    placeholder={t.passwordPlaceholder}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <button
                                onClick={handleEmailLogin}
                                className="w-full px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
                                style={{ backgroundColor: 'var(--clr-primary)' }}
                            >
                                {t.login}
                            </button>
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    )
}