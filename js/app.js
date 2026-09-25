// ==========================================
// app.js
// Starts the application
// ==========================================

Promise.all([

    loadCSV("data/Nodes_v2.csv"),

    loadCSV("data/Edges_v2.csv")

]).then(function(results) {

    const nodes = results[0];

    const edges = results[1];

    buildNetwork(nodes, edges);

    buildFilters(nodes, edges);

});