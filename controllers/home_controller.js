module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('test',321);    
    return res.render('home' ,{
        title: "homepage"
    });
}

module.exports.header = function(req, res){
    return res.render('header');
}

module.exports.footer = function(req, res){
    return res.render('footer');
}