module.exports = {
    mongoDbUrl : 'mongodb://127.0.0.1:27017/local', 
    // mongoDbUrl : 'mongodb+srv://anko:dungHuyn@0981529940@cluster0.ilx584c.mongodb.net/?retryWrites=true&w=majority' ,
    PORT: process.env.PORT || 3000,
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');        
        
        next();
    }
};