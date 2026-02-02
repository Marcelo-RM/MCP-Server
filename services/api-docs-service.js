const url = 'https://nodejs.org/docs/latest/api/all.json';

export async function fetchNodeApiDocs() {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		// TODO later implement with logging etc
		throw error;
	}
}

export function findModuleByName(modules, searchName) {
	const normalizedSearch = normalizeModuleName(searchName);
	return modules.find(module =>
		normalizeModuleName(module.name) === normalizedSearch ||
		normalizeModuleName(module.textRaw) === normalizedSearch ||
		(module.displayName && normalizeModuleName(module.displayName) === normalizedSearch)
	);
}

export function normalizeModuleName(name) {
	return name.toLowerCase().replace(/[_\s-]/g, '');
}