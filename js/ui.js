// ==========================================
// ui.js
// User Interface functions
// ==========================================

function updateNodePanel(node) {

    document.getElementById("node-name").textContent =
        node.label || "-";

    document.getElementById("node-type").textContent =
        node.type || "-";

    document.getElementById("node-role").textContent =
        node.role || "-";

    const connectionList = document.getElementById("node-connections");
        connectionList.innerHTML = "";
        const connectedEdges = cy.edges().filter(function(edge){
            return edge.source().id() === node.id ||
                edge.target().id() === node.id;
        });
        connectedEdges.forEach(function(edge){
            const otherNode =
                edge.source().id() === node.id
                ? edge.target()
                : edge.source();

            const item = document.createElement("p");
            item.innerHTML =
                `<strong>${otherNode.data("label")}</strong><br>
                ${edge.data("category")}`;
            connectionList.appendChild(item);
        });

}