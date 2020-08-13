const indexController = {
    index: (req, res) => {
        let vac = {
            title: 'HOME'
        }
       return  res.render('main', vac);
    }
};

module.exports = indexController;