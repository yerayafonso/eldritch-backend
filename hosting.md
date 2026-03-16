# Instructions for hosting

https://eldritch-backend.onrender.com

## Github Fork

- Initially you can use the shared repos we've been using.
- Once the project is finished make sure to fork both back end and front repos and connect those to render and netifly.

## Supbase

1. Set up a database instance using Supabase
2. Create a Supabase account by signing up with an email address, or sign in using an existing GitHub account.
3. After logging in, create a new project from the dashboard. If there is no option to create a project, navigate to the All Projects tab in the sidebar.
4. Click the + New Project button.
5. On creating a project for the first time, there may be a prompt to create a new organisation. Give the organisation a name, although it doesn’t matter what this is called.
6. Make sure that the type of organisation selected is Personal and select the Free pricing plan option.
7. Next, give your project a name and create a database password. Copy this to the clipboard and paste it somewhere safe. This password will be required to connect the database instance and it cannot be retrieved again, only reset.

Note: The database password used here must only contain alphanumeric characters. Not doing so can lead to connection errors and prevent seeding to our hosted database from happening successfully as dotenv may not be able to parse the connection string properly.

8. Select any region. This will be the location of the hosted server, so it may be beneficial to choose the location closest to you.
9. Confirm to create the project.
10. If any of these settings need to be changed later they can be reset in the Project Settings dashboard (including the database password).
11. Now that the database instance has been created, navigate back to Home using the menu on the left of the screen.
12. Click the Connect button in the top bar corner located next to your project name. There's a little icon of a plug next to it.
    Copy the Transaction pooler URI connection string to your clipboard, and/or keep this tab open while you move on to the next step. It will look something like this: postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres.

## Create env.production

13. An environment variable called DATABASE_URL will be needed for the API to connect to the production database. This will provide the online location of the database that was just created using Supabase.
14. Add a new .env file called .env.production, which must be added to your ..gitignore to prevent the production database URL being publicly exposed.
15. In this file, create a variable of DATABASE_URL with value of the URI connection string that was copied from the database configuration in the previous step.
16. Make sure to paste in the database password from earlier where directed in the connection string, removing the square brackets too.

## Seed remote database

17. Run npm run seed-remote

## Render

18. Sign up to Render. Then, click on the New + button and create a new Web Service.
19. If you are using our shraed backed end repo paste the URL of the public repo, if you've forked it you can use your githib account and select the repo.
20. Give the app a name.
21. Most of the other options can be left on the default settings, meaning the app will be hosted in the EU using the main branch.
22. The default build command should be changed to yarn and the default start command should be changed to yarn start. Yarn is an alternative package manager to npm.
23. Near bottom, underneath the payment tier options, provide the following environment variables as separate inputs within the Environment Variables section.

    Set DATABASE_URL to the URL of the database from Supabase (the same as in the .env.production file).
    Set NODE_ENV to production.

24. Create the service and it will begin the deploy process. This will take a few minutes the first time, so be patient.
    Progress for this can be seen by selecting the Events tab followed by Logs.

## Betterstack

## Netifly

npm install
npm start instead of yarn build and start command

https://eldritch-backend.onrender.com/ping

add variable about netifly cors
