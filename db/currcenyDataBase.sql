create database currencyDataBase;
use currencyDataBase;

create table users(
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
);

insert users(user_id, password, email, username) values(1, "12345678","123456789@qq.com", "Ric");
insert users(user_id, password, email, username) values(2, "12345678","133456789@qq.com", "r1");
insert users(user_id, password, email, username) values(3, "12345678","125456789@qq.com", "r2");
insert users(user_id, password, email, username) values(4, "12345678","123556789@qq.com", "r3");
insert users(user_id, password, email, username) values(5, "12345678","123656789@qq.com", "r4");
insert users(user_id, password, email, username) values(6, "12345678", "122456789@qq.com", "r5");

insert currencies(id, iso_code, name, symbol, country, is_active) values(1, "1", "usa", "$", "USA", true);
insert currencies(id, iso_code, name, symbol, country, is_active) values(2, "2", "china", "¥", "CHINA", true);
insert currencies(id, iso_code, name, symbol, country, is_active) values(3, "3", "uk", "£", "United Kingdom", true);
insert currencies(id, iso_code, name, symbol, country, is_active) values(4, "4", "aus", "A$", "Australian Dollar", true);


