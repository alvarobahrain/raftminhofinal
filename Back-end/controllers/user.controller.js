module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('user', {
        Email: {
            primaryKey: true,
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.TEXT
        },
        about: {
            type: Sequelize.TEXT
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        id_tipo: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    });
    return User;
};
