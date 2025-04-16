const url= "https://geosparql.isti.cnr.it/fuseki/moving/query?output=json&query=";
// const named_graph = "https://imagoarchive.it/fuseki/imago/archive";
// const url= "http://localhost:3030/moving/query?output=json&query=";
const named_graph = "urn:x-arq:UnionGraph";

function parseWKT(string){
   // let text = '27 months';
   let regex = /POINT\((?<longitude>-?\d+\.\d+) (?<latitude>-?\d+\.\d+)\)/;
   return [longitude, latitudeunit] = regex.exec(string) || [];
 
 }

 function onEachFeature(feature, layer) {
   // does this feature have a property named popupContent?
   // console.log(feature.properties)
   if (feature.properties) {
       layer.bindPopup(feature.properties.LAU_NAME);
   }
}


document.addEventListener('DOMContentLoaded', function () {
   // var json = []
   // console.log(data);


let headers = new Headers();
//headers.append('X-CSRFToken', csrf);
headers.append('X-Requested-With', 'XMLHttpRequest');
 
var query_text = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
"PREFIX geof: <http://www.opengis.net/def/function/geosparql/> " +
"PREFIX geo: <http://www.opengis.net/ont/geosparql#>" +
"PREFIX narra: <https://dlnarratives.eu/ontology#>" +
"PREFIX osm: <https://www.openstreetmap.org/>" +
"PREFIX wd: <http://www.wikidata.org/entity/>" +
"PREFIX osm2rdfkey: <https://osm2rdf.cs.uni-freiburg.de/rdf/key#>" +
"" +
"SELECT ?nlabel ?clabel ?wktLau " +
"WHERE {	" +
"    ?narra narra:isAboutCountry ?country ;" +
"           narra:isAboutLAU ?lau ;" +
"    	      rdfs:label ?nlabel ." +
"    ?country rdfs:label ?clabel ." +
"    ?lau geo:hasGeometry ?glau ." +
"    ?glau geo:asWKT ?wktLau . " +
"    { " +
"    	SELECT ?wkt WHERE {" +
"        	SERVICE " +
"      		  <https://qlever.cs.uni-freiburg.de/api/osm-planet> { " +
"            	?osm_id osm2rdfkey:wikidata wd:Q1288 ;" +
"                        geo:hasGeometry ?geometry ." +
"                ?geometry geo:asWKT ?wkt ." +
"        	} " +
"    	}LIMIT 1" +
"  	}" +
"   FILTER(geof:sfIntersects(?wktLau,?wkt))." +
"}";
                  
                 
var query = url + encodeURIComponent(query_text);
console.log(query);

// Fetch current annotation
fetch(query,
      {
         method: 'GET',
         headers: headers,
         mode: 'cors' // questo forse va tolto se non si usa HTTPS?
      })
      .then((response) => {
         return response.json();
      })
      .then((context) => {
         /*
            Qui riceviamo il context in JSON, quindi possiamo
            prendere la variabile "data" e aggiornarla. Volendo si
            può fare la stessa cosa anche per la variabile "json"
            che contiene il JSON formattato
         */
         data = context.results.bindings;
         console.log(data);
          //init leaflet  map
      var map = new L.Map('map');  
      
      map.addControl(new L.Control.Fullscreen());                     
             
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
         maxZoom: 18
      }).addTo(map);
      var italy = new L.LatLng(42.504154,15.646361); 
      map.setView(italy, 4);
     
     var alps_WKT = "MULTIPOLYGON(((17.8285389 48.5404419,17.8321825 48.465638,17.8706346 48.4720117,17.9159532 48.5357048,17.99915 48.5745275,18.0731004 48.6097606,18.0898111 48.6476061,18.092573 48.6901147,18.107054 48.8058961,18.1698247 48.839493,18.2097681 48.8487549,18.2541236 48.8371074,18.2587665 48.8290756,18.2771944 48.7967393,18.2963632 48.7330426,18.3680228 48.7239212,18.4167839 48.7168406,18.4606306 48.7311396,18.5029391 48.7821697,18.5507334 48.777142,18.6203886 48.8542938,18.6454233 48.8541583,18.6673899 48.7798533,18.5600867 48.6588364,18.4623742 48.5829109,18.4336805 48.5747011,18.3915766 48.5860415,18.3696856 48.5207793,18.3006501 48.5277928,18.225893 48.4981167,18.0843594 48.3443576,18.2367085 48.3565009,18.2998367 48.4532522,18.4408728 48.4701451,18.4680239 48.4495251,18.4531594 48.3857695,18.542145 48.3752941,18.5878924 48.3486722,18.5818393 48.3272065,18.6458434 48.3142854,18.724458 48.3503846,18.7666972 48.347032,18.7927997 48.3175795,18.7872183 48.2682567,18.7900764 48.2668621,18.8200867 48.2525054,19.0143037 48.3250105,19.0378608 48.3651697,19.067657 48.3681528,19.100701 48.2991192,19.0971518 48.251434,19.0324991 48.2259865,18.7587143 47.932076,18.8195746 47.816847,18.8999169 47.7730223,18.9260094 47.7647151,18.9548486 47.7707149,18.9706414 47.7997809,19.0090936 47.8140772,19.0612786 47.8149994,19.1271945 47.791018,19.3155576 47.6065975,19.4897433 47.687581,19.6078464 47.8297539,19.7122165 47.8020884,19.8962375 47.8113119,19.9951144 47.7780996,20.1889637 47.8523404,20.6966478 47.9261426,20.7504427 48.0925579,20.7174655 48.1972201,20.5664035 48.2777113,20.7185767 48.2776355,20.7586642 48.3215622,20.9017207 48.1509293,21.1573368 48.4032891,21.2443048 48.5324131,21.0649095 48.5329767,20.9042352 48.5729731,20.7277673 48.536159,20.8493028 48.5856932,20.6968661 48.5938693,20.854796 48.6211096,21.0673293 48.6055812,21.1303079 48.617918,21.1844657 48.6801183,21.2624171 48.7222712,21.3121019 48.6682928,21.3378521 48.7059163,21.3681562 48.6648056,21.3478075 48.5856932,21.2667833 48.4765639,21.2489305 48.3963862,21.180266 48.3206481,21.1993755 48.2453524,21.3051722 48.1740243,21.3931247 48.1953892,21.4623555 48.2865957,21.5319281 48.309118,21.5922533 48.3626374,21.6471849 48.3845311,21.5922533 48.4610849,21.6265855 48.4738326,21.6979967 48.413708,21.7378221 48.3918269,21.7920859 48.4484887,21.7309557 48.5011385,21.6732774 48.5193342,21.6210924 48.4938584,21.5922533 48.5229726,21.5115364 48.5455623,21.5371333 48.590468,21.5414415 48.6392622,21.5723793 48.7397731,21.6613278 48.8018017,21.6042464 48.9050922,21.5609968 48.9674654,21.5422682 49.0364024,21.6674373 48.8910122,21.9746736 48.8114221,22.1671362 48.851868,22.2655967 48.7986959,22.2389928 48.7011024,22.3663861 48.5497377,22.5037354 48.5441361,22.6324883 48.5545753,22.689259 48.4835778,22.8563651 48.4508326,23.0117265 48.3137677,23.0932603 48.3343441,23.1385789 48.2804522,23.184613 48.2331874,23.1905521 48.2291634,23.1878881 48.2236721,23.2021249 48.2193456,23.2040966 48.1926008,23.1778646 48.181515,23.1725165 48.1759829,23.1705342 48.1738873,23.1911071 48.1624727,23.2019086 48.1527269,23.2084832 48.144352,23.2271705 48.1418742,23.2477776 48.1343487,23.2408808 48.1326156,23.2475275 48.1209022,23.242061 48.1163754,23.2336242 48.1122693,23.2451845 48.1067219,23.2430136 48.1046785,23.2368289 48.1003699,23.2379751 48.0973202,23.2198825 48.098479,23.2114475 48.0952002,23.217167 48.0908716,23.2091948 48.0822214,23.1867319 48.0825583,23.1610546 48.0580603,23.2498792 47.9336931,23.2429498 47.8159216,23.3191674 47.7342441,23.4448215 47.6598398,23.3816501 47.6376362,23.2058688 47.6801848,22.9449435 47.6764863,22.810361 47.5468735,22.6757785 47.4949384,22.3544284 47.4540961,22.1594211 47.4039282,21.9726535 47.2643219,22.1786472 47.2680496,22.3544284 47.3239324,22.4122191 47.3046146,22.2226096 47.2405894,22.0020845 47.1596685,21.950958 47.0621566,22.1704074 47.1206088,22.2799554 47.0573423,22.5282143 47.0482121,22.600783 47.0057994,22.5828062 46.9826381,22.5286005 46.968266,22.4123541 47.0109095,22.3528458 47.0175449,22.2117613 47.0008991,22.109516 46.9941515,21.8490573 46.9277605,21.9207668 46.793305,22.1335715 46.7508996,22.1429416 46.6814807,21.9808932 46.7078545,21.9396945 46.6381243,21.9836398 46.589071,21.9583524 46.4963312,22.0710203 46.4693338,22.1249902 46.3192082,21.9873163 46.3605275,21.8030396 46.3865803,21.9574361 46.3192624,21.8125173 46.2474292,21.7525007 46.2379732,21.6821615 46.2853476,21.6059862 46.2073995,21.5899798 46.1193865,21.7133787 46.100799,21.7421797 46.0592527,21.5863047 46.0227702,21.4096042 45.9606989,21.4343207 45.8670665,21.5469333 45.8134884,21.7199652 45.8173189,22.1539252 45.8708914,22.3159763 45.830715,22.055051 45.7732724,21.9149753 45.7943415,21.8270847 45.7426121,22.0935031 45.606354,22.2198459 45.5101985,22.4261854 45.5255926,22.3246749 45.4566265,22.3350766 45.3852753,22.3138082 45.2696092,22.2920953 45.2578104,22.2312225 45.3437321,22.0814259 45.5162361,21.8847601 45.5832936,21.636645 45.5959459,21.714472 45.4639873,21.6660065 45.3358408,21.5450598 45.2735993,21.5108078 45.1009947,21.6211957 45.0929334,21.7223354 45.0552652,21.7343795 44.9488055,21.6682112 44.8933962,21.4545656 44.8592717,21.3550625 44.8273379,21.380856 44.8178765,21.2805148 44.6491183,21.1651584 44.5865571,21.1898776 44.2471685,21.1184665 44.1743268,21.2228366 44.0560137,21.3546725 43.9097679,21.3821384 43.6877378,21.6458102 43.5525314,21.8243381 43.3990629,22.2802707 43.5684538,22.2994968 43.8008384,22.324216 43.9236174,22.4478122 44.0994227,22.5549303 44.0836403,22.6043687 44.1329432,22.5288364 44.2579886,22.4340793 44.4867109,22.5219699 44.6549799,22.4780246 44.703804,22.415785 44.7089312,22.4754727 44.7188741,22.5025676 44.6947004,22.591116 44.6488506,22.6722959 44.6854916,22.730461 44.7670762,22.7890779 44.8890959,22.8717606 44.9529643,22.878024 45.0076606,22.9345692 45.0425019,23.0083563 45.09943,23.1266616 45.1244911,23.3056206 45.1312079,23.3698655 45.1772771,23.7238958 45.1955883,24.3570352 45.2089501,24.3378743 45.2360461,24.3525483 45.2461392,24.3785619 45.2327234,24.3801905 45.2099638,24.7298896 45.010665,24.746431 45.0119756,24.8340013 44.9299324,24.913823 45.0010877,24.9685485 44.9998406,24.9703649 44.9721134,24.9231261 44.9317799,24.947958 44.8732712,25.1132341 44.8047971,25.2938569 44.7778585,25.3770433 44.8811753,25.4041291 44.9909303,25.4789094 44.9447126,25.5902537 44.9498245,25.7887389 45.0107125,25.9111058 45.0700383,25.9213865 45.0705758,25.9344531 45.0704762,25.9447959 45.0707487,25.9472962 45.0744942,25.9542683 45.0719498,25.9663738 45.0719107,26.1211843 44.9695631,26.2518256 44.9803463,26.4605658 45.0308366,26.6653505 45.128704,26.7959732 45.2543088,26.9879095 45.3560093,27.1252386 45.579449,27.1087592 45.77519,27.1636908 45.932054,27.143022 46.1606323,27.0096341 46.3228067,26.9488437 46.4467512,26.9063677 46.6349253,26.8645051 46.8884653,26.8066351 47.1037876,26.4911126 47.5815088,26.0588848 47.9790973,25.6311008 48.2045427,25.2300998 48.3014685,24.9389621 48.5184254,24.6011325 48.6256492,24.5022556 48.7616225,24.1589301 48.8972304,24.148345 48.9035043,23.8694376 49.0685314,23.7343082 49.1503506,23.6937382 49.2037932,23.5061375 49.2812104,23.2097564 49.3918817,23.061802 49.4435658,22.8950762 49.5362551,22.7213864 49.686785,22.6969673 49.8708737,22.506964 49.9358836,22.1225179 50.017348,21.5060086 50.0610036,21.3171081 49.9717399,20.8010579 49.9576955,19.7094617 49.8309034,18.9404187 49.5893557,18.4146448 49.1467507,18.3557571 49.0969298,18.3344569 49.0605542,18.1069199 48.9228364,18.0494942 48.8774469,18.0546556 48.8493554,18.0170478 48.8085851,17.9287055 48.817375,17.8761278 48.7770087,17.8953539 48.7516627,17.8650011 48.6681736,17.8530361 48.6141096,17.8285389 48.5404419)))"
     
     var wicket_alps = new Wkt.Wkt();
      var readGeometry_alps = wicket_alps.read(alps_WKT);
      var geometry_alps= readGeometry_alps.toJson()
     
     var mcg = L.markerClusterGroup();
     
     // Position markers
     var allGeometry= [];
     for(let key in data){
         
         // var occurrences = data[key].n_occ.value;
         // if(data[key].occDeVulgari != 0 && data[key].work.name == "De Vulgari Eloquentia") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occDeVulgari	+ "</br>"
         // }
         // if(data[key].occEgloge != 0 && data[key].work.name == "Egloge") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occEgloge + "</br>"	
         // }
         // if(data[key].occEpistole != 0 && data[key].work.name == "Epistole") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occEpistole + "</br>"	
         // }
         // if(data[key].occMonarchia != 0 && data[key].work.name == "Monarchia") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occMonarchia + "</br>"	
         // }
         // if(data[key].occQuestio != 0 && data[key].work.name == "Questio de Aqua et Terra") {
         //     occurrences += "<b>Occorrenze:</b> " + data[key].occQuestio + "</br>"	
         // }

         // Replace the specified string
         var outputString = data[key].wktLau.value.replace('<http://www.opengis.net/def/crs/OGC/1.3/CRS84>', '');
         // var outputString = data[key].wktLau;

         var wicket = new Wkt.Wkt();
         var readGeometry = wicket.read(outputString);
         var geometry= readGeometry.toJson()
         
         var polygon = {
            "type": "Feature",
            "properties": {
               "popupcontent": "",
               "name": data[key].nlabel.value
            },
            geometry
         };
         allGeometry.push(polygon);

      }
       
                 
         var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
         
         });
               //   } else {
                 
               //         var greenIcon = new L.Icon({
               //         iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
               //         shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
               //         iconSize: [25, 41],
               //         iconAnchor: [12, 41],
               //         popupAnchor: [1, -34],
               //         shadowSize: [41, 41]
               //        }); 
 
                 
                 
               //   }
         
               // console.log(data[key].coord.value) 
              
            var alpsStyle = {
               "color": "#B0413E",
               "weight": 5,
               "opacity": 0.65
         }
         L.geoJSON(geometry_alps, {
            onEachFeature: function (feature, layer) {
             layer.bindPopup("Alps");
            },
            style: alpsStyle
          }).addTo(mcg)
          var polygonStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
      }
               L.geoJSON(allGeometry, {
                  onEachFeature: function (feature, layer) {
                   layer.bindPopup('<a target="_blank" href="https://www.wikidata.org/wiki/'+feature.properties.id+'"><p>'+feature.properties.name+'</p></a>');
                  },
                  style: polygonStyle
                }).addTo(mcg)

               
               
               //  var mark= L.marker([coord[2],coord[1]], {icon: greenIcon}).bindPopup("</br><b>Luogo:</b> "+ data[key].placeName.value +"<br/>"+ "<b>Biblioteca:</b> " + data[key].libraryName.value +"<br/><br/>"+ "<button type='button' class='btn btn-primary show-manuscript' data-iri='"+data[key].library.value+"' onclick='showManuscripts(this)'>Mostra manoscritti</button> ").addTo(mcg) // Add into the MCG instead of directly to the map.
                

   
     mcg.addTo(map);
        


      })
      .catch((error) => {
         console.error('Error:', error);
      });
    });


 



