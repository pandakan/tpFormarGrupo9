module.exports = (sequelize, DataTypes) => {
    let alias = "Product";
    
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        stock: {
            type: DataTypes.TINYINT(4),
            allowNull: false,
        }
    }

    let config = {
        tableName: "products",
        timestamps: false,
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })
        Product.hasMany(models.ProductImage, {
            as: "productImages",
            foreignKey: "product_id"
        })
    }

    return Product;
}
