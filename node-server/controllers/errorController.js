module.exports =  errorController = {
	get404: (req, res, next) => {
		res.status(404).render('404', {
			path: '/404'
		});
	},

	get500: (req, res, next) => {
		res.status(500).render('500', {
			path: '/500'
		});
	}
};

