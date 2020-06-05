"use strict";
const insertTranslations = require('../utils/insertTranslations');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return insertTranslations(queryInterface);
    },
    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('SentenceTranslations', null, {});
    },
};
