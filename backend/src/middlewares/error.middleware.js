const errorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	if (!res.headersSent) {
		res.status(err.statusCode).json({
			success: false,
			message: err.message,
			errorStack: process.env === "development" ? err.stack : null,
		});
	}

	return next();
};

export default errorHandler;
