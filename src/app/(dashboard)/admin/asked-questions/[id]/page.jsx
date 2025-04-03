// app/admin/questions/[id]/page.jsx
'use client'

import React, {useState, useEffect, useCallback} from 'react';
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import HttpClient from '@/util/HttpClient';
import {formatDate} from '@/util/DateUtil';
import {
    ChevronLeft,
    CheckCircle,
    XCircle,
    HelpCircle,
    Calendar,
    User, // Assuming you might get user info
    Loader2,
    AlertTriangle,
    MessageSquare // Icon for question text
} from 'lucide-react';

// Helper to get status display properties (can be shared or redefined)
const getStatusProps = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return {icon: CheckCircle, color: 'text-green-600 bg-green-100 border-green-200', text: 'Təsdiqlənib'};
        case 'rejected':
            return {icon: XCircle, color: 'text-red-600 bg-red-100 border-red-200', text: 'Rədd edilib'};
        case 'pending':
        default:
            return {icon: HelpCircle, color: 'text-yellow-600 bg-yellow-100 border-yellow-200', text: 'Gözləmədə'};
    }
};

export default function AdminQuestionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const {id} = params; // Get ID from URL

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState({approve: false, reject: false});
    const [actionError, setActionError] = useState(null);

    // Fetch Question Details
    const fetchQuestionDetail = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            // --- Adjust API Endpoint ---
            // const response = await HttpClient.get(`/api/admin/questions/${id}`);
            // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            // const data = await response.json();
            const data = {
                "id": "q-7a2b8f", // Unique Question ID
                "question": "Hesabıma daxil ola bilmirəm, şifrə sıfırlama linki gəlmir. Nə etməliyəm?", // The user's question text (can be long)
                "status": "pending", // Current status: 'pending', 'approved', 'rejected'
                "createdAt": "2024-03-10T14:25:10Z", // ISO 8601 timestamp of submission
                "user": { // Optional: Information about the user who asked
                    "id": "u-f4g1h",
                    "name": "Leyla Həsənova",
                    "email": "leyla.h@email-example.com"
                }
            }
            setQuestion(data); // Adjust based on your API response structure
        } catch (err) {
            console.error("Error fetching question detail:", err);
            setError("Sual detalları yüklənərkən xəta baş verdi.");
            setQuestion(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchQuestionDetail();
    }, [fetchQuestionDetail]);

    // --- Action Handlers ---
    const handleAction = async (actionType) => {
        setActionLoading(prev => ({...prev, [actionType]: true}));
        setActionError(null);
        try {
            // --- Adjust API Endpoints ---
            const endpoint = actionType === 'approve'
                ? `/api/admin/questions/${id}/approve`
                : `/api/admin/questions/${id}/reject`;

            const response = await HttpClient.patch(endpoint); // Or POST depending on your API
            if (!response.ok) {
                let errorMessage = 'Əməliyyat zamanı xəta baş verdi.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (parseError) {
                }
                throw new Error(errorMessage);
            }

            // Update local state on success
            const updatedQuestion = await response.json(); // Assume API returns updated question
            setQuestion(updatedQuestion); // Update with the latest data from backend

            // Or simply update the status locally if API doesn't return full object:
            // setQuestion(prev => ({ ...prev, status: actionType === 'approve' ? 'approved' : 'rejected' }));

        } catch (err) {
            console.error(`Error ${actionType}ing question:`, err);
            setActionError(err.message || "Gözlənilməyən xəta baş verdi.");
        } finally {
            setActionLoading(prev => ({...prev, [actionType]: false}));
        }
    };

    // --- Render Logic ---
    const StatusDisplay = ({status}) => {
        const {icon: Icon, color, text} = getStatusProps(status);
        return (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border ${color}`}>
                <Icon size={18}/>
                {text}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-12 w-12 text-emerald-600 animate-spin"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 md:p-8 text-center text-red-600">
                <div
                    className="flex flex-col items-center gap-2 max-w-md mx-auto bg-white p-8 rounded-lg shadow border border-red-200">
                    <AlertTriangle className="w-10 h-10 text-red-400"/>
                    <p className="font-medium">Xəta baş verdi!</p>
                    <p className="text-sm">{error}</p>
                    <Link href="/admin/asked-questions"
                          className="mt-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                        <ChevronLeft className="h-5 w-5 mr-1"/>
                        Siyahıya Qayıt
                    </Link>
                </div>
            </div>
        );
    }

    if (!question) {
        return (
            <div className="p-6 md:p-8 text-center text-gray-500">
                <div
                    className="flex flex-col items-center gap-2 max-w-md mx-auto bg-white p-8 rounded-lg shadow border border-gray-200">
                    <HelpCircle className="w-10 h-10 text-gray-400"/>
                    <p className="font-medium">Sual Tapılmadı</p>
                    <p className="text-sm">Bu ID ilə sual mövcud deyil.</p>
                    <Link href="/admin/asked-questions"
                          className="mt-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                        <ChevronLeft className="h-5 w-5 mr-1"/>
                        Siyahıya Qayıt
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
            {/* Back Link */}
            <div className="mb-6">
                <Link href="/admin/asked-questions"
                      className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                    <ChevronLeft className="h-5 w-5 mr-1"/>
                    Bütün Suallara Qayıt
                </Link>
            </div>

            {/* Action Error Message */}
            {actionError && (
                <div className="mb-6 p-4 rounded-md border bg-red-50 border-red-200 text-red-800">
                    <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0"/>
                        <p className="text-sm font-medium">{actionError}</p>
                    </div>
                </div>
            )}

            {/* Main Content Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="p-6 md:p-8">
                    <div
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Sual Detalları</h1>
                        <StatusDisplay status={question.status}/>
                    </div>

                    {/* Question Info */}
                    <div className="space-y-5">
                        {/* Submission Date */}
                        <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"/>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Göndərilmə
                                    Tarixi</p>
                                <p className="text-sm text-gray-700">{formatDate(question.createdAt || question.submittedAt)}</p>
                            </div>
                        </div>

                        {/* User Info (Optional) */}
                        {question.user && (
                            <div className="flex items-start">
                                <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"/>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">İstifadəçi</p>
                                    <p className="text-sm text-gray-700">{question.user.name || 'Anonim'}{question.user.email ? ` (${question.user.email})` : ''}</p>
                                </div>
                            </div>
                        )}

                        {/* Question Text */}
                        <div className="flex items-start">
                            <MessageSquare className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"/>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Sual
                                    Mətni</p>
                                <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">{question.question}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Section (Only if pending) */}
                {question.status?.toLowerCase() === 'pending' && (
                    <div
                        className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
                        <button
                            onClick={() => handleAction('reject')}
                            disabled={actionLoading.reject || actionLoading.approve}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {actionLoading.reject ? <Loader2 className="h-4 w-4 animate-spin"/> : <XCircle size={16}/>}
                            Rədd et
                        </button>
                        <button
                            onClick={() => handleAction('approve')}
                            disabled={actionLoading.approve || actionLoading.reject}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {actionLoading.approve ? <Loader2 className="h-4 w-4 animate-spin"/> :
                                <CheckCircle size={16}/>}
                            Təsdiqlə
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
