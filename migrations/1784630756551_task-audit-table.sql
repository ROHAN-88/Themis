-- Up Migration
CREATE TABLE IF NOT EXISTS public.task_audit_table (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    fk_task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE ,
    action VARCHAR(20) NOT NULL,
    changed_by uuid NOT NULL,
    changed_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
    )
-- Down Migration