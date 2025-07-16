import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app'; // <- путь может быть ./App, если переименован

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
