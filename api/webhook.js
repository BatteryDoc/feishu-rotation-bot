export default async function handler(req, res) {
  console.log('=== 收到请求 ===');
  console.log('方法:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Webhook endpoint is working' });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('原始请求体:', req.body);
    console.log('请求体类型:', typeof req.body);
    
    let body = req.body;
    
    // 如果请求体是字符串，尝试解析
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.log('JSON解析失败:', e);
      }
    }
    
    console.log('解析后的body:', body);
    
    // 飞书URL验证
    if (body && body.type === 'url_verification') {
      console.log('检测到URL验证请求');
      console.log('Challenge值:', body.challenge);
      
      const response = { challenge: body.challenge };
      console.log('返回响应:', response);
      
      return res.status(200).json(response);
    }
    
    // 处理消息事件
    if (body && body.header && body.header.event_type === 'im.message.receive_v1') {
      console.log('收到消息事件');
    }
    
    console.log('返回成功响应');
    return
