**MONGO DB PRACTICE**
**db ekleme,silme,collection oluşturma,
document insert etme,document filtreleme**

//-----------------------------------------------
//1)a-tüm databaseleri görüntüleyiniz,
//  b-"school" ve "university" isminde bir database oluşturunuz.
//  c-hangi databasede olduğunuzu görüntüleyiniz.

//-----------------------------------------------

show dbs
use school
use university


//----------------------------------------------------------------------------------
//2)a-school ve university database inde “students” isimli bir
//collection oluşturunuz ve
//university deki tüm collectionları görüntüleyiniz.
//----------------------------------------------------------------------------------
db.createCollection("students")
db.getCollectionNames()

//----------------------------------------------------------------------------------
//2)b-university collection ındaki students ı siliniz
//c-şimdi de university database i siliniz
//----------------------------------------------------------------------------------
db.students.drop()

db.dropDatabase()

//----------------------------------------------------------------------------------
//3)a-“students” collectionına bir tane document ekleyiniz.
({"name":"Peyami Safa",
"age":45,
"city":"İstanbul",
"grade":535,
"department":"Math",
"books":[{"name":”Math”,”category”:”lesson”},
{“name”:”Sefiller”,”category”:”novel”}]//----------------------------------------------------------------------------------

db.students.insertOne({name:"Peyami Safa", age:45, city:"Istanbul",grade:535,departman:"Math",books:[{name:"Math","category":"lesson"},{name:"Sefiller","category":"novel"}]})


//----------------------------------------------------------------------------------
//3)b-"students" collectionına bir tane document ekleyiniz.
{"name":"John Steinbeck",
"age":55,
"city":"Bursa",
"grade":435,
"department":{"name":"IT","language":"tr"},
"points":[70,90,100]}
//----------------------------------------------------------------------------------

db.students.insertOne({"name":"John Steinbeck",
"age":55,
"city":"Bursa",
"grade":535,
"department":{"name":"IT","language":"tr"},
"points":[70,90,100]})

//----------------------------------------------------------------------------------
//4)"students" collectionına çoklu document ekleyiniz
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

//----------------------------------------------------------------------------------

db.students.insertMany([içine liste kopyalanacak])


//----------------------------------------------------------------------------------
//5)"students" collectionındaki tüm documenti görüntüleyiniz

//----------------------------------------------------------------------------------

db.students.find()


//----------------------------------------------------------------------------------

//6)"students" collectionındaki 2.kişiyi görüntüleyiniz
//----------------------------------------------------------------------------------

db.students.find().skip(1).limit(1)

Not:skip atlatıyor, limit sınırlıyor

//----------------------------------------------------------------------------------

//7)"students" collectionındaki 3. ve 4. kişilerin sadece isim ve şehirlerini görüntüleyiniz
//----------------------------------------------------------------------------------


db.students.find({},{"name":1,"_id":0}).skip(2).limit(2)

//----------------------------------------------------------------------------------
//8)a-"students" collectionındaki şehri İzmir olan kişiyi/kişileri görüntüleyiniz(name,city)
//----------------------------------------------------------------------------------

db.students.find({"city":"İzmir"},{"name":1,"city":1,"_id":0})


//----------------------------------------------------------------------------------
//8)b-"students" collectionındaki "IT" bölümünde okuyan kişiyi/kişileri görüntüleyiniz(name,department,grade)
//----------------------------------------------------------------------------------


db.students.find({"department.name":"IT"},{"name":1,"department":1,"grade":1,"_id":0})


//----------------------------------------------------------------------------------
//9)a-"students" collectionındaki program dili Türkçe (tr) olan kişiyi/kişileri görüntüleyiniz(name,department,city)
//----------------------------------------------------------------------------------


db.students.find({"department.language":"tr"},{"name":1,"department":1,"grade":1,"_id":0})


//----------------------------------------------------------------------------------
//9)b-"students" collectionındaki program dili Türkçe (tr) olan ve şehri İzmir olan kişiyi/kişileri görüntüleyiniz(name,department,city)
//----------------


db.students.find({$and:[{"department.language":"tr"},{"city":"İzmir"}]},{"name":1,"department":1,"city":1,"_id":0})


//----------------------------------------------------------------------------------
//10)"students" collectionındaki İstanbulda yaşayan veya yaşı 26 olan kişiyi/kişileri görüntüleyiniz(name,city,age)
//----

db.students.find({$or:[{"city":"İstanbul"},{"age":26}]},{"name":1,"age":1,"city":1,"_id":0})


//----------------------------------------------------------------------------------
//11)a-"students" collectionındaki program dili ingilizce veya department name IT olan kişiyi/kişileri görüntüleyiniz(name,department)
//----------------------------------------------------------------------------------

db.students.find({$or:[{"dapartment.language":"eng"},{"department.name":"IT"}]},{"name":1,"department":1,"_id":0})

//----------------------------------------------------------------------------------
//11)b-"students" collectionındaki program dili ingilizce veya department name IT olan kişiyi/kişilerin sayısını görüntüleyiniz
//----------------------------------------------------------------------------------

db.students.find({$or:[{"dapartment.language":"eng"},{"department.name":"IT"}]},{"name":1,"department":1,"_id":0}).count()


//----------------------------------------------------------------------------------
//12)"students" collectionındaki program dili Türkçe ve department name i IT olan kişiyi/kişileri görüntüleyiniz(name,department)
//----------------------------------------------------------------------------------

db.students.find({$and:[{"department.language": "tr"},{"department.name":"IT"}]},{"name":1,"department":1,"_id":0})













































