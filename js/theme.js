// ==========================================
// theme.js
// Cytoscape visual theme
// ==========================================

function getNetworkStyle() {

    return [

        {
            selector: "node",

            style: {

                "label": "data(displayLabel)",

                "font-size": "15px",

                "text-valign": "bottom",

                "text-halign": "center",

                "text-wrap": "wrap",

                "text-max-width": 120,

                "text-background-color": "white",

                "text-background-opacity": 0.8,

                "text-background-padding": 2,

                "width": "data(size)",
                "height": "data(size)"                  

            }

        },

        {
            selector: 'node[type = "School"]',

            style: {

                "background-color": "#15c168"

            }

        },

        {
            selector: 'node[type = "Organization/Institution"]',

            style: {

                "background-color": "#F59E0B"

            }

        },

        {
            selector: 'node[type = "Government"]',

            style: {

                "background-color": "#9e39d8"

            }

        },

        {
            selector: 'node[type = "SoLaWi"]',

            style: {

                "background-color": "#125da4"

            }

        },

        {
            selector: 'node[type = "Depot"]',

            style: {

                "background-color": "#9cd0fd"

            }

        },

        {
    selector: ".selected",

    style: {

        "border-width": 4,

        "border-color": "#5a5a5a",

        "z-index": 999

    }

},

{
    selector: ".faded",

    style: {

        "opacity": 0.20

    }

},

{
    selector: ".highlighted-edge",

    style: {

        "line-color": "#333",

        "width": 4,

        "opacity": 1

    }

},
// ==========================================
// Edge Styles
// ==========================================

{
    selector: "edge",

    style: {

        "curve-style": "unbundled-bezier",

        "control-point-distances": 30,

        "control-point-weights": 0.5,

        "line-color": "#BBBBBB",

        "width": 2

    }

},

{
    selector: 'edge[category = "Institutional/Organisational"]',

    style: {

        "line-color": "#f6c72e"

    }

},

{
    selector: 'edge[category = "Educational"]',

    style: {

        "line-color": "#0ebd3d"

    }

},

{
    selector: 'edge[category = "Financial"]',

    style: {

        "line-color": "#df2d2d"

    }

},

{
    selector: 'edge[category = "Produce"]',

    style: {

        "line-color": "#3B82F6"

    }

},

{
    selector: 'edge[category = "Social"]',

    style: {

        "line-color": "#a7a7a7"

    }

},

];

}