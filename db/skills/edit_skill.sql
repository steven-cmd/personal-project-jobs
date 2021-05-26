delete from userskills where skill_id = $1 and user_id = $2;

insert into userskills (user_id, skill_id) values ($2, $3);

select u.email, u.id, u.location, s.skill, us.skill_id from users u
join userskills us on u.id = us.user_id
join skills s on us.skill_id = s.id
where u.id = ($2);