-- Up Migration
-- DROP FUNCTION IF EXISTS log_task_update();
CREATE OR REPLACE FUNCTION log_task_update()
RETURNS TRIGGER AS $$
BEGIN 
    INSERT INTO task_audit_table(
        fk_task_id,
        action,
        changed_by,
        changed_at
    )
    VALUES (
        NEW.id,
        'UPDATE',
        NEW.updated_by,
        NOW()
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER task_update
AFTER UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION log_task_update();

ALTER TABLE tasks ENABLE ALWAYS TRIGGER task_update ; 
-- Down Migration