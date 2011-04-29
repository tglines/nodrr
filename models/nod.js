var NodSchema = new Schema({
  username: String,
  text: String,
  date: Date
});

mongoose.model('Nod', NodSchema);
