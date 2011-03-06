express = require('express');
force_domain = require('connect-force-domain');
app = module.exports = express.createServer(force_domain('www.nodrr.com'));
sys = require('sys');
fs = require('fs');
http = require('http');

mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

require('./models/account.js');
require('./models/nod.js');

Account = mongoose.model('Account');
Nod = mongoose.model('Nod');

connect = require('connect');
auth = require('connect-auth');

require('./fb_creds.js');

//mongoStore = require('connect-mongodb');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    //store: mongoStore({
    //  dbname: 'sessions',
    //  username: '',
   //   password: ''
   // }),
    secret: 'nodrrsecret'
  }));
  app.use(express.logger({ format: ':date :remote-addr :method :status :url' }));
  app.use(auth([
    auth.Facebook({appId : fbId, appSecret: fbSecret, scope : "email", callback: fbCallbackAddress})
  ]));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var loadFacebookAccount = function(facebook_details,loadCallback){
  Account.findOne({ facebook_id: facebook_details.user.id }, function(err,account){
    if(account){
      loadCallback(account);
    }
    else{
      var n = new Account();
      n.email = facebook_details.user.email;
      n.type = 1;
      n.facebook_id = facebook_details.user.id;
      n.date = new Date();
      n.save(function(err){
        loadCallback(n);
      });
    }
  });
}

loadAccount = function(req,loadCallback){
  if(req.isAuthenticated()){
    //load account out of database
    if(req.getAuthDetails().user.id){
      //its a facebook login - try and grab out of db otherwise make a user off of fbook credentials
      var fbook_details = req.getAuthDetails();
      loadFacebookAccount(fbook_details,loadCallback);
    }
  }
  else{
    loadCallback(null);
  }
}

require('./global_funcs.js');

// Routes ( Controllers )
require('./controllers/home.js');
require('./controllers/auth.js');
require('./controllers/edit.js');

//Only listen on $ node app.js   
if (!module.parent) {              
  app.listen(80);
  console.log("Express server listening on port %d", app.address().port)
}
