const fs = require('fs');

module.exports = fileHelper = {
	deleteFile: (filePath) => {
		fs.unlink(filePath, (err) => {
			if (err) {
				throw (err);
			}
		});
	}
};