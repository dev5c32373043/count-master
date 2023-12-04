# CountMaster: overcomplicated counter app 😂

This service manages user authentication, featuring two distinct roles: PRO users and Regular users. Each user possesses a dedicated counter allowing increments or decrements within a 1-minute timeframe. Using BullMQ, the service schedules delayed jobs to manage time-sensitive counter actions. Within these jobs, positive counter changes are stored as historical records in the database, while negative values prompt an automatic removal process. This seamless process maintains database efficiency by recording pertinent data and handling redundant information promptly. Upon job completion, users receive WebSocket notifications, offering real-time updates on their respective counter statuses.

## Getting started

To start the project install all dependencies in requirements section.
Add `.env` file in each project (`.env.example` as an example)

Install npm packages:

```
npm install
```

Create database. Run migrations:

```
npm run api:db:migrate
```

And finally execute the following command:

```
npm run start:dev
```

## Requirements

- [nx][nx] 17.1.3
- [Node.js][node] 18.16.0
- [PostgreSQL][postgresql] 12.11
- [Redis][redis] 7.2.3

[nx]: https://nx.dev/
[node]: https://nodejs.org/
[postgresql]: https://www.postgresql.org/
[redis]: https://redis.io/
