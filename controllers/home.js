app.get('/', function(req, res){
  loadAccount(req,function(account){
    var nods_per_page = 25;
    Nod.find({},{}, {sort: [['date','descending']], limit: nods_per_page},function(err,nods){
      res.local('nods', nods);
      res.local('account', account);
      res.local('title', 'Nodrr');
      try{
        res.render('home');
      }
      catch(err){
      }
    });
  });
});
