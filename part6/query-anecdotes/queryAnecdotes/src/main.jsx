import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import ReactDOM from 'react-dom/client'
import App from './App'

const queryClient = new QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)