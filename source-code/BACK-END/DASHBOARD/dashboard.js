const database = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/DATABASE/Database');

const fetchDashboardData = (callback) => {
    database.query('SELECT * FROM supplier ORDER BY id DESC LIMIT 3', (error, dashboardResults) => {
        if (error) return callback(error);

        // Generate HTML table from data
        let tableHtml = '<table>';
        tableHtml += '<tr><th style="max-width: 75%;">Company Name</th><th>Telephone</th><th>Cellphone</th><th>Physical Address</th><th>Description</th><th>More Information</th></tr>';
        dashboardResults.forEach((result) => {
            tableHtml += '<tr>';
            tableHtml += `<td>${result.company_name}</td>`;
            tableHtml += `<td>${result.telephone}</td>`;
            tableHtml += `<td>${result.cellphone}</td>`;
            tableHtml += `<td>${result.physical_address}</td>`;
            tableHtml += `<td>${result.description}</td>`;
            tableHtml += `<td style="text-align: center;">
                            <a href="/More-Details/${result.id}" style="display: inline-block; padding: 10px;">
                                <img src="./file.png" alt="More Details" style="width: 50px; height: 50px;">
                            </a>
                        </td>`;
            tableHtml += '</tr>';
        });
        tableHtml += '</table>';

        callback(null, tableHtml);
    });
}; 

const fetchAllData = (callback) => {
    database.query('SELECT * FROM supplier', (error, dashboardResults) => {
        if (error) return callback(error);

        // Generate HTML table from data
        let tableHtml = '<table>';
        tableHtml += '<tr><th style="max-width: 75%;">Company Name</th><th>Telephone</th><th>Cellphone</th><th>Physical Address</th><th>Description</th><th>More Information</th></tr>';
        dashboardResults.forEach((result) => {
            tableHtml += '<tr>';
            tableHtml += `<td>${result.company_name}</td>`;
            tableHtml += `<td>${result.telephone}</td>`;
            tableHtml += `<td>${result.cellphone}</td>`;
            tableHtml += `<td>${result.physical_address}</td>`;
            tableHtml += `<td>${result.description}</td>`;
            tableHtml += `<td style="text-align: center;">
                            <a href="/More-Details/${result.id}" style="display: inline-block; padding: 10px;">
                                <img src="./file.png" alt="More Details" style="width: 50px; height: 50px;">
                            </a>
                        </td>`;
                        
            tableHtml += '</tr>';
        });
        tableHtml += '</table>';

        callback(null, tableHtml);
    });
};

const fetchSpecificData = (id, callback) => {
    const query = 'SELECT * FROM supplier WHERE id = ?';
    console.log(id);
    database.query(query, [id], (error, result) => {
        if (error) return callback(error);
        callback(null, result[0]); // Return the first (and only) matching result
    });
};

module.exports = { fetchDashboardData, fetchAllData, fetchSpecificData };
