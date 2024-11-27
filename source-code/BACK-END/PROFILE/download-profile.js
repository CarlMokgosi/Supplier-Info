const express = require('express');
const database = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/DATABASE/Database');

const router = express.Router();

// Route to handle profile download
router.get('/Download/:id', (req, res) => {
    const supplierId = req.params.id; // Extract the supplier ID from the URL
    if (!supplierId) {
        return res.status(400).send('Supplier ID is required.');
    }

    // Fetch the file path from the database
    const query = 'SELECT supporting_documents FROM supplier WHERE id = ?';
    database.query(query, [supplierId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Database query failed.');
        }
        if (results.length === 0) {
            return res.status(404).send('File not found for the supplier.');
        }

        const filePath = results[0].supporting_documents;
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading file.');
            }
        });
    });
});

module.exports = router;
