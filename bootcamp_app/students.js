const { Pool } = require('pg');
// remove first two arguments (node, filename) from user input
const input = process.argv.slice(2);
const cohortName = input[0];
const limit = input[1] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

// new database connection with login credentials
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
  SELECT students.id, students.name, cohorts.name as cohort
  FROM students
  JOIN cohorts on cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2
  `;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  });
})
.catch(err => console.error('query error', err.stack));