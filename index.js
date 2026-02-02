#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { initializeDocumentationServer } from "./server/documentation-server.js";

const server = new McpServer({
	name: "Node.js API Documentation",
	version: "1.0.0",
	capabilities: {
		resources: {},
		tools: {}
	}
});

async function startServer() {
	try {
		await initializeDocumentationServer(server);

		const transport = new StdioServerTransport();
		await server.connect(transport);
	} catch (error) {
		console.error(`Fatal error during server initialization. Check logs for details.`);
		process.exit(1);
	}
}

startServer();