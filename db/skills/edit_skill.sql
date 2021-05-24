update userskills us
set us.skill_id = ($1)
where us.skill_id = (select s.id from skills s where s.skill = ($2));