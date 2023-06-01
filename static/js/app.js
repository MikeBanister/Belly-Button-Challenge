const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"





let dropDownMenu = d3.select("#selDataset");
let sampleBox = d3.select("#sample-metadata")

d3.json(url).then(function(data) {

    dropDownMenu
        .selectAll("myOptions")
        .data(data.names)
        .enter()
        .append('option')                                                             
        .text(function (d) {return d;})
        .attr("value",function (d) {return d;})
    
    dropDownMenu.on("change", getData);

    let defaultData = data.samples[0];

    let demoInfo = data.metadata.find(object => object.id === 940)

    for (var key in demoInfo) {
        var line = key + ": " + demoInfo[key];
        sampleBox.append("p").text(line);
    };

    function initBar() {
        let barData = [{
            type: "bar",
            orientation: "h",
            x: defaultData.sample_values.slice(0,10),
            y: defaultData.otu_ids.map(i => "OTU " + i),
            text: defaultData.otu_labels,
        }];
        let barlayout = {
            height:600,
            width:800,
            yaxis:{
                autorange:'reversed'
            }
        };
        Plotly.newPlot("bar", barData, barlayout)
    }

    initBar();

    function initBubble() {
        let bubbleData = [{
            x: defaultData.otu_ids,
            y: defaultData.sample_values,
            mode: "markers",
            text: defaultData.otu_labels,
            marker: {
                size: defaultData.sample_values,
                color: defaultData.otu_ids,
            }
        }]
        let bubbleLayout = {
            height: 600,
            width: 800
        }
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    }

    initBubble();




    function getData() {
   
        let value = dropDownMenu.property("value")

        let selected = data.samples.find(object => object.id == value)

        let newX = selected.sample_values
        let newY = selected.otu_ids
        let newText = selected.otu_labels

        Plotly.restyle("bar", "x", [newX.slice(0,10)])
        Plotly.restyle("bar", "y", [newY.map(i => "OTU " + i)])
        Plotly.restyle("bar", "text", [newText])
    
        Plotly.restyle("bubble", "x", [newY])
        Plotly.restyle("bubble", "y", [newX])
        Plotly.restyle("bubble","text", [newText])
        Plotly.restyle("bubble","marker.size", [newX])
        Plotly.restyle("bubble","marker.color", [newY])

        sampleBox.html("");

        let newDemoInfo = data.metadata.find(object => object.id == value)

        for (var key in newDemoInfo) {
            var line = key + ": " + newDemoInfo[key];
            sampleBox.append("p").text(line);
        };


    };





  });

 