/*
	This module is used by the /tasks endpoint to
	make calls to api.svelte.dev, which stores tasks
	for each user.

	(The data on the task app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

const base = 'https://api.svelte.dev';

export function api(method, resource, data) {
	return fetch(`${base}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
}
