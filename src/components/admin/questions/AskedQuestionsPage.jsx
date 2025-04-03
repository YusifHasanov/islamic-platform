
// app/admin/questions/page.jsx
'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Use hooks from next/navigation
import HttpClient from '@/util/HttpClient';
import { formatDate } from '@/util/DateUtil'; // Assuming you have this
import {
    ListFilter,
    Search,
    ChevronLeft,
    ChevronRight,
    Eye, // Icon for View action
    CheckCircle, // Icon for Approved
    XCircle, // Icon for Rejected
    HelpCircle, // Icon for Pending
    RotateCcw, // Icon for Reset
    Inbox, // Icon for Empty state
    Loader2, // Icon for Loading
    AlertTriangle // Icon for Error
} from 'lucide-react';

const QUESTIONS_PER_PAGE = 15;

// Helper to get status display properties
const getStatusProps = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return { icon: CheckCircle, color: 'text-green-600 bg-green-100', text: 'Təsdiqlənib' };
        case 'rejected':
            return { icon: XCircle, color: 'text-red-600 bg-red-100', text: 'Rədd edilib' };
        case 'pending':
        default:
            return { icon: HelpCircle, color: 'text-yellow-600 bg-yellow-100', text: 'Gözləmədə' };
    }
};

// Custom hook for query parameters
function useQueryState(key, defaultValue = '') {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(() => searchParams.get(key) ?? defaultValue);

    const updateQuery = useCallback((newValue) => {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // Get current params
        if (newValue.trim() === '' || newValue === defaultValue) {
            current.delete(key);
        } else {
            current.set(key, newValue);
        }
        // Reset page when filter changes
        current.delete('page');

        const search = current.toString();
        const query = search ? `?${search}` : "";
        // Use router.push for navigation without page reload
        router.push(`/admin/asked-questions${query}`);

        // No need to update local state here, useEffect below will handle it
    }, [key, defaultValue, searchParams, router]);

    // Update state if URL changes externally
    useEffect(() => {
        setValue(searchParams.get(key) ?? defaultValue);
    }, [searchParams, key, defaultValue]);


    return [value, updateQuery, setValue]; // Return setValue for direct input control
}


export default function AskedQuestionsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // State
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    // Filters using custom hook
    const [statusFilter, setStatusFilter] = useQueryState('status', '');
    const [searchQuery, setSearchQuery, setSearchQueryInput] = useQueryState('search', '');
    const page = parseInt(searchParams.get('page') || '1', 10); // Get page from URL

    // Fetch Questions
    const fetchAdminQuestions = useCallback(async (currentPage, currentStatus, currentSearch) => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: QUESTIONS_PER_PAGE.toString(),
            });
            if (currentStatus) params.set('status', currentStatus);
            if (currentSearch) params.set('searchQuery', currentSearch);

            // --- Adjust API Endpoint ---
            // const response = await HttpClient.get(`/api/admin/questions?${params.toString()}`);
            // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            // const data = await response.json();

            const data = {
                data: [
                    {
                        "id": "q-7a2b8f", // Unique Question ID
                        "question": "Hesabıma daxil ola bilmirəm, şifrə sıfırlama linki gəlmir. Nə etməliyəm?", // The user's question text (can be long)
                        "status": "pending", // Current status: 'pending', 'approved', 'rejected'
                        "createdAt": "2024-03-10T14:25:10Z", // ISO 8601 timestamp of submission
                        "user": { // Optional: Information about the user who asked
                            "id": "u-f4g1h",
                            "name": "Leyla Həsənova",
                            "email": "leyla.h@email-example.com"
                        }
                    },
                    {
                        "id": "q-3c4d9e",
                        "question": "Ödəniş etdikdən sonra xidmət nə zaman aktivləşir?",
                        "status": "approved",
                        "createdAt": "2024-03-09T09:10:30Z",
                        "user": {
                            "id": "u-k9l3m",
                            "name": "Samir Babayev",
                            "email": null // User might not have provided email or is anonymous
                        }
                    },
                    {
                        "id": "q-1a9b8c",
                        "question": "Platformanızda reklam yerləşdirmək mümkündürmü?",
                        "status": "rejected", // Might be rejected if off-topic or spam
                        "createdAt": "2024-03-08T18:45:00Z",
                        "user": {
                            "id": "u-z1x2y",
                            "name": "Anonim İstifadəçi",
                            "email": "spam.user@another-example.net"
                        }
                    },
                    {
                        "id": "q-5e6f7g",
                        "question": "Profil şəklimi dəyişə bilmirəm, xəta verir.",
                        "status": "pending",
                        "createdAt": "2024-03-11T11:05:15Z",
                        "user": {
                            "id": "u-f4g1h", // Same user as the first question
                            "name": "Leyla Həsənova",
                            "email": "leyla.h@email-example.com"
                        }
                    },
                    {
                        "id": "q-8h9i0j",
                        "question": "API sənədləriniz haradadır?",
                        "status": "approved",
                        "createdAt": "2024-03-07T10:00:00Z",
                        "user": null // Could represent a submission where user info wasn't captured
                    }
                    // ... more question objects would follow for a full page result
                ],
                pagination: {
                    currentPage: 1,
                    totalPages: 5,
                    totalItems: 73,
                    limit: 15
                }
            }

            setQuestions(data?.data || []); // Adjust based on your API response structure
            setTotalPages(data?.pagination?.totalPages ?? 1); // Adjust based on your API response structure

        } catch (err) {
            console.error("Error fetching admin questions:", err);
            setError("Suallar yüklənərkən xəta baş verdi.");
            setQuestions([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, []); // Dependencies are handled via useEffect


    // Effect to fetch data when URL params change
    useEffect(() => {
        const currentSearch = searchParams.get('search') ?? '';
        const currentStatus = searchParams.get('status') ?? '';
        const currentPage = parseInt(searchParams.get('page') || '1', 10);
        fetchAdminQuestions(currentPage, currentStatus, currentSearch);
    }, [searchParams, fetchAdminQuestions]); // Re-run when URL changes

    // --- Event Handlers ---
    const handleSearchChange = (e) => {
        setSearchQueryInput(e.target.value); // Update input value immediately
    };

    // Handler to apply search (e.g., on button click or after debounce if implemented)
    const applySearch = () => {
        setSearchQuery(searchQuery); // This updates the URL via useQueryState
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value); // Updates URL via useQueryState
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const current = new URLSearchParams(Array.from(searchParams.entries()));
            current.set('page', newPage.toString());
            router.push(`/admin/asked-questions?${current.toString()}`);
        }
    };

    const resetFilters = () => {
        // Resetting state triggers URL update via useQueryState hooks
        setSearchQuery('');
        setStatusFilter('');
        // Explicitly navigate to base URL without filters
        router.push('/admin/asked-questions');
    };

    const hasActiveFilters = !!(searchQuery || statusFilter);

    // --- Render Logic ---
    const StatusBadge = ({ status }) => {
        const { icon: Icon, color, text } = getStatusProps(status);
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                <Icon size={14} />
                {text}
            </span>
        );
    };

    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">İstifadəçi Sualları</h1>

            {/* Filter and Search Section */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    {/* Search Input */}
                    <div className="relative">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Axtarış</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="search"
                                id="search"
                                name="search"
                                value={searchQuery} // Controlled component
                                onChange={handleSearchChange}
                                onKeyDown={(e) => e.key === 'Enter' && applySearch()}
                                placeholder="Sual mətni, istifadəçi..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            />
                        </div>
                        {/* Optional: Add apply search button if not using Enter/debounce */}
                        {/* <button onClick={applySearch} className="mt-1 text-sm ...">Apply</button> */}
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={statusFilter}
                            onChange={handleStatusChange}
                            className="block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        >
                            <option value="">Bütün Statuslar</option>
                            <option value="pending">Gözləmədə</option>
                            <option value="approved">Təsdiqlənib</option>
                            <option value="rejected">Rədd edilib</option>
                        </select>
                    </div>

                    {/* Reset Button */}
                    {hasActiveFilters && (
                        <div className="md:col-start-3 flex justify-end">
                            <button
                                onClick={resetFilters}
                                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500"
                            >
                                <RotateCcw size={16} />
                                Filtrləri Sıfırla
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Questions Table/List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sual (Qısa)</th>
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İstifadəçi</th> */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Göndərilmə Tarixi</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => ( // Skeleton rows
                                <tr key={`skel-${i}`} className="animate-pulse">
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td> */}
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-5 bg-gray-200 rounded-full w-24"></div></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                                    <td className="px-6 py-4 text-center"><div className="h-6 w-10 bg-gray-200 rounded mx-auto"></div></td>
                                </tr>
                            ))
                        ) : error ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 px-6 text-red-600">
                                    <div className="flex flex-col items-center gap-2">
                                        <AlertTriangle className="w-10 h-10 text-red-400" />
                                        <p className="font-medium">Xəta baş verdi!</p>
                                        <p className="text-sm">{error}</p>
                                        <button onClick={() => fetchAdminQuestions(page, statusFilter, searchQuery)} className="mt-2 text-sm text-emerald-700 hover:underline">Yenidən cəhd edin</button>
                                    </div>
                                </td>
                            </tr>
                        ) : questions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-16 px-6 text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Inbox className="w-12 h-12 text-gray-300" />
                                        <p className="font-semibold text-lg text-gray-700">Heç bir sual tapılmadı.</p>
                                        <p className="text-sm">{hasActiveFilters ? 'Filtrləri dəyişin və ya sıfırlayın.' : 'Hələ heç bir sual göndərilməyib.'}</p>
                                        {hasActiveFilters && <button onClick={resetFilters} className="mt-2 text-sm text-emerald-700 hover:underline">Filtrləri Sıfırla</button>}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            questions.map((q) => (
                                <tr key={q.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 text-sm text-gray-800 max-w-md">
                                        <p className="truncate font-medium" title={q.question}>
                                            {q.question || 'N/A'}
                                        </p>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q.user?.name || q.user?.email || '-'}</td> */}
                                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={q.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(q.createdAt || q.submittedAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <Link
                                            href={`/admin/asked-questions/${q.id}`}
                                            className="text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1 p-1 rounded hover:bg-emerald-50 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                                            title="Detallara Bax"
                                        >
                                            <Eye size={18} />
                                            {/* Bax */}
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {!loading && !error && questions.length > 0 && totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                        Səhifə {page} / {totalPages}
                    </p>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        {/* Consider adding page number links here if needed */}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
}
