app.post('/nod', function(req, res){
  loadAccount(req,function(account){
    if(account && account.username){
      var n = new Nod();
      n.username = account.username;
      n.text = req.body.nod;
      n.date = new Date();
      n.save(function(err){
        res.redirect('/');
      });
    }
  });
});
