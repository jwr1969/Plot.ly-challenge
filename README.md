# Plot.ly-challenge - Belly Button Biodiversity
  
In this assignment, I built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels! The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly
 
1. To enable the creation of the dashboard I first read in the data using d3 (d3.json) library and examined the data to understand its structure and how I could best parse it to get to the information I needed.
 
2. a) Before creating any charts I needed to create a drop-down menu so that the user could select a particular ID relating a particular subject (person’s navel). This required grabbing all of the IDs and appending them to the drop-down ID with d3.select(“#selectDataset”) in the index.html file and then appending option tags with each subject ID inside. 2 b)I then created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual with `sample_values` as the values for the bar chart, `otu_ids` as the labels for the bar chart and `otu_labels` as the hovertext for the chart.
 
 
3. I created a bubble chart that displays each sample using `otu_ids` for the x values, using `sample_values` for the y values, using `sample_values` for the marker size, using `otu_ids` for the marker colors and using `otu_labels` for the text values.
 
4. Individual's demographic information (key, value pair) i.e. metadata was displayed in a side panel.
  
5. All of the plots update any time that a new sample is selected.
  
 6.  A Gauge Chart from <https://plot.ly/javascript/gauge-charts/> was adapted to plot the weekly washing frequency of the individual.
  
7. The page (my app) was deployed to a free static page hosting service, in this case GitHub Pages.
 
John Russell
5th July, 2021
 

### References
 Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)
