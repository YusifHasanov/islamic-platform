'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';

const AdminDashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check login status from localStorage
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login'); // Redirect to login if not logged in
    }
  }, [router]);

  // Optional: Add a loading state or return null while checking auth
  // This prevents briefly showing the admin content before redirecting
  if (typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') !== 'true') {
    return (
        <div className="flex items-center justify-center h-screen">
             {/* Optional: Add a PrimeReact ProgressSpinner or similar */}
             <p>Loading...</p>
        </div>
    ); // Or a loading spinner component
  }

  return (
    <div className="p-fluid">
      <Card title="Admin Dashboard">
        <p className="m-0">
          Welcome to the admin dashboard. Use the sidebar to navigate through different sections.
        </p>
         {/* Add more dashboard widgets/cards here as needed */}
         {/* Example:
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Card title="Articles">Count</Card>
            <Card title="Categories">Count</Card>
            <Card title="Users">Count</Card>
         </div>
         */}
      </Card>
    </div>
  );
};

export default AdminDashboardPage; 