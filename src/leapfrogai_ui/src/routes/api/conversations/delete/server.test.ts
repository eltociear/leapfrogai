import { faker } from '@faker-js/faker';
import { DELETE } from './+server';

describe('/api/conversations/delete', () => {
	it('returns a 400 when messages are missing from the request', async () => {
		const request = new Request('http://localhost:5173/api/conversations/delete', {
			method: 'POST',
			body: JSON.stringify({ conversationId: '123' })
		});

		await expect(DELETE({ request, locals: { supabase: {} } })).rejects.toMatchObject({
			status: 400
		});
	});
	it('returns a 400 when id is missing', async () => {
		const request = new Request('http://localhost:5173/api/conversations/delete', {
			method: 'DELETE'
		});

		await expect(DELETE({ request, locals: { supabase: {} } })).rejects.toMatchObject({
			status: 400
		});
	});
	it('returns a 204 when the request completes', async () => {
		const supabaseMock = {
			supabase: {
				from: vi.fn(() => ({
					delete: vi.fn(() => ({ eq: vi.fn(() => Promise.resolve({ error: null })) }))
				}))
			}
		};

		const request = new Request('http://localhost:5173/api/conversations/delete', {
			method: 'POST',
			body: JSON.stringify({ conversationId: faker.string.uuid() })
		});

		await expect(DELETE({ request, locals: supabaseMock })).resolves.toMatchObject({
			status: 204
		});
	});
});
