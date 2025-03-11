"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import secretimage from "../public/geheimes_foto.png"

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [authStage, setAuthStage] = useState('login');
  const [userId, setUserId] = useState(null);
  const [generatedCode, setGeneratedCode] = useState('');

  // Login-Funktion
  const handleLogin = (e) => {
    e.preventDefault();
    
    // verschiedene dummy Nutzer
    const users = [
      { id: '1', username: 'admin', password: 'admin123' },
      { id: '2', username: 'user', password: 'user123' }
    ];
    
    // Check if username === pw
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setUserId(user.id);
      // TOTP-Code generieren
      const tempCode = generateCode(user.id);
      setGeneratedCode(tempCode);
      setAuthStage('verification');
    } else {
      alert('Falsche Anmeldedaten!');
    }
  };

  // Einfache Code-Generierung
  const generateCode = (userId) => {
    // Einfacher Code generiert (nicht realistisch)
    return (Math.floor(Math.random() * 900000) + 100000).toString();
  };

  // Code-Verifizierung
  const verifyCode = (e) => {
    e.preventDefault();
    
    if (code === generatedCode) {
      setAuthStage('success');
    } else {
      alert('Falscher Code!');
    }
  };

  // Login-Formular
  if (authStage === 'login') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 text-black bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Benutzername:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2">Passwort:</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md" 
            type="submit"
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  // Code-Verifizierung
  if (authStage === 'verification') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white text-black rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Code-Verifizierung</h1>
        
        <div className="mb-6 p-4 border border-dashed border-gray-300 bg-gray-50 rounded-md text-center">
          <h3 className="mb-2">Dein TOTP-Code:</h3>
          <div className="text-3xl font-bold mb-2">{generatedCode}</div>
        </div>
        
        <form onSubmit={verifyCode}>
          <div className="mb-4">
            <label className="block mb-2">Code eingeben:</label>
            <input
              className="w-full px-3 py-2 border rounded-md text-center text-xl"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
          </div>
          
          <button 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md" 
            type="submit"
          >
            Verifizieren
          </button>
        </form>
      </div>
    );
  }

  // Erfolgsmeldung
  if (authStage === 'success') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
          <p className="font-bold">Geheimes Foto von User</p>
          <Image 
          src={secretimage}
            width={500}
            height={500}
            alt="geheime Fotos"
            className="p-10"
          />
        </div>
      </div>
    );
  }
}