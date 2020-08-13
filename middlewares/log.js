

const {User} = require('../database/models')

function log (req, res, next) {

   res.locals.user = false;
  if (req.session.user) {
    //quiero que todas mis vistas tengan la info de session del usuario, entonces creo la variable locals (viene con el pack session), donde voy a almacenar esta info. la variable locals, me permite acceder a esta info desde la vista
    res.locals.user = req.session.user;
    return next();

    //cookies
  } else if (req.cookies.email) {
   
   User.findOne({
      where: {
        email: req.cookies.email,
      },
    }).then(function (user) {
      //si el usuario existe en la DB:
      if (user) {
      delete user.password;
      req.session.user = user;
      res.locals.user = user;
      }
      return next(); 

    })
    .catch(function (err) {
      // print the error details
      console.log(err);
    });

   } else {
      return next();
   }
}

module.exports = log;