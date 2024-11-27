const database = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/DATABASE/Database');

const searchByName = (companyName, callback) => {
    const query = `SELECT * FROM supplier WHERE company_name LIKE '%${companyName}%'`;

    database.query(query, (error, results) => {
        if (error) {
            return callback(error);
        }

        // Generate HTML table from results
        let tableHtml = '<table>';
        tableHtml += '<tr><th style="max-width: 75%;">Company Name</th><th>Telephone</th><th>Cellphone</th><th>Physical Address</th><th>Description</th><th>More Information</th></tr>';

        results.forEach((result) => {
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

module.exports = {searchByName};