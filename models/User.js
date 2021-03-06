const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  email: { 
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw ({ error: 'No user with this id found' });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @return {Array} List of all users
 */
userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.updateUser = async function (email, newEmail) {
  try {
    const filter = { email };
    const update = { email: newEmail };

// `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const user = await this.findOneAndUpdate(filter, update, {
      new: true
    });
    return user;
  } catch (error) {
    throw error;
  }
}
/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
}

 
module.exports = mongoose.model("Users", userSchema);

module.exports.comparePassword = async (candidatePassword, hash) => {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, hash);
    return isMatch;
  } catch (err) {
      console.log(err)
      return err
  }
};
