const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    dificulty: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 5
        }
    },
    duration: {
        type: DataTypes.STRING,
    }
  },
  {timestamps: false});
};
