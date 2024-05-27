سأقوم بتعريب الكود بالكامل، مع ترجمة التعليقات والنصوص إلى اللغة العربية:

```javascript
import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
const { levelling } = '../lib/levelling.js';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  try {
    let locale = 'ar';  // تعيين اللغة إلى العربية
    let d = new Date(new Date() + 3600000);  // تحديد الوقت مع إضافة ساعة (تغيير التوقيت)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });

    let _uptime = process.uptime() * 1000;  // زمن التشغيل بالميلي ثانية
    let uptime = clockString(_uptime);
    wm = global.wm;
    vs = global.vs;

    // الحصول على بيانات المستخدم من قاعدة البيانات
    let user = global.db.data.users[m.sender];
    let { exp, diamond, registered, limit, level, role } = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);  // الحصول على اسم المستخدم
    let pareja = global.db.data.users[m.sender].pasangan;  // شريك المستخدم
    let fkontak = { 
      "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, 
      "message": { 
        "contactMessage": { 
          "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
        }
      }, 
      "participant": "0@s.whatsapp.net" 
    };

    // إعداد الأقسام المختلفة للرسالة
    const sections = [{
      title: 'القائمة الأساسية',
      rows: [
        { title: 'معلومات المبدع', rowId: `${usedPrefix}creadora` },
        { title: 'التحقق من البوت', rowId: `${usedPrefix}ping` },
        { title: 'معلومات القائمة', rowId: `${usedPrefix}infomenu` },
        { title: 'جميع الأوامر', rowId: `${usedPrefix}allmenu` },
        { title: 'تثبيت البوت', rowId: `${usedPrefix}instalarbot` },
        { title: 'تحويل البوت', rowId: `${usedPrefix}serbot` },
        { title: 'الشروط والأحكام', rowId: `${usedPrefix}términos`, description: '\n' }
      ]
    }, {
      title: 'قائمة اللعبة',
      rows: [
        { title: 'اللوحة', rowId: `${usedPrefix}lb` },
        { title: 'قائمة VIP', rowId: `${usedPrefix}listavip` },
        { title: 'شراء التصريح المميز', rowId: `${usedPrefix}pase premium` },
        { title: 'قائمة RPG', rowId: `${usedPrefix}rpgmenu` },
        { title: 'شراء', rowId: `${usedPrefix}buy` },
      ]
    }, {
      title: 'قائمة التنزيلات',
      rows: [
        { title: 'قائمة التنزيلات', rowId: `${usedPrefix}descargasmenu` },
        { title: 'قائمة البحث', rowId: `${usedPrefix}buscarmenu` },
        { title: 'قائمة المحول', rowId: `${usedPrefix}convertidormenu` },
        { title: 'قائمة تأثيرات الصوت', rowId: `${usedPrefix}audioefectomenu`, description: '\n' }
      ]
    }, {
      title: 'قائمة الألعاب',
      rows: [
        { title: 'قائمة الألعاب', rowId: `${usedPrefix}juegosmenu` },
        { title: 'الأصوات', rowId: `${usedPrefix}audios` },
        { title: 'قائمة الملصقات', rowId: `${usedPrefix}stickermenu` },
        { title: 'قائمة المصمم', rowId: `${usedPrefix}makermenu` },
        { title: 'قائمة عشوائية', rowId: `${usedPrefix}randommenu` },
        { title: 'قائمة المحتوى الحساس', rowId: `${usedPrefix}hornymenu`, description: '\n' }
      ]
    }, {
      title: 'قائمة المجموعة',
      rows: [
        { title: 'قائمة المجموعة', rowId: `${usedPrefix}grupomenu` },
        { title: 'القوائم', rowId: `${usedPrefix}listas` },
        { title: 'تفعيل/تعطيل', rowId: `${usedPrefix}enable` },
        { title: 'قائمة المالك', rowId: `${usedPrefix}ownermenu` }
      ]
    }];

    // إعداد الرسالة التي تحتوي على القوائم
    const listMessage = {
      text: `┌──────────────
┆ *بوت اللولي-إم دي*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆✨ *مرحبًا ${name}!!*
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *مبدع البوت: المتمرد*
┆➤ *رقم المبدع:* *wa.me/5492266466080 (ليس بوت)*  ${(conn.user.jid == global.conn.user.jid ? '' : `\n┆➤ *أنا بوت تابع لـ:* *wa.me/${global.conn.user.jid.split`@`[0]}*`) || '\n┆➤ *رقم البوت الرسمي:* *wa.me/573183650526*'}
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *الوقت الحالي:*
┆□ ${time}    
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *مدة التشغيل:*
┆□ ${uptime}
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *الإصدار:*
┆□ ${vs}
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *عدد المستخدمين الكلي:*
┆□ ${Object.keys(global.db.data.users).length} 
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *الوضع:*
┆□ ${global.opts['self'] ? `*خاص*` : `*عام*`}
└────ׂ─ׂ─ׂ─ׂ─────`,
      footer: `*» الشريك: ${pareja ? `${name} 💞 ${conn.getName(pareja)}` : `😛 لا يوجد شريك`}* 
» ${redesMenu.getRandom()}`,  // روابط الشبكات الاجتماعية
      title: null,
      buttonText: `قائمة الأوامر`, 
      sections
    };
    await conn.sendMessage(m.chat, listMessage, { quoted: fkontak });  // إرسال الرسالة
    
  } catch (e) {
    await conn.sendButton(m.chat, `\n${wm}`, `حدث خطأ أثناء تنفيذ الأمر. يرجى الإبلاغ باستخدام: #report ${usedPrefix + command}`, null, [['إرسال تقرير خطأ', `#reporte حدث خطأ في الأمر *${usedPrefix + command}*`]], m);
    console.log(`❗❗ حدث خطأ في تنفيذ الأمر: ${usedPrefix + command} ❗❗`);
    console.log(e);  
  }
};
handler.help = ['en', 'dis'].map(v => v + 'able <option>');
handler.tags = ['group', 'owner'];
handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|m|\?)$/i;
handler.exp = 50;
export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNa
