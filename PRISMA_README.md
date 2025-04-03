
# Prisma Integration with SQLite

This project uses Prisma ORM with SQLite for data storage.

## Setup Instructions

1. Generate Prisma client:
```bash
node scripts/prisma-commands.js generate
```

2. Run database migrations:
```bash
node scripts/prisma-commands.js migrate
```

3. Seed the database with initial data:
```bash
node scripts/prisma-commands.js seed
```

4. (Optional) Open Prisma Studio to view and edit database:
```bash
node scripts/prisma-commands.js studio
```

## Database Schema

The database includes two main tables:
- `Municipality`: Information about municipalities
- `Report`: School reports linked to municipalities

## Troubleshooting

If you encounter any issues:
1. Make sure the `prisma` directory has write permissions
2. Check if SQLite is installed on your system
3. Verify that the database file (`prisma/dev.db`) is not corrupted

For more help, see the [Prisma documentation](https://www.prisma.io/docs/).
