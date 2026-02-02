import { fetchNodeApiDocs } from '../services/api-docs-service.js';
import { createModuleTool, createSearchTool, createListTool } from '../tools/documentation-tools.js';

export async function initializeDocumentationServer(server) {

	const apiDocs = await fetchNodeApiDocs();

	// Remove entries without Class or Method
	const originalCount = apiDocs.modules?.length;
	apiDocs.modules = apiDocs.modules.filter(module =>
		module?.classes?.length > 0 || module?.methods?.length > 0
	);

	// Create tools for each module
	apiDocs.modules.forEach(module => {
		createModuleTool(server, module);
	});

	// Create search and list tools
	createSearchTool(server, apiDocs.modules);
	createListTool(server, apiDocs.modules);
}