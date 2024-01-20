<a href='LICENSE'>
  <img alt="GitHub License" src="https://img.shields.io/github/license/Fyz-dev/funfy-forum?labelColor=black&color=38c653&cacheSeconds=50000">
</a>

<p align="center">
  <a href="https://funfy-forum.vercel.app/">
      <img width="40%" src="/public/icon.svg" alt="funfy-roum" />
      <h1 align="center">Funfy-forum</h1>
  </a>
</p>

<p align='center'>
  <img alt="Static Badge" src="https://img.shields.io/badge/-Typescript?style=flat&logo=typescript&label=Typescript&labelColor=black&color=black">
  <img alt="Next.js" src="https://img.shields.io/badge/-Next?style=flat&logo=next.js&logoColor=white&label=Next.js&labelColor=black&color=black">
  <img alt="Supabase" src="https://img.shields.io/badge/-Supabase?style=flat&logo=supabase&label=Supabase&labelColor=black&color=black">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/-TailwindCSS?style=flat&logo=tailwindcss&label=TailwindCSS&labelColor=black&color=black">
  <img alt="SWR" src="https://img.shields.io/badge/-SWR?style=flat&logo=swr&label=SWR&labelColor=black&color=black">
  <img alt="NextUI" src="https://img.shields.io/badge/-SWR?style=flat&logo=nextui&label=NextUI&labelColor=black&color=black">
  <img alt="Framer-motion" src="https://img.shields.io/badge/-framermotion?logo=framer&label=framer-motion&labelColor=black&color=black">
</p>

Funfy Forum is a simple forum designed to discuss various topics. The project was developed as part of a course project in the fourth year. The original plan was to use Firebase, but I quickly abandoned this idea in favor of Supabase. This choice is justified by the fact that Supabase is built on PostgreSQL, which provides the ability to use recursive queries. Considering that comments in my project are displayed in a tree view, this makes working with them much easier.

I used NextUI as a UI library, which provides a modern and stylish design integrated with the project logic. Additionally, to optimize performance and improve user experience, the project includes Next.js and the useSWR library for caching, deduplication and mutation.

<img alt="Preview" src="/docs/assets/Preview.png">

## 🔧Installation

1. Cloning the repository

```bash
git clone https://github.com/Fyz-dev/funfy-forum.git
```

2. Install dependencies

```bash
yarn install
```

3. Environment setup

You need to get the supabase keys and create an env file by defining the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=******
```

4.  Run [setup.sql](sql/setup.sql) and create a bucket of user-avatars and topic-avatars in the repository

5.  Project launch

```bash
yarn dev
```
