//crear modelo de imagen de producto
module.exports = (sequelize, DataTypes) => {
    let alias = "ProductImage";

    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        imageName: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        }
    }

    let config = {
        tableName: "products_images",
        timestamps: false,
    }

    const ProductImage = sequelize.define(alias, cols, config);

    ProductImage.associate = function(models){
        ProductImage.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
    }

    return ProductImage;
}