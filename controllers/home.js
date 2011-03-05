app.get('/', function(req, res){
  loadAccount(req,function(account){
    res.render('home', {
      locals: { title: 'Nodrr', account: account }
    });
  });
});
