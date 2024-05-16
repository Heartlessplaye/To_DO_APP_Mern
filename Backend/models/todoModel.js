const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add text value"],
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      required: true,
      ref : 'User'
    }
  },
  {
    timestamps : true,
  }
);

module.exports = mongoose.model('Todo',todoSchema);
