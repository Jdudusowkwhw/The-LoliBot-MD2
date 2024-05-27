بالتأكيد، إليك النسخة المعربة من الكود:

```javascript
import fetch from 'node-fetch';

const isLinkTik = /tiktok.com/i;
const isLinkYt = /youtube.com|youtu.be/i;
const isLinkTel = /telegram.com|t.me/i;
const isLinkFb = /facebook.com|fb.me/i;
const isLinkIg = /instagram.com/i;
const isLinkTw = /twitter.com/i;

export async function before(m, { conn, args, usedPrefix, command, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[this.user.jid] || {};
  let delet = m.key.participant;
  let bang = m.key.id;
  let toUser = `${m.sender.split("@")[0]}`;
  let aa = toUser + '@s.whatsapp.net';

  const isAntiLinkTik = isLinkTik.test(m.text);
  const isAntiLinkYt = isLinkYt.test(m.text);
  const isAntiLinkTel = isLinkTel.test(m.text);
  const isAntiLinkFb = isLinkFb.test(m.text);
  const isAntiLinkIg = isLinkIg.test(m.text);
  const isAntiLinkTw = isLinkTw.test(m.text);

  if (chat.antiTiktok && isAntiLinkTik) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `تحذير: تم اكتشاف رابط TikTok! *@${toUser}*`, null, { mentions: [aa] });
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } else if (!isBotAdmin) {
      return m.reply(`تحذير: البوت يحتاج إلى صلاحيات الإدارة.`);
    } else if (!bot.restrict) {
      return m.reply(`تحذير: البوت يحتاج إلى تفعيل وضع التقييد من قبل المالك.`);
    }
  }

  if (chat.antiYoutube && isAntiLinkYt) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `تحذير: تم اكتشاف رابط YouTube! *@${toUser}*`, null, { mentions: [aa] });
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } else if (!isBotAdmin) {
      return m.reply(`تحذير: البوت يحتاج إلى صلاحيات الإدارة.`);
    } else if (!bot.restrict) {
      return m.reply(`تحذير: البوت يحتاج إلى تفعيل وضع التقييد من قبل المالك.`);
    }
  }

  if (chat.antiTelegram && isAntiLinkTel) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `تحذير: تم اكتشاف رابط Telegram! *@${toUser}*`, null, { mentions: [aa] });
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } else if (!isBotAdmin) {
      return m.reply(`تحذير: البوت يحتاج إلى صلاحيات الإدارة.`);
    } else if (!bot.restrict) {
      return m.reply(`تحذير: البوت يحتاج إلى تفعيل وضع التقييد من قبل المالك.`);
    }
  }

  if (chat.antiFacebook && isAntiLinkFb) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `تحذير: تم اكتشاف رابط Facebook! *@${toUser}*`, null, { mentions: [aa] });
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } else if (!isBotAdmin) {
      return m.reply(`تحذير: البوت يحتاج إلى صلاحيات الإدارة.`);
    } else if (!bot.restrict) {
      return m.reply(`تحذير: البوت يحتاج إلى تفعيل وضع التقييد من قبل المالك.`);
    }
  }

  if (chat.antiInstagram && isAntiLinkIg) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `تحذير: تم اكتشاف رابط Instagram! *@${toUser}*`, null, { mentions: [aa] });
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } else if (!isBotAdmin) {
      return m.reply(`تحذير: البوت يحتاج إلى صلاحيات الإدارة.`);
    } else if (!bot.restrict) {
      return m.reply(`تحذير: البوت يحتاج إلى تفعيل وضع التقييد من قبل المالك.`);
    }
  }

  if (chat.antiTwitter && isAntiLinkTw) {
    if (isBotAdmin && bot.restrict) {
      await conn.reply(m.chat, `تحذير: تم اكتشاف رابط Twitter! *@${toUser}*`, null, { mentions: [aa] });
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } else if (!isBotAdmin) {
      return m.reply(`تحذير: البوت يحتاج إلى صلاحيات الإدارة.`);
    } else if (!bot.restrict) {
      return m.reply(`تحذير: البوت يحتاج إلى تفعيل وضع التقييد من قبل المالك.`);
    }
  }

  return true;
}
```

في هذا الكود، تم ترجمة الرسائل النصية إلى اللغة العربية لتوفير تحذيرات وتنبيهات باللغة المناسبة.
