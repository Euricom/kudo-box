const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let KudoSchema = new Schema({
  createdOn: {
    type: Date
  },
  receiver: {
    type: String,
    ref: "User"
  },
  sender: {
    type: String,
    ref: "User"
  },
  kudoId: {
    type: Number
  },
  text: {
    type: String
  },
  fontFamily: {
    type: String
  },
  status: {
    type: String
  },
  image: {
    type: String
  }
});

KudoSchema.methods.getLatest = function() {
  return this.model("Kudo")
    .findById(this.id)
    .populate("receiver").populate("sender");
};

KudoSchema.pre("save", function(next) {
  /*if (!this.createdOn) {
    this.createdOn = new Date();
  }*/

  this.createdOn = new Date();

  next();
});
module.exports = mongoose.model("Kudo", KudoSchema);
