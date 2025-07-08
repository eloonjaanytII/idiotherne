import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './components/store/store'

const container = document.getElementById('root');

if (!container) {
  throw new Error("Не найден элемент с id 'root'.");
}

createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>
)
