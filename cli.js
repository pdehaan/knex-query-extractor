#!/usr/bin/env node

const knexQueryExtractor = require("./lib");

const argv = process.argv.splice(2);
const queries = knexQueryExtractor(...argv);

console.log(JSON.stringify(queries, null, 2));
