'use client'

import { useState } from 'react';
import Link from 'next/link';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('info'); // 'success' or 'error'

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Şifreler eşleşmiyor');
      setMessageSeverity('error');
      return;
    }
    setMessage('Kayıt UI başarılı (gerçek kayıt işlemi yapılmadı)');
    setMessageSeverity('success');
    // TODO: Add actual registration logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card title="Admin Kayıt" className="w-full max-w-md">
        <form onSubmit={handleRegister} className="p-fluid">
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
          <div className="field mb-4">
            <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">Şifreyi Onayla</label>
            <InputText
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
              invalid={password !== confirmPassword && confirmPassword !== ''} // Add validation styling
            />
          </div>
          {message && (
            <div className="mb-4">
               <Message severity={messageSeverity} text={message} className="w-full justify-content-start"/>
            </div>
          )}
          <Button type="submit" label="Kayıt Ol" className="w-full" />
        </form>
        <div className="mt-4 text-center">
          <p className="text-600">
            Zaten hesabın var mı? <Link href="/admin/login" className="font-medium text-primary hover:underline">Giriş Yap</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage; 