export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    if (err.code) {
        return res.status(err.code).json({
            error: err.message
        });
    }
    
    res.status(500).json({
        error: 'Internal server error'
    });
};