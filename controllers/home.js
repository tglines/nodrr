app.get('/', function(req, res){
  loadAccount(req,function(account){
    res.local('account', account);
    res.local('title', 'Nodrr');
    res.render('home');
  });
});
