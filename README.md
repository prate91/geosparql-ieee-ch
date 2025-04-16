# GeoSPARQL Queries for the Paper "TITLE"

This repository contains the text of the queries and web application that provides comprehensive answers to all the queries presented in the paper "TITLE". The repository is structured to ensure easy navigation and access to specific queries and their respective answers.

Query 1 (Q1) - Value chains operating in the Carpathian Mountains

```
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/> 
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX narra: <https://dlnarratives.eu/ontology#>
PREFIX osm: <https://www.openstreetmap.org/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX osm2rdfkey: <https://osm2rdf.cs.uni-freiburg.de/rdf/key#>

SELECT ?nlabel ?clabel ?wktLau
WHERE {	
    ?narra narra:isAboutCountry ?country ;
           narra:isAboutLAU ?lau ;
    	      rdfs:label ?nlabel .
    ?country rdfs:label ?clabel .
    ?lau geo:hasGeometry ?glau .
    ?glau geo:asWKT ?wktLau . 
    { 
    	SELECT ?wkt WHERE {
        	SERVICE 
      		  <https://qlever.cs.uni-freiburg.de/api/osm-planet> { 
            	?osm_id osm2rdfkey:wikidata wd:Q1288 ;
                        geo:hasGeometry ?geometry .
                ?geometry geo:asWKT ?wkt .
        	} 
    	}
  	}
   FILTER(geof:sfIntersects(?wktLau,?wkt)).
}
```

![Results of Q1](img/carpathian.png "Results of Q1")

## Structure of the application

In the folder web-app is possible to find the web application

- index.html
  - This is the main page of the application.
  - It contains an index table listing all the queries from the thesis.
  - Clicking on a row in the table will open the respective page that provides the answer to that query.


## Usage


1. Open the Application:
   - Start by opening the 'index.html' file in your web browser.

2. Navigate to a Query:
   - Browse through the index table to find the query of interest.
   - Click on the row corresponding to the desired query.

3. View the Answer:
   - Upon clicking, you will be redirected to a page that contains the answer to the selected query.


## Files


- index.html: The main index page with a table of all the queries.
- geoQueryVizQ1.html, geoQueryVizQ2.html, geoQueryVizQ3.html, geoQueryVizQ4.html: Individual pages for each query, each displaying a map with the results.



Contact


For any questions or feedback, please contact Nicolò Pratelli at nicolo.pratelli@isti.cnr.it.
