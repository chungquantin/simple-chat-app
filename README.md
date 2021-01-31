# Simple Chat App

![ảnh](https://user-images.githubusercontent.com/56880684/106380099-a52ed280-63e2-11eb-8968-761ef6016a97.png)

The simple chat app with TypeGraphQL, TypeORM, GraphQL Yoga, Nx Monorepo and React

This project uses the template https://github.com/chungquantin/typegraphql-graphql-nx-boilerplate

- TypeORM: For data mapping and database design
- TypeGrapgQL: A GraphQL framwork for writing the schemas in term of classes 
- Graph Yoga: A library for constructing the GraphQL server (Apollo Server-like)
- Nx Monorepo: A tool for making the client extensible with the monorepo microservice architecture
- React: Front-end framework

Instead of using socket.io for real-time data update, I use GraphQL Subscription.
