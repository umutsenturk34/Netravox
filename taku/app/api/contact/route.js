import { postContact } from '../../../lib/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await postContact(body);
    return Response.json(data, { status: 201 });
  } catch (err) {
    return Response.json({ message: err.message || 'Gönderme başarısız' }, { status: 400 });
  }
}
