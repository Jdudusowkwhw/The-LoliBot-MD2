

```javascript
let handler = m => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    const fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    };

    if (!m.isGroup) return false;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[conn.user.jid] || {};

    if (isBotAdmin && chat.antifake && !isAdmin && !isOwner && !isROwner) {
        let texto = `${ag}هذا الرقم *@${m.sender.split`@`[0]}* غير مسموح به في هذه المجموعة!!\n\nآسف، ستتم طردك.. يبدو أن رقمك غير حقيقي 😯`;

        // قم بفحص رقم الهاتف وإزالة المشارك في حالة مطابقته مع الأنماط المحددة
        // يجب تصحيح الأنماط المستخدمة حسب متطلباتك الخاصة
        if (m.sender.startsWith('91' || '91') || m.sender.startsWith('92' || '92') || m.sender.startsWith('222' || '222') || m.sender.startsWith('93' || '93') || m.sender.startsWith('91' || '91') || m.sender.startsWith('265' || '265') || m.sender.startsWith('61' || '61') || m.sender.startsWith('62' || '62') || m.sender.startsWith('966' || '966') || m.sender.startsWith('229' || '229') || m.sender.startsWith('40' || '40') || m.sender.startsWith('49' || '49') || m.sender.startsWith('20' || '20') || m.sender.startsWith('963' || '963') || m.sender.startsWith('967' || '967') || m.sender.startsWith('234' || '234') || m.sender.startsWith('210' || '210') || m.sender.startsWith('212' || '212')) {
            await conn.reply(m.chat, texto, fkontak, m);
            let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (responseb[0].status === "404") return;
        }
    }
};

export default handler;
```

هذا الكود يقوم بفحص الرسائل الواردة ويتحقق مما إذا كانت في مجموعة أو لا، ثم يقوم بالتحقق من معلومات الرسالة وفقًا لذلك.
