-- Up Migration
ALTER TABLE public.task_type ADD PRIMARY KEY (id);
ALTER TABLE public.tasks ADD task_type uuid,
ADD CONSTRAINT fk_task_type
FOREIGN KEY (task_type)
REFERENCES task_type(id) ON DELETE CASCADE;
-- Down Migration