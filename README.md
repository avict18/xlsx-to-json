This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
#or 
yarn install
#or
pnpm install
#or
bun install

then
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

CREATE .env.local
const MONGODB_URI = "mongodb://localhost:27017/myDatabase";

make sure the routing system is
project-root/
│
├── app/
│   └── api/
│       └── people/
│           └── upload/
│               └── route.ts
│   └── page.tsx
│
├── models/
│   └── Person.ts
│
├── utils/
│   └── db.ts
│
└── .env.local



the example of output data 
{
  "name": "John Doe",
  "age": 25
}
