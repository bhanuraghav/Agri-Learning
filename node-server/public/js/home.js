// var submitBtn = document.querySelector("#submit");

// var imgSrc = '';

// submitBtn.onclick = function() {
// 	loadImage(imgSrc)
// }

$("#fileUpload").on("change", function() {
  if (typeof FileReader != "undefined") {
    var image_holder = $("#image-holder");
    image_holder.empty();

    var reader = new FileReader();
    reader.onload = function(e) {
      $("<img />", {
        src: e.target.result,
        class: "thumb-image"
			}).appendTo(image_holder);
			imgSrc = e.target.result;
			console.log(imgSrc);
    };
    image_holder.show();
    reader.readAsDataURL($(this)[0].files[0]);
  } else {
    alert("This browser does not support FileReader.");
  }
});

function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = src;
		img.onload = () => resolve(tf.fromPixels(img));
		img.onerror = (err) => reject(err);
	});
}

// let model;

// const modelURL = "http://localhost:5000/tfModel/model.json";

// const preview = document.getElementById("preview");
// const predictButton = document.getElementById("predict");
// const clearButton = document.getElementById("clear");
// const numberOfFiles = document.getElementById("number-of-files");
// const fileInput = document.getElementById("file");

// const predict = async (modelURL) => {
// 	console.log("here");
// 	if (!model) model = await tf.loadModel(modelURL);
// 	console.log("model loaded", model);
//   const files = fileInput.files;
// 	console.log(files);
//   [...files].map(async img => {
//     const data = new FormData();
//     data.append("image", img);

//     const processedImage = await fetch("/api/model", {
//       method: "POST",
//       body: data
//     })
//       .then(response => {
//         return response.json();
//       })
//       .then(result => {
//         return tf.tensor3d(result["image"]);
//       });

//     // shape has to be the same as it was for training of the model
// 		const prediction = model.predict(tf.reshape(processedImage, (shape = [50, 50, 3])));
// 		console.log(prediction);
//     const label = prediction.argMax((axis = 1)).get([0]);
//     renderImageLabel(img, label);
//   });
// };

// const renderImageLabel = (img, label) => {
//   const reader = new FileReader();
//   reader.onload = () => {
//     preview.innerHTML += `<div class="image-block">
//                                       <img src="${
//                                         reader.result
//                                       }" class="image-block_loaded" id="source"/>
//                                        <h2 class="image-block__label">${label}</h2>
//                               </div>`;
//   };
//   reader.readAsDataURL(img);
// };

// fileInput.addEventListener(
//   "change",
//   () => (numberOfFiles.innerHTML = "Selected " + fileInput.files.length + " files"),
//   false
// );
// predictButton.addEventListener("click", () => predict(modelURL));
// clearButton.addEventListener("click", () => (preview.innerHTML = ""));
