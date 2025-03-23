'use client';
import React, {useRef, useState, useEffect} from 'react';
import {Editor} from 'primereact/editor';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Toast} from 'primereact/toast';
import HttpClient from '@/util/HttpClient';
import {ChevronDown} from "lucide-react";
import {TabPanel, TabView} from "primereact/tabview";
import {Calendar} from "primereact/calendar";

function CreateArticle() {
    const toast = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publishedAt, setPublishedAt] = useState([new Date()]);
    const [image, setImage] = useState(null);
    const [selectedAuthors, setSelectedAuthors] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([])
    const [isAuthorOpen, setIsAuthorOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const authorDropDownRef = useRef(null)
    const categoryDropDownRef = useRef(null)


    useEffect(() => {
        HttpClient.get("/authors")
            .then(res => res.json())
            .then(data => setAuthors(data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        HttpClient.get('/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error(err));
    }, [])

    // Görsel yükleme işlemi
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Yazar seçim işlemi
    const handleAuthorToggle = (author) => {
        setSelectedAuthors(prevAuthors =>
            prevAuthors.some(a => a.id === author.id)
                ? prevAuthors.filter(a => a.id !== author.id)
                : [...prevAuthors, author]
        )
    }

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prevState =>
            prevState.some(a => a.id === category.id)
                ? prevState.filter(a => a.id !== category.id)
                : [...prevState, category]
        )
    }


    // Makale gönderme işlemi
    const handleSubmit = async () => {
        if (!title || !content || selectedAuthors.length === 0 || categories.length === 0) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'All fields are required!'});
            return;
        }

        const body = {
            image,
            title,
            content,
            publishedAt,
            authorIds: selectedAuthors.map(a => a.id),
            categories: selectedCategories.map(a => a.id),
        };

        try {
            const response = await (await HttpClient.post('/articles', body)).json()
            if (response.status === 200 || response.status === 201) {
                toast.current.show({severity: 'success', summary: 'Success', detail: 'Article created successfully'});
            } else {

                toast.current.show({severity: 'error', summary: 'Error', detail: response.message});
            }

            fetch(`/api/revalidate?path=/articles&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`)
                .then(() => console.log('Revalidated articles revalidated.'))
                .catch(err => console.error("Failed to revalidate /articles page."));
        } catch (error) {
            console.error(error);
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message});
        }
    };

    return (
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg">
            <Toast ref={toast}/>
            <TabView>
                <TabPanel header={"Create"}>
                    <h1 className="text-3xl font-bold mb-6 text-center">Create a New Article</h1>

                    {/* Görsel Yükleme */}
                    <div className="mb-6">
                        <input type="file" accept="image/*" onChange={handleImageUpload}
                               className="w-full p-2 border rounded"/>
                        {image && <img src={image} alt="Cover" className="w-full h-64 object-cover rounded-lg mt-4"/>}
                    </div>

                    {/* Başlık */}
                    <div className="mb-6">
                        <InputText
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full p-3 border rounded"
                        />
                    </div>

                    {/* İçerik (PrimeReact Editor) */}
                    <div className="mb-6">
                        <Editor
                            value={content}
                            onTextChange={(e) => setContent(e.htmlValue)}
                            style={{height: '250px'}}
                            placeholder="Write your content here..."
                        />
                    </div>


                    {/* Yazar Seçimi */}
                    <div className="relative mb-4" ref={authorDropDownRef}>
                        <label htmlFor="authors" className="block text-sm font-medium text-gray-700">
                            Authors
                        </label>
                        <div
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onClick={() => setIsAuthorOpen(!isAuthorOpen)}
                        >
                            {selectedAuthors.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                    {selectedAuthors.map(author => (
                                        <span key={author.id}
                                              className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">
                        {author.name}
                      </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-500">Select authors</span>
                            )}
                            <ChevronDown
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                        </div>
                        {isAuthorOpen && (
                            <div
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {authors.map((author) => (
                                    <div
                                        key={author.id}
                                        className={`${
                                            selectedAuthors.some(a => a.id === author.id) ? 'bg-indigo-50' : ''
                                        } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100`}
                                        onClick={() => handleAuthorToggle(author)}
                                    >
                                        <span className="block truncate">{author.name}</span>
                                        {selectedAuthors.some(a => a.id === author.id) && (
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"/>
                          </svg>
                        </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Kategori Seçimi */}
                    <div className="relative mb-4" ref={categoryDropDownRef}>
                        <label htmlFor="authors" className="block text-sm font-medium text-gray-700">
                            Categories
                        </label>
                        <div
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                            {selectedCategories.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                    {selectedCategories.map(author => (
                                        <span key={author.id}
                                              className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">
                        {author.name}
                      </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-500">Select authors</span>
                            )}
                            <ChevronDown
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                        </div>
                        {isCategoryOpen && (
                            <div
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {categories.map((author) => (
                                    <div
                                        key={author.id}
                                        className={`${
                                            selectedCategories.some(a => a.id === author.id) ? 'bg-indigo-50' : ''
                                        } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100`}
                                        onClick={() => handleCategoryToggle(author)}
                                    >
                                        <span className="block truncate">{author.name}</span>
                                        {selectedCategories.some(a => a.id === author.id) && (
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"/>
                          </svg>
                        </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">
                            Published Date
                        </label>
                        <Calendar
                            id="publishedAt"
                            value={publishedAt}
                            onChange={(e) => setPublishedAt(e.value)}
                            dateFormat="yy-mm-dd"
                            placeholder="Select Published Date"
                            className="w-full p-3 border rounded"
                            selectionMode={"single"}/>
                    </div>

                    {/* Butonlar */}
                    <div className="flex justify-between">
                        <Button label="Publish" icon="pi pi-check" className="p-button-success w-full"
                                onClick={handleSubmit}/>
                        <Button
                            label="Discard"
                            icon="pi pi-times"
                            className="p-button-danger w-full"
                            onClick={() => {
                                setTitle('');
                                setContent('');
                                setPublishedAt('');
                                setImage(null);
                                setSelectedAuthors([]);
                                setCategories([]);
                            }}
                        />
                    </div>
                </TabPanel>
                <TabPanel header={"Preview"}>

                    <div>
                        {/* Full Width Image */}
                        <div className="relative w-full h-[400px]">
                            <img
                                src={image}
                                alt="Blog Image"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay with Text */}
                            <div className=" bg-opacity-50 flex items-center justify-center">
                                <div className="text-center text-white px-4 md:px-8">
                                    <h1 className="text-2xl md:text-4xl font-bold mb-2">
                                        {title}
                                    </h1>
                                    <p className="text-lg mb-4">Ekim 1, 2024</p>
                                    <p className="text-yellow-500 font-semibold">
                                        {
                                            selectedCategories.map((category) => (
                                                <span key={category.id}
                                                      className="bg-indigo-50">
                                                   {category.name} /
                                                   </span>
                                            ))
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className=" mx-auto py-12 px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
                                {/* Blog İçeriği */}
                                <div dangerouslySetInnerHTML={{__html: content}}/>

                                {/* Sağ Menü - En Çok Okunanlar */}
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabView>

        </div>
    );
}

export default CreateArticle;
