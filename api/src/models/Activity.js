const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
    },
    dificult: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 5
        }
    },
    duracion: {
        type: DataTypes.INTEGER
    },
    season: {
        type: DataTypes.STRING
    }
  },
  {timestamps: false});
};
