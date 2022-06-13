module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
      id: {}
    }
  
    let config = {
      tableName: ""
    }
  
    const User = sequelize.define(alias, cols, config);
  
    return User;
  }