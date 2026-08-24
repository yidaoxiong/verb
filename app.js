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
const sentenceExamples = Object.fromEntries(`
be|She {word} tired after the long walk.|She has {word} very patient with us.
bear|The old tree {word} fruit last summer.|The cub was {word} in early spring.
beat|Our team {word} the champions yesterday.|No one has {word} her record yet.
become|The sky {word} dark before the storm.|He has {word} much more confident.
begin|The lesson {word} at nine o'clock.|The concert has already {word}.
bend|He {word} the wire into a circle.|The heavy snow has {word} the branch.
bet|I {word} ten dollars on the race.|She has never {word} on a game before.
bid|They {word} fifty dollars for the chair.|Three buyers have {word} on the painting.
bind|She {word} the papers with string.|We have {word} the books securely.
bite|The puppy {word} my shoe yesterday.|A mosquito has {word} my arm.
bleed|His finger {word} after the cut.|The wound has {word} for several minutes.
blow|A strong wind {word} all night.|The storm has {word} several tiles away.
break|Tom {word} the glass by accident.|The fall has {word} his watch.
breed|The farmers {word} stronger horses.|They have {word} this variety for years.
bring|Mia {word} her lunch to school.|He has {word} all the tools we need.
broadcast|The station {word} the match live.|The network has {word} the interview twice.
build|They {word} a tree house last weekend.|We have {word} a new reading corner.
burst|The balloon {word} with a loud bang.|A water pipe has {word} upstairs.
buy|I {word} this notebook yesterday.|She has {word} tickets for the show.
cast|The director {word} her as the lead.|The lamp has {word} a warm light across the room.
catch|Leo {word} the last bus home.|The cat has {word} a small mouse.
choose|We {word} the blue design yesterday.|They have {word} a new team captain.
cling|The wet shirt {word} to his back.|The child has {word} to her mother all morning.
come|My cousins {word} to dinner last night.|The delivery has finally {word}.
cost|The repair {word} more than expected.|This mistake has {word} us valuable time.
creep|The cat {word} quietly toward the bird.|Fog has {word} across the valley.
cut|She {word} the paper into stars.|I have {word} the cake into eight pieces.
deal|He {word} with the complaint calmly.|We have {word} with this problem before.
dig|The dog {word} a hole in the garden.|Workers have {word} a deep trench here.
dive|She {word} into the pool first.|The rescue team has {word} in these waters before.
do|I {word} my homework after dinner.|We have {word} everything on the list.
draw|Nina {word} a picture of the lake.|He has {word} a map for the journey.
drink|They {word} hot chocolate by the fire.|I have {word} enough water today.
drive|Dad {word} us to the station.|She has {word} across the country twice.
eat|We {word} noodles for lunch.|The children have {word} all the fruit.
fall|A yellow leaf {word} onto my book.|Several trees have {word} in the storm.
feed|Sam {word} the rabbits this morning.|We have already {word} the dog.
feel|I {word} nervous before the test.|She has {word} much better since Monday.
fight|The two boys {word} over the toy.|They have {word} hard for equal rights.
find|I {word} my keys under the sofa.|Scientists have {word} a possible solution.
fit|The old key {word} the lock perfectly.|The new desk has {word} into the corner well.
flee|The thief {word} through the back door.|Many families have {word} the flooded area.
fly|The kite {word} high above the field.|She has {word} in a helicopter before.
forbid|The sign {word} swimming in the lake.|The school has {word} phones during exams.
forget|I {word} his birthday last week.|She has {word} where she put the note.
forgive|They {word} him after he apologized.|I have {word} the mistake completely.
freeze|The lake {word} during the cold night.|The pipes have {word} again.
get|We {word} home just before midnight.|He has {word} much better at chess.
give|She {word} me a helpful suggestion.|They have {word} us plenty of time.
go|We {word} to the museum yesterday.|My parents have {word} to the market.
grind|The machine {word} the beans finely.|I have {word} enough coffee for everyone.
grow|The plant {word} quickly in the sun.|Our town has {word} a lot this year.
read|I {word} that story last night.|She has {word} every book in the series.
ride|We {word} our bikes along the river.|He has {word} a horse only once.
ring|The phone {word} during dinner.|The final bell has already {word}.
rise|The sun {word} behind the hills.|Prices have {word} sharply this month.
hang|She {word} the picture above the desk.|The coat has {word} there all winter.
have|We {word} a picnic on Sunday.|I have {word} enough practice for today.
hear|I {word} a strange sound outside.|We have {word} this song many times.
hide|Ben {word} the gift in his closet.|The fox has {word} beneath the leaves.
hit|The ball {word} the window.|A fallen branch has {word} the roof.
hold|She {word} the baby carefully.|They have {word} three meetings this week.
hurt|I {word} my knee while running.|The criticism has {word} his confidence.
keep|We {word} the windows closed yesterday.|She has {word} every letter you sent.
know|I {word} the answer immediately.|We have {word} each other for years.
lay|The hen {word} two eggs yesterday.|He has {word} the keys on the table.
leave|They {word} the office at six.|The train has already {word} the station.
light|She {word} a candle in the dark.|They have {word} the path with small lamps.
lose|Our team {word} the final match.|I have {word} my umbrella again.
make|Dad {word} pancakes for breakfast.|We have {word} a careful plan.
mean|Her smile {word} that everything was fine.|This delay has {word} extra work for us.
meet|I {word} the new teacher yesterday.|We have {word} several times before.
mistake|I {word} him for his brother.|She has {word} kindness for weakness.
overcome|The team {word} every obstacle.|He has {word} his fear of heights.
overdo|I {word} the exercise yesterday.|You have {word} the salt in this soup.
overtake|The red car {word} us on the highway.|Our runner has {word} the early leader.
overthrow|The rebels {word} the old government.|The people have {word} a cruel ruler.
pay|She {word} the bill before leaving.|We have {word} for the tickets online.
plead|The driver {word} for another chance.|He has {word} guilty in court.
prove|The test {word} that the idea worked.|Scientists have {word} the theory correct.
put|I {word} the milk in the fridge.|She has {word} the books back on the shelf.
quit|He {word} the team last month.|She has {word} drinking coffee at night.
run|Maya {word} five kilometers yesterday.|This engine has {word} smoothly all day.
say|He {word} hello to everyone.|I have {word} all that I can.
see|We {word} a rainbow after the rain.|She has {word} that movie twice.
seek|They {word} help from a doctor.|We have {word} advice from several experts.
sell|The shop {word} all its bread by noon.|They have {word} their old car.
send|I {word} the email this morning.|She has {word} you an invitation.
set|He {word} the alarm for seven.|We have {word} a date for the meeting.
sew|Grandma {word} a button onto my coat.|She has {word} a beautiful quilt.
shake|The explosion {word} the windows.|The news has {word} the whole community.
shed|The tree {word} its leaves in autumn.|The dog has {word} a lot of hair today.
shine|The moon {word} through the clouds.|The sun has {word} all afternoon.
shoot|The photographer {word} hundreds of photos.|They have {word} the final scene already.
show|He {word} us his new invention.|The results have {word} steady improvement.
shrink|My sweater {word} in the wash.|The lake has {word} during the drought.
shut|She {word} the door quietly.|The store has {word} for the holiday.
sing|The choir {word} beautifully last night.|He has {word} this song many times.
sink|The stone {word} to the bottom.|The damaged boat has {word} near the harbor.
sit|We {word} beside the window.|The cat has {word} there all morning.
sleep|The baby {word} for ten hours.|I have {word} much better this week.
slide|The glass {word} off the table.|The box has {word} across the floor.
slit|He {word} the envelope open carefully.|Someone has {word} the bag along one side.
speak|Our teacher {word} about teamwork.|I have {word} to the manager already.
speed|The car {word} past the school.|The cyclist has {word} ahead of the group.
spend|We {word} the afternoon at the beach.|She has {word} all her savings.
spin|The dancer {word} across the stage.|The wheel has {word} for several minutes.
split|We {word} the pizza into six pieces.|The group has {word} into two teams.
spread|She {word} the map on the table.|The news has {word} around the world.
spring|The cat {word} onto the wall.|Several new shops have {word} up nearby.
stand|He {word} near the entrance.|The old tower has {word} for centuries.
steal|Someone {word} my bicycle yesterday.|A thief has {word} the painting.
stick|The note {word} to the wet window.|Mud has {word} to my shoes.
sting|A bee {word} me on the hand.|The cold wind has {word} my face.
stink|The old rubbish {word} terribly.|The kitchen has {word} of smoke all day.
strike|Lightning {word} the tall tree.|The workers have {word} for better pay.
strive|She {word} to improve every day.|We have {word} for the same goal for years.
swear|He {word} that he was telling the truth.|They have {word} to keep the secret.
sweep|I {word} the kitchen after dinner.|She has {word} all the leaves away.
swell|His ankle {word} after the fall.|The river has {word} after days of rain.
swim|We {word} across the lake yesterday.|She has {word} in the sea many times.
swing|The door {word} open suddenly.|The mood has {word} from hope to worry.
take|I {word} the bus to school.|She has {word} many photos today.
teach|Mr. Lee {word} us English last year.|She has {word} here for a decade.
tear|He {word} the paper in half.|The puppy has {word} the cushion apart.
tell|Mia {word} us a funny story.|I have {word} you everything I know.
think|We {word} the test was difficult.|I have {word} carefully about your idea.
throw|He {word} the ball over the fence.|Someone has {word} away the receipt.
understand|I finally {word} the instructions.|We have {word} the main problem.
uphold|The court {word} the earlier decision.|They have {word} the rules fairly.
upset|The bad news {word} everyone.|The sudden change has {word} our plans.
wake|I {word} before sunrise.|The noise has {word} the baby.
wear|She {word} a red coat yesterday.|He has {word} those shoes for years.
weave|The artisan {word} a colorful basket.|They have {word} a strong rope.
wed|The couple {word} in a small ceremony.|They have {word} after years together.
weep|She {word} when she heard the news.|He has {word} with relief.
win|Our school {word} the competition.|She has {word} three medals this year.
wind|We {word} the rope around the post.|The path has {word} through the forest for miles.
withdraw|He {word} some cash yesterday.|The company has {word} its offer.
withhold|The bank {word} the final payment.|They have {word} important information.
withstand|The bridge {word} the strong winds.|This material has {word} years of use.
wring|She {word} the water from the cloth.|He has {word} every drop from the towel.
write|I {word} a letter to my friend.|She has {word} five chapters so far.
burn|The fire {word} all night.|The sun has {word} my shoulders.
dream|I {word} about flying last night.|She has {word} of this moment for years.
kneel|He {word} beside the injured runner.|They have {word} in silence for several minutes.
learn|We {word} a new song yesterday.|I have {word} a lot from this project.
leap|The deer {word} over the fence.|The dog has {word} into the water.
spill|Tom {word} juice on the table.|Someone has {word} paint on the floor.
spoil|The heat {word} the food.|The rain has {word} our picnic.
`.trim().split('\n').map(line=>{const [base,past,participle]=line.split('|');return [base,{past,participle}]}));
const sentenceMeanings = Object.fromEntries(`
be|她长途步行后很累。|她一直对我们很有耐心。
bear|这棵老树去年夏天结了果实。|小熊在初春出生了。
beat|我们队昨天击败了冠军队。|还没有人打破她的纪录。
become|暴风雨前天空变暗了。|他已经变得自信多了。
begin|课程九点开始了。|音乐会已经开始了。
bend|他把铁丝弯成了一个圆圈。|大雪已经压弯了树枝。
bet|我在这场比赛上押了十美元。|她以前从未在比赛上下过注。
bid|他们为这把椅子出价五十美元。|已有三位买家对这幅画出了价。
bind|她用绳子把文件捆在一起。|我们已经把书牢牢地捆好了。
bite|小狗昨天咬了我的鞋。|一只蚊子已经叮了我的手臂。
bleed|他的手指划伤后流血了。|伤口已经流了几分钟的血。
blow|强风刮了整整一夜。|暴风雨已经吹走了几片屋瓦。
break|汤姆不小心打破了玻璃。|这一摔已经把他的手表摔坏了。
breed|农户培育出了更强壮的马。|他们多年来一直在培育这个品种。
bring|米娅带了午餐去学校。|他已经带来了我们需要的所有工具。
broadcast|电台现场播送了这场比赛。|这家电视网已经播出过两次这段访谈。
build|他们上周末搭了一间树屋。|我们已经建好了一个新的阅读角。
burst|气球砰的一声爆了。|楼上的一根水管已经爆裂了。
buy|我昨天买了这本笔记本。|她已经买了演出门票。
cast|导演选她出演主角。|这盏灯已经在房间里投下了温暖的光。
catch|利奥赶上了最后一班回家的公交车。|这只猫已经抓住了一只小老鼠。
choose|我们昨天选了蓝色设计。|他们已经选出了新队长。
cling|湿衬衫紧贴在他背上。|这个孩子整个上午都紧紧依偎着妈妈。
come|我的表兄弟们昨晚来吃饭了。|快递终于到了。
cost|这次维修的花费比预期更多。|这个错误已经耗费了我们宝贵的时间。
creep|猫悄悄地爬向那只鸟。|雾已经慢慢蔼延到山谷里。
cut|她把纸剪成了星星。|我已经把蛋糕切成了八块。
deal|他冷静地处理了这起投诉。|我们以前处理过这个问题。
dig|狗在花园里挖了一个洞。|工人们已经在这里挖了一条深沟。
dive|她第一个跳进了游泳池。|救援队以前曾在这片水域潜水。
do|我晚饭后做了家庭作业。|清单上的事情我们都已经做完了。
draw|妮娜画了一幅湖景。|他已经为这次旅程画了一张地图。
drink|他们在火炉旁喝了热巧克力。|我今天已经喝了足够的水。
drive|爸爸开车送我们去了车站。|她已经两次驾车横穿这个国家。
eat|我们午餐吃了面条。|孩子们已经把水果全部吃完了。
fall|一片黄叶落在了我的书上。|暴风雨中已经倒了好几棵树。
feed|山姆今早喂了兔子。|我们已经喂过狗了。
feel|考试前我感到紧张。|从周一起她已经感觉好多了。
fight|两个男孩为玩具打了起来。|他们一直在为平等权利而努力奋斗。
find|我在沙发下面找到了钥匙。|科学家们已经找到了一个可能的解决方案。
fit|这把旧钥匙与锁完全吻合。|这张新书桌放在角落里很合适。
flee|小偷从后门逃走了。|许多家庭已经逃离了水淹地区。
fly|风筝高高地飞过田野。|她以前坐过直升机。
forbid|标牌禁止在湖里游泳。|学校已经禁止考试时使用手机。
forget|我上周忘了他的生日。|她已经忘了把便条放在哪里。
forgive|他道歉后，他们原谅了他。|我已经完全原谅了这个错误。
freeze|湖面在寒冷的夜里结冰了。|水管又冻住了。
get|我们在午夜前一会儿到了家。|他的国际象棋水平已经提高了很多。
give|她给了我一个有用的建议。|他们已经给了我们充足的时间。
go|我们昨天去了博物馆。|我父母已经去市场了。
grind|机器把豆子磨得很细。|我已经磨了足够大家喝的咖啡。
grow|这株植物在阳光下长得很快。|我们的城镇今年发展了很多。
read|我昨晚读了那个故事。|她已经读完了这个系列的每一本书。
ride|我们沿着河边骑了自行车。|他只骑过一次马。
ring|吃晚饭时电话响了。|最后的铃声已经响过了。
rise|太阳从山后升起。|价格这个月已经大幅上涨。
hang|她把画挂在了书桌上方。|这件外套整个冬天都挂在那里。
have|我们星期天进行了野餐。|我今天已经练习得够多了。
hear|我听到外面有一个奇怪的声音。|我们已经听过这首歌很多次了。
hide|本把礼物藏在了衣橱里。|狐狸已经藏在落叶下面了。
hit|球砸到了窗户。|一根掉落的树枝已经砸中了屋顶。
hold|她小心地抱着宝宝。|他们这周已经开了三次会议。
hurt|我跑步时伤到了膝盖。|这些批评已经伤害了他的自信心。
keep|我们昨天一直关着窗户。|她保留了你寄来的每一封信。
know|我立刻就知道了答案。|我们已经相识多年。
lay|这只母鸡昨天下了两个蛋。|他已经把钥匙放在桌上了。
leave|他们六点离开了办公室。|火车已经离开车站了。
light|她在黑暗中点燃了一支蜡烛。|他们已经用小灯照亮了小路。
lose|我们队输掉了决赛。|我又把雨伞弄丢了。
make|爸爸早餐做了煎饼。|我们已经制定了一个周密的计划。
mean|她的微笑表明一切都很好。|这次延误已经给我们带来了额外工作。
meet|我昨天见到了新老师。|我们以前已经见过好几次了。
mistake|我把他误认为他的兄弟。|她一直把善良误认为软弱。
overcome|这支队克服了所有障碍。|他已经克服了恐高症。
overdo|我昨天运动过量了。|你在这汤里放了太多盐。
overtake|红色汽车在高速公路上超过了我们。|我们的跑者已经超过了先前的领跑者。
overthrow|叛军推翻了旧政府。|人民已经推翻了一位残暴的统治者。
pay|她离开前付了账单。|我们已经在线支付了票款。
plead|司机恳求再给一次机会。|他已经在法庭上认罪。
prove|测试证明了这个想法行得通。|科学家们已经证明这个理论是正确的。
put|我把牛奶放进了冰箱。|她已经把书放回书架了。
quit|他上个月退出了队伍。|她已经戒掉了晚上喝咖啡的习惯。
run|玛雅昨天跑了五公里。|这台发动机整天都运转得很顺畅。
say|他向每个人问了好。|我能说的都已经说了。
see|雨后我们看到了一道彩虹。|她已经看过那部电影两次了。
seek|他们向医生寻求了帮助。|我们已经向几位专家征求了意见。
sell|这家商店中午前就卖光了所有面包。|他们已经卖掉了旧车。
send|我今早发送了邮件。|她已经给你发了一封邀请函。
set|他把闹钟设在七点。|我们已经确定了会议日期。
sew|奶奶给我的外套缝上了一颗扣子。|她已经缝好了一床漂亮的被子。
shake|爆炸震动了窗户。|这个消息已经震惊了整个社区。
shed|这棵树在秋天掉了叶子。|这只狗今天已经掉了很多毛。
shine|月光透过云层照了进来。|太阳整个下午都在照耀。
shoot|摄影师拍了数百张照片。|他们已经拍完了最后一场戏。
show|他向我们展示了他的新发明。|结果已经显示出稳定的改善。
shrink|我的毛衣洗后缩水了。|这个湖在干旱期间已经缩小了。
shut|她轻轻地关上了门。|这家商店因节日已经关门了。
sing|合唱团昨晚唱得很动听。|他已经唱过这首歌很多次了。
sink|石头沉到了水底。|那艘受损的船已经沉在港口附近。
sit|我们坐在窗边。|这只猫整个上午都坐在那里。
sleep|宝宝睡了十个小时。|我这周已经睡得好多了。
slide|玻璃杯从桌上滑了下去。|箱子已经滑过了地板。
slit|他小心地裁开了信封。|有人已经沿一边割开了袋子。
speak|我们的老师谈到了团队合作。|我已经和经理谈过了。
speed|汽车飞快地驶过学校。|这名骑手已经加速超到队伍前方。
spend|我们在海滩度过了下午。|她已经花光了所有积蓄。
spin|舞者旋转着穿过舞台。|轮子已经转了几分钟。
split|我们把披萨分成了六块。|这个小组已经分成了两队。
spread|她把地图铺在了桌上。|消息已经传遍了全世界。
spring|猫跳上了墙。|附近已经忽然出现了几家新店。
stand|他站在入口附近。|这座老塔已经屹立了几个世纪。
steal|昨天有人偷了我的自行车。|一个小偷已经偷走了这幅画。
stick|便条粘在了湿窗户上。|泥巴已经粘在我的鞋上了。
sting|一只蜜蜂蜇了我的手。|冷风已经吹得我的脸刺痛。
stink|旧垃圾臭气熏天。|厨房一整天都有烟味。
strike|闪电击中了那棵高树。|工人们已经为争取更高工资而罢工。
strive|她努力每天进步。|我们多年来一直为同一个目标而奋斗。
swear|他发誓自己说的是真话。|他们已经发誓保守秘密。
sweep|我晚饭后打扫了厨房。|她已经把所有树叶扫走了。
swell|他的脚踝摔伤后肿了起来。|连日降雨后河水已经上涨。
swim|我们昨天游过了这个湖。|她已经在海里游过很多次。
swing|门突然摆开了。|情绪已经从希望转向担忧。
take|我坐公交车去了学校。|她今天已经拍了很多照片。
teach|李老师去年教我们英语。|她已经在这里教了十年书。
tear|他把纸撕成了两半。|小狗已经把靠垫撕开了。
tell|米娅给我们讲了一个有趣的故事。|我知道的一切都已经告诉你了。
think|我们觉得这次考试很难。|我已经认真考虑过你的想法了。
throw|他把球扔过了栅栏。|有人已经把收据扔掉了。
understand|我终于明白了说明。|我们已经理解了主要问题。
uphold|法院维持了早先的判决。|他们一直公平地维护这些规则。
upset|坏消息使每个人都很难过。|突然的变化已经打乱了我们的计划。
wake|我在日出前醒了。|噪音已经吵醒了宝宝。
wear|她昨天穿了一件红色外套。|他已经穿那双鞋好几年了。
weave|工匠编了一个彩色篮子。|他们已经编成了一条结实的绳子。
wed|这对夫妇在一个小型仪式上结了婚。|他们相伴多年后结婚了。
weep|她听到这个消息时哭了。|他已经如释重负地哭了。
win|我们学校赢得了比赛。|她今年已经赢得了三枚奖牌。
wind|我们把绳子绕在了柱子上。|这条小路已经在森林中蜿蜒了好几英里。
withdraw|他昨天取了一些现金。|这家公司已经撤回了报价。
withhold|银行扣留了最后一笔付款。|他们一直隐瞒重要信息。
withstand|这座桥抵挡住了强风。|这种材料已经经受住多年使用。
wring|她把布里的水拧了出来。|他已经把毛巾里的每一滴水都拧了出来。
write|我给朋友写了一封信。|她目前已经写了五章。
burn|火烧了一整夜。|太阳已经晒伤了我的肩膀。
dream|我昨晚梦见了飞翔。|她多年来一直梦想着这一刻。
kneel|他跪在受伤的跑者身边。|他们已经默默地跪了几分钟。
learn|我们昨天学了一首新歌。|我已经从这个项目中学到了很多。
leap|鹿跃过了栅栏。|狗已经跳进了水里。
spill|汤姆把果汁洒在了桌上。|有人已经把油漆洒在了地板上。
spoil|高温使食物变质了。|这场雨已经毁了我们的野餐。
`.trim().split('\n').map(line=>{const [base,past,participle]=line.split('|');return [base,{past,participle}]}));
const exampleFormOverrides={be:{past:'was'},bear:{participle:'born'},dive:{participle:'dived'},split:{past:'split',participle:'split'},strike:{participle:'struck'}};
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
function exampleForm(verb,type){return exampleFormOverrides[verb.base]?.[type]||firstForm(verb[type])}
function exampleAnswers(verb,type){const override=exampleFormOverrides[verb.base]?.[type];return override?[override]:verb[type].split('/')}
function exampleHtml(template,word,revealed=false,type='',answers=[word]){if(revealed)return template.replace('{word}',`<mark>${word}</mark>`);const characters=Math.max(...answers.map(answer=>answer.length)),label=type==='past'?'过去式':'过去分词';return template.replace('{word}',`<input class="sentence-input" data-answer-type="${type}" aria-label="请输入${label}" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="${characters}" size="${characters}" style="--characters:${characters}" placeholder="${'_'.repeat(characters)}" />`)}
function renderMemoryExamples(verb,revealed=false){const examples=sentenceExamples[verb.base],translations=sentenceMeanings[verb.base],past=exampleForm(verb,'past'),participle=exampleForm(verb,'participle');if(revealed){$('#fullPastSentence').innerHTML=exampleHtml(examples.past,past,true);$('#fullParticipleSentence').innerHTML=exampleHtml(examples.participle,participle,true);$('#pastSentenceMeaning').textContent=translations.past;$('#participleSentenceMeaning').textContent=translations.participle}else{$('#maskedPastSentence').innerHTML=exampleHtml(examples.past,past,false,'past',exampleAnswers(verb,'past'));$('#maskedParticipleSentence').innerHTML=exampleHtml(examples.participle,participle,false,'participle',exampleAnswers(verb,'participle'))}}
function judgeSentenceInput(type,answers){const input=$(`.sentence-input[data-answer-type="${type}"]`),correct=answers.map(normalize).includes(normalize(input.value));input.classList.add(correct?'correct':'incorrect');input.disabled=true;return correct}
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
const DAILY_GOAL=30,GOAL_START='2026-08-02',GOAL_END='2026-08-31';
function dateRange(start,end){const dates=[],cursor=new Date(`${start}T12:00:00`),last=new Date(`${end}T12:00:00`);while(cursor<=last){dates.push(new Date(cursor.getTime()-cursor.getTimezoneOffset()*60000).toISOString().slice(0,10));cursor.setDate(cursor.getDate()+1)}return dates}
function dailyUnique(date){return dailyHistory[date]?.uniqueLearned||0}
function currentGoalStreak(dates,today){let index=today>GOAL_END?dates.length-1:dates.indexOf(today);if(index<0)return 0;if(dailyUnique(dates[index])<DAILY_GOAL)index-=1;let streak=0;while(index>=0&&dailyUnique(dates[index])>=DAILY_GOAL){streak+=1;index-=1}return streak}
function renderGoal(){const dates=dateRange(GOAL_START,GOAL_END),today=localDate(),todayCount=dailyUnique(today),completedDays=dates.filter(date=>dailyUnique(date)>=DAILY_GOAL).length,remainingDays=today>GOAL_END?0:dates.filter(date=>date>=today).length,streak=currentGoalStreak(dates,today);$('#todayGoalCount').textContent=accountUser?`${todayCount} / ${DAILY_GOAL}`:`— / ${DAILY_GOAL}`;$('#todayGoalStatus').textContent=accountUser&&todayCount>=DAILY_GOAL?'今日已打卡':'今日进度';$('#goalProgressBar').style.width=accountUser?`${Math.min(100,todayCount/DAILY_GOAL*100)}%`:'0%';$('#goalStreak').textContent=accountUser?streak:'—';$('#goalCompletedDays').textContent=accountUser?completedDays:'—';$('#goalRemainingDays').textContent=remainingDays;$('#checkinCalendar').innerHTML=dates.map(date=>{const count=dailyUnique(date),done=count>=DAILY_GOAL,status=!accountUser?'locked':done?'done':date<today?'missed':date===today?'today':'upcoming',icon=!accountUser?'—':done?'✓':date<today?'×':date===today?count:'·',detail=!accountUser?'登录查看':done?`${count}/${DAILY_GOAL}`:date<=today?`${count}/${DAILY_GOAL}`:'待打卡';return `<div class="goal-day ${status}"><span>${date.slice(5).replace('-','/')}</span><b>${icon}</b><small>${detail}</small></div>`}).join('')}
function updateStudyOrderUI(){const random=studyOrder==='random';$('#studyOrderToggle').checked=random;$('#studyOrderHint').textContent=random?'每次开始都会重新打乱待复习动词':'将按照附件表格从前到后学习'}
function setStudyOrder(order){studyOrder=order==='random'?'random':'sequential';localStorage.setItem('verb-study-order',studyOrder);updateStudyOrderUI()}
async function loadProgress(){try{const response=await fetch('/api/progress'),data=await response.json();if(!response.ok)throw new Error(data.error);progress=Object.fromEntries(data.cards.map(item=>[item.verb,item]));dailyHistory=Object.fromEntries((data.dailyStats||data.dailyCounts||[]).map(item=>[item.date,{learned:Number(item.learned??item.count??0),uniqueLearned:Number(item.uniqueLearned??item.learned??item.count??0),remembered:Number(item.remembered??0)}]));totalReviewCount=Number(data.totalReviewCount||0);renderStats()}catch{progress={};dailyHistory={};totalReviewCount=0;renderStats()}}
function recentRows(){const dates=Array.from({length:7},(_,index)=>localDate(6-index)),weekTotal=dates.reduce((sum,date)=>sum+(dailyHistory[date]?.learned||0),0);let cumulative=Math.max(0,totalReviewCount-weekTotal);return dates.map(date=>{const learned=dailyHistory[date]?.learned||0,remembered=dailyHistory[date]?.remembered||0;cumulative+=learned;return {date,learned,remembered,cumulative}})}
function dayLabel(date){const value=new Date(`${date}T00:00:00`),weekdays=['周日','周一','周二','周三','周四','周五','周六'];return `${value.getMonth()+1}/${value.getDate()} ${weekdays[value.getDay()]}`}
function renderHistory(){const rows=recentRows();$('#historyRows').innerHTML=rows.map(row=>`<tr><th>${dayLabel(row.date)}</th><td>${accountUser?row.learned:'—'}</td><td>${accountUser?row.remembered:'—'}</td><td>${accountUser?row.cumulative:'—'}</td></tr>`).join('')}
function renderStats(){const now=Date.now(),done=Object.values(progress).filter(p=>p.repetitions>=2).length,due=verbs.filter(v=>!progress[v.base]||Date.parse(progress[v.base].dueAt)<=now).length,today=dailyUnique(localDate()),week=recentRows().reduce((sum,row)=>sum+row.learned,0);$('#dueCount').textContent=accountUser?due:'—';$('#todayStudyCount').textContent=accountUser?today:'—';$('#weekStudyCount').textContent=accountUser?week:'—';$('#learnedCount').textContent=accountUser?done:'—';$('#totalCount').textContent=verbs.length;renderGoal();renderHistory()}
function randomIndex(limit){if(globalThis.crypto?.getRandomValues){const value=new Uint32Array(1);crypto.getRandomValues(value);return value[0]%limit}return Math.floor(Math.random()*limit)}
function shuffle(items){for(let index=items.length-1;index>0;index--){const target=randomIndex(index+1);[items[index],items[target]]=[items[target],items[index]]}return items}
function buildQueue(){const now=Date.now(),due=verbs.filter(v=>!progress[v.base]||Date.parse(progress[v.base].dueAt)<=now);if(studyOrder==='sequential'||due.length<2)return due;const shuffled=shuffle([...due]);if(shuffled[0].base===due[0].base)[shuffled[0],shuffled[1]]=[shuffled[1],shuffled[0]];return shuffled}
function startStudy(){if(!accountUser){openAuth();setMessage('请先登录，才能把复习安排保存到你的账号。');return}queue=buildQueue();$('#welcomePanel').classList.add('hidden');$('#dashboard').classList.add('hidden');$('#goalPanel').classList.add('hidden');$('#recentPanel').classList.add('hidden');$('.how').classList.add('hidden');$('#studyPanel').classList.remove('hidden');showNext()}
function showNext(){checked=false;$('#answerReveal').classList.add('hidden');$('#completeState').classList.add('hidden');$('#card').classList.remove('hidden');$('#revealAnswerButton').classList.remove('hidden');current=queue.shift();if(!current){$('#card').classList.add('hidden');$('#completeState').classList.remove('hidden');renderStats();return}$('#questionLabel').textContent='根据例句回忆两种变化';$('#baseWord').textContent=current.base;$('#promptText').textContent='在两个空格中输入答案，再点击检查';$('#resultText').textContent='对照答案和完整例句，再选择这张卡的真实难度。';$('#resultText').className='';renderMemoryExamples(current);$('.sentence-input')?.focus();$('#studyCount').textContent=`${studyOrder==='random'?'随机顺序':'表格顺序'} · 剩余 ${queue.length+1} 张`}
function revealAnswer(){if(checked||!current)return;checked=true;const pastCorrect=judgeSentenceInput('past',exampleAnswers(current,'past')),participleCorrect=judgeSentenceInput('participle',exampleAnswers(current,'participle')),bothCorrect=pastCorrect&&participleCorrect;$('#resultText').textContent=bothCorrect?'两个答案都正确！再选择这张卡的真实难度。':`${pastCorrect?'过去式正确':'过去式需要再看'}，${participleCorrect?'过去分词正确':'过去分词需要再看'}。`;$('#resultText').className=bothCorrect?'right':'wrong';$('#revealPast').textContent=current.past;$('#revealParticiple').textContent=current.participle;$('#revealBase').textContent=current.base;$('#revealMeaning').textContent=meanings[current.base];renderMemoryExamples(current,true);renderRelated(current);$('#revealAnswerButton').classList.add('hidden');$('#answerReveal').classList.remove('hidden')}
async function rateCard(rating){if(!current)return;document.querySelectorAll('[data-rating]').forEach(b=>b.disabled=true);try{const response=await fetch('/api/progress',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({verb:current.base,rating,date:localDate()})}),data=await response.json();if(!response.ok)throw new Error(data.error);progress[current.base]=data.card;if(data.dailyStat)dailyHistory[data.studyDate]={learned:Number(data.dailyStat.learned),uniqueLearned:Number(data.dailyStat.uniqueLearned),remembered:Number(data.dailyStat.remembered)};else{const day=dailyHistory[data.studyDate]||{learned:0,uniqueLearned:0,remembered:0};day.learned+=1;day.uniqueLearned+=1;if(['good','easy'].includes(rating))day.remembered+=1;dailyHistory[data.studyDate]=day}totalReviewCount+=1;showNext()}catch(error){alert(error.message||'保存失败，请稍后再试。')}finally{document.querySelectorAll('[data-rating]').forEach(b=>b.disabled=false)}}
function leaveStudy(){$('#studyPanel').classList.add('hidden');$('#welcomePanel').classList.remove('hidden');$('#dashboard').classList.remove('hidden');$('#goalPanel').classList.remove('hidden');$('#recentPanel').classList.remove('hidden');$('.how').classList.remove('hidden');renderStats()}
$('#accountButton').addEventListener('click',openAuth);$('#closeAuthButton').addEventListener('click',closeAuth);$('#authForm').addEventListener('submit',e=>{e.preventDefault();submitAuth('login')});$('#registerButton').addEventListener('click',()=>submitAuth('register'));$('#logoutButton').addEventListener('click',async()=>{await fetch('/api/auth',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'logout'})});accountUser=null;progress={};dailyHistory={};totalReviewCount=0;updateAccountUI();renderStats()});$('#startButton').addEventListener('click',startStudy);$('#revealAnswerButton').addEventListener('click',revealAnswer);$('#card').addEventListener('keydown',event=>{if(event.key==='Enter'&&event.target.matches('.sentence-input')){event.preventDefault();revealAnswer()}});document.querySelectorAll('[data-rating]').forEach(button=>button.addEventListener('click',()=>rateCard(button.dataset.rating)));$('#studyOrderToggle').addEventListener('change',event=>setStudyOrder(event.target.checked?'random':'sequential'));$('#backButton').addEventListener('click',leaveStudy);$('#completeBackButton').addEventListener('click',leaveStudy);updateStudyOrderUI();loadAuth();
