import { MongoClient } from 'mongodb';

let DatabaseConnection = {
};

module.exports = {
    connectToDatabase: () => {
        // Code to connect to the database
        MongoClient.connect('mongodb://localhost:27017/bookstore')
            .then(client => {
                DatabaseConnection.db = client.db('bookstore');
            });
            console.log("Connecting to the database...");
    },
        

    getDatabase: () => {
        // Code to get the database instance
        console.log("Getting the database instance...");
        return DatabaseConnection.db;
    },
};