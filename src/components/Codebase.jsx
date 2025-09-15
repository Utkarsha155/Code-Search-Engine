import React, { useState, useEffect } from 'react';

function Codebase() {
    const [codes, setCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedFiles, setExpandedFiles] = useState(new Set());
    const [selectedFiles, setSelectedFiles] = useState([]);

    const fetchCodebase = () => {
        setIsLoading(true);
        fetch("http://localhost:5000/api/codebase")
            .then(res => res.json())
            .then(data => {
                setCodes(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchCodebase();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append("files", file);
        });

        await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            body: formData
        });

        setSelectedFiles([]);
        fetchCodebase(); 
    };


    const handleCodeToggle = (idx) => {
        setExpandedFiles((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(idx)) {
                newSet.delete(idx); 
            } else {
                newSet.add(idx); 
            }
            return newSet;
        });
    };
    const handleCopy = (content) => {
        navigator.clipboard.writeText(content)
            .then(() => {
                alert("Code copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };
    const handleDownload = (fileName, content) => {
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getLanguageColor = (fileName) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'js':
            case 'jsx':
                return 'from-yellow-500 to-orange-500';
            case 'cpp':
            case 'c':
                return 'from-blue-500 to-purple-500';
            case 'html':
                return 'from-orange-500 to-red-500';
            case 'css':
                return 'from-pink-500 to-purple-500';
            case 'json':
                return 'from-green-500 to-emerald-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'js':
            case 'jsx':
                return '📄';
            case 'cpp':
            case 'c':
                return '⚙️';
            case 'html':
                return '🌐';
            case 'css':
                return '🎨';
            case 'json':
                return '📋';
            default:
                return '📁';
        }
    };

    const handleDelete = async (fileName) => {
        if (!window.confirm(`Are you sure you want to delete ${fileName}?`)) return;

        try {
            const res = await fetch(`http://localhost:5000/api/delete/${fileName}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchCodebase(); 
            } else {
                alert("Failed to delete file");
            }
        } catch (err) {
            console.error("Error deleting file:", err);
        }
    };

    const handleDeleteAll = async () => {
        if (!window.confirm("⚠️ This will delete ALL files in your codebase. Continue?")) return;

        try {
            const res = await fetch("http://localhost:5000/api/codebase", {
                method: "DELETE",
            });

            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchCodebase(); 
            } else {
                alert("Failed to clear codebase");
            }
        } catch (err) {
            console.error("Error clearing codebase:", err);
        }
    };


    return (
        <>
            <div className="gradient-card p-6 rounded-2xl ">
                <h2 className="text-xl font-bold text-white mb-4">Upload Files</h2>
                <input
                    type="file"
                    multiple
                    webkitdirectory="true"
                    directory="true"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <button
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Upload
                </button>
                <button
                    onClick={handleDeleteAll}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors ml-4"
                >
                    Delete All
                </button>

                {selectedFiles.length > 0 && (
                    <p className="text-gray-300 mt-2">{selectedFiles.length} files selected</p>
                )}
            </div>

            <div className="min-h-screen gradient-bg py-12 px-6">
                <div className="max-w-6xl mx-auto fade-in">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
                            Codebase Explorer
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Browse and explore all the files in your codebase. Click on any file to view its contents.
                        </p>
                    </div>

                    <div className="gradient-card p-6 rounded-2xl mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold text-blue-400">{codes.length}</div>
                                <div className="text-gray-300">Total Files</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-400">
                                    {codes.reduce((acc, file) => acc + (file.content?.length || 0), 0).toLocaleString()}
                                </div>
                                <div className="text-gray-300">Total Characters</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-purple-400">
                                    {new Set(codes.map(file => file.file?.split('.').pop())).size}
                                </div>
                                <div className="text-gray-300">File Types</div>
                            </div>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-300 text-lg">Loading your codebase<span className="loading-dots"></span></p>
                        </div>
                    )}

                    {!isLoading && (
                        <div className="space-y-4">
                            {codes.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">No files found</h3>
                                    <p className="text-gray-400">Make sure your codebase directory is properly configured</p>
                                </div>
                            ) : (
                                codes.map(({ file, content }, idx) => (
                                    <div key={idx} className="result-card rounded-2xl overflow-hidden slide-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                                        <div
                                            className="p-6 cursor-pointer hover:bg-white/5 transition-all duration-300"
                                            onClick={() => handleCodeToggle(idx)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${getLanguageColor(file)} rounded-xl flex items-center justify-center text-2xl`}>
                                                        {getFileIcon(file)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-white">{file}</h3>
                                                        <p className="text-gray-400 text-sm">
                                                            {content?.length || 0} characters • {content?.split('\n').length || 0} lines
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-400">
                                                        {expandedFiles.has(idx) ? 'Hide' : 'Show'} code
                                                    </span>
                                                    <svg
                                                        onClick={() => handleCodeToggle(idx)}
                                                        className="w-5 h-5 text-gray-400 transition-transform duration-300 cursor-pointer"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        {expandedFiles.has(idx) ? (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        ) : (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        )}
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {expandedFiles.has(idx) && (
                                            <div className="border-t border-gray-700">
                                                <div className="code-block m-0 rounded-none">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="text-sm text-gray-400 font-mono">{file}</span>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleCopy(content)}
                                                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors"
                                                            >
                                                                Copy
                                                            </button>
                                                            <button
                                                                onClick={() => handleDownload(file, content)}
                                                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors"
                                                            >
                                                                Download
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(file)}
                                                                className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </div>
                                                    <pre className="text-sm text-green-300 leading-relaxed whitespace-pre-wrap overflow-x-auto">
                                                        {content}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Codebase