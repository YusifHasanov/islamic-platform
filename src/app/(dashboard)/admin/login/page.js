'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Static credentials check
    if (username === 'admin' && password === 'password') {
      setError('');
      // Store login status (simple example using localStorage)
      localStorage.setItem('isAdminLoggedIn', 'true');
      router.push('/admin'); // Redirect to admin dashboard
    } else {
      setError('Geçersiz kullanıcı adı veya şifre');
      localStorage.removeItem('isAdminLoggedIn');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card title="Admin Login" className="w-full max-w-md">
        <form onSubmit={handleLogin} className="p-fluid">
          <div className="field mb-4">
            <label htmlFor="username" className="block text-900 font-medium mb-2">Kullanıcı Adı</label>
            <InputText
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="field mb-4">
            <label htmlFor="password" className="block text-900 font-medium mb-2">Şifre</label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          {error && (
            <div className="mb-4">
              <Message severity="error" text={error} className="w-full justify-content-start"/>
            </div>
          )}
          <Button type="submit" label="Login" className="w-full" />
        </form>
        {/* Optional: Link to Register Page */}
        {/* <div className="mt-4 text-center">
          <p className="text-600">
            Hesabın yok mu? <Link href="/admin/register" className="font-medium text-primary hover:underline">Kayıt Ol</Link>
          </p>
        </div> */}
      </Card>
    </div>
  );
};

export default LoginPage; 