const isLogin = function (req, res, next) {
    try {
      if ( req.session.user_id) {
      } else {
        res.redirect("/login");
      }
      next();
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const isLogout = function (req, res, next) {
    try {
      if ( req.session.user_id) {
        res.redirect("/admindashboard");
      }
      next();
    } catch (error) {
      console.log(error.message);
    }
  };
  module.exports = {
    isLogin,
    isLogout,
  };
  