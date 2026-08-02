const verbs = [
['be','was/were','been'],['bear','bore','born/borne'],['beat','beat','beaten'],['become','became','become'],['begin','began','begun'],['bend','bent','bent'],['bet','bet','bet'],['bid','bid','bid'],['bind','bound','bound'],['bite','bit','bitten'],['bleed','bled','bled'],['blow','blew','blown'],['break','broke','broken'],['breed','bred','bred'],['bring','brought','brought'],['broadcast','broadcast','broadcast'],['build','built','built'],['burst','burst','burst'],['buy','bought','bought'],['cast','cast','cast'],['catch','caught','caught'],['choose','chose','chosen'],['cling','clung','clung'],['come','came','come'],['cost','cost','cost'],['creep','crept','crept'],['cut','cut','cut'],['deal','dealt','dealt'],
['dig','dug','dug'],['dive','dove/dived','dove/dived'],['do','did','done'],['draw','drew','drawn'],['drink','drank','drunk'],['drive','drove','driven'],['eat','ate','eaten'],['fall','fell','fallen'],['feed','fed','fed'],['feel','felt','felt'],['fight','fought','fought'],['find','found','found'],['fit','fit','fit'],['flee','fled','fled'],['fly','flew','flown'],['forbid','forbade','forbidden'],['forget','forgot','forgotten'],['forgive','forgave','forgiven'],['freeze','froze','frozen'],['get','got','got/gotten'],['give','gave','given'],['go','went','gone'],['grind','ground','ground'],['grow','grew','grown'],['read','read','read'],['ride','rode','ridden'],['ring','rang','rung'],['rise','rose','risen'],
['hang','hung','hung'],['have','had','had'],['hear','heard','heard'],['hide','hid','hidden'],['hit','hit','hit'],['hold','held','held'],['hurt','hurt','hurt'],['keep','kept','kept'],['know','knew','known'],['lay','laid','laid'],['leave','left','left'],['light','lit/lighted','lit/lighted'],['lose','lost','lost'],['make','made','made'],['mean','meant','meant'],['meet','met','met'],['mistake','mistook','mistaken'],['overcome','overcame','overcome'],['overdo','overdid','overdone'],['overtake','overtook','overtaken'],['overthrow','overthrew','overthrown'],['pay','paid','paid'],['plead','pled/pleaded','pled/pleaded'],['prove','proved','proven/proved'],['put','put','put'],['quit','quit','quit'],
['run','ran','run'],['say','said','said'],['see','saw','seen'],['seek','sought','sought'],['sell','sold','sold'],['send','sent','sent'],['set','set','set'],['sew','sewed','sewn/sewed'],['shake','shook','shaken'],['shed','shed','shed'],['shine','shone/shined','shone/shined'],['shoot','shot','shot'],['show','showed','shown/showed'],['shrink','shrank/shrunk','shrunk/shrunken'],['shut','shut','shut'],['sing','sang','sung'],['sink','sank','sunk'],['sit','sat','sat'],['sleep','slept','slept'],['slide','slid','slid'],['slit','slit','slit'],['speak','spoke','spoken'],['speed','sped','sped'],['spend','spent','spent'],['spin','spun','spun'],['split','split/splat','split/splat'],
['spread','spread','spread'],['spring','sprang','sprung'],['stand','stood','stood'],['steal','stole','stolen'],['stick','stuck','stuck'],['sting','stung','stung'],['stink','stank','stunk'],['strike','struck','struck/stricken'],['strive','strove','striven'],['swear','swore','sworn'],['sweep','swept','swept'],['swell','swelled','swelled/swollen'],['swim','swam','swum'],['swing','swung','swung'],['take','took','taken'],['teach','taught','taught'],['tear','tore','torn'],['tell','told','told'],['think','thought','thought'],['throw','threw','thrown'],['understand','understood','understood'],['uphold','upheld','upheld'],['upset','upset','upset'],['wake','woke','woken'],['wear','wore','worn'],['weave','wove','woven'],['wed','wedded/wed','wedded/wed'],['weep','wept','wept'],['win','won','won'],['wind','wound','wound'],['withdraw','withdrew','withdrawn'],['withhold','withheld','withheld'],['withstand','withstood','withstood'],['wring','wrung','wrung'],['write','wrote','written'],['burn','burned/burnt','burned/burnt'],['dream','dreamed/dreamt','dreamed/dreamt'],['kneel','kneeled/knelt','kneeled/knelt'],['learn','learned/learnt','learned/learnt'],['leap','leaped/leapt','leaped/leapt'],['spill','spilled/spilt','spilled/spilt'],['spoil','spoiled/spoilt','spoiled/spoilt']
].map(([base,past,participle])=>({base,past,participle}));
const meanings = Object.fromEntries(`
be|是；存在
bear|忍受；生育
beat|击打；打败
become|成为
begin|开始
bend|弯曲
bet|打赌
bid|出价；投标
bind|捆绑；约束
bite|咬
bleed|流血
blow|吹
break|打破；损坏
breed|繁殖；培育
bring|带来
broadcast|广播
build|建造
burst|爆裂
buy|购买
cast|投掷；选派角色
catch|抓住；赶上
choose|选择
cling|紧贴；依附
come|来
cost|花费
creep|爬行；悄悄移动
cut|切；割
deal|处理；交易
dig|挖
dive|潜水
do|做
draw|画；拉
drink|喝
drive|驾驶
eat|吃
fall|落下；跌倒
feed|喂养
feel|感觉
fight|战斗；争论
find|找到；发现
fit|适合；安装
flee|逃跑
fly|飞
forbid|禁止
forget|忘记
forgive|原谅
freeze|冻结
get|得到；变得
give|给
go|去
grind|磨碎
grow|生长；种植
read|阅读
ride|骑；乘坐
ring|响铃；打电话
rise|上升
hang|悬挂
have|有
hear|听见
hide|隐藏
hit|击打；撞击
hold|握住；举行
hurt|伤害；疼痛
keep|保持；保留
know|知道；认识
lay|放置；产卵
leave|离开；留下
light|点燃；照亮
lose|失去；输掉
make|制作；使得
mean|意思是；意味着
meet|遇见；会面
mistake|弄错；误认
overcome|克服
overdo|做得过度
overtake|超过；赶上
overthrow|推翻
pay|支付
plead|恳求；辩护
prove|证明
put|放置
quit|停止；离开
run|跑；运行
say|说
see|看见；明白
seek|寻找
sell|出售
send|发送
set|设置；放置
sew|缝制
shake|摇动
shed|脱落；流出
shine|发光；照耀
shoot|射击；拍摄
show|展示
shrink|缩小；收缩
shut|关闭
sing|唱歌
sink|下沉
sit|坐
sleep|睡觉
slide|滑动
slit|切开；划破
speak|说话
speed|加速
spend|花费；度过
spin|旋转
split|分开；裂开
spread|展开；传播
spring|跳跃；涌出
stand|站立；忍受
steal|偷
stick|粘贴；刺入
sting|叮；刺痛
stink|发臭
strike|击打；罢工
strive|努力；奋斗
swear|发誓；咒骂
sweep|打扫；席卷
swell|肿胀；膨胀
swim|游泳
swing|摆动
take|拿；带走
teach|教
tear|撕裂
tell|告诉
think|思考；认为
throw|扔
understand|理解
uphold|支持；维护
upset|使不安；打乱
wake|醒来；唤醒
wear|穿；磨损
weave|编织
wed|结婚
weep|哭泣
win|赢得
wind|缠绕；蜿蜒
withdraw|撤回；取款
withhold|扣留；隐瞒
withstand|抵抗；承受
wring|拧；绞
write|写
burn|燃烧
dream|做梦；梦想
kneel|跪下
learn|学习
leap|跳跃
spill|洒出；溢出
spoil|破坏；宠坏
`.trim().split('\n').map(line=>line.split('|')));
const similarFamilies = [
  ['keep','sleep','weep','sweep','creep'],
  ['bleed','feed','speed'],
  ['feel','deal','kneel'],
  ['bend','send','spend','build'],
  ['bring','buy','catch','fight','seek','teach','think'],
  ['begin','drink','ring','sing','sink','swim','spring'],
  ['blow','fly','grow','know','throw'],
  ['break','speak','steal'],
  ['drive','ride','rise','write'],
  ['choose','freeze'],
  ['bind','find','grind','wind'],
  ['bite','hide'],
  ['cling','sting','swing','wring'],
  ['come','become','overcome'],
  ['dig','stick','spin'],
  ['do','overdo'],
  ['draw','withdraw'],
  ['forbid','forget','forgive'],
  ['hold','uphold','withhold'],
  ['mistake','take','overtake'],
  ['stand','understand','withstand'],
  ['swear','tear','wear'],
  ['wake','shake','take'],
  ['sew','show'],
  ['burn','dream','learn','leap','light','spill','spoil'],
  ['bet','bid','broadcast','burst','cast','cost','cut','fit','hit','hurt','put','quit','set','shed','shut','slit','split','spread'],
  ['hang','have','hear','make','mean','meet','pay','say','sell','tell'],
  ['flee','see'],
  ['lay','pay','say'],
  ['shine','slide','strike','strive'],
  ['shrink','sink','stink'],
  ['swell','grow'],
  ['weave','freeze'],
  ['win','spin']
];
const $ = s => document.querySelector(s); let accountUser=null, progress={}, dailyHistory={}, totalReviewCount=0, queue=[], current=null, checked=false; let studyOrder=localStorage.getItem('verb-study-order')==='random'?'random':'sequential';
const normalize = value => value.trim().toLowerCase().replaceAll(/\s+/g,''); const choices = value => normalize(value).split('/');
const firstForm = value => value.split('/')[0];
function commonSuffix(left,right){let count=0;while(count<left.length&&count<right.length&&left[left.length-1-count]===right[right.length-1-count])count++;return count}
function formClass(verb){const past=firstForm(verb.past),participle=firstForm(verb.participle);return `${verb.base===past?'base-past':''}|${past===participle?'same-forms':''}|${verb.base===participle?'base-participle':''}`}
function similarityScore(source,candidate){let score=formClass(source)===formClass(candidate)?8:0;score+=commonSuffix(source.base,candidate.base)*3;score+=commonSuffix(firstForm(source.past),firstForm(candidate.past))*2;score+=commonSuffix(firstForm(source.participle),firstForm(candidate.participle))*2;return score}
function hasStrongSimilarity(source,candidate){return formClass(source)===formClass(candidate)&&commonSuffix(source.base,candidate.base)>=2&&commonSuffix(firstForm(source.past),firstForm(candidate.past))>=2&&commonSuffix(firstForm(source.participle),firstForm(candidate.participle))>=2}
function relatedVerbs(base){const source=verbs.find(verb=>verb.base===base),family=similarFamilies.find(group=>group.includes(base));if(family)return family.filter(word=>word!==base).map(word=>verbs.find(verb=>verb.base===word)).filter(Boolean);return verbs.filter(verb=>verb.base!==base&&hasStrongSimilarity(source,verb)).sort((left,right)=>similarityScore(source,right)-similarityScore(source,left)).slice(0,4)}
function renderRelated(verb){const related=relatedVerbs(verb.base);$('.related').classList.toggle('hidden',related.length===0);$('#relatedList').innerHTML=related.map(item=>`<article><b>${item.base}</b><span>${item.past} · ${item.participle}</span><small>${meanings[item.base]}</small></article>`).join('')}
function setMessage(text,type=''){const el=$('#authMessage');el.textContent=text;el.className=`message ${type}`.trim()}
function bytesToBase64Url(bytes){let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);return btoa(binary).replaceAll('+','-').replaceAll('/','_').replaceAll('=','')};function base64UrlToBytes(value){const padded=value.replaceAll('-','+').replaceAll('_','/')+'='.repeat((4-value.length%4)%4);return Uint8Array.from(atob(padded),char=>char.charCodeAt(0))};function newPasswordSalt(){const bytes=new Uint8Array(16);crypto.getRandomValues(bytes);return bytesToBase64Url(bytes)};async function passwordProof(password,salt){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:base64UrlToBytes(salt),iterations:210000},key,256);return bytesToBase64Url(new Uint8Array(bits))};async function readAuthResponse(response){if(!(response.headers.get('content-type')||'').includes('application/json'))throw new Error('账号服务暂时没有正常响应，请稍后再试。');return response.json()}
function updateAccountUI(){const inAccount=Boolean(accountUser);$('#authLoggedOut').classList.toggle('hidden',inAccount);$('#authLoggedIn').classList.toggle('hidden',!inAccount);$('#accountButton').textContent=inAccount?accountUser.username:'登录 / 注册';if(inAccount)$('#accountName').textContent=accountUser.username}
function openAuth(){ $('#authPanel').classList.remove('hidden'); updateAccountUI(); if(!accountUser) $('#usernameInput').focus(); } function closeAuth(){$('#authPanel').classList.add('hidden')}
async function authPayload(action,username,password){if(action==='register'){const salt=newPasswordSalt();return {passwordProof:await passwordProof(password,salt),passwordSalt:salt}}const response=await fetch('/api/auth',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'challenge',username})}),data=await readAuthResponse(response);if(!response.ok)throw new Error(data.error||'账号或密码不正确。');return data.scheme==='client-v1'?{passwordProof:await passwordProof(password,data.salt)}:{password}}
async function submitAuth(action){const username=$('#usernameInput').value.trim(),password=$('#passwordInput').value;if(!username||!password){setMessage('请先填写账号和密码。','error');return}setMessage(action==='register'?'正在安全创建账号…':'正在安全登录…');try{const credentials=await authPayload(action,username,password),response=await fetch('/api/auth',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action,username,...credentials})}),data=await readAuthResponse(response);if(!response.ok)throw new Error(data.error||'操作未完成。');accountUser=data.user;$('#passwordInput').value='';updateAccountUI();setMessage('登录成功，复习安排已同步。','success');await loadProgress();closeAuth()}catch(error){setMessage(error.message||'操作未完成，请稍后再试。','error')}}
async function loadAuth(){try{const response=await fetch('/api/auth'),data=await readAuthResponse(response);accountUser=data.user||null;updateAccountUI();if(accountUser)await loadProgress();else renderStats()}catch{accountUser=null;updateAccountUI();renderStats()}}
const localDate=(offset=0)=>{const date=new Date(Date.now()-offset*86400000);return new Date(date.getTime()-date.getTimezoneOffset()*60000).toISOString().slice(0,10)};
function updateStudyOrderUI(){const random=studyOrder==='random';$('#studyOrderToggle').checked=random;$('#studyOrderHint').textContent=random?'每次开始都会重新打乱待复习动词':'将按照附件表格从前到后学习'}
function setStudyOrder(order){studyOrder=order==='random'?'random':'sequential';localStorage.setItem('verb-study-order',studyOrder);updateStudyOrderUI()}
async function loadProgress(){try{const response=await fetch('/api/progress'),data=await response.json();if(!response.ok)throw new Error(data.error);progress=Object.fromEntries(data.cards.map(item=>[item.verb,item]));dailyHistory=Object.fromEntries((data.dailyStats||data.dailyCounts||[]).map(item=>[item.date,{learned:Number(item.learned??item.count??0),remembered:Number(item.remembered??0)}]));totalReviewCount=Number(data.totalReviewCount||0);renderStats()}catch{progress={};dailyHistory={};totalReviewCount=0;renderStats()}}
function recentRows(){const dates=Array.from({length:7},(_,index)=>localDate(6-index)),weekTotal=dates.reduce((sum,date)=>sum+(dailyHistory[date]?.learned||0),0);let cumulative=Math.max(0,totalReviewCount-weekTotal);return dates.map(date=>{const learned=dailyHistory[date]?.learned||0,remembered=dailyHistory[date]?.remembered||0;cumulative+=learned;return {date,learned,remembered,cumulative}})}
function dayLabel(date){const value=new Date(`${date}T00:00:00`),weekdays=['周日','周一','周二','周三','周四','周五','周六'];return `${value.getMonth()+1}/${value.getDate()} ${weekdays[value.getDay()]}`}
function renderHistory(){const rows=recentRows();$('#historyRows').innerHTML=rows.map(row=>`<tr><th>${dayLabel(row.date)}</th><td>${accountUser?row.learned:'—'}</td><td>${accountUser?row.remembered:'—'}</td><td>${accountUser?row.cumulative:'—'}</td></tr>`).join('')}
function renderStats(){const now=Date.now(),done=Object.values(progress).filter(p=>p.repetitions>=2).length,due=verbs.filter(v=>!progress[v.base]||Date.parse(progress[v.base].dueAt)<=now).length,today=dailyHistory[localDate()]?.learned||0,week=recentRows().reduce((sum,row)=>sum+row.learned,0);$('#dueCount').textContent=accountUser?due:'—';$('#todayStudyCount').textContent=accountUser?today:'—';$('#weekStudyCount').textContent=accountUser?week:'—';$('#learnedCount').textContent=accountUser?done:'—';$('#totalCount').textContent=verbs.length;renderHistory()}
function randomIndex(limit){if(globalThis.crypto?.getRandomValues){const value=new Uint32Array(1);crypto.getRandomValues(value);return value[0]%limit}return Math.floor(Math.random()*limit)}
function shuffle(items){for(let index=items.length-1;index>0;index--){const target=randomIndex(index+1);[items[index],items[target]]=[items[target],items[index]]}return items}
function buildQueue(){const now=Date.now(),due=verbs.filter(v=>!progress[v.base]||Date.parse(progress[v.base].dueAt)<=now);if(studyOrder==='sequential'||due.length<2)return due;const shuffled=shuffle([...due]);if(shuffled[0].base===due[0].base)[shuffled[0],shuffled[1]]=[shuffled[1],shuffled[0]];return shuffled}
function startStudy(){if(!accountUser){openAuth();setMessage('请先登录，才能把复习安排保存到你的账号。');return}queue=buildQueue();$('#welcomePanel').classList.add('hidden');$('#dashboard').classList.add('hidden');$('#recentPanel').classList.add('hidden');$('.how').classList.add('hidden');$('#studyPanel').classList.remove('hidden');showNext()}
function showNext(){checked=false;$('#answerReveal').classList.add('hidden');$('#completeState').classList.add('hidden');$('#card').classList.remove('hidden');current=queue.shift();if(!current){$('#card').classList.add('hidden');$('#completeState').classList.remove('hidden');renderStats();return}$('#questionLabel').textContent='同时写出两种变化';$('#baseWord').textContent=current.base;$('#promptText').textContent=`请填写 ${current.base} 的过去式和过去分词`;['#answerPastInput','#answerParticipleInput'].forEach(selector=>{$(selector).value='';$(selector).disabled=false});$('#answerPastInput').focus();$('#studyCount').textContent=`${studyOrder==='random'?'随机顺序':'表格顺序'} · 剩余 ${queue.length+1} 张`}
function checkAnswer(event){event.preventDefault();if(checked||!current)return;const pastAnswer=normalize($('#answerPastInput').value),participleAnswer=normalize($('#answerParticipleInput').value);if(!pastAnswer){$('#answerPastInput').focus();return}if(!participleAnswer){$('#answerParticipleInput').focus();return}checked=true;const pastCorrect=choices(current.past).includes(pastAnswer),participleCorrect=choices(current.participle).includes(participleAnswer),correct=pastCorrect&&participleCorrect;$('#resultText').textContent=correct?'两个变化都正确！选择这张卡的真实难度：':`${pastCorrect?'过去式正确':'过去式需要再看'}，${participleCorrect?'过去分词正确':'过去分词需要再看'}。`;$('#resultText').className=correct?'right':'wrong';$('#revealBase').textContent=current.base;$('#revealPast').textContent=current.past;$('#revealParticiple').textContent=current.participle;$('#revealMeaning').textContent=meanings[current.base];renderRelated(current);['#answerPastInput','#answerParticipleInput'].forEach(selector=>$(selector).disabled=true);$('#answerReveal').classList.remove('hidden')}
async function rateCard(rating){if(!current)return;document.querySelectorAll('[data-rating]').forEach(b=>b.disabled=true);try{const response=await fetch('/api/progress',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({verb:current.base,rating,date:localDate()})}),data=await response.json();if(!response.ok)throw new Error(data.error);progress[current.base]=data.card;const day=dailyHistory[data.studyDate]||{learned:0,remembered:0};day.learned+=1;if(['good','easy'].includes(rating))day.remembered+=1;dailyHistory[data.studyDate]=day;totalReviewCount+=1;showNext()}catch(error){alert(error.message||'保存失败，请稍后再试。')}finally{document.querySelectorAll('[data-rating]').forEach(b=>b.disabled=false)}}
function leaveStudy(){$('#studyPanel').classList.add('hidden');$('#welcomePanel').classList.remove('hidden');$('#dashboard').classList.remove('hidden');$('#recentPanel').classList.remove('hidden');$('.how').classList.remove('hidden');renderStats()}
$('#accountButton').addEventListener('click',openAuth);$('#closeAuthButton').addEventListener('click',closeAuth);$('#authForm').addEventListener('submit',e=>{e.preventDefault();submitAuth('login')});$('#registerButton').addEventListener('click',()=>submitAuth('register'));$('#logoutButton').addEventListener('click',async()=>{await fetch('/api/auth',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'logout'})});accountUser=null;progress={};dailyHistory={};totalReviewCount=0;updateAccountUI();renderStats()});$('#startButton').addEventListener('click',startStudy);$('#answerForm').addEventListener('submit',checkAnswer);document.querySelectorAll('[data-rating]').forEach(button=>button.addEventListener('click',()=>rateCard(button.dataset.rating)));$('#studyOrderToggle').addEventListener('change',event=>setStudyOrder(event.target.checked?'random':'sequential'));$('#backButton').addEventListener('click',leaveStudy);$('#completeBackButton').addEventListener('click',leaveStudy);updateStudyOrderUI();loadAuth();
