var AccountSchema = new Schema({
  username: String,
  type: Number,
  admin: Number,
  facebook_id: String,
  email: String,
  date: Date
});

mongoose.model('Account', AccountSchema);
