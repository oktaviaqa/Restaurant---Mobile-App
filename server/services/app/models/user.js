'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'email must be unique'
      },
      validate: {
        notNull: {
          msg: 'email is required'
        },
        notEmpty: {
          msg: 'email is required'
        }
    }},
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'passwerd is required'
        },
        notEmpty: {
          msg: 'passwerd is required'
        },
        len: {
          args: [5],
          msg:  'The password must be min 5 characters long'
        } 
    }},
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async(user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10)
          user.password = bcrypt.hashSync(user.password, salt)
        }
      }
    }
  });
  return User;
};