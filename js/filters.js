// ==========================================
// filters.js
// Builds and manages the filter panel
// ==========================================


// ------------------------------------------
// Build Filters
// ------------------------------------------

function buildFilters(nodes, edges) {

    buildActorFilters(nodes);

    buildEdgeFilters(edges);

    initialiseFilterEvents();

    document
    .getElementById("toggle-curves")
    .addEventListener("change", function () {

        toggleCurvedEdges(this.checked);

    });

}


// ------------------------------------------
// Build Actor Filters
// ------------------------------------------

function buildActorFilters(nodes) {

    const container = document.getElementById("actor-filters");

    container.innerHTML = "";

    const actorTypes = [...new Set(

        nodes.map(function(node) {

            return node.Type.trim();

        })

    )].sort();

    actorTypes.forEach(function(type) {

        const label = document.createElement("label");

       label.innerHTML =
        `
        <input type="checkbox" value="${type}" checked>
        <span class="filter-colour ${type.replace(/[\/ ]/g,"-")}"></span>
        ${type}
        `;

        container.appendChild(label);

    });

}


// ------------------------------------------
// Build Edge Filters
// ------------------------------------------

function buildEdgeFilters(edges) {

    const container = document.getElementById("edge-filters");

    container.innerHTML = "";

    const edgeTypes = [...new Set(

        edges.map(function(edge) {

            return edge.Category.trim();

        })

    )].sort();

    edgeTypes.forEach(function(type) {

        const label = document.createElement("label");

        label.innerHTML = `
        <input type="checkbox" value="${type}" checked>
        <span class="filter-colour ${type.replace(/[\/ ]/g, "-")}"></span>
        ${type}
        `;

        container.appendChild(label);

    });

}

// ------------------------------------------
// Apply Filters
// ------------------------------------------

function applyFilters() {

    // -----------------------------
    // Get Selected Actor Types
    // -----------------------------

    const selectedActors = [];

    document.querySelectorAll("#actor-filters input:checked").forEach(function(box){

        selectedActors.push(box.value);

    });

    // -----------------------------
    // Get Selected Edge Categories
    // -----------------------------

    const selectedEdges = [];

    document.querySelectorAll("#edge-filters input:checked").forEach(function(box){

        selectedEdges.push(box.value);

    });

    // -----------------------------
    // Show / Hide Nodes
    // -----------------------------

    cy.nodes().forEach(function(node){

        if(selectedActors.includes(node.data("type"))){

            node.style("display","element");

        }

        else{

            node.style("display","none");

        }

    });

    // -----------------------------
    // Show / Hide Edges
    // -----------------------------

    cy.edges().forEach(function(edge){

        const sourceVisible =
            edge.source().style("display") === "element";

        const targetVisible =
            edge.target().style("display") === "element";

        const categoryVisible =
            selectedEdges.includes(edge.data("category"));

        if(sourceVisible && targetVisible && categoryVisible){

            edge.style("display","element");

        }

        else{

            edge.style("display","none");

        }

    });

}

// ------------------------------------------
// Filter Events
// ------------------------------------------

function initialiseFilterEvents() {

    // Actor checkboxes

    document.querySelectorAll("#actor-filters input").forEach(function(box){

        box.addEventListener("change", applyFilters);

    });

    // Edge checkboxes

    document.querySelectorAll("#edge-filters input").forEach(function(box){

        box.addEventListener("change", applyFilters);

    });

    // Actor buttons

    document.getElementById("actors-select-all").addEventListener("click", selectAllActors);

    document.getElementById("actors-clear-all").addEventListener("click", clearAllActors);

    // Edge buttons

    document.getElementById("edges-select-all").addEventListener("click", selectAllEdges);

    document.getElementById("edges-clear-all").addEventListener("click", clearAllEdges);

}


// ------------------------------------------
// Select All Actors
// ------------------------------------------

function selectAllActors() {

    document.querySelectorAll("#actor-filters input").forEach(function(box){

        box.checked = true;

    });

    applyFilters();

}


// ------------------------------------------
// Clear All Actors
// ------------------------------------------

function clearAllActors() {

    document.querySelectorAll("#actor-filters input").forEach(function(box){

        box.checked = false;

    });

    applyFilters();

}


// ------------------------------------------
// Select All Edges
// ------------------------------------------

function selectAllEdges() {

    document.querySelectorAll("#edge-filters input").forEach(function(box){

        box.checked = true;

    });

    applyFilters();

}


// ------------------------------------------
// Clear All Edges
// ------------------------------------------

function clearAllEdges() {

    document.querySelectorAll("#edge-filters input").forEach(function(box){

        box.checked = false;

    });

    applyFilters();

}