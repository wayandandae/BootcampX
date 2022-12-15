const { Pool } = require('pg');
const cohortName = process.argv.slice(2);

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests on teachers.id = teacher_id
  JOIN students on students.id = student_id
  JOIN cohorts on cohorts.id = cohort_id
  WHERE cohorts.name = $1
  ORDER BY teacher;
  `;

pool.query(queryString, cohortName)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`);
  });
})
.catch(err => console.error('query error', err.stack));