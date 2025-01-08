'use client'
import {useState, useEffect, useRef} from 'react';
import HttpClient from "@/util/HttpClient";
import {Toast} from "primereact/toast";

export default function AdminTagsPage() {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [editingTag, setEditingTag] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    // API'den tagleri yükleme
    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await HttpClient.get("/tags");
            const data = await response.json();
            setTags(data);
        } catch (error) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Failed to save articles'});
            console.error('Tagleri yüklerken bir hata oluştu:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    // Yeni tag ekleme
    const handleAddTag = async () => {
        if (newTag.trim()) {
            setLoading(true);
            try {
                const response = await HttpClient.post("/tags", {name: newTag.trim()});
                const addedTag = await response.json();
                setTags([...tags, addedTag]);
                setNewTag('');
            } catch (error) {
                console.error('Tag eklerken bir hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Tag silme
    const handleDeleteTag = async (tagId) => {
        setLoading(true);
        try {
            HttpClient.delete(`/tags/${tagId}`)
                .then(_ => {
                    setTags(tags.filter((tag) => tag.id !== tagId));
                    setSelectedTags(selectedTags.filter((id) => id !== tagId));
                })

        } catch (error) {
            console.error('Tag silerken bir hata oluştu:', error);
        } finally {
            setLoading(false);
        }
    };

    // Tag güncelleme
    const handleUpdateTag = async (e) => {
        e.preventDefault();
        if (editingValue.trim() && editingTag) {
            setLoading(true);
            try {

                HttpClient.put(`/tags/${editingTag.id}`, {
                    name: editingValue.trim(),
                }).then(response => {
                    setEditingTag(null);
                    setEditingValue('');
                    setTags(tags.map((tag) =>
                        tag.id === response.id ? {...tag, name: response.name.trim()} : tag
                    ));
                })
            } catch (error) {
                console.error('Tag güncellerken bir hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Multi delete
    const handleMultiDelete = async () => {
        setLoading(true);
        try {
            const response = await HttpClient.post(`/tags/batch-delete`, {ids: selectedTags});
            if (response.ok) {
                setTags(tags.filter((tag) => !selectedTags.includes(tag.id)));
                setSelectedTags([]);
            }
        } catch (error) {
            console.error('Tagleri topluca silerken bir hata oluştu:', error);
        } finally {
            setLoading(false);
        }
    };

    // Seçimi toggle et
    const toggleSelectTag = (tagId) => {
        setSelectedTags((prev) =>
            prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
            <Toast ref={toast}/>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Tag Yönetimi</h1>

                {/* Loading */}
                {loading && <p className="text-gray-500 mb-4">İşlem yapılıyor...</p>}

                {/* Yeni Tag Ekleme */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Yeni bir tag yazın..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-grow border border-gray-300 rounded-lg px-4 py-3 focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-700"
                        />
                        <button
                            disabled={loading}
                            onClick={handleAddTag}
                            className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md ${loading ? "bg-gray-100" : ""}`}
                        >
                            Ekle
                        </button>
                    </div>
                </div>

                {/* Multi Delete */}
                {selectedTags.length > 0 && (
                    <div className="mb-4 flex items-center justify-between bg-red-100 p-4 rounded-lg shadow-md">
                        <p className="text-gray-700 font-medium">
                            {selectedTags.length} tag seçildi
                        </p>
                        <button
                            onClick={handleMultiDelete}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
                        >
                            Seçileni Sil
                        </button>
                    </div>
                )}

                {/* Tag Listesi */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tag Listesi</h2>
                    {tags.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className={`flex flex-col gap-3 p-4 rounded-lg shadow-lg transition ${
                                        selectedTags.includes(tag.id)
                                            ? 'bg-blue-50 border-2 border-blue-500'
                                            : 'bg-gray-50'
                                    }`}
                                >
                                    {editingTag?.id === tag.id ? (
                                        <form onSubmit={handleUpdateTag} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={editingValue}
                                                onChange={(e) => setEditingValue(e.target.value)}
                                                className="flex-grow border border-gray-300 rounded-lg px-3 py-1 focus:ring-4 focus:ring-blue-500 focus:outline-none"
                                            />
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ${loading ? "bg-black" : ""}`}
                                            >
                                                Kaydet
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingTag(null);
                                                    setEditingValue('');
                                                }}
                                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                            >
                                                İptal
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-800 font-medium">{tag.name}</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        setEditingTag(tag);
                                                        setEditingValue(tag.name);
                                                    }}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Güncelle
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTag(tag.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Henüz bir tag eklenmedi.</p>
                    )}
                </div>
            </div>
        </div>
    );
}