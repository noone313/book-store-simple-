const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('bookstore', 'postgres', 'pass', {
  host: 'localhost',
  dialect: 'postgres'
});

try {
     sequelize.authenticate();
    console.log('تم الاتصال بنجاح.');
  } catch (error) {
    console.error('فشل الاتصال:', error);
  }
  
  const Book_Dtls = sequelize.define('bookdtl', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publishYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  });
  

sequelize.sync();

module.exports = Book_Dtls;
