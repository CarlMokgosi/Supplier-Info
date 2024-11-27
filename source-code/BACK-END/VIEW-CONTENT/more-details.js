const express = require('express');
const { fetchSpecificData } = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/DASHBOARD/dashboard');
const router = express.Router();

router.get('/supplier/:id', (req, res) => {
    const supplierId = req.params.id;
    fetchSpecificData(supplierId, (error, data) => {
        if (error) return res.status(500).send('Server Error');
        
        // Render your Handlebars template and pass the specific data
        res.render('yourTemplateName', {
            company_name: data.company_name,
            telephone: data.telephone,
            cellphone: data.cellphone,
            physical_address: data.physical_address,
            description: data.description,
            postal_address: data.postal_address,
            fax: data.fax
        });
    });
});

module.exports = router;
