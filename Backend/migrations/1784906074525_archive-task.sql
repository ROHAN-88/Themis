-- Up Migration
ALTER table tasks ADD column is_archived boolean NULL;
-- Down Migration