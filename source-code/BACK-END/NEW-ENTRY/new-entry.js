const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const database = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/DATABASE/Database');

// Configure multer for file upload
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, 'UPLOADS');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath); // Save the file temporarily here
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    limits: {
        fileSize: 10 * 1024 * 1024  // Example: limit file size to 10MB
    }
});

// Modify the route to use multer for file handling
router.post('/upload', upload.single('profileDocument'), (req, res) => {
    console.log(req.file);

    const { companyName, telephone, cellphone, fax_number, postalAddress, physicalAddress, description } = req.body;
    const profile = req.file.path;  // Temporary file path after upload

    // Define the destination path
    const destinationPath = path.join(__dirname, 'DESTINATION', req.file.filename); // Change 'DESTINATION' to your actual path

    // Ensure the destination directory exists
    const destinationDir = path.dirname(destinationPath);
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }

    // Copy the file to the destination
    try {
        fs.copyFileSync(profile, destinationPath);  // Copy file to destination folder
        console.log(`File copied to ${destinationPath}`);
    } catch (err) {
        console.error('Error copying file:', err);
        return res.status(500).json({ message: 'Failed to copy file.' });
    }

    // Insert data into the database
    const query = 'INSERT INTO supplier (company_name, telephone, cellphone, fax, postal_address, physical_address, supporting_documents, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [companyName, telephone, cellphone, fax_number, postalAddress, physicalAddress, destinationPath, description];  // Store the new file path

    console.log(values);
    database.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            return res.status(500).json({ message: 'Failed to save entry to the database.' });
        }
        return res.redirect('http://localhost:8000/VIEW-CONTENT');
    });
});

module.exports = router;
