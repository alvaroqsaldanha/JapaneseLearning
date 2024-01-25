const fs = require('fs');

function processJson(inputFile, outputFilesPrefix) {
    const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

    const entries = Object.entries(data);

    const jlpt5Entries = entries.filter(([key, entry]) => entry.jlpt_new === 5);
    const jlpt4Entries = entries.filter(([key, entry]) => entry.jlpt_new === 4);
    const jlpt3Entries = entries.filter(([key, entry]) => entry.jlpt_new === 3);

    const writeToFile = (entries, level) => {
        const outputFile = `${outputFilesPrefix}_jlpt_${level}.json`;

        // Define fields to exclude
        const fieldsToExclude = ["strokes", "grade", "jlpt_old", "wk_level", "wk_meanings", "wk_readings_on", "wk_readings_kun", "wk_radicals"];

        // Filter out fields you don't want to keep
        const filteredEntries = entries.map(([key, entry]) => {
            const filteredEntry = Object.fromEntries(
                Object.entries(entry).filter(([field]) => !fieldsToExclude.includes(field))
            );
            return [key, filteredEntry];
        });

        const filteredData = Object.fromEntries(filteredEntries);
        fs.writeFileSync(outputFile, JSON.stringify(filteredData, null, 2));
        console.log(`File ${outputFile} created.`);
    };

    writeToFile(jlpt5Entries, 5);
    writeToFile(jlpt4Entries, 4);
    writeToFile(jlpt3Entries, 3);
}

const inputJsonFile = 'kanji.json';  // Replace with the path to your input JSON file
const outputFilesPrefix = 'output';  // Replace with your desired output file prefix

processJson(inputJsonFile, outputFilesPrefix);