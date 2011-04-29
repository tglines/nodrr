app.get('/:username', function(req, res){
  loadAccount(req,function(account){
    Account.findOne({username:req.params.username},function(err,user){
      var search_regex = new RegExp('@'+req.params.username,'i');
      var nods_per_page =  25;
      Nod.find({ $or : [{username:req.params.username},{text:search_regex}] },{}, {sort: [['date','descending']], limit: nods_per_page},function(err,nods){
        res.local('user', user);
        res.local('nods', nods);
        res.local('account', account);
        res.local('title', 'Nodrr - '+req.params.username);
        res.render('user');      
      });
    });
  });
});
