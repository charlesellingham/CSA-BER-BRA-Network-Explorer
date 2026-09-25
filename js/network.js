// ==========================================
// network.js
// Creates and manages the Cytoscape network
// ==========================================


// ------------------------------------------
// Global State
// ------------------------------------------

let cy;

let labelMode = "context";

let selectedNodes = new Set();

let hiddenNodes = new Set();


// ------------------------------------------
// Build Network
// ------------------------------------------

function buildNetwork(nodes, edges) {

    // -----------------------------
// Convert Nodes
// -----------------------------

    const cyNodes = nodes.map(function(node) {

    return {

        data: {

            id: node.id,

            label: node.Label.trim(),

            displayLabel: node.Label.trim(),

            type: node.Type.trim(),

            role: node.Role,

            description: node.Description,

            size: 18

        }

    };

});


    // -----------------------------
    // Convert Edges
    // -----------------------------

    const cyEdges = edges.map(function(edge, index) {

    return {

        data: {

            id: "E" + index,

            source: edge.Source,

            target: edge.Target,

            direction: edge.Type.trim(),

            category: edge.Category.trim(),

            strength: edge.Strength,

            frequency: edge.Frequency

        }

    };

});


    // -----------------------------
    // Create Cytoscape
    // -----------------------------

    cy = cytoscape({

        container: document.getElementById("network"),

        elements: [

            ...cyNodes,
            ...cyEdges

        ],

        style: getNetworkStyle(),

        layout: {

            name: "cose",

            animate: true,

            idealEdgeLength: 200,

            nodeRepulsion: 2000000,

            edgeElasticity: 100,

            gravity: 0.4,

            numIter: 2000

        }

    });


updateNodeSizes();
cy.style().update();

    // -----------------------------
    // Node Click
    // -----------------------------

    cy.on("tap", "node", function(event) {

    const node = event.target;

    // CTRL (Windows/Linux) or CMD (Mac)
    if (
        event.originalEvent.ctrlKey ||
        event.originalEvent.metaKey
    ) {

        hideNode(node);
        return;

    }

    const addToSelection = event.originalEvent.shiftKey;

    highlightNode(node, addToSelection);

    updateNodePanel(node.data());

});


    // -----------------------------
    // Background Click
    // -----------------------------

    cy.on("tap", function(event) {

    if (event.target !== cy) return;

    clearHighlight();

    updateLabelMode();

});

    // Reset button

    document

        .getElementById("reset-view")

        .addEventListener("click", resetHiddenNodes);

    document

    .getElementById("toggle-labels")

    .addEventListener("change", toggleLabels);

    }



function hideNode(node) {

    hiddenNodes.add(node.id());

    updateHiddenCounter();

    // Hide the node
    node.style("display", "none");

    // Hide all connected edges
    node.connectedEdges().style("display", "none");

    

}

function resetHiddenNodes() {

    hiddenNodes.clear();

    cy.nodes().style("display", "element");
    cy.edges().style("display", "element");

    updateHiddenCounter();

}

// ==========================================
// Selection Functions
// ==========================================

function highlightNode(node, addToSelection = false) {

    if (!addToSelection) {

    selectedNodes.clear();
    selectedNodes.add(node);

}
else {

    if (selectedNodes.has(node)) {

        selectedNodes.delete(node);

    }
    else {

        selectedNodes.add(node);

    }

}

    clearHighlight(false);

    // Fade everything

    cy.elements().addClass("faded");

    // Highlight every selected node and its neighbourhood

    selectedNodes.forEach(function(selected) {

        selected.removeClass("faded");
        selected.addClass("selected");

        const neighbourhood = selected.neighborhood();

        neighbourhood.removeClass("faded");

        neighbourhood.edges().addClass("highlighted-edge");

    });

    updateLabelMode();

}


function clearHighlight(clearSelection = true) {

    if (clearSelection) {

        selectedNodes.clear();

    }

    cy.elements().removeClass("selected");
    cy.elements().removeClass("faded");
    cy.edges().removeClass("highlighted-edge");

}

function updateHiddenCounter() {

    document.getElementById("hidden-count").textContent =
        hiddenNodes.size;

}


// ==========================================
// Label Functions
// ==========================================

function showAllLabels() {

    cy.nodes().forEach(function(node) {

        node.data("displayLabel", node.data("label"));

    });

}


function hideAllLabels() {

    cy.nodes().forEach(function(node) {

        node.data("displayLabel", "");

    });

}


function showContextLabels(node) {

    hideAllLabels();

    node.data("displayLabel", node.data("label"));

    node.neighborhood().nodes().forEach(function(neighbour) {

        neighbour.data("displayLabel", neighbour.data("label"));

    });

}


function updateLabelMode(node = null) {

    switch (labelMode) {

        case "all":

            showAllLabels();

            break;

        case "none":

            hideAllLabels();

            break;

        case "context":

    if (selectedNodes.size > 0) {

        hideAllLabels();

        selectedNodes.forEach(function(node) {

            node.data("displayLabel", node.data("label"));

            node.neighborhood().nodes().forEach(function(neighbour) {

                neighbour.data("displayLabel", neighbour.data("label"));

            });

        });

    }

    else {

        showAllLabels();

    }

    break;
}

}

// ==========================================
// Display Functions
// ==========================================

function toggleCurvedEdges(showCurves) {

    if (showCurves) {

        cy.style()
            .selector("edge")
            .style({
                "curve-style": "unbundled-bezier",
                "control-point-distances": 30,
                "control-point-weights": 0.5
            })
            .update();

    }

    else {

        cy.style()
            .selector("edge")
            .style({
                "curve-style": "straight"
            })
            .update();

    }

}

// ==========================================
// Node Size
// ==========================================

function updateNodeSizes() {

    cy.nodes().forEach(function(node){

        const degree = node.connectedEdges().length;

        node.data("degree", degree);

        const size = 18 + (degree * 2.5);

        node.data("size", Math.min(size, 50));

    });

}


// ==========================================
// Public Functions
// ==========================================

function setLabelMode(mode) {

    labelMode = mode;

    updateLabelMode(selectedNode);

}

// ==========================================
// Turn off Labels
// ==========================================


function toggleLabels() {

    const checkbox = document.getElementById("toggle-labels");

    if (checkbox.checked) {

        labelMode = "all";

        showAllLabels();

    } else {

        labelMode = "none";

        hideAllLabels();

    }

}