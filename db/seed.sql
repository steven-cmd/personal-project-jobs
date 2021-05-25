drop table if exists userskills;
drop table if exists users;
drop table if exists skills;


create table users 
(id serial primary key,
email varchar not null, 
password varchar not null,
location varchar);

create table skills
(id serial primary key,
skill varchar not null);

create table userskills
(id serial primary key,
user_id integer references users(id),
skill_id integer references skills(id));
