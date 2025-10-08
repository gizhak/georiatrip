// 👤 שירות נתונים ספציפיים למשתמש
import { utilService } from './util.service.js'

export const userDataService = {
    getUserData,
    saveUserData,
    clearUserData,
    getUserExpenses,
    saveUserExpenses,
    getUserBudget,
    saveUserBudget,
    getUserCurrency,
    saveUserCurrency,
    getUserParticipants,
    saveUserParticipants,
    getUserPhotos,
    saveUserPhotos
}

// קבלת מפתח ייחודי למשתמש
function getUserKey(userName, dataType) {
    if (!userName) return null
    return `user_${userName}_${dataType}`
}

// קבלת כל נתוני המשתמש
function getUserData(userName) {
    if (!userName) return null

    const key = getUserKey(userName, 'data')
    const userData = utilService.loadFromStorage(key)

    if (!userData) {
        // אם אין נתונים, צור נתונים ריקים
        const defaultData = {
            expenses: [],
            budget: 0,
            currency: 'GEL',
            participants: [userName],
            photos: []
        }
        saveUserData(userName, defaultData)
        return defaultData
    }

    return userData
}

// שמירת כל נתוני המשתמש
function saveUserData(userName, data) {
    if (!userName) return
    const key = getUserKey(userName, 'data')
    utilService.saveToStorage(key, data)
}

// ניקוי נתוני משתמש
function clearUserData(userName) {
    if (!userName) return
    const key = getUserKey(userName, 'data')
    localStorage.removeItem(key)
}

// ---- הוצאות ----
function getUserExpenses(userName) {
    const userData = getUserData(userName)
    return userData ? userData.expenses : []
}

function saveUserExpenses(userName, expenses) {
    const userData = getUserData(userName)
    userData.expenses = expenses
    saveUserData(userName, userData)
}

// ---- תקציב ----
function getUserBudget(userName) {
    const userData = getUserData(userName)
    return userData ? userData.budget : 0
}

function saveUserBudget(userName, budget) {
    const userData = getUserData(userName)
    userData.budget = budget
    saveUserData(userName, userData)
}

// ---- מטבע ----
function getUserCurrency(userName) {
    const userData = getUserData(userName)
    return userData ? userData.currency : 'GEL'
}

function saveUserCurrency(userName, currency) {
    const userData = getUserData(userName)
    userData.currency = currency
    saveUserData(userName, userData)
}

// ---- משתתפים ----
function getUserParticipants(userName) {
    const userData = getUserData(userName)
    return userData ? userData.participants : [userName]
}

function saveUserParticipants(userName, participants) {
    const userData = getUserData(userName)
    userData.participants = participants
    saveUserData(userName, userData)
}

// ---- תמונות ----
function getUserPhotos(userName) {
    const userData = getUserData(userName)
    return userData ? userData.photos : []
}

function saveUserPhotos(userName, photos) {
    const userData = getUserData(userName)
    userData.photos = photos
    saveUserData(userName, userData)
}