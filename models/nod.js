var NodSchema = new Schema({
  text: String,
  date: Date
});

mongoose.model('Nod', NodSchema);
