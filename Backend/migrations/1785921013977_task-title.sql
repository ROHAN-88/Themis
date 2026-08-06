-- Up Migration

CREATE TABLE task_type (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title VARCHAR(20) NOT NULL,
    color VARCHAR(20)
);
-- Down Migration