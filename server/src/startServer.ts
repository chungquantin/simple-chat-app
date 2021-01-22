import "reflect-metadata";
import "dotenv/config";
import { createConnection, getConnectionOptions } from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import genSchema from "./utils/genSchema";
import { sessionConfiguration } from "./helper/session";
import { GQLContext } from "./utils/graphql-utils";
import { redis } from "./helper/redis";
import { DEV_BASE_URL } from "./constants/global-variables";
import { EnvironmentType } from "./utils/environmentType";
import { formatValidationError } from "./utils/formatValidationError";
import {
	MutationValidationError,
	FieldValidationError,
} from "graphql-yup-middleware";

export const startServer = async () => {
	if (process.env.NODE_ENV !== EnvironmentType.PROD) {
		await redis.flushall();
	}
	const connectionOptions = await getConnectionOptions("development");
	await createConnection({ ...connectionOptions, name: "default" });

	const server = new GraphQLServer({
		schema: await genSchema(),
		typeDefs: [MutationValidationError, FieldValidationError],
		context: ({ request }: GQLContext) => ({
			req: request,
			redis,
			session: request.session,
			url: request.protocol + "://" + request.get("host"),
		}),
	} as any);

	const corsOptions = { credentials: true, origin: DEV_BASE_URL };

	server.express.use(sessionConfiguration);

	const PORT = process.env.PORT || 5000;
	const app = await server.start({
		cors: corsOptions,
		port: PORT,
		formatError: formatValidationError,
		subscriptions: {
			onConnect: () => console.log("Subscription server connected!"),
			onDisconnect: () => console.log("Subscription server disconnected!"),
		},
	});

	console.log(`Server is ready at http://localhost:${app.address().port}`);
};
