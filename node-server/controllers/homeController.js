// // WHAT THE HELL AM I DOING HERE? :)
// const tf = require("@tensorflow/tfjs");

// // Optional Load the binding:
// // Use '@tensorflow/tfjs-node-gpu' if running with GPU.
// require("@tensorflow/tfjs-node");
const { spawn } = require("child_process");
const path = require("path");
const fs = require('fs');
const request = require('request-promise');
const axios = require('axios');
const FormData = require('form-data');
const fileHelper = require('../utils/file');

module.exports = homeController = {
	getHome: (req, res, next) => {
		console.log(path.resolve(__dirname, '..', 'uploads'));
		res.render('home', {path: '/', hasError: false, errorMessage: ''});
	},

	postImage: async (req, res, next) => {
		const image = req.file;
		console.log("reacher here");
		console.log(image);
		if (!image) {
			return res.status(422).render('home', {
				path: '/',
				hasError: true,
				errorMessage: 'Attached file is not an image.',
			});
		}
		
		const imageUrl = image.path;
		const url = 'http://127.0.0.1:5000/';
		const imagePath = `${__dirname}/../${imageUrl}`
		request.post({url: url, formData: {
		    file: fs.createReadStream(imagePath),
		    // ...and all other form inputs
		    imageClass: 'twitterApp' // etc.
		}})
		    .then(data => {
		        console.log(data);
		        fileHelper.deleteFile(imagePath);
		    }).catch(err => {
		        console.log(err);
		    });
		// let data = new FormData();
		// data.append('file', image);
		
		// axios.post(URL, data, {
		//   headers: {
		//     'accept': 'application/json',
		//     'Accept-Language': 'en-US,en;q=0.8',
		//     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
		//   }
		// })
		//   .then((response) => response.json())
		//   .then(resp => console.log(resp))
		//   .catch((error) => {
		//     console.log(error);
		//   });
		
		// const imageUrl = "uploads/2019-01-11T08:00:31.859Z-insect.jpg"
		console.log(imageUrl);
		// fs.createReadStream(req.file.path).pipe(request.post('http://127.0.0.1:5000/', (err, data) => console.log(JSON.parse(data))));
		// let pyScriptPath = path.join(__dirname, "../pyScript/app.py");
		// console.log("py", pyScriptPath);
		// const pyProg = spawn("python", [pyScriptPath, JSON.stringify({ imageUrl })]);
  // 		pyProg.stdout.on("data", data => {
  // 			console.log(data.toString());
  //   		res.json(data.toString());
  // 		});

  // 		pyProg.stderr.on("data", data => {
  //   		console.log(`stderr: ${data}`);
  // 		});
		// NOW SEND THIS URL TO CNN MODEL
		// GET THE RESULT FROM THE MODEL
		// SEARCH FOR THE INSECT IN YOUR DATABASE
		// SAVE THE INFORMATION IN LOCALS
		// DELETE IMAGE FROM SERVER
	},
}

// image object:
// { fieldname: 'image',
//   originalname: 'insect.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: './uploads',
//   filename: '2019-01-11T08:00:31.859Z-insect.jpg',
//   path: 'uploads/2019-01-11T08:00:31.859Z-insect.jpg',
// 	size: 173814 }
	
// imageURL:
// uploads/2019-01-11T08:00:31.859Z-insect.jpg