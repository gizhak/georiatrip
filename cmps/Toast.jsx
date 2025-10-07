const { useEffect } = React

// 🎉 קומפוננטת הודעות מעוצבת
export function Toast({ message, type = 'info', duration = 3000, onClose }) {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [duration, onClose])

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓'
            case 'error':
                return '✕'
            case 'warning':
                return '⚠'
            case 'info':
            default:
                return 'ℹ'
        }
    }

    const getColors = () => {
        switch (type) {
            case 'success':
                return {
                    bg: '#10b981',
                    border: '#059669',
                    icon: '#ffffff'
                }
            case 'error':
                return {
                    bg: '#ef4444',
                    border: '#dc2626',
                    icon: '#ffffff'
                }
            case 'warning':
                return {
                    bg: '#f59e0b',
                    border: '#d97706',
                    icon: '#ffffff'
                }
            case 'info':
            default:
                return {
                    bg: '#3b82f6',
                    border: '#2563eb',
                    icon: '#ffffff'
                }
        }
    }

    const colors = getColors()

    return (
        <div
            className="fixed top-24 right-4 z-[9999] animate-slide-in"
            style={{
                animation: 'slideIn 0.3s ease-out'
            }}
        >
            <div
                className="flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl min-w-[300px] max-w-md"
                style={{
                    backgroundColor: colors.bg,
                    borderLeft: `4px solid ${colors.border}`
                }}
            >
                <div
                    className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-xl"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: colors.icon
                    }}
                >
                    {getIcon()}
                </div>
                <p className="flex-1 text-white font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1 transition"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}

// CSS Animation (הוסף ל-vars.css או כאן)
const style = document.createElement('style')
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)