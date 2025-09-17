export default async function handler(req, res) {
  console.log('收到请求:', req.method, req.url);
  
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    console.log('非POST请求');
    return res.status(200).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    console.log('请求体:', JSON.stringify(body, null, 2));
    
    // 飞书URL验证
    if (body?.type === 'url_verification') {
      console.log('URL验证请求，challenge:', body.challenge);
      return res.status(200).json({ challenge: body.challenge });
    }
    
    // 处理消息事件
    if (body?.header?.event_type === 'im.message.receive_v1') {
      console.log('收到消息事件');
      const event = body.event;
      if (event?.message?.content) {
        const content = JSON.parse(event.message.content);
        console.log('消息内容:', content.text);
      }
    }
    
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('处理失败:', error);
    return res.status(200).json({ error: error.message });
  }
}
