module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('user', {
        Email: {primaryKey: true , type: Sequelize.STRING, validate: {isEmail: true} } ,
        nome: {type: Sequelize.STRING, notEmpty: true },
        password:{type: Sequelize.STRING, allowNull: false },
        sobre:{type: Sequelize.TEXT},
        status:{type: Sequelize.ENUM('active', 'inactive'),
    defaultValue: 'active' },
        id_tipo:{ type: Sequelize.INTEGER, notEmpty: true}

    });
    return User;
}