create table user(
    user_id int primary key auto_increment,
    password varchar(255),
    email varchar(255) unique,
    username varchar(255) unique
);

create table currencies(
    id int primary key auto_increment,
    iso_code char(3) unique,
    name varchar(255),
    symbol varchar(5),
    country varchar(100),
    is_active boolean default true
)