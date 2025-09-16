export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    
    // 飞书URL验证
    if (body.type === 'url_verification') {
      console.log('✅ 飞书URL验证成功');
      return res.json({ challenge: body.challenge });
    }
    
    // 处理消息事件
    if (body.header?.event_type === 'im.message.receive_v1') {
      const event = body.event;
      const message = event.message;
      const content = JSON.parse(message.content);
      const text = content.text.trim();
      
      console.log('📩 收到消息:', text);
      console.log('👤 发送者:', event.sender.sender_id.user_id);
      
      // 检查关键回复
      if (text === '收到' || text === '不开') {
        console.log(`🎯 检测到关键回复: ${text}`);
        // 这里可以添加后续处理逻辑
      }
    }
    
    return res.status(200).send('ok');
    
  } catch (error) {
    console.error('❌ 处理失败:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
