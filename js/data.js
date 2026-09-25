// ==========================================
// data.js
// Loads CSV files
// ==========================================

function loadCSV(fileName) {

    return new Promise(function(resolve) {

        Papa.parse(fileName, {

            download: true,

            header: true,

            skipEmptyLines: true,

            complete: function(results) {

                resolve(results.data);

            }

        });

    });

}