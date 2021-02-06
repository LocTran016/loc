
const algoliasearch = require('algoliasearch');

const client = algoliasearch('0IIEX2QW3D', 'a95b28133a4ebdc316bf4cef579dbba1');
const index = client.initIndex('main');

const records = require('./public/index.json');

index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
