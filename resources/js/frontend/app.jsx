import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Halo dari React!</h1>
            <p>Ini adalah frontend React kamu</p>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
