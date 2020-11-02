/**** DROP TABLES ****/
--drop table Tags;
--drop table TagName;
--drop Table Post;
--drop table SubSection;
--drop table Section;

/**** CREATE TABLES ****/
create table if not exists Section(
    id int primary key generated always as identity,
    name varchar(100) not null,
    description varchar(255) null
);

create table if not exists SubSection(
    id int primary key generated always as identity,
    name varchar(100) not null,
    description varchar(250) null,
    section_id int not null,
    constraint fk_section_id
        foreign key (section_id)
            references Section(id)
);

create table if not exists TagName(
    id int primary key generated always as identity,
    tag_name varchar(100)
);

create table if not exists Post (
    id int primary key generated always as identity,
    post_title text not null,
    post_text text not null,
    created_date date default now(),
    updated_date date default now(),
    visible bool default true,
    deleted bool default false,
    section_id int not null,
    sub_section_id int null,
    constraint fk_section_id
        foreign key(section_id)
            references Section(id),
    constraint fk_sub_section_id
        foreign key(sub_section_id)
            references SubSection(id)
);

create table if not exists Tags(
    id int primary key generated always as identity,
    post_id int not null,
    tag_id int not null,
    constraint fk_post_id
        foreign key(post_id)
            references Post(id)
                on delete cascade,
    constraint fk_tag_id
        foreign key(tag_id)
            references TagName(id)
                on delete cascade
);

/**** CREATE PROCEDURES ****/
/** ADD POST PROCEDURE **/
create or replace procedure
    add_post(title varchar(100), body text, section int, sub_section int default 0, tags int[] default null)
language plpgsql
as $$
declare
    new_post_id int;
    tag_id int;
begin
    insert into Post(post_title, post_text, section_id, sub_section_id)
        values(title, body, section, sub_section) returning id into new_post_id;
    if tags is not null then
        foreach tag_id in array tags
            loop
                insert into Tags(post_id, tag_id)
                    values(new_post_id, tag_id);
            end loop;
    end if;
end; $$;

/** UPDATE POST PROCEDURE **/
create or replace procedure
    update_post(updated_post_id int, title varchar(100), body text, section int, sub_section int default 0, tags int[] default null)
language plpgsql
as $$
declare
    tag_id int;
begin
    update Post
        set
            post_title = title,
            post_text = body,
            section_id = section,
            sub_section_id = sub_section,
            updated_date = now()
        where id = updated_post_id;
    delete from tags where post_id = updated_post_id;
    if tags is not null then
        foreach tag_id in array tags
            loop
                insert into Tags(post_id, tag_id)
                    values(updated_post_id, tag_id);
            end loop;
    end if;
end; $$;

/** ADD SECTION PROCEDURE **/
create or replace procedure
    add_section(section_name varchar(100), section_description varchar(250))
language plpgsql
as $$
begin
    insert into Section(name, description)
        values(section_name, section_description);
end; $$;

/** UPDATE SECTION PROCEDURE **/
create or replace procedure
    update_section(section_id int, section_name varchar(100), section_description varchar(250))
language plpgsql
as $$
begin
    update Section
        set
            name = section_name,
            description = section_description
        where id = section_id;
end; $$;

/** ADD SUB SECTION PROCEDURE **/
create or replace procedure
    add_sub_section(sub_section_name varchar(100), sub_section_description varchar(250), parent_section_id int)
language plpgsql
as $$
begin
    insert into SubSection(name, description, section_id)
        values(sub_section_name, sub_section_description, parent_section_id);
end; $$;

/** UPDATE SUB SECTION PROCEDURE **/
create or replace procedure
    update_sub_section(sub_section_id int, sub_section_name varchar(100), sub_section_description varchar(250), parent_section_id int)
language plpgsql
as $$
begin
    update SubSection
        set
            name = sub_section_name,
            description = sub_section_description,
            section_id = parent_section_id
        where id = sub_section_id;
end; $$;

/** ADD TAG PROCEDURE **/
create or replace procedure
    add_tag(name varchar(100))
language plpgsql
as $$
begin
    insert into TagName(tag_name)
        values(name);
end; $$;

/** UPDATE TAG PROCEDURE **/
create or replace procedure
    update_tag(tag_id int, name varchar(100))
language plpgsql
as $$
begin
    update TagName
        set
            tag_name = name
        where id = tag_id;
end; $$;

--
insert into TagName(tag_name) values ('General'), ('Programming'), ('News');
insert into Section(name, description) values ('Languages', 'Language stuff'), ('Snippets', 'Some common and useful snippets'), ('Databases', 'Relation and object database types');
--insert into SubSection(name, description, section_id) values ('', '', 0);
    call add_post('First post from query editor in DataGrip', 'Test text body! woo!', 1, null, array[1, 2]);
call update_post(1, 'First update post from query editor in DataGrip', 'Test text body! woo!', 2, null,array[2]);

select * from tagname;

delete from post where id = 1;