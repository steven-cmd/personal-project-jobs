select u.email, u.id, u.location, s.skill, us.skill_id from users u
join userskills us on u.id = us.user_id
join skills s on us.skill_id = s.id
where u.id = ($1);