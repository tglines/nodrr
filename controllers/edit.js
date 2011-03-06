app.get('/edit/username', function(req, res){
  loadAccount(req,function(account){
    if(account && !account.username){
      res.local('account', account);
      res.local('title', 'Nodrr - Edit Username');
      res.render('edit/username');
    }
  });
});

app.post('/edit/username', function(req, res){
  loadAccount(req,function(account){
    if(account && !account.username){
      Account.findOne({username:req.body.username},function(err,prev_acct){
        if(!prev_acct){
          account.username = req.body.username;
          account.save(function(err){
            res.redirect('/');
          });
        }
        else{
          res.redirect('/fail');
        }
      });
    }
  });
});
