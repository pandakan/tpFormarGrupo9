module.exports = (sequelize, DataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        password: {	
            type: DataTypes.STRING(70),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(45)
        },
        rol_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING(45),
        },
        city: {
            type: DataTypes.STRING(45),
        },
        phone: {
            type: DataTypes.STRING(100),
        },
        adress_number: {
            type: DataTypes.INTEGER(100),
        }
    }

    let config = {
        tableName: "users",
        timestamps: false,
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsTo(models.UserRol, {
            as: "rol",
            foreignKey: "rol_id"
        })
    }
    
    return User;
}
