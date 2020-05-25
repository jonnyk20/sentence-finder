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
    return queryInterface.bulkInsert(
      "SentenceTranslations",
      [
        {
          sentenceId: 1,
          translationId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sentenceId: 1,
          translationId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sentenceId: 2,
          translationId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sentenceId: 2,
          translationId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sentenceId: 3,
          translationId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          sentenceId: 3,
          translationId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  return queryInterface.bulkDelete('SentenceTranslations', null, {});
  }
};
