'use client'
import React, {useRef} from 'react';
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";


function CreateArticle() {
    const fileUploader = useRef(null);
    const tags = ["Software", "Web"];

    const onContentButtonClick = (event, onRemove) => {
        onRemove(event);
        event.stopPropagation();
    };

    const onFileUploadClick = () => {
        const inputEl = fileUploader.current?.getInput();
        inputEl?.click();
    };

    const emptyTemplate = () => {
        return (
            <div className="h-20rem m-1 border-round">
                <div
                    className="flex flex-column w-full h-full justify-content-center align-items-center cursor-pointer"
                    onClick={onFileUploadClick}
                >
                    <i className="pi pi-fw pi-file text-4xl text-primary"></i>
                    <span className="block font-semibold text-900 text-lg mt-3">
                        Drop or select a cover image
                    </span>
                </div>
            </div>
        );
    };

    const itemTemplate = (image, props) => {
        const file = image
        return (
            <div className="h-20rem m-1 border-round">
                <div className="w-full h-full relative border-round p-0">
                    <img
                        src={file.objectURL}
                        className="w-full h-full border-round"
                        alt={file.name}
                    />
                    <Button
                        type="button"
                        icon="pi pi-times"
                        className="text-sm absolute justify-content-center align-items-center"
                        rounded
                        style={{top: "-10px", right: "-10px"}}
                        onClick={(e) => onContentButtonClick(e, props.onRemove)}
                    ></Button>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <span className="block text-900 font-bold text-xl mb-4">
                Create a new post
            </span>
            <div className="grid">
                <div className="col-12 lg:col-8">
                    <FileUpload
                        ref={fileUploader}
                        name="demo[]"
                        url="./upload.php"
                        itemTemplate={itemTemplate}
                        emptyTemplate={emptyTemplate}
                        multiple
                        customUpload
                        accept="image/*"
                        auto
                        className="upload-button-hidden border-1 surface-border surface-card p-0 border-round mb-4"
                    />
                    <div className="flex flex-column p-fluid">
                        <div className="mb-4">
                            <InputText type="text" placeholder="Title"/>
                        </div>
                        <div className="mb-4">
                            <InputTextarea
                                rows={6}
                                placeholder="Content"
                                autoResize
                            ></InputTextarea>
                        </div>
                        <Editor style={{height: "250px"}}></Editor>
                    </div>
                </div>
                <div className="col-12 lg:col-4">
                    <div className="border-1 surface-border border-round mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Publish
                        </span>
                        <div className="p-3">
                            <div className="surface-100 p-3 flex align-items-center border-round">
                                <span className="text-900 font-semibold mr-3">
                                    Status:
                                </span>
                                <span className="font-medium">Draft</span>
                                <Button
                                    type="button"
                                    icon="pi pi-fw pi-pencil"
                                    rounded
                                    text
                                    className="ml-auto"
                                ></Button>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="surface-100 p-3 flex align-items-center border-round">
                                <span className="text-900 font-semibold mr-3">
                                    Visibility:
                                </span>
                                <span className="font-medium">Private</span>
                                <Button
                                    type="button"
                                    icon="pi pi-fw pi-pencil"
                                    rounded
                                    text
                                    className="ml-auto"
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="border-1 surface-border border-round mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Tags
                        </span>
                        <div className="p-3 flex gap-2">
                            {tags.map((tag, i) => {
                                return <Chip key={i} label={tag}></Chip>;
                            })}
                        </div>
                    </div>
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Meta
                        </span>
                        <div className="p-3">
                            <div className="mb-4">
                                <InputText type="text" placeholder="Title"/>
                            </div>
                            <div>
                                <InputTextarea
                                    rows={6}
                                    placeholder="Description"
                                    autoResize
                                ></InputTextarea>{" "}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-content-between gap-3">
                        <Button
                            className="flex-1"
                            outlined
                            severity="danger"
                            label="Discard"
                            icon="pi pi-fw pi-trash"
                        ></Button>
                        <Button
                            className="flex-1"
                            label="Publish"
                            icon="pi pi-fw pi-check"
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateArticle;

// function CreateArticle() {
//     return (
//         <div className="max-w-7xl mx-auto p-4">
//             <h1 className="text-2xl font-semibold mb-4">Create a new post</h1>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 {/* Left Side: Image Upload and Content Input */}
//                 <div className="lg:col-span-2">
//                     <div className="border-2 border-dashed rounded-lg p-4 mb-4 flex flex-col items-center justify-center h-48">
//                         <button className="px-4 py-2 bg-blue-500 text-white rounded">+ Choose</button>
//                         <p className="mt-2 text-gray-500">Drop or select a cover image</p>
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <textarea
//                         placeholder="Content"
//                         className="w-full p-2 border border-gray-300 rounded h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     ></textarea>
//                 </div>
//
//                 {/* Right Side: Publish Options, Tags, Meta */}
//                 <div className="space-y-4">
//                     <div className="border p-4 rounded shadow">
//                         <h2 className="text-lg font-medium">Publish</h2>
//                         <div className="mt-2">
//                             <div className="flex justify-between items-center mb-2">
//                                 <span>Status:</span>
//                                 <span className="text-gray-600">Draft</span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                                 <span>Visibility:</span>
//                                 <span className="text-gray-600">Private</span>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="border p-4 rounded shadow">
//                         <h2 className="text-lg font-medium">Tags</h2>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">Software</span>
//                             <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">Web</span>
//                         </div>
//                     </div>
//
//                     <div className="border p-4 rounded shadow">
//                         <h2 className="text-lg font-medium">Meta</h2>
//                         <input
//                             type="text"
//                             placeholder="Title"
//                             className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <textarea
//                             placeholder="Description"
//                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         ></textarea>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-between mt-4">
//                 <button className="px-4 py-2 bg-red-500 text-white rounded">Discard</button>
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded">Publish</button>
//             </div>
//         </div>
//     );
// }
//
// export default CreateArticle;
