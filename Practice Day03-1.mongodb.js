//****************************************************
//aggregation pipeline
//SYNTAX
//pipeline=[
//{$match:{...}},
//$group:{...},
//$sort:{...},
//...]
​
//db.collectionName.aggregation(pipeline,options)
​
//$match -> verileri filtrelemek için
//$group ->({_id:"$field"}) -> işlenen verileri gruplamak için
//$sort -> sonuçların sıralanması için
//*****************************************************
​
use ("school")
db.students.remove({})
​
use ("school");
db.students.insertMany([ 
​
    {"name":"Peyami Safa",
    "age":45,
    "city":"İstanbul",
    "grade":535,
    "department":"Math",
    "books":[{"name":"Math","category":"lesson"},
    {"name":"Sefiller","category":"novel"}]
    },
    
    {"name":"John Steinbeck",
    "age":55,
    "city":"Bursa",
    "grade":435,
    "department":{"name":"IT","language":"tr"},
    "points":[70,90,100]},
    
    {
        "name": "Ahmet Ümit",
        "age": 35,
        "city": "İstanbul",
        "grade": 463,
        "department":{"name": "IT",
        "language":"tr"}
        },
      {
      "name": "R.Nuri Güntekin",
        "age": 43,
        "city": "Ankara",
        "grade": 567,
        "department":{"name": "Math",
        "language":"eng"}
      },
      {
      "name": "S.Faik Abasıyanık",
        "age": 55,
        "city": "Antalya",
        "grade": 409,
        "department":{"name": "Chemistry",
        "language":"eng"}
      },
      {
      "name": "Yaşar Kemal",
        "age": 23,
        "city": "İstanbul",
        "grade": 390,
        "department":{"name": "English",
        "language":"eng"}
    
      },
      {
      "name": "Halide E.Adıvar",
        "age": 26,
        "city": "İzmir",
        "grade": 423,
        "department":{"name": "Math",
        "language":"tr"}
      },
      {
      "name": "Charles Dickens",
        "age": 35,
        "city": "İstanbul",
        "grade": 463,
        "department":{"name": "IT",
        "language":"tr"}
      },
      {
      "name": "Nazan Bekiroğlu",
        "age": 49,
        "city": "Bursa",
        "grade": 387,
        "department":{"name": "English",
        "language":"eng"}
      },
      {
      "name": "Sabahattin Ali",
        "age": 53,
        "city": "İzmir",
        "grade": 427,
        "department":{"name": "Phsyics",
        "language":"tr"}
      },
        {
      "name": "Stephen King",
        "age": 53,
        "city": "İzmir",
        "grade": 523,
        "department":{"name": "Phsyics",
        "language":"eng"}
      },
          {
      "name": "Orhan pamuk",
        "age": 56,
        "city": "Ankara",
        "grade": 486,
        "department":{"name": "Phsycology",
        "language":"eng"}
      },
            {
      "name": "Rıfat Ilgaz",
        "age": 74,
        "city": "Antalya",
        "grade": 519,
        "department":{"name": "IT",
        "language":"eng"}
      },
              {
      "name": "Lev Tolstoy",
        "age": 26,
        "city": "Antalya",
        "grade": 519,
        "department":{"name": "IT",
        "language":"eng"}
      }
      ])
​
​
//----------------------------------------------------------------------------------
//1)"students" collectionında her bir şehir için yaş ortalamalarını bulunuz.
//----------------------------------------------------------------------------------
​
use ("school");
var pipeline=[
    {$match:{}},
    {$group:{"_id":"$city",ort:{$avg:"$age"}}}
];
db.students.aggregate(pipeline)
​
//----------------------------------------------------------------------------------
//2)"students" collectionında her bir department(name) için maksimum grade i bulunuz
//----------------------------------------------------------------------------------
use ("school");
var pipeline=[
    {$match:{}},
    {$group:{"_id":"$department.name",max_point:{$max:"$grade"}}}
];
db.students.aggregate(pipeline)
​
​
//Ödev
//----------------------------------------------------------------------------------
//3)"students" collectionında 40 yaşından büyüklerin her bir department için min grade i bulunuz
//----------------------------------------------------------------------------------
​
​
//----------------------------------------------------------------------------------
//4)"students" collectionında ismi "k" ile bitenlerin toplam puanlarını bulunuz.
//----------------------------------------------------------------------------------
use ("school");
var pipeline=[
    {$match:{"name":{$regex:"k$"}}},
    {$group:{"_id":"",total_grade:{$sum:"$grade"}}}
];
db.students.aggregate(pipeline)
​
//----------------------------------------------------------------------------------
//5)"students" collectionında Ankara da yaşayanların sayısını bulunuz.
//----------------------------------------------------------------------------------
​
use ("school");
var pipeline=[
    {$match:{"city":"Ankara"}},
    {$count:"Ankara da yaşayanların sayısı : "}
];
db.students.aggregate(pipeline)
​
​
//Ödev
//----------------------------------------------------------------------------------
//6)"students" collectionında yaşı 30 dan büyük olanların sayısını bulunuz.
//----------------------------------------------------------------------------------
​
//addFields-bulkWrite-UnionWith-lookup
​
//yeni collection
​
use("school");
db.points.insertMany([
{"name":"Fred","homework":[100,100,100],"midterm":[100,100,100]},
{"name":"Barnie","homework":[10,90,80,100],"midterm":[45,85,90]},
{"name":"Wilma","homework":[35,40,80,70],"midterm":[80,80,90]},
{"name":"Betty","homework":[55,78,80,90],"midterm":[45,70,65]}
])
​
//------------------------------------------------------------------
//7"points" collectionında homeworklerin ve midtermlerin 
//ortalamalarını gösteren yeni bir field ekleyiniz.
//------------------------------------------------------------------
​
use("school");
var pipeline=[
    {$addFields:{
        avg_homework:{$avg:"$homework"},
        avg_midterm:{$avg:"$midterm"}
    }}
]
db.points.aggregate(pipeline)
​
//----------------------------------------------------------------------------
//8)points collectionına homeworklerin ve midtermlerin ortalamalarını gösteren
//yeni bir field ekleyiniz, sadece name, avg_homework, avg_midterm gösterilsin
//----------------------------------------------------------------------------
​
use("school");
var pipeline=[
    {$addFields:{
        avg_homework:{$avg:"$homework"},
        avg_midterm:{$avg:"$midterm"}
    }},
    {$project:{_id:0,name:1,avg_homework:1,avg_midterm:1}}
]
db.points.aggregate(pipeline)
​
​
//----------------------------------------------------------------------------
//9)points collectionına avg_homework ve avg_midterm in toplamını final fieldi
//olarak ekleyiniz, sadece avg_homework,avg_midterm,final gösterilsin
//----------------------------------------------------------------------------
use("school");
var pipeline=[
    {$addFields:{
        avg_homework:{$avg:"$homework"},
        avg_midterm:{$avg:"$midterm"}
    }},
    {$addFields:{final:{$add:["$avg_homework","$avg_midterm"]}}},
    {$project:{_id:0,name:1,avg_homework:1,avg_midterm:1,final:1}}
]
db.points.aggregate(pipeline)
​
​
  //----------------------------------------------------------------------------
//10-b)points collectionına avg_homework ün %50 si ve avg_midterm in %50 sinin toplamını 
//final fieldi olarak ekleyiniz, sadece avg_homework,avg_midterm,final gösterilsin
//----------------------------------------------------------------------------
​
use("school");
var pipeline=[
    {$addFields:{
        avg_homework:{$avg:"$homework"},
        avg_midterm:{$avg:"$midterm"}
    }},
    {$addFields:{final:{$add:[{$multiply:["$avg_homework",0.5]},
    {$multiply:["$avg_midterm",0.5]}]}}},
    {$project:{_id:0,name:1,avg_homework:1,avg_midterm:1,final:1}}
]
db.points.aggregate(pipeline)
​
//11)points collectionında final değerini küçükten büyüğe sıralayınız, 
//sadece avg_homework,avg_midterm,final gösterilsin
//----------------------------------------------------------------------------
​
use("school");
var pipeline=[
    {$addFields:{
        avg_homework:{$avg:"$homework"},
        avg_midterm:{$avg:"$midterm"}
    }},
    {$addFields:{final:{$add:[{$multiply:["$avg_homework",0.5]},
    {$multiply:["$avg_midterm",0.5]}]}}},
    {$project:{_id:0,name:1,avg_homework:1,avg_midterm:1,final:1}},
    {$sort:{"final":1}}
]
db.points.aggregate(pipeline)
​
   // ********************************
 // bulkWrite
 // ********************************
 //yeni collection
​
 use("school");
 db.staff.insertMany([
    {"name":"Leonardo","age":35,"city":"İstanbul","salary":4500,"job":"lawyer"},
    {"name":"Raphael","age":55,"city":"Ankara","salary":9000,"job":"manager"},
    {"name":"Donatello","age":35,"city":"Antalya","salary":3300,"job":"doctor"},
    {"name":"Michelangelo","age":36,"city":"İstanbul","salary":4500,"job":"developer"},
    {"name":"Splinter","age":26,"city":"İzmir","salary":2500,"job":"analyst"},
    {"name":"April","age":35,"city":"İstanbul","salary":3000,"job":"instructor"}
 ])
​
 //----------------------------------------------------------------------------
//12)Aşağıdaki komutları tek satırda yapınız.
//a-Döküman ekle: {"name":"Shredder","age":49,"city":"Konya","salary":3870,"job":"engineer"}
//b-Michelangelo nun salary bilgisini 5000 olarak güncelleyin.
//c-job bilgisi analyst olan dökümanı silin
//----------------------------------------------------------------------------

 //----------------------------------------------------------------------------
//12)Aşağıdaki komutları tek satırda yapınız.
//a-Döküman ekle: {"name":"Shredder","age":49,"city":"Konya","salary":3870,"job":"engineer"}
//b-Michelangelo nun salary bilgisini 5000 olarak güncelleyin.
//c-job bilgisi analyst olan dökümanı silin
//----------------------------------------------------------------------------
use("school");
db.staff.bulkWrite([
    {insertOne:{"document":{"name":"Shredder","age":49,"city":"Konya","salary":3870,"job":"engineer"}}},
    {updateOne:{"filter":{"name":"Michelangelo"},"update":{$set:{"salary":5000}}}},
    {deleteOne:{"filter":{"job":"analyst"}}}
])

//13)Aşağıdaki komutları tek satırda yapınız.
//a-Döküman ekle: {"name":"Ninja","age":37,"city":"Isparta","salary":3000,"job":"analyst"}
//b-job bilgisi doctor olan document te job bilgisini "DR" olarak güncelleyiniz
//c-yaşı 35 olanların salary bilgisini 1,5 katına çıkarın
//----------------------------------------------------------------------------

use("school");
db.staff.bulkWrite([
    {insertOne:{"document":{"name":"Ninja","age":37,"city":"Isparta","salary":3000,"job":"analyst"}}},
    {updateOne:{"filter":{"job":"doctor"},"update":{$set:{"job":"DR"}}}},
    {updateOne:{"filter":{"age":35},"update":{$mul:{"salary":1.5}}}}
])

//********************
//     unionWith
//********************

use("school");
db.personel.insertMany([
   {"name":"Mark Zuckerberg","age":39,"city":"New York","salary":15000,"job":"developer"},
   {"name":"Elon Musk","age":51,"city":"Los Angeles","salary":20000,"job":"economist"},
   {"name":"Bobby Murphy","age":34,"city":"California","salary":13000,"job":"developer"},
   {"name":"Kevin Systrom","age":40,"city":"San Francisco","salary":14500,"job":"developer"},
   {"name":"Travis Kalanick","age":46,"city":"Los Angeles","salary":12500,"job":"engineer"}
])

use("school");
db.staff.remove({})

use("school");
db.staff.insertMany([
   {"name":"Mark Zuckerberg","age":39,"city":"New York","salary":15000,"job":"developer"},
   {"name":"Elon Musk","age":51,"city":"Los Angeles","salary":20000,"job":"economist"},
   {"name":"Bobby Murphy","age":34,"city":"California","salary":13000,"job":"developer"},
   {"name":"Kevin Systrom","age":40,"city":"San Francisco","salary":14500,"job":"developer"},
   {"name":"Travis Kalanick","age":46,"city":"Los Angeles","salary":12500,"job":"engineer"}
])


//----------------------------------------------------------------------------
//14)personel ve staff collectionlarında tüm çalışanların isimlerini
// ve mesleklerini(job) listeleyiniz
//----------------------------------------------------------------------------

use("school");
db.personel.aggregate(
    {$unionWith:{coll:"staff"}},
    {$project:{_id:0,name:1,job:1}}
)

//15)personel ve staff collectionlarını city e göre sıralayınız,
//sadece neme ve city gösterilsin
//----------------------------------------------------------------------------



use("school");
db.personel.aggregate(
    {$unionWith:{coll:"staff"}},
    {$sort:{city:1}},
    {$project:{_id:0,name:1,city:1}}
)

//----------------------------------------------------------------------------
//16)personel ve staff collectionlarında her bir city için yaş ortalamalarını bulunuz
//----------------------------------------------------------------------------

use("school");
db.personel.aggregate(
    {$unionWith:{coll:"staff"}},
    {$group:{_id:"$city",avg_age:{$avg:"$age"}}}
)

//Ödev
//----------------------------------------------------------------------------
//17)personel ve staff collectionlarında her bir job için salary toplamını bulunuz
//----------------------------------------------------------------------------



//***************
//lookup




//18)personel collectionından stafflarla aynı jobtan olanları görüntüleyiniz.
//sadece name,job,ortak_meslekler deki name
//----------------------------------------------------------------------------

use("school");
db.personel.aggregate({
    $lookup:{
        from:"staff",
        localField:"job",
        foreignField:"job",
        as:"ortak_meslekler"
    }},
    {$project:{_id:0,name:1,job:1,"ortak_meslekler.name":1}}
    )

//19)personel collectionından stafflarla aynı jobtan olanların yaş ortalamalarını
//görüntüleyiniz.
//sadece name,job,avg_name
//----------------------------------------------------------------------------