//----------------------------------------------------------------------------------
//1)"students" collectionını yaşa(age) göre azalan şekilde sıralayınız.
//----------------------------------------------------------------------------------
use ("school");
db.students.find().sort({"age":-1})

//----------------------------------------------------------------------------------
//2)"students" collectionında yaşça en büyük ikinci kişiyi (name ve age) görüntüleyiniz.
//----------------------------------------------------------------------------------

use ("school");
db.students.find({},{"name":1,"age":1,"_id":0}).sort({"age":-1}).skip(1).limit(1)

//----------------------------------------------------------------------------------
//3)"students" collectionında yaşça en küçük kişiyi (name ve age) görüntüleyiniz.
//----------------------------------------------------------------------------------

use ("school");
db.students.find({},{"name":1,"age":1,"_id":0}).sort({"age":1}).limit(1)

use ("school");
db.students.findOne({},{"name":1,"age":1,"_id":0},{sort:{"age":1}})

//----------------------------------------------------------------------------------
//4)"students" program dili Türkçe olan bölümde(department) okuyan ve 
//puanı(grade) 500 den fazla olan kişiyi/kişileri görüntüleyiniz
//(name,department,grade)
//----------------------------------------------------------------------------------

use ("school");
db.students.find({$and:[{"department.language":"tr"},{"grade":{$gt:500}}]},
{"name":1,"department":1,"grade":1,"_id":0})

//-----------------------------------------------------------------
//5)"students" collectionında department ı IT,Math veya Chemistry
//olan kişileri isme göre artan sıralı //görüntüleyiniz.(name,department)
//kaç kişi olduğunu görüntüleyiniz
//-----------------------------------------------------------------

use ("school");
db.students.find({"department.name":{$in:["IT","Math","Chemistry"]}},
{"name":1,"department":1,"_id":0}).sort({"name":1})

use ("school");
db.students.find({"department.name":{$in:["IT","Math","Chemistry"]}},
{"name":1,"department":1,"_id":0}).sort({"name":1}).count()


//-----------------------------------------------------------------
//6)"students" collectionında city sini İstanbul, İzmir veya Ankara
// olan kişileri grade e göre azalan sıralı görüntüleyiniz.(name,city,grade)
//-----------------------------------------------------------------

use ("school");
db.students.find({"city":{$in:["İstanbul","İzmir","Ankara"]}},
{"name":1,"city":1,"grade":1,"_id":0}).sort({"grade":-1})

//-----------------------------------------------------------------
//7)"students" collectionında program dili eng olan bölümde 
//(department) okuyan veya yaşı(age) 35 veya 35 den küçük olan
//kişiyi/kişileri görüntüleyiniz(name,department,age)
//-----------------------------------------------------------------

use ("school");
db.students.find({$or:[{"department.language":"eng"},{"age":{$lte:35}}]},
{"name":1,"department":1,"age":1,"_id":0})


//----------------------------------------------------------------------------------
//8-)"students" collectionında name i "Peyami Safa" olan kişinin bilgilerini

"name":"Peyami Safa",
"age":44,
"city":"İstanbul",
"grade":535,
"department":{"name":"Math","language":"tr"},
"books":["name":"Math","category":"lesson"},
{"name":"Sefiller","category":"novel"}] 
ile değiştiriniz
//----------------------------------------------------------------------------------

use ("school");
db.students.findOneAndReplace({"name":"Peyami Safa"},
{"name":"Peyami Safa",
"age":44,
"city":"İstanbul",
"grade":535,
"department":{"name":"Math","language":"tr"},
"books":[{"name":"Math","category":"lesson"},
{"name":"Sefiller","category":"novel"}] })


//----------------------------------------------------------------------------------
//9-)"students" collectionında grade i 550 den küçük, grade i en yüksek kişinin sadece 
//departmentını IT olarak güncelleyiniz
//----------------------------------------------------------------------------------

use ("school");
db.students.findOneAndUpdate({"grade":{$lt:550}},
{$set:{"department.name":"IT"}},{sort:{"grade":-1}})


//----------------------------------------------------------------------------------
//10-)"students" collectionında yaşı(age) 23 olan kişinin ismini "Elif Şafak" olarak 
//güncelleyiniz ve güncellenen documenti görüntüleyiniz
//----------------------------------------------------------------------------------

use ("school");
db.students.findOneAndUpdate({"age":23},
{$set:{"name":"Elif Şafak"}},
{returnNewDocument:true})

//----------------------------------------------------------------------------------
//11-)"students" collectionında ismi "Kemal Tahir" olan varsa
// yaş(age):36,
//grade:411
//department:Chemistry
// olarak güncelleyiniz yoksa document ekleyiniz ve görüntüleyiniz
//----------------------------------------------------------------------------------

use ("school");
db.students.findOneAndUpdate({"name":"Kemal Tahir"},
{$set:{"age":36,"grade":411,"department":"Chemistry"}},
{returnNewDocument:true,upsert:true})


//----------------------------------------------------------------------------------
//12)"students" collectionında İstanbulda yaşayanların city sini 
//"Megakent" olarak güncelleyiniz ve güncellenen documenti getiriniz
//----------------------------------------------------------------------------------    

use ("school");
db.students.updateMany({"city":"İstanbul"},
{$set:{"city":"Megakent"}},
{returnNewDocument:true})



//----------------------------------------------------------------------------------
13)"students" collectionında department ı Physics olan kişiyi siliniz
//----------------------------------------------------------------------------------


use ("school");
db.students.deleteOne({"department.name":"Phsyics"})

use ("school");
db.students.find()

//Ödev

//----------------------------------------------------------------------------------
14)"students" collectionında yaşı 30 dan küçük veya 70 ten büyük olanları siliniz
//----------------------------------------------------------------------------------



//----------------------------------------------------------------------------------
15)"students" collectionında tüm dökümanları siliniz
//----------------------------------------------------------------------------------
