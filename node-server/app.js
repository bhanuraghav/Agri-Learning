const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require('mongoose');
const cors = require("cors");
const router = require('./routes');
var AddDisease = require('./models/cropDisease')

const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE || "mongodb://localhost:27017/paytm-hackathon";
const fileStorage = multer.diskStorage({
	destination: './uploads/',
	filename: (req, file, callback) => {
		callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const fileFilter = (req, file, callback) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
	storage: fileStorage,
	fileFilter: fileFilter
}).single('image'));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.connect("mongodb://localhost:27017/paytm-hackathon", { useNewUrlParser: true });
let database = mongoose.connection;
database.on('error', console.error.bind(console, "Could not connect to database"));
database.once('open', () => {
	console.log('connected to database.');
});

// database.createCollection('paytm-hackathon',()=>{
// 	console.log('database connected');
// })

app.use(flash());

app.use(session({
		secret: "Session Secret",
		saveUninitialized: false,
		resave: false
	})
);

app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
})

app.get('/add-disease',(req,res)=>{
	res.render('add-disease');
})

app.post('/add-disease',(req,res)=>{
	var symptomsArray = [];
	symptomsArray.push(req.body.symptoms_1);
	symptomsArray.push(req.body.symptoms_2);
	symptomsArray.push(req.body.symptoms_3);
	symptomsArray.push(req.body.symptoms_4);

	var fertilizers_1_name = req.body.fertilizers_1_name;
	var fertilizers_1_link = req.body.fertilizers_1_link;
	var fertilizers_2_name = req.body.fertilizers_2_name;
	var fertilizers_2_link = req.body.fertilizers_2_link;
	var fertilizers_3_name = req.body.fertilizers_3_name;
	var fertilizers_3_link = req.body.fertilizers_3_link;
	var fertilizers_4_name = req.body.fertilizers_4_name;
	var fertilizers_4_link = req.body.fertilizers_4_link;

	var fertilizersArray = [];
	fertilizersArray.push({name:fertilizers_1_name,link:fertilizers_1_link});
	fertilizersArray.push({name:fertilizers_2_name,link:fertilizers_2_link});
	fertilizersArray.push({name:fertilizers_3_name,link:fertilizers_3_link});
	fertilizersArray.push({name:fertilizers_4_name,link:fertilizers_4_link});

	var disease = new AddDisease({
		cropName : req.body.cropName,
		name : req.body.name,
		symptoms : symptomsArray,
		fertilizers : fertilizersArray,
		diseaseCycle : req.body.diseaseCycle
	});

	disease.save(function(err,a){
		if(err){
			res.render('/');
		}
		else{
			console.log(a);
			res.redirect('/add-disease');
		}
	})
})

app.get('/:crop_name/:crop_disease',(req,res)=>{
	var crop_name = req.params.crop_name;	
	var crop_disease = req.params.crop_disease;	

	AddDisease.findOne({cropName:crop_name,name:crop_disease},(err,result)=>{
		if(err){
			console.log(err);
			res.redirect('/');
		}
		console.log('-----')
		console.log(result)
		console.log('-----')
		res.render('show-image-details',{result:result});
	})
})


app.use('/', router);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})