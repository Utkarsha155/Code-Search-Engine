const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const codebaseDir = path.join(__dirname, '../codebase');
const frontendDistDir = path.join(__dirname, '../frontend/dist');

if (!fs.existsSync(codebaseDir)) {
    fs.mkdirSync(codebaseDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend build if present (for single-deploy setups)
if (fs.existsSync(frontendDistDir)) {
    app.use(express.static(frontendDistDir));
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, codebaseDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});
const upload = multer({ storage });

app.post('/api/upload', upload.array('files'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    res.json({ success: true, message: `${req.files.length} files uploaded` });
});


app.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json({ results: [] });
    }

    const results = [];

    try {
        const files = fs.readdirSync(codebaseDir);
        
        files.forEach(file => {
            if (file.endsWith('.cpp') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html')) {
                const filePath = path.join(codebaseDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                const lines = content.split('\n');
                lines.forEach((line, index) => {
                    if (line.toLowerCase().includes(query.toLowerCase())) {
                        const start = Math.max(0, index - 2);
                        const end = Math.min(lines.length, index + 3);
                        const snippet = lines.slice(start, end).join('\n');
                        
                        results.push({
                            file: file,
                            snippet: snippet,
                            line: index + 1
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error reading codebase:', error);
    }

    res.json({ results: results.slice(0, 10) });
});

app.get('/api/codebase', (req, res) => {
    const files = [];

    try {
        const fileList = fs.readdirSync(codebaseDir);
        
        fileList.forEach(file => {
            if (file.endsWith('.cpp') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html')) {
                const filePath = path.join(codebaseDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                files.push({
                    file: file,
                    content: content
                });
            }
        });
        
        console.log(`Processed ${files.length} files from codebase`);
    } catch (error) {
        console.error('Error reading codebase:', error);
    }

    res.json(files);
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'CodeSearchEngine Backend Running'
    });
});

app.delete('/api/delete/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(codebaseDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'File not found' });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).json({ success: false, message: 'Error deleting file' });
        }
        res.json({ success: true, message: `Deleted ${filename}` });
    });
});

app.delete('/api/codebase', (req, res) => {
    try {
        const files = fs.readdirSync(codebaseDir);
        files.forEach(file => {
            fs.unlinkSync(path.join(codebaseDir, file));
        });
        res.json({ success: true, message: "All files deleted from codebase" });
    } catch (err) {
        console.error("Error clearing codebase:", err);
        res.status(500).json({ success: false, message: "Error clearing codebase" });
    }
});

// SPA fallback to index.html for any non-API route when serving frontend
if (fs.existsSync(frontendDistDir)) {
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) return next();
        res.sendFile(path.join(frontendDistDir, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});
