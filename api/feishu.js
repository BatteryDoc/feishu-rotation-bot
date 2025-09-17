export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;
    if (body && body.type === 'url_verification') {
      return res.json({ challenge: body.challenge });
    }
    return res.json({ code: 0 });
  }
  return res.json({ message: 'ok' });
}
