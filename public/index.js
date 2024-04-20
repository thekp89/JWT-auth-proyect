import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importa useHistory desde react-router-dom

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const history = useHistory(); // Obtiene la instancia de history

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setToken(data.token);
      // Redirige a la página de inicio de sesión si el inicio de sesión es exitoso
      history.push('/login'); // Aquí '/login' es la ruta a tu componente de inicio de sesión
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Iniciar Sesión</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', margin: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', margin: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
        Iniciar Sesión
      </button>
      {token && <p>Token JWT: {token}</p>}
    </div>
  );
}

export default App;

