-- PostgreSQL database dump

SET default_tablespace = '';
SET default_table_access_method = heap;

-- Clean up partial migrations from previous failed runs
DROP TABLE IF EXISTS public.tasks CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

--
-- Name: tasks; Type: TABLE; Schema: public
--
CREATE TABLE public.tasks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    task_name character varying(70) NOT NULL,
    description character varying(100),
    priority character varying(50) NOT NULL,
    status character varying(50) NOT NULL,
    create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by uuid,
    assignee_to uuid,
    updated_by uuid
);

--
-- Name: users; Type: TABLE; Schema: public
--
CREATE TABLE public.users (
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phoneno character varying(20),
    address text,
    age integer,
    gender character varying(10),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    password character varying(200)
);

--
-- Constraints & Foreign Keys
--
ALTER TABLE ONLY public.tasks ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tasks ADD CONSTRAINT fk_assinge_user FOREIGN KEY (assignee_to) REFERENCES public.users(id);
ALTER TABLE ONLY public.tasks ADD CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES public.users(id);