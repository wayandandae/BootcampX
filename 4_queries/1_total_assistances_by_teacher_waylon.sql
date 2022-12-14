SELECT count(assistance_requests.*) as total_assistances, teachers.name
FROM assistance_requests
JOIN teachers on teacher_id = teachers.id
GROUP BY teachers.name
HAVING teachers.name = 'Waylon Boehm';