insert into userskills (user_id, skill_id) values ($1, $2);

select u.email, u.id, u.location, s.skill from users u
join userskills us on u.id = us.user_id
join skills s on us.skill_id = s.id
where u.id = ($1);