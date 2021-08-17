'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Teams",
      [
        {
          name: "Blizzards",
        },
        {
          name: "Earthquakes",
        },
        {
          name: "Rookies",
        },
        {
          name: "TeamOne",
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
