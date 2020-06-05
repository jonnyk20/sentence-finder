"use strict";
const fs = require('fs');
const csv = require('csv');
const SENTENCE_TRANSLATION_FILE_NAME = '/Users/jonny/side-projects/kussaku/data/links.csv';
const parseSentenceTranslation = ([sentenceIdString, translationIdString]) => ({
    sentenceId: parseInt(sentenceIdString),
    translationId: parseInt(translationIdString),
    createdAt: new Date(),
    updatedAt: new Date(),
});
const insertTranslations = (queryInterface) => {
    return new Promise((resolve, reject) => {
        var readStream = fs.createReadStream(SENTENCE_TRANSLATION_FILE_NAME); // readStream is a read-only stream wit raw text content of the CSV file
        var csvStream = csv.parse({
            delimiter: '\t',
            quote: null,
        });
        console.time();
        csvStream
            .on('data', function (data) {
            const SentenceTranslation = parseSentenceTranslation(data);
            queryInterface.bulkInsert('SentenceTranslations', [
                SentenceTranslation,
            ]);
        })
            .on('end', function () {
            console.timeEnd();
            console.log('finished');
            resolve();
        })
            .on('error', function (error) {
            console.log(error);
            reject(error);
        });
        readStream.pipe(csvStream);
    });
};
module.exports = insertTranslations;
