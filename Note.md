DATABASE_URL="postgresql://postgres:1234@localhost:5432/project-management?schema=public"

npx prisma generate

npx prisma migrate dev --name init

pnpm seed

SELECT setval(
	pg_get_serial_sequence('"Project"', 'id'),
	coalesce(max(id)+1, 1),
	false
)
FROM "Project";
