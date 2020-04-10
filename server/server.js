import express from 'express';
import devBundle from './devBundle';
import path from 'path';
import { MongoClient } from 'mongodb';
import template from './../template';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
MongoClient.connect(url, (err, db) => {
    if (err){
        console.error('An Error occured: ', err)
    }
    console.log("Connected successfully to mongodb server");
    db.close()
})
const app = express();

if (process.env.NODE_ENV === 'development'){
    devBundle.compile(app);
}

const CURRENT_WORKING_DIR = process.cwd();

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req,res) => {
    res.status(200).send(template())
});

let port = process.env.PORT || 3000;

app.listen(port, function onStart(err){
    if (err){
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})