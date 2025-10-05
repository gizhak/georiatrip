// ייבוא App מתוך Root.jsx
import { App } from './Root.jsx'

// יצירת root ו-render
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)