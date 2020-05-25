# Sentence Finder

A webapp that that creates a list of senctences and translations based on a given set of words

- Note - it is currenlty a work in progess, and it only incldues data for French, English, Spanish and Japanese Sentences

## Setup
This is still a work in progress, but feel free to pull it and run it locally by doing the following

Make sure you have installed
- npm
- docker
- A Posgtres client (e.g. Postico)

Then, from the root folder run the following commands in different terminal windows

### Seting up the database
- Run `docker-compose up`
- Run `npm run migrate`

## Add the dat 
- Download the sentences you want from the tatoeba website https://tatoeba.org/eng/downloads
- Download from the 'Sentences' section to get sentences
- Download from the 'Links' section to get SentenceTranslations
- Use the `data/tatoeba.ipynb` to convert the csv into the data that can be added to a posgres table. 
- You can look at code/app/db/models to see what fields are necessary
- Use your Posgres client to add the two csv files from `data/` into their two corresponding tables

### Running the app
- Run `npm run back` to start the Node App
- Run `npm run frontk` to start the React App