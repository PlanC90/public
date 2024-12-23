const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    
    // Handle database errors
    if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({
            success: false,
            error: 'Database constraint violation'
        });
    }
    
    // Default error response
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
};

module.exports = { errorHandler };