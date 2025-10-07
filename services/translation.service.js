// 🌐 שירות תרגומים - כל התרגומים במקום אחד
export const translationService = {
    getTranslations,
    translate
}

const translations = {
    // 🏠 HomePage
    home: {
        en: {
            homeNav: '🏠 Home',
            budgetNav: '💰 Budget',
            galleryNav: '📸 Gallery',
            signIn: 'Sign In',
            title: 'Track your adventure expenses with friends',
            subtitle: 'Manage your group budget, split expenses fairly, and keep memories alive with our comprehensive trip tracking platform designed for your Georgia adventure.',
            signInButton: 'Sign In to Your Trip',
            galleryButton: 'View Trip Gallery',
            browsePhotos: 'Want to browse photos without signing in?',
            tripFeatures: 'TRIP FEATURES',
            featuresTitle: 'Everything you need for group travel',
            budgetTitle: 'Budget Tracking',
            budgetDesc: 'Monitor your initial budget, track daily expenses, and see real-time spending across your entire Georgia adventure.',
            shareTitle: 'Expense Sharing',
            shareDesc: 'Split costs fairly among friends, track credit card expenses, and ensure everyone pays their fair share.',
            photoTitle: 'Photo Gallery',
            photoDesc: 'Upload and share trip memories with your group. Access photos anytime, even without logging in.',
            footerTitle: 'Georgia Trip Tracker',
            footerDesc: 'Making group travel expenses simple and memories lasting.',
            footerCopyright: '© 2025 Georgia Trip Tracker. Built for amazing adventures.'
        },
        he: {
            homeNav: '🏠 בית',
            budgetNav: '💰 תקציב',
            galleryNav: '📸 גלריה',
            signIn: 'התחבר',
            title: 'עקוב אחרי הוצאות ההרפתקה שלך עם חברים',
            subtitle: 'נהל את תקציב הקבוצה, חלק הוצאות בצורה הוגנת, ושמור זיכרונות חיים עם פלטפורמת מעקב הטיולים המקיפה שלנו המיועדת להרפתקה שלך בגאורגיה.',
            signInButton: 'התחבר לטיול שלך',
            galleryButton: 'צפה בגלריית הטיול',
            browsePhotos: 'רוצה לדפדף בתמונות בלי להתחבר?',
            tripFeatures: 'תכונות הטיול',
            featuresTitle: 'כל מה שאתה צריך לטיול קבוצתי',
            budgetTitle: 'מעקב תקציב',
            budgetDesc: 'עקוב אחר התקציב ההתחלתי שלך, עקוב אחר הוצאות יומיות וראה הוצאות בזמן אמת לאורך כל ההרפתקה שלך בגאורגיה.',
            shareTitle: 'חלוקת הוצאות',
            shareDesc: 'חלק עלויות בצורה הוגנת בין חברים, עקוב אחר הוצאות כרטיס אשראי וודא שכולם משלמים את החלק ההוגן שלהם.',
            photoTitle: 'גלריית תמונות',
            photoDesc: 'העלה ושתף זיכרונות טיול עם הקבוצה שלך. גישה לתמונות בכל עת, אפילו בלי להתחבר.',
            footerTitle: 'מעקב טיול גאורגיה',
            footerDesc: 'הופכים הוצאות טיולים קבוצתיים לפשוטות וזיכרונות לנצחיים.',
            footerCopyright: '© 2025 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.'
        }
    },

    // 📸 Gallery
    gallery: {
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
            copyright: '© 2025 Georgia Trip Tracker. Built for amazing adventures.'
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
            copyright: '© 2025 מעקב טיול גאורגיה. נבנה להרפתקאות מדהימות.'
        }
    },

    // 💰 Budget
    budget: {
        en: {
            title: 'Trip Budget Tracker',
            subtitle: 'Georgia Adventure 2025',
            exchange: 'Exchange: 1 EUR = 3.2 GEL | 1 USD = 2.7 GEL | 1 ILS = 0.73 GEL',
            cashBudget: 'Cash Budget',
            cashSpentMy: 'Cash Spent (My)',
            cashRemaining: 'Cash Remaining',
            cardSpent: 'Card Spent',
            spendingOverTime: 'Your Spending Over Time (Guy Izhak)',
            noExpenses: 'No expenses recorded yet',
            totalActualSpending: 'Total Actual Spending',
            balance: 'Balance',
            othersOweYou: 'Others owe you',
            youOweOthers: 'You owe others',
            budgetOverview: 'Budget Overview',
            cashSpent: 'Cash Spent',
            totalSpentMy: 'Total Spent (My):',
            expensesByCategory: 'Expenses by Category',
            addExpense: '+ Add Expense',
            cancel: 'Cancel',
            editBudget: 'Edit Budget',
            manageParticipants: 'Manage Participants',
            addNewExpense: 'Add New Expense',
            editExpense: 'Edit Expense',
            description: 'Description',
            amount: 'Amount',
            date: 'Date',
            paidBy: 'Paid By',
            selectWhoPaid: '-- Select who paid --',
            category: 'Category',
            splitAmong: 'Split Among',
            equalSplit: 'Equal Split:',
            total: 'Total:',
            iPaidCash: '💵 I paid in cash:',
            paidWithCard: 'Paid with Credit Card',
            saveChanges: 'Save Changes',
            editTripBudget: 'Edit Trip Budget',
            save: 'Save',
            addParticipantPlaceholder: 'Add participant name...',
            add: 'Add',
            you: '(You)',
            remove: 'Remove',
            cannotRemoveYourself: 'Cannot remove yourself!',
            recentExpenses: 'Recent Expenses',
            card: 'Card',
            edit: 'Edit',
            delete: 'Delete',
            deleteConfirm: 'Delete this expense?',
            removeConfirm: 'Remove',
            fillDescriptionAmount: 'Please fill in description and amount',
            dinnerPlaceholder: 'Dinner at restaurant',
            each: 'each',
            categories: {
                Food: 'Food',
                Transport: 'Transport',
                Accommodation: 'Accommodation',
                Activities: 'Activities',
                Shopping: 'Shopping',
                Other: 'Other'
            }
        },
        he: {
            title: 'מעקב תקציב טיול',
            subtitle: 'הרפתקה בגאורגיה 2025',
            exchange: 'שער חליפין: 1 EUR = 3.2 GEL | 1 USD = 2.7 GEL | 1 ILS = 0.73 GEL',
            cashBudget: 'תקציב מזומן',
            cashSpentMy: 'הוצאתי במזומן',
            cashRemaining: 'נותר במזומן',
            cardSpent: 'הוצאתי בכרטיס',
            spendingOverTime: 'ההוצאות שלך לאורך זמן (גיא יצחק)',
            noExpenses: 'עדיין אין הוצאות רשומות',
            totalActualSpending: 'סך ההוצאות שלי',
            balance: 'מאזן',
            othersOweYou: 'חייבים לך',
            youOweOthers: 'אתה חייב',
            budgetOverview: 'סקירת תקציב',
            cashSpent: 'הוצאתי במזומן',
            totalSpentMy: 'סה"כ הוצאתי:',
            expensesByCategory: 'הוצאות לפי קטגוריה',
            addExpense: '+ הוסף הוצאה',
            cancel: 'ביטול',
            editBudget: 'ערוך תקציב',
            manageParticipants: 'נהל משתתפים',
            addNewExpense: 'הוסף הוצאה חדשה',
            editExpense: 'ערוך הוצאה',
            description: 'תיאור',
            amount: 'סכום',
            date: 'תאריך',
            paidBy: 'שילם',
            selectWhoPaid: '-- בחר מי שילם --',
            category: 'קטגוריה',
            splitAmong: 'חלוקה בין',
            equalSplit: 'חלוקה שווה:',
            total: 'סה"כ:',
            iPaidCash: '💵 שילמתי במזומן:',
            paidWithCard: 'שולם בכרטיס אשראי',
            saveChanges: 'שמור שינויים',
            editTripBudget: 'ערוך תקציב טיול',
            save: 'שמור',
            addParticipantPlaceholder: 'הוסף שם משתתף...',
            add: 'הוסף',
            you: '(אתה)',
            remove: 'הסר',
            cannotRemoveYourself: 'לא ניתן להסיר את עצמך!',
            recentExpenses: 'הוצאות אחרונות',
            card: 'כרטיס',
            edit: 'ערוך',
            delete: 'מחק',
            deleteConfirm: 'למחוק הוצאה זו?',
            removeConfirm: 'להסיר',
            fillDescriptionAmount: 'נא למלא תיאור וסכום',
            dinnerPlaceholder: 'ארוחת ערב במסעדה',
            each: 'לכל אחד',
            categories: {
                Food: 'אוכל',
                Transport: 'תחבורה',
                Accommodation: 'לינה',
                Activities: 'פעילויות',
                Shopping: 'קניות',
                Other: 'אחר'
            }
        }
    }
}

// פונקציה לקבלת תרגומים לפי דף ושפה
function getTranslations(page, language) {
    if (translations[page] && translations[page][language]) {
        return translations[page][language]
    }
    return translations[page] ? translations[page].en : {}
}

// פונקציה לתרגום מהיר
function translate(page, key, language) {
    if (translations[page] && translations[page][language] && translations[page][language][key]) {
        return translations[page][language][key]
    }
    if (translations[page] && translations[page].en && translations[page].en[key]) {
        return translations[page].en[key]
    }
    return key
}