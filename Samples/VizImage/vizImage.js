// Wrap everything in an anonymous function to avoid polluting the global namespace
;(function () {
  var yourEmbeddedDataSpec = {
    description: "A simple chart with embedded data.",
    data: {
      values: [
        { Category: "A", Sales: 28 },
        { Category: "B", Sales: 55 },
        { Category: "C", Sales: 43 },
        { Category: "D", Sales: 91 },
        { Category: "E", Sales: 81 },
        { Category: "F", Sales: 53 },
        { Category: "G", Sales: 19 },
        { Category: "H", Sales: 87 },
        { Category: "I", Sales: 52 },
      ],
    },
    mark: tableau.MarkType.Bar,
    encoding: {
      columns: {
        field: "Category",
        type: tableau.VizImageEncodingType.Discrete,
      },
      rows: {
        field: "Sales",
        type: tableau.VizImageEncodingType.Continuous,
        hidden: true,
      },
      color: {
        field: "Sales",
        type: tableau.VizImageEncodingType.Continuous,
        palette: "tableau-map-temperatur",
      },
      text: { field: "Category", type: tableau.VizImageEncodingType.Discrete },
      size: { field: "Category", type: tableau.VizImageEncodingType.Discrete },
    },
  }

  tableau.extensions.createVizImageAsync(yourEmbeddedDataSpec).then(
    (svg) => {
      console.log(`SVG ${svg}`)
      var blob = new Blob([svg], { type: "image/svg+xml" })
      var url = URL.createObjectURL(blob)
      var image = document.createElement("img")
      image.src = url
      image.style.maxWidth = "100%"
      var vizApiElement = document.getElementById("viz-container")
      vizApiElement.appendChild(image)
      image.addEventListener(
        "load",
        function () {
          return URL.revokeObjectURL(url)
        },
        { once: true }
      )
    },
    (err) => {
      console.log(err)
    }
  )
})()
