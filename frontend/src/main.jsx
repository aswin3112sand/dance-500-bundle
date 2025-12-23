import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Remove loading spinner when React app loads
const removeLoadingSpinner = () => {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.remove();
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Remove loading spinner after render
setTimeout(removeLoadingSpinner, 100);