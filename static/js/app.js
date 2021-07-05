// Call function to create dropdown list of sample ids
createDropDown()

// Listens for a dropdown selection and gets the id
// the variable a represents the smaple ID and is returned by the optionChanged(this.value) in index.html
// creates the 3 charts and metadata readout
function optionChanged(a)    {
    CreateBarChart(a);
    CreateBubbleChart(a);
    DisplaySampleMetaData(a);
    CreateGaugeChart(a);
};

// ====================================================//
// define Functions called above

function CreateBarChart(a)    {

    // Use D3 to get data from samples.json
    d3.json("samples.json").then((data) => {
        // Anonymous function to filter on id
        var sampleData = data.samples.filter(function(sample) {
            return sample.id === a;
        });

        // Create ylabels - reversing based on plotly defaults
        var ylabel = sampleData[0].otu_ids.reverse().map(object => `OTU ${object}`);

        // Trace1 for the horizontal bar chart
        var trace1 = {
            x: sampleData[0].sample_values.slice(0,10).reverse(),
            y: ylabel,
            // hoverfunction references otu_labels
            hovertemplate: sampleData[0].otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };

        // data
        data = [trace1];

        // layout
        var layout = {
            title: "Top 10 OTU_ids by sample value",
            margin:  {
                l: 100,
                r: 20,
                t: 50,
                b: 20
            }
        };

        // render the plot at the tag "bar"
        Plotly.newPlot("bar", data, layout);
    });   
}

function CreateBubbleChart(a)    {

    // Use D3 to get data
    d3.json("samples.json").then((data) => {
        // Anonymous function to filter on id
        var sampleData = data.samples.filter(function(sample) {
            return sample.id === a;
        });

        // marker colors defined by using otu_id value
        var markerColors = sampleData[0].otu_ids.map(object => `rgb(${object/10},100,100)`);

        // Trace1 for the horizontal bar chart
        var trace2 = {
            x: sampleData[0].otu_ids,
            y: sampleData[0].sample_values,
            hovertemplate: sampleData[0].otu_labels,
            // marker size based on sample_values value
            marker: {size: sampleData[0].sample_values,
                        color: markerColors},
            mode: "markers"
            
        };

        // data
        data = [trace2];

        // layout
        var layout = {
            title: "Bacteria Cultures Per Sample",
            margin:  {
                l: 100,
                r: 20,
                t: 50,
                b: 20
            }
        };

        // render the plot at the tag "bubble"
        Plotly.newPlot("bubble", data, layout);
    });   
}

function DisplaySampleMetaData(a)    {

    // Use D3 to get data
    d3.json("samples.json").then((data) => {
        // Anonymous function to filter on id
        var metaData = data.metadata.filter(function(meta) {
            // Sample ID is expressed as an integer not a string in metadata
            return meta.id.toString() === a;
        
        });

        // console.log(metaData);

        var metaDataList = d3.select("#sample-metadata")

        // remove previous data at p tag if any
        metaDataList.selectAll("p")
        .remove();
        
        // loop through metadata object grabbing key and value
        Object.entries(metaData[0]).forEach(([key, value]) => {
            metaDataList.append("p")
            .html(function(d)   {
            return `${key.toUpperCase()}: ${value}`;

            });
        });
    



    });   
}

function CreateGaugeChart(a)    {

    // Use D3 to get data
    d3.json("samples.json").then((data) => {
        // Anonymous function to filter on id
        var metaData = data.metadata.filter(function(meta) {
            return meta.id.toString() === a;
        
        });

        
        // get washing frequency from metadata object
        var washFreq = metaData[0].wfreq;
        // console.log(washFreq);

        // Create gauge chart
        var trace3 = {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
              axis: { range: [null, 9] },
              steps: [
                { range: [0, 3], color: "rgb(200,200,240)" },
                { range: [3, 6], color: "rgb(200,200,200)"},
                { range: [6, 9], color: "rgb(200,200,160)" }
              ],
              
            }
          };

        // data
        data = [trace3];

        // layout
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", data, layout);

        
    });   
}




function createDropDown() {
    d3.json("samples.json").then((data) => {
    
    var testSubject = d3.select("#selDataset")
    var testSubjects = testSubject.selectAll("option")
    
    // append each sample ID as BB_{Sample_ID} and value={Sample_ID} within option tags to create dropdown
    testSubjects.data(data["names"])
    .enter()
    .append("option")
    .html(function(d)   {
        return `BB_${d}`;
    })
    .attr("value", function(d)   {
        return d})
    })
};   






