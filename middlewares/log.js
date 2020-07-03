
function log (req, res, next) {

    res.locals.user = false;
    if(req.session.user){
       res.locals.user = req.session.user
    } else if (req.cookies.email){
       // const user = userModel.findBySomething(e => e.email == req.cookies.email);
       if(user){
          delete user.password
          req.session.user = user;
          res.locals.user = user;
       }
    }
    
    return next();
 }
 
 module.exports = log;