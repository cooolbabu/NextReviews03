# NextJS by Example

## Course on Udenmy

[Develop static and full-stack web applications with React and Next.js 14. Includes Tailwind CSS, Strapi CMS, Prisma ORM.
](https://www.udemy.com/course/nextjs-by-example)

## Sample site on github

## Key Features

- Start with basic.
- Page based routing
- Dynamic routing using slugs
- TailwindCSS, Markup language

## Project configuration

1. Start with package.json and manually install everything

```
{
    "name": "next-reviews",
    "private": true,
}
```

2. npm packages to install

```
npm install next react react-dom
npm i gray-matter
npm -i marked
npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer
npm install eslint eslint-config-next --save-dev
npm install qs
npm install @headlessui/react
npm install server-only


```

2. Intializations

```
npx tailwindcss init -postcss
add scripts to package.json
npx prisma init --datasource-provider sqlite

```

## Site Map

- Home Page
- Reviews
  - Review pages
- About

## Configure Layout, Alias(jsconfig.json)

- Main menu
- Configure tailwind.config.js and globals.css
- Setup Header and Footer

## Configure Fonts (Orbitron and Exo)

1. Styling and Fonts

- global.css
- Google fonts and configure font.js
- configure tailwind.config.js - content, theme and plugins
- Add className to html tag

## Components and Libs

- Reviews.js - Services to get data
- Headings - Pre-defined component
- ShareLink - Usefull utility - 'use client'

## Images

- Image component can be used for optimization. But cannot use static pages afterwards. Configure next.config.js
- Use NextJs Image component. Set fetch priority

### Starpi

```
  npm install strapi to install strapi
  npm run develop
  npm run build
  npm start

  admin@eample.com
  Admin123
```

## Testing REST Services in Javascript

## Install ESLint to check code

### Other stuff

- Dynamic params and dynamic rendering (force-dynamic)
- Page Not Found (notFound)
- Background revalidation and on-demand revalidation

### Server only

- npm install server-only
- Make all calls server only

- Caching of static pages is a problem. revalidatePath(next/cahce) will solve this problem
- Progressive enhancement will even without javascript
- Client-side validation
  html required and maxLength

### Create Prisma DB

- Create a model in schema.prisma
- npx prisma db push - Creates a database in the primsa folder
