use ("product");
db.electronics.find();

//name ucuz olan ilk dökümanı silelim
use ("product");
db.electronics.deleteOne({"name":"enucuz"});


use ("product");
db.electronics.deleteMany({"name":"Woww"});

use ("product");
db.electronics.deleteMany({});

use ("product");
db.electronics.insertOne({"name":"laptop",
                        "brand":{"name":"Lenova","model":1250},
                          "city":["Ankara","Bursa"],
                           "active":true});


 use ("product");
 db.electronics.find({"brand.model":1250});

 use ("product");
 db.electronics.find({"city":"Bursa"});



 //=================================================
//                   AGGREGATION
//=================================================
// 1) Aggregation, dokumanlardaki verilerin islenmesi ve hesaplanan 
//    sonuclarin donmesini saglayan islemlerdir. 
//
// 2) Aggregation islemleri, farklı dokumanlardaki degerleri gruplandirabilir.
//
// 3) Bu gruplanan veriler uzerinde cesitli islemlerin gereceklestirelerek tek 
//    bir sonuc degerinin donmesi saglanabilir.
//
// 4) MongoDB, 3 farklı yontem ile aggregation gerceklestirmeye izin verir.
//     A) aggregation pipeline (toplama boru hattı) --> best practice...
//     B) map-reduce function (map indirgeme)
//     C) single-purpose aggregation (tek-amaç toplama) 
//
// 5) Aggregiation, SQL'deki Join islemlerine benzetilebilir. 
//=================================================
//             AGGREGATION PIPELINE
//=================================================
// SYNTAX
// 
//   pipeline = [
//   { $match : { … }},
//   { $group : { … }},
//   { $sort : { … }},
//      ...
//   ]
//   db.collectionName.aggregate({pipeline}, {options})
//
//  $match() –> Verileri secerken filtrelemek icin
//  $group({_id : "$field"}) - >islenen verilerin gruplanmasi icin 
//  $sort() -> Sonuclarin siralanmasi icin


use('okul');
db.grades.insertMany([
{"_id":6305, "name": "A. MacDyver", "assignment":5, "points" :24},
{"_id":6308, "name": "B. Batlock", "assignment":3, "points" :22},
{"_id":6312, "name": "M. Tagnum", "assignment":5, "points" :30},
{"_id":6319, "name": "R. Stiles", "assignment":2, "points" :12},
{"_id":6322, "name": "A. MacDyver", "assignment":2, "points" :14},
{"_id":6334, "name": "R. Stiles", "assignment":1, "points" :10},
{"_id":6345, "name": "A. Stiles", "assignment":1, "points" :10}
]);

use('okul');
db.grades.find()


use('okul');
var pipeline=[
    //taskin aşamaları
    {$group:{"_id":"$assignment", "total_points":{$sum:"$points"}}}//identifier
];
db.grades.aggregate(pipeline);


use('okul');
var pipeline=[
    //taskin aşamaları
    {$group:{"_id":"$assignment", "avg_points":{$avg:"$points"}}}//identifier
];
db.grades.aggregate(pipeline);


use('okul');
var pipeline=[
    //taskin aşamaları
    {$group:{"_id":"$assignment", "avg_points":{$avg:"$points"}}},
    {$sort:{avg_points:1}}
];
db.grades.aggregate(pipeline);



4//assignment değeri 4 ten küçük olan 
//her bir assignmentın max puanlarını hesaplayalım,
//azalan şekilde listeleyelim.

use('okul');
var pipeline=[
     {$match:{"assignment":{$lt:4}}},
     {$group:{_id:"$assignment", max_points:{$max:"$points"}}},
     {$sort:{max_points:-1}}
];
db.grades.aggregate(pipeline);




use('okul');
var pipeline=[
   {$match: {"name":{$regex:"^A"}}},
   {$group:{"_id":"" , total_points:{$sum:"$points"}}}
];
db.grades.aggregate(pipeline);


5//ismi A ile başlayan documentların toplam puanlarını 
//hesaplayıp listeleyelim 

use('okul');
var pipeline=[
   {$match: {"name":{$regex:"^A"}}},
   {$group:{"_id":"" , total_points:{$sum:"$points"}}}
];
db.grades.aggregate(pipeline);

//alternatif
use('okul');
var pipeline=[
   {$match: {"name":{$regex:"^A"}}},
   {$group:{"_id":null , total_points:{$sum:"$points"}}}
];
db.grades.aggregate(pipeline);


6///ismi s ile biten documentların toplam puanlarını 
//hesaplayıp listeleyelim 
use('okul');
var pipeline=[
    {$match: {"name":{$regex:"s$"}}},
    {$group:{"_id":null , total_points:{$sum:"$points"}}}
 ];
 db.grades.aggregate(pipeline);




 use('okul');
 
  db.grades.count({"points":{$lt:19}}).count();


  use("okul")
db.exams.insertMany(
[{"student":"dave", "midterm":80,  "final":100},
{"student":"dave",  "midterm":85,  "final":52},
{"student":"fred",  "midterm":60,  "final":100},
{"student":"wilma", "midterm":55,  "final":50},
{"student":"barnie","midterm":60,  "final":75},
{"student":"wilma", "midterm":94,  "final":99},
{"student":"betty", "midterm":95,  "final":91}]);

use("okul")
db.accounting.insertMany(
[{"name":"dave", "expense":[-80, -40, -50, -120], "earn":[100, 150]},
{"name":"dave",  "expense":[-60, -30, -20],       "earn":[200, 50, 130]},
{"name":"fred",  "expense":[-80, -40, -50],       "earn":[300, 450]},
{"name":"wilma", "expense":[-80, -120],           "earn":[500, 50, 70, 10]},
{"name":"barnie","expense":[-140, -50, -120],     "earn":[400]},
{"name":"wilma", "expense":[-120],                "earn":[22, 375, 65]},
{"name":"betty", "expense":[-180, -40, -70, -12], "earn":[500, 650, 400]}]);

use("okul");
db.exams.aggregate({$addFields:{"result":{$sum:["$midterm","$final"]}}});




use("okul");

var pipeline=[
    {$addFields:{total_expense:{$sum:"$expense"}, total_earn:{$sum:"$earn"}}}
];
db.accounting.aggregate(pipeline);


