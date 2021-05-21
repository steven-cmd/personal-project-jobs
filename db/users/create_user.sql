insert into users (email, password, location)
values ($1, $2, $3)
returning *;