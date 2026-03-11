const map = L.map('map').setView([3.15,113.05],8);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

fetch('geojson/kemena.geojson')
.then(res=>res.json())
.then(data=>{

const kemena = L.geoJSON(data,{

style:{
color:"#0b7285",
weight:2,
fillOpacity:0.4
},

onEachFeature:function(feature,layer){

layer.on('click',function(){

loadDashboard();

});

}

}).addTo(map);

map.fitBounds(kemena.getBounds());

});

function loadDashboard(){

fetch('data/kemena_dataset.json')
.then(res=>res.json())
.then(data=>{

document.getElementById("population").innerHTML=data.population;

document.getElementById("area").innerHTML=data.area+" km²";

document.getElementById("density").innerHTML=data.density;

document.getElementById("income").innerHTML="RM "+data.median_income;

createCharts(data);

});

}

function createCharts(data){

new Chart(document.getElementById("genderChart"),{

type:"pie",

data:{
labels:["Male","Female"],
datasets:[{
data:[data.male,data.female]
}]
}

});

new Chart(document.getElementById("ageChart"),{

type:"bar",

data:{
labels:["0-14","15-64","65+"],
datasets:[{
label:"Age Structure %",
data:[data.age_0_14,data.age_15_64,data.age_65]
}]
}

});

}
