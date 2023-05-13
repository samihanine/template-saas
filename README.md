# Development

## Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [Tailwind](https://tailwindcss.com/)

## Local setup

After cloning the repository, install the dependencies.

```bash
pnpm install
```

Set up the local environment variables with your personal Supabase and Mapbox tokens. You must create your own Supabase project and Mapbox account to get these tokens.

```bash
cp .env-example .env
# now edit the .env file
```

Push the schema to the database

```bash
npx prisma db push
```

Run the app locally. If you want to avoid setting up Google Sign Up, log in using email/password.

```bash
pnpm run dev
```

Run tests locally. For this you need to have a local instance of the app running.

```bash
pnpm run test
```