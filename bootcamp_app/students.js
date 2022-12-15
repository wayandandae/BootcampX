const { Pool } = require('pg');
// remove first two arguments (node, filename) from user input
const input = process.argv.slice(2);

// new database connection with login credentials
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name, cohorts.name as cohort
FROM students
JOIN cohorts on cohorts.id = cohort_id
WHERE cohorts.name LIKE '${input[0]}%'
LIMIT ${input[1]};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  });
})
.catch(err => console.error('query error', err.stack));