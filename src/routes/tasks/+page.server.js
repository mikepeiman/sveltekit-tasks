import { error } from '@sveltejs/kit';
import { api } from './api';

export const load = async ({ locals }) => {
	// locals.userid comes from src/hooks.js
	const response = await api('GET', `tasks/${locals.userid}`);

	if (response.status === 404) {
		// user hasn't created a task list.
		// start with an empty array
		return {
			tasks: []
		};
	}

	if (response.status === 200) {
		return {
			tasks: await response.json()
		};
	}

	throw error(response.status);
};

export const actions = {
	add: async ({ request, locals }) => {
		const form = await request.formData();

		await api('POST', `tasks/${locals.userid}`, {
			text: form.get('text')
		});
	},
	edit: async ({ request, locals }) => {
		const form = await request.formData();

		await api('PATCH', `tasks/${locals.userid}/${form.get('uid')}`, {
			text: form.get('text')
		});
	},
	toggle: async ({ request, locals }) => {
		const form = await request.formData();

		await api('PATCH', `tasks/${locals.userid}/${form.get('uid')}`, {
			done: !!form.get('done')
		});
	},
	delete: async ({ request, locals }) => {
		const form = await request.formData();

		await api('DELETE', `tasks/${locals.userid}/${form.get('uid')}`);
	}
};
