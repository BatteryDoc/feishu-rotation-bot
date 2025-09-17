export default async function handler(req, res) {
  console.log('收到请求:', req.method);
  
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Webhook endpoint is working' });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    console.log('请求体:', body);
    
    // 飞书URL验证 - 关键修复
    if (body && body.type === 'url_verification') {
      console.log('URL验证，返回challenge:', body.challenge);
      // 直接返回challenge，不包装在对象中
      return res.status(200).json({
        challenge: body.challenge
      });
    }
    
    // 处理消息事件
    if (body && body.header && body.header.event_type === 'im.message.receive_v1') {
      console.log('收到消息事件');
      // 这里添加消息处理逻辑
    }
    
    return res.status(200).json({ code: 0 });
    
  } catch (error) {
    console.error('处理失败:', error);
    return res.status(200).json({ code: 0 });
  }
}
