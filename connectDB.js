
// db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('NOTIMAIL', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port : 32769
  // Autres options de configuration ici
});


export default sequelize; 