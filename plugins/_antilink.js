بالطبع، إليك الكود باللغة العربية:

```javascript
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0;
    
    if (!m.isGroup)
        return !1;
    
    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    const user = `@${m.sender.split`@`[0]}`;
    let bot = global.db.data.settings[this.user.jid] || {};

    const isGroupLink = linkRegex.exec(m.text);
    const grupo = `https://chat.whatsapp.com`;

    if (isAdmin && chat.antiLink && m.text.includes(grupo))
        return m.reply('*الحماية من الروابط مفعلة ولكن لقد أنت مسؤول 😎!*');

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup))
                return !0;
        }

        await conn.sendMessage(m.chat, {text: `*「 اكتشاف رابط مجموعة 」*\n\n${user} 🤨 لقد خالفت قواعد المجموعة وسيتم حذفك....`, mentions: [m.sender]}, {quoted: m});

        if (!isBotAdmin)
            return m.reply('*لقد تم حمايتك من الحذف، لا يمكنني حذف الأعضاء*');

        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});

            let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (responseb[0].status === "404")
                return;   
        } else if (!bot.restrict)
            return m.reply('*الروبوت غير مفعل لحذف الأعضاء*');
    }
    return !0;
}
```

يرجى ملاحظة أنه يمكن أن يكون هذا الكود متوقفًا على بعض المتغيرات الخارجية مثل `global.db.data` و `this.user.jid` و `conn`، يرجى التأكد من تعر
