'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return queryInterface.bulkInsert("Sentences", [
            {
                text: "Ceci est une phrase",
                tatoebaId: 2,
                language: 'fra',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                text: "これはぶんです",
                tatoebaId: 3,
                language: 'jpn',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('Sentences', null, {});
    }
};
