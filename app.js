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
// v2.2.1 learning application. Verb content and its progress API stay compatible.
const $$ = selector => document.querySelector(selector);
const normalization = globalThis.AnswerNormalization || { normalizeAnswer: value => String(value ?? '').trim().toLowerCase(), matches: (_module, entry, value) => String(entry?.answer || entry?.word || '').toLowerCase() === String(value || '').trim().toLowerCase() };
const practiceLogic = globalThis.PracticeLogic || { buildVocabQueue: pool => [...pool].slice(0, 20), metrics: (startedAt, completedAt, correctCount) => { const elapsedSeconds = Math.max(1, Math.round((completedAt - startedAt) / 1000)); return { elapsedSeconds, speed: Math.round((20 * 60 / elapsedSeconds) * 10) / 10, accuracy: Math.round(correctCount / 20 * 100), correctCount }; } };
const schoolWords = Array.isArray(globalThis.SchoolWords) ? globalThis.SchoolWords : [];
const houhaiWords = Array.isArray(globalThis.HouhaiWords) ? globalThis.HouhaiWords : [];
const GOAL_START = '2026-09-01';
const GOAL_END = '2027-01-17';
const GOAL_DAYS = 139;
const DAILY_MODULES = ['verb', 'school', 'houhai'];
const MODULE_LABELS = { verb: '动词星球', school: '学校单词', houhai: '厚海单词' };
const RETRY_KEY = 'english-practice-checkin-retry-v2';
let accountUser = null;
let progress = {};
let dailyHistory = {};
let totalReviewCount = 0;
let checkins = [];
let queue = [];
let current = null;
let checked = false;
let secondAnswerSubmitted = false;
let currentModule = '';
let currentQuestionCorrect = false;
let secondQuestionCorrect = false;
let currentQuestionNumber = 0;
let sessionStartedAt = 0;
let sessionCompletedAt = 0;
let sessionId = '';
let sessionAnswers = [];
let sessionScopes = [];
let sessionMetrics = null;
let sessionSaved = false;
let vocabProgress = {}, vocabReady = false, vocabSaving = false, currentReviewId = '', letterTemplate = '', secondLetterTemplate = '';
let firstAnswerSource = '';
let handwritingFirstSelfAssessment = null;
const handwritingLogic = globalThis.HandwritingLogic || { createBoard: () => ({ strokes: [], active: null }), hasInk: board => Boolean(board?.strokes?.some(stroke => stroke.length)), clear: board => { board.strokes = []; board.active = null; }, undo: board => { if (!board.strokes.length) return false; board.strokes.pop(); return true; }, canvasSize: (width, height, ratio = 1) => ({ width: Math.max(1, Math.round(Number(width) || 0)), height: Math.max(1, Math.round(Number(height) || 0)), ratio: Math.max(1, Math.min(4, Number(ratio) || 1)), pixelWidth: Math.max(1, Math.round(Number(width) || 0)) * Math.max(1, Math.min(4, Number(ratio) || 1)), pixelHeight: Math.max(1, Math.round(Number(height) || 0)) * Math.max(1, Math.min(4, Number(ratio) || 1)) }), canWrite: (stage, state = {}) => stage === 'first' ? !state.checked : state.checked && state.selfAssessment === false && !state.submitted };
const handwritingBoards = { first: { ...handwritingLogic.createBoard(), canvas: null, canvases: [] }, second: { ...handwritingLogic.createBoard(), canvas: null, canvases: [] } };
let studyOrder = localStorage.getItem('verb-study-order') === 'random' ? 'random' : 'sequential';
const selectionState = {
  school: { units: new Set(schoolWords.map(word => word.unit)), lessons: new Set(schoolWords.map(practiceLogic.lessonKey)) },
  houhai: { units: new Set(houhaiWords.map(word => word.unit)), lessons: new Set(houhaiWords.map(practiceLogic.lessonKey)) },
};
const vocabEntriesById = new Map([...schoolWords, ...houhaiWords].map(entry => [entry.id, entry]));

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const firstForm = value => String(value || '').split('/')[0];
function exampleForm(verb, type) { return exampleFormOverrides[verb.base]?.[type] || firstForm(verb[type]); }
function exampleAnswers(verb, type) { const override = exampleFormOverrides[verb.base]?.[type]; return override ? [override] : String(verb[type]).split('/'); }
function exampleHtml(template, word, revealed = false, type = '', answers = [word]) {
  if (revealed) return template.replace('{word}', `<mark>${escapeHtml(word)}</mark>`);
  const characters = Math.max(1, ...answers.map(answer => String(answer).length));
  const label = type === 'past' ? '过去式' : '过去分词';
  return template.replace('{word}', `<input class="sentence-input" data-answer-type="${type}" aria-label="请输入${label}" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="${characters}" size="${Math.max(3, characters)}" style="--characters:${characters}" placeholder="${'_'.repeat(characters)}" />`);
}
function renderMemoryExamples(verb, revealed = false) {
  const examples = sentenceExamples[verb.base];
  const translations = sentenceMeanings[verb.base];
  const past = exampleForm(verb, 'past');
  const participle = exampleForm(verb, 'participle');
  if (revealed) {
    $$('#fullPastSentence').innerHTML = exampleHtml(examples.past, past, true);
    $$('#fullParticipleSentence').innerHTML = exampleHtml(examples.participle, participle, true);
    $$('#pastSentenceMeaning').textContent = translations.past;
    $$('#participleSentenceMeaning').textContent = translations.participle;
  } else {
    $$('#maskedPastSentence').innerHTML = exampleHtml(examples.past, past, false, 'past', exampleAnswers(verb, 'past'));
    $$('#maskedParticipleSentence').innerHTML = exampleHtml(examples.participle, participle, false, 'participle', exampleAnswers(verb, 'participle'));
  }
}
function judgeSentenceInput(type, answers) {
  const input = $$(`.sentence-input[data-answer-type="${type}"]`);
  const correct = answers.some(answer => normalization.normalizeAnswer(answer) === normalization.normalizeAnswer(input?.value || ''));
  if (input) { input.classList.add(correct ? 'correct' : 'incorrect'); input.disabled = true; }
  return correct;
}
function commonSuffix(left, right) { let count = 0; while (count < left.length && count < right.length && left[left.length - 1 - count] === right[right.length - 1 - count]) count += 1; return count; }
function formClass(verb) { const past = firstForm(verb.past); const participle = firstForm(verb.participle); return `${verb.base === past ? 'base-past' : ''}|${past === participle ? 'same-forms' : ''}|${verb.base === participle ? 'base-participle' : ''}`; }
function similarityScore(source, candidate) { let score = formClass(source) === formClass(candidate) ? 8 : 0; score += commonSuffix(source.base, candidate.base) * 3; score += commonSuffix(firstForm(source.past), firstForm(candidate.past)) * 2; score += commonSuffix(firstForm(source.participle), firstForm(candidate.participle)) * 2; return score; }
function hasStrongSimilarity(source, candidate) { return formClass(source) === formClass(candidate) && commonSuffix(source.base, candidate.base) >= 2 && commonSuffix(firstForm(source.past), firstForm(candidate.past)) >= 2 && commonSuffix(firstForm(source.participle), firstForm(candidate.participle)) >= 2; }
function relatedVerbs(base) { const source = verbs.find(verb => verb.base === base); const family = similarFamilies.find(group => group.includes(base)); if (family) return family.filter(word => word !== base).map(word => verbs.find(verb => verb.base === word)).filter(Boolean); return verbs.filter(verb => verb.base !== base && hasStrongSimilarity(source, verb)).sort((left, right) => similarityScore(source, right) - similarityScore(source, left)).slice(0, 4); }
function renderRelated(verb) { const related = relatedVerbs(verb.base); $$('.related').classList.toggle('hidden', related.length === 0); $$('#relatedList').innerHTML = related.map(item => `<article><b>${escapeHtml(item.base)}</b><span>${escapeHtml(item.past)} · ${escapeHtml(item.participle)}</span><small>${escapeHtml(meanings[item.base])}</small></article>`).join(''); }

function setMessage(text, type = '') { const element = $$('#authMessage'); if (element) { element.textContent = text; element.className = `message ${type}`.trim(); } }
function bytesToBase64Url(bytes) { let binary = ''; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', ''); }
function base64UrlToBytes(value) { const padded = value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - value.length % 4) % 4); return Uint8Array.from(atob(padded), char => char.charCodeAt(0)); }
function newPasswordSalt() { const bytes = new Uint8Array(16); crypto.getRandomValues(bytes); return bytesToBase64Url(bytes); }
async function passwordProof(password, salt) { const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']); const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: base64UrlToBytes(salt), iterations: 210000 }, key, 256); return bytesToBase64Url(new Uint8Array(bits)); }
async function readAuthResponse(response) { if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('账号服务暂时没有正常响应，请稍后再试。'); return response.json(); }
function updateAccountUI() { const inAccount = Boolean(accountUser); $$('#authLoggedOut').classList.toggle('hidden', inAccount); $$('#authLoggedIn').classList.toggle('hidden', !inAccount); $$('#accountButton').textContent = inAccount ? accountUser.username : '登录 / 注册'; if (inAccount) $$('#accountName').textContent = accountUser.username; }
function openAuth() { if (vocabSaving) return; $$('#authPanel').classList.remove('hidden'); updateAccountUI(); if (!accountUser) $$('#usernameInput').focus(); }
function closeAuth() { $$('#authPanel').classList.add('hidden'); }
async function authPayload(action, username, password) { if (action === 'register') { const salt = newPasswordSalt(); return { passwordProof: await passwordProof(password, salt), passwordSalt: salt }; } const response = await fetch('/api/auth', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'challenge', username }) }); const data = await readAuthResponse(response); if (!response.ok) throw new Error(data.error || '账号或密码不正确。'); return data.scheme === 'client-v1' ? { passwordProof: await passwordProof(password, data.salt) } : { password }; }
async function submitAuth(action) { const username = $$('#usernameInput').value.trim(); const password = $$('#passwordInput').value; if (!username || !password) { setMessage('请先填写账号和密码。', 'error'); return; } setMessage(action === 'register' ? '正在安全创建账号…' : '正在安全登录…'); try { const credentials = await authPayload(action, username, password); const response = await fetch('/api/auth', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, username, ...credentials }) }); const data = await readAuthResponse(response); if (!response.ok) throw new Error(data.error || '操作未完成。'); accountUser = data.user; $$('#passwordInput').value = ''; updateAccountUI(); setMessage('登录成功，学习记录已同步。', 'success'); await loadAccountData(); closeAuth(); } catch (error) { setMessage(error.message || '操作未完成，请稍后再试。', 'error'); } }

function formatDate(date) { return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
function localDate(offset = 0) { const date = new Date(); date.setHours(12, 0, 0, 0); date.setDate(date.getDate() - offset); return formatDate(date); }
function dateRange(start, end) { const dates = []; const cursor = new Date(`${start}T12:00:00`); const last = new Date(`${end}T12:00:00`); while (cursor <= last) { dates.push(formatDate(cursor)); cursor.setDate(cursor.getDate() + 1); } return dates; }
function dayLabel(date) { const value = new Date(`${date}T12:00:00`); const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']; return `${value.getMonth() + 1}/${value.getDate()} ${weekdays[value.getDay()]}`; }
function randomIndex(limit) { if (globalThis.crypto?.getRandomValues) { const value = new Uint32Array(1); crypto.getRandomValues(value); return value[0] % limit; } return Math.floor(Math.random() * limit); }
function shuffle(items) { for (let index = items.length - 1; index > 0; index -= 1) { const target = randomIndex(index + 1); [items[index], items[target]] = [items[target], items[index]]; } return items; }
function studyDateForSession() { const today = localDate(); return today < GOAL_START ? GOAL_START : today > GOAL_END ? GOAL_END : today; }

function dueTime(verb) { const card = progress[verb.base]; if (!card) return 0; const parsed = Date.parse(card.dueAt); return Number.isFinite(parsed) ? parsed : 0; }
function buildVerbQueue() { const now = Date.now(); const indexed = verbs.map((verb, index) => ({ ...verb, sourceIndex: index + 1 })); const due = indexed.filter(verb => !progress[verb.base] || dueTime(verb) <= now).sort((left, right) => dueTime(left) - dueTime(right) || left.sourceIndex - right.sourceIndex); const future = indexed.filter(verb => progress[verb.base] && dueTime(verb) > now).sort((left, right) => dueTime(left) - dueTime(right) || left.sourceIndex - right.sourceIndex); const selected = [...due, ...future].slice(0, 20); if (studyOrder === 'random') return shuffle(selected); return selected; }
function wordsFor(module) { const source = module === 'school' ? schoolWords : houhaiWords; const state = selectionState[module]; return source.filter(word => state.units.has(word.unit) && state.lessons.has(practiceLogic.lessonKey(word))); }
function buildVocabQueue(module) { return practiceLogic.scheduledQueue(wordsFor(module), vocabProgress, randomIndex); }
function scopeKey(scope) { return `${scope.unit}\u0000${scope.lesson}`; }
function entryScope(entry) { return entry?.unit && entry?.lesson ? { unit: entry.unit, lesson: entry.lesson } : null; }
function scopesForEntries(entries) {
  const result = [];
  const seen = new Set();
  for (const entry of entries || []) {
    const scope = entryScope(entry);
    if (!scope || seen.has(scopeKey(scope))) continue;
    seen.add(scopeKey(scope));
    result.push(scope);
  }
  return result;
}
function sessionQuestions(session) { return Array.isArray(session?.questions) ? session.questions : []; }
function sessionScopesForDisplay(session) {
  if (session?.module === 'verb') return [{ unit: '动词星球', lesson: '固定题库' }];
  const stored = Array.isArray(session?.scopes) ? session.scopes.filter(scope => scope?.unit && scope?.lesson) : [];
  const questions = sessionQuestions(session);
  const inferred = scopesForEntries(questions.map(question => vocabEntriesById.get(question.questionId)).filter(Boolean));
  const unknown = questions.some(question => !vocabEntriesById.has(question.questionId));
  const scopes = stored.length ? stored : inferred;
  if (unknown && !scopes.some(scope => scope.lesson === '范围不可识别')) scopes.push({ unit: '旧记录', lesson: '含未知题目' });
  return scopes.length ? scopes : [{ unit: '旧记录', lesson: '范围不可识别' }];
}
function scopeLabel(session) { return sessionScopesForDisplay(session).map(scope => `${scope.unit} · ${scope.lesson}`).join('、'); }
function questionLabel(question) {
  if (String(question?.questionId || '').startsWith('verb:')) return `${String(question.questionId).slice(5)} · 动词星球`;
  const entry = vocabEntriesById.get(question?.questionId);
  if (!entry) return `${question?.questionId || '未知题目'}（范围不可识别）`;
  const text = entry.cardType === 'sentence' ? '句式卡' : entry.word;
  return `${text} · ${entry.unit} · ${entry.lesson}`;
}
function moduleSessions(date, module) {
  return checkins.filter(item => item.studyDate === date && item.module === module)
    .sort((left, right) => String(left.completedAt).localeCompare(String(right.completedAt)));
}
function sessionTime(session) {
  const stamp = new Date(session.completedAt);
  return Number.isFinite(stamp.getTime()) ? stamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : '时间未知';
}
function renderHistorySession(session) {
  const questions = sessionQuestions(session);
  const questionDetail = questions.length ? `<details><summary>查看 ${questions.length} 题记录</summary><div class="history-questions">${questions.map(question => `<span class="${question.correct ? 'is-correct' : 'is-wrong'}">${question.questionIndex}. ${escapeHtml(questionLabel(question))} ${question.correct ? '✓' : '×'}</span>`).join('')}</div></details>` : '';
  return `<article class="history-session"><strong>${escapeHtml(sessionTime(session))} · ${escapeHtml(scopeLabel(session))}</strong><small>${Number(session.questionCount || 20)} 题 · 正确率 ${Number(session.accuracy)}% · ${Number(session.speed).toFixed(1)} 题/分</small>${questionDetail}</article>`;
}

function metadataHtml(entry, module, compact = false) { const first = `${entry.unit} · ${entry.lesson}`; const third = module === 'school' ? entry.lessonTitle : entry.category; return `<span>${escapeHtml(first)}</span><span>${escapeHtml(compact ? third : entry.topic)}</span>${!compact && third ? `<span>${escapeHtml(third)}</span>` : ''}`; }
function renderFilters(module) {
  const source = module === 'school' ? schoolWords : houhaiWords;
  const state = selectionState[module];
  const units = [...new Set(source.map(word => word.unit))];
  const actions = kind => '<div class="filter-actions"><button type="button" data-select="' + kind + ':all">全选</button><button type="button" data-select="' + kind + ':none">全部取消</button></div>';
  const option = (kind, value, label) => '<label class="filter-option"><input type="checkbox" data-kind="' + kind + '" value="' + escapeHtml(value) + '" ' + (state[kind].has(value) ? 'checked' : '') + ' /><span>' + escapeHtml(label) + '</span></label>';
  $$('#' + module + 'UnitFilters').innerHTML = actions('units') + units.map(unit => option('units', unit, unit)).join('');
  $$('#' + module + 'LessonFilters').innerHTML = actions('lessons') + units.filter(unit => state.units.has(unit)).map(unit => {
    const words = source.filter(word => word.unit === unit);
    return '<fieldset class="lesson-group"><legend>' + escapeHtml(unit) + '</legend><div class="lesson-options">' +
      [...new Set(words.map(word => word.lesson))].map(lesson => option('lessons', unit + '::' + lesson, lesson)).join('') + '</div></fieldset>';
  }).join('');
  const panel = $$('#' + module + 'Selection');
  panel.querySelectorAll('input[data-kind]').forEach(input => input.addEventListener('change', () => {
    if (input.dataset.kind === 'units') {
      const selected = new Set(state.units);
      input.checked ? selected.add(input.value) : selected.delete(input.value);
      practiceLogic.selectUnits(source, state, selected);
      renderFilters(module);
    } else {
      input.checked ? state.lessons.add(input.value) : state.lessons.delete(input.value);
      renderPoolCount(module);
    }
  }));
  panel.querySelectorAll('[data-select]').forEach(button => button.addEventListener('click', () => {
    const [kind, action] = button.dataset.select.split(':');
    if (kind === 'units') practiceLogic.selectUnits(source, state, action === 'all' ? units : []);
    else practiceLogic.selectLessons(source, state, action === 'all');
    renderFilters(module);
  }));
  renderPoolCount(module);
}
function renderPoolCount(module) { const count = wordsFor(module).length; const element = $$(`#${module}PoolCount`); if (element) element.textContent = `词池 ${count} 个`; const button = $$(`#start${module[0].toUpperCase() + module.slice(1)}Button`); if (button) button.disabled = count < 1; }

function latestSession(date, module) { return checkins.filter(item => item.studyDate === date && item.module === module).sort((left, right) => String(right.completedAt).localeCompare(String(left.completedAt)))[0] || null; }
function moduleDone(date, module) { return Boolean(latestSession(date, module)); }
function dayModuleCount(date) { return DAILY_MODULES.filter(module => moduleDone(date, module)).length; }
function currentGoalStreak() { const dates = dateRange(GOAL_START, GOAL_END); const today = localDate(); let index = today > GOAL_END ? dates.length - 1 : dates.indexOf(today); if (index < 0) return 0; if (dayModuleCount(dates[index]) < 3) index -= 1; let streak = 0; while (index >= 0 && dayModuleCount(dates[index]) === 3) { streak += 1; index -= 1; } return streak; }
function renderGoal() { const today = studyDateForSession(); const completed = dayModuleCount(today); const dates = dateRange(GOAL_START, GOAL_END); const completedDays = dates.filter(date => dayModuleCount(date) === 3).length; const remaining = localDate() < GOAL_START ? GOAL_DAYS : localDate() > GOAL_END ? 0 : dates.filter(date => date >= localDate()).length; $$('#todayGoalCount').textContent = accountUser ? `${completed} / 3` : '— / 3'; $$('#todayGoalStatus').textContent = accountUser && completed === 3 ? '今日已完成' : '今日完成模块'; $$('#goalProgressBar').style.width = accountUser ? `${completed / 3 * 100}%` : '0%'; $$('#goalStreak').textContent = accountUser ? currentGoalStreak() : '—'; $$('#goalCompletedDays').textContent = accountUser ? completedDays : '—'; $$('#goalRemainingDays').textContent = remaining; }
function renderModuleStatuses() { for (const module of DAILY_MODULES) { const session = latestSession(studyDateForSession(), module); const status = $$(`#${module}TodayStatus`); const speed = $$(`#${module}ModuleSpeed`); if (status) status.textContent = accountUser && session ? '今日已完成' : '今日未完成'; if (speed) speed.textContent = accountUser && session ? `${Number(session.speed).toFixed(1)} 题/分` : '—'; } }
function recentRows() { return Array.from({ length: 7 }, (_, index) => localDate(6 - index)); }
function renderHistory() { const rows = recentRows(); $$('#historyRows').innerHTML = rows.map(date => { const cells = DAILY_MODULES.map(module => { const sessions = moduleSessions(date, module); return `<td class="${sessions.length ? 'status-done' : ''}">${sessions.length ? sessions.map(renderHistorySession).join('') : '—'}</td>`; }).join(''); const count = DAILY_MODULES.filter(module => moduleDone(date, module)).length; return `<tr><th>${dayLabel(date)}</th>${cells}<td>${count} / 3</td></tr>`; }).join(''); }
function renderCalendar() { const dates = dateRange(GOAL_START, GOAL_END); $$('#calendarLoadedStatus').textContent = accountUser ? `${checkins.length} 条 session` : '登录后查看'; $$('#checkinCalendar').innerHTML = dates.map(date => { const count = dayModuleCount(date); const today = date === localDate(); const status = !accountUser ? 'locked' : count === 3 ? 'done' : today ? 'today' : date < localDate() ? 'missed' : 'upcoming'; const modules = DAILY_MODULES.map(module => { const session = latestSession(date, module); return `<span class="calendar-module ${session ? 'is-done' : ''}" title="${MODULE_LABELS[module]}">${module === 'verb' ? 'V' : module === 'school' ? 'S' : 'H'}${session ? '✓' : '·'}</span>`; }).join(''); const records = checkins.filter(item => item.studyDate === date).length; return `<article class="calendar-day ${status}"><span>${date.slice(5).replace('-', '/')}</span><b>${accountUser ? `${count}/3` : '—'}</b><div>${modules}</div><small>${accountUser ? (records ? `${records} 次` : '未打卡') : '登录查看'}</small></article>`; }).join(''); }

function drawLineChart(canvas, items, field, color, maxOverride = null) { if (!canvas) return; const box = canvas.getBoundingClientRect(); const width = Math.max(280, Math.round(box.width || canvas.parentElement?.clientWidth || 600)); const height = 220; const ratio = globalThis.devicePixelRatio || 1; canvas.width = width * ratio; canvas.height = height * ratio; const context = canvas.getContext('2d'); context.setTransform(ratio, 0, 0, ratio, 0, 0); context.clearRect(0, 0, width, height); const left = 38; const right = 12; const top = 18; const bottom = 34; const innerWidth = width - left - right; const innerHeight = height - top - bottom; const values = items.map(item => Number(item[field]) || 0); const max = maxOverride || Math.max(1, ...values) * 1.15; const min = field === 'accuracy' ? 0 : 0; context.font = '10px DM Mono, monospace'; context.strokeStyle = '#e9edf6'; context.fillStyle = '#8290a7'; context.lineWidth = 1; for (let tick = 0; tick <= 4; tick += 1) { const y = top + innerHeight - innerHeight * tick / 4; context.beginPath(); context.moveTo(left, y); context.lineTo(width - right, y); context.stroke(); const label = field === 'accuracy' ? `${Math.round(max * tick / 4)}%` : `${(max * tick / 4).toFixed(1)}`; context.fillText(label, 3, y + 3); } if (!items.length) return; const point = (index, value) => ({ x: items.length === 1 ? left + innerWidth / 2 : left + innerWidth * index / (items.length - 1), y: top + innerHeight - (value - min) / (max - min || 1) * innerHeight }); context.strokeStyle = color; context.fillStyle = color; context.lineWidth = 2.5; context.beginPath(); items.forEach((item, index) => { const target = point(index, Number(item[field]) || 0); if (index === 0) context.moveTo(target.x, target.y); else context.lineTo(target.x, target.y); }); context.stroke(); items.forEach((item, index) => { const target = point(index, Number(item[field]) || 0); context.beginPath(); context.arc(target.x, target.y, 3.5, 0, Math.PI * 2); context.fill(); }); context.fillStyle = '#8290a7'; context.font = '10px Nunito, sans-serif'; const labelIndexes = [...new Set([0, Math.floor((items.length - 1) / 2), items.length - 1])]; labelIndexes.forEach(index => { const target = point(index, Number(items[index][field]) || 0); const label = String(items[index].studyDate || '').slice(5); context.fillText(label, Math.max(left, Math.min(target.x - 17, width - right - 36)), height - 10); }); }
function renderCharts() { const items = accountUser ? [...checkins].sort((left, right) => String(left.completedAt).localeCompare(String(right.completedAt))) : []; const has = items.length > 0; $$('#speedChartEmpty').classList.toggle('hidden', has); $$('#accuracyChartEmpty').classList.toggle('hidden', has); drawLineChart($$('#speedChart'), items, 'speed', '#5868e8'); drawLineChart($$('#accuracyChart'), items, 'accuracy', '#35a985', 100); }
function renderDashboard() { renderGoal(); renderModuleStatuses(); renderHistory(); renderCharts(); renderCalendar(); }

function retryStorageKey() { return `${RETRY_KEY}:${accountUser?.id || 'anonymous'}`; }
function getRetryQueue() { try { const parsed = JSON.parse(localStorage.getItem(retryStorageKey()) || '[]'); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
function setRetryQueue(items) { try { localStorage.setItem(retryStorageKey(), JSON.stringify(items.slice(-50))); } catch { /* private browsing can reject storage */ } }
function compactCheckinPayload(payload) { const compact = { sessionId: payload.sessionId, module: payload.module, studyDate: payload.studyDate, startedAt: payload.startedAt, completedAt: payload.completedAt, elapsedSeconds: payload.elapsedSeconds, answers: payload.answers.map(answer => ({ questionId: String(answer.questionId), correct: Boolean(answer.correct) })) }; if (Array.isArray(payload.scopes) && payload.scopes.length) compact.scopes = payload.scopes.map(scope => ({ unit: String(scope.unit), lesson: String(scope.lesson) })); return compact; }
async function postCheckin(payload) { const response = await fetch('/api/checkins', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(compactCheckinPayload(payload)) }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.error || '打卡记录保存失败。'); return data.session; }
async function flushRetryQueue() { if (!accountUser) return; const pending = getRetryQueue(); const remaining = []; for (const payload of pending) { try { const saved = await postCheckin(payload); if (saved) checkins = [...checkins.filter(item => item.sessionId !== saved.sessionId), saved]; } catch { remaining.push(payload); } } setRetryQueue(remaining); renderDashboard(); }
async function saveSession(payload) { try { const saved = await postCheckin(payload); if (saved) checkins = [...checkins.filter(item => item.sessionId !== saved.sessionId), saved]; setRetryQueue(getRetryQueue().filter(item => item.sessionId !== payload.sessionId)); renderDashboard(); return true; } catch { const pending = getRetryQueue().filter(item => item.sessionId !== payload.sessionId); pending.push(compactCheckinPayload(payload)); setRetryQueue(pending); return false; } }
async function loadCheckins() {
  if (!accountUser) { checkins = []; renderDashboard(); return; }
  try {
    const summaryResponse = await fetch(`/api/checkins?from=${GOAL_START}&to=${GOAL_END}`);
    const summaryData = await summaryResponse.json();
    if (!summaryResponse.ok) throw new Error(summaryData.error);
    const summaries = Array.isArray(summaryData.sessions) ? summaryData.sessions : [];
    const today = studyDateForSession();
    const recentStart = dateRange(GOAL_START, today).slice(-7)[0] || GOAL_START;
    const detailResponse = await fetch(`/api/checkins?from=${recentStart}&to=${today}&include=questions`);
    const detailData = await detailResponse.json();
    const details = detailResponse.ok && Array.isArray(detailData.sessions) ? detailData.sessions : [];
    const detailById = new Map(details.map(session => [session.sessionId, session]));
    checkins = summaries.map(session => detailById.get(session.sessionId) || session);
  } catch { checkins = []; }
  renderDashboard();
}
async function loadProgress() { if (!accountUser) return; try { const response = await fetch('/api/progress'); const data = await response.json(); if (!response.ok) throw new Error(data.error); progress = Object.fromEntries((data.cards || []).map(item => [item.verb, item])); dailyHistory = Object.fromEntries((data.dailyStats || data.dailyCounts || []).map(item => [item.date, { learned: Number(item.learned ?? item.count ?? 0), uniqueLearned: Number(item.uniqueLearned ?? item.learned ?? item.count ?? 0), remembered: Number(item.remembered ?? 0) }])); totalReviewCount = Number(data.totalReviewCount || 0); } catch { progress = {}; dailyHistory = {}; totalReviewCount = 0; } }
async function loadAccountData() { await Promise.all([loadProgress(), loadCheckins(), loadVocabProgress()]); await flushRetryQueue(); renderDashboard(); }
async function loadAuth() { try { const response = await fetch('/api/auth'); const data = await readAuthResponse(response); accountUser = data.user || null; updateAccountUI(); if (accountUser) await loadAccountData(); else renderDashboard(); } catch { accountUser = null; updateAccountUI(); renderDashboard(); } }

function updateStudyOrderUI() { const toggle = $$('#studyOrderToggle'); if (!toggle) return; toggle.checked = studyOrder === 'random'; $$('#studyOrderHint').textContent = studyOrder === 'random' ? '每次开始会重新打乱 20 张待复习卡' : '按动词星球原表顺序安排 20 张卡'; }
function setStudyOrder(order) { studyOrder = order === 'random' ? 'random' : 'sequential'; localStorage.setItem('verb-study-order', studyOrder); updateStudyOrderUI(); }
function hideHome(show) { ['welcomePanel', 'goalPanel', 'modulePanel', 'selectionPanel', 'analyticsPanel', 'calendarPanel'].forEach(id => $$('#' + id)?.classList.toggle('hidden', !show)); document.querySelector('.how')?.classList.toggle('hidden', !show); $$('#studyPanel').classList.toggle('hidden', show); }
function handwritingIds() { return { canvas: '#handwritingOverlay', undo: '#handwritingUndoButton', clear: '#handwritingClearButton', status: '#handwritingStatus' }; }
function visibleHandwritingStage() {
  if (!current || !checked || currentModule === 'verb') return 'first';
  if (!practiceLogic.requiresSecondInput(currentModule, currentQuestionCorrect)) return 'first';
  return firstAnswerSource === 'handwriting' && handwritingFirstSelfAssessment === null ? 'first' : 'second';
}
function activeHandwritingStage() { const stage = visibleHandwritingStage(); return handwritingCanWrite(stage) ? stage : ''; }
function handwritingToolStage() { return visibleHandwritingStage(); }
function handwritingCanWrite(stage) {
  if (stage === 'first') return Boolean(current) && handwritingLogic.canWrite('first', { checked, current: true });
  return practiceLogic.requiresSecondInput(currentModule, currentQuestionCorrect) && handwritingLogic.canWrite('second', { checked, selfAssessment: handwritingFirstSelfAssessment, submitted: secondAnswerSubmitted, current: Boolean(current) });
}
function handwritingPoint(event) { const panel = $$('#studyPanel'); const rect = panel?.getBoundingClientRect() || { left: 0, top: 0, width: 800, height: 600 }; return { x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))), y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height))), pressure: Number.isFinite(event.pressure) && event.pressure > 0 ? event.pressure : 0.5 }; }
function drawHandwritingBoard(stage) { const board = handwritingBoards[stage]; const canvas = board.canvas || $$('#handwritingOverlay'); if (!canvas) return; const panel = $$('#studyPanel'); const rect = panel?.getBoundingClientRect() || { width: 800, height: 600 }; const width = rect.width || 800; const height = rect.height || 600; const context = canvas.getContext('2d'); if (!context) return; context.clearRect(0, 0, width, height); context.lineCap = 'round'; context.lineJoin = 'round'; context.strokeStyle = '#273870'; for (const stroke of board.strokes) { if (!stroke.length) continue; context.beginPath(); context.moveTo(stroke[0].x * width, stroke[0].y * height); if (stroke.length === 1) context.arc(stroke[0].x * width, stroke[0].y * height, 2, 0, Math.PI * 2); else for (let index = 1; index < stroke.length; index += 1) context.lineTo(stroke[index].x * width, stroke[index].y * height); context.lineWidth = 2 + Math.min(4, Math.max(0, stroke[stroke.length - 1].pressure || 0.5) * 3); context.stroke(); } }
function resizeHandwritingBoard(stage = 'first') { const board = handwritingBoards[stage]; const canvas = board.canvas || $$('#handwritingOverlay'); if (!canvas) return; board.canvas = canvas; const panel = $$('#studyPanel'); const rect = panel?.getBoundingClientRect() || { width: 800, height: 600 }; const size = handwritingLogic.canvasSize(rect.width || 800, rect.height || 600, globalThis.devicePixelRatio || 1); if (canvas.width !== size.pixelWidth || canvas.height !== size.pixelHeight) { canvas.width = size.pixelWidth; canvas.height = size.pixelHeight; const context = canvas.getContext('2d'); context?.setTransform(size.ratio, 0, 0, size.ratio, 0, 0); } drawHandwritingBoard(stage); }
function updateHandwritingStatus(stage = visibleHandwritingStage()) { const board = handwritingBoards[stage]; const status = $$(handwritingIds().status); if (!status) return; if (stage === 'first' && checked) { if (firstAnswerSource === 'handwriting' && handwritingFirstSelfAssessment === null) status.textContent = board.strokes.length ? `保留第一次的 ${board.strokes.length} 笔；请对照答案并确认是否写对。` : '答案已显示，请确认第一次是否写对。'; else status.textContent = currentQuestionCorrect ? '首次回答正确，可以直接选择复习难度。' : '已记录第一次需要订正，请对照答案。'; } else status.textContent = stage === 'first' ? (board.strokes.length ? `已书写 ${board.strokes.length} 笔；键盘为空时可以检查并显示答案。` : '键盘为空时，可在学习页空白处用 Apple Pencil 书写。') : (board.strokes.length ? `已重新书写 ${board.strokes.length} 笔；可以提交订正。` : '第一次答错；可在学习页空白处用 Apple Pencil 重新书写。'); }
function clearHandwritingBoard(stage) { const board = handwritingBoards[stage]; handwritingLogic.clear(board); resizeHandwritingBoard(stage); updateHandwritingStatus(stage); }
function undoHandwritingStroke(stage) { const board = handwritingBoards[stage]; if (!board.strokes.length) return; handwritingLogic.undo(board); resizeHandwritingBoard(stage); updateHandwritingStatus(stage); }
function isInkInteractiveTarget(target) { return Boolean(target?.closest?.('button, input, textarea, select, a, [contenteditable="true"], .study-top, .study-ink-tools')); }
function isPenPointer(event) { return Boolean(handwritingLogic.shouldCapturePointer?.(event.pointerType) ?? event.pointerType === 'pen'); }
let handwritingActiveStage = '';
function setupHandwritingOverlay() { const canvas = $$('#handwritingOverlay'); const panel = $$('#studyPanel'); if (!canvas || !panel || canvas.dataset.bound === 'true') return; canvas.dataset.bound = 'true'; handwritingBoards.first.canvas = canvas; handwritingBoards.second.canvas = canvas; const finish = event => { const board = handwritingBoards[handwritingActiveStage]; if (board?.active && board.active.pointerId === event.pointerId) board.active = null; if (panel.hasPointerCapture?.(event.pointerId)) panel.releasePointerCapture(event.pointerId); handwritingActiveStage = ''; updateHandwritingStatus(visibleHandwritingStage()); }; panel.addEventListener('pointerdown', event => { if (!isPenPointer(event) || isInkInteractiveTarget(event.target)) return; const stage = activeHandwritingStage(); if (!stage || !handwritingCanWrite(stage)) return; event.preventDefault(); handwritingActiveStage = stage; panel.setPointerCapture?.(event.pointerId); const stroke = []; stroke.pointerId = event.pointerId; handwritingBoards[stage].active = stroke; handwritingBoards[stage].strokes.push(stroke); stroke.push(handwritingPoint(event)); drawHandwritingBoard(stage); updateHandwritingStatus(stage); }, true); panel.addEventListener('pointermove', event => { const stage = handwritingActiveStage; const board = handwritingBoards[stage]; if (!isPenPointer(event) || !stage || !board?.active || board.active.pointerId !== event.pointerId || !handwritingCanWrite(stage)) return; event.preventDefault(); board.active.push(handwritingPoint(event)); drawHandwritingBoard(stage); updateHandwritingStatus(stage); }, true); panel.addEventListener('pointerup', finish, true); panel.addEventListener('pointercancel', finish, true); $$(handwritingIds().undo)?.addEventListener('click', () => { const stage = handwritingToolStage(); if (stage) undoHandwritingStroke(stage); }); $$(handwritingIds().clear)?.addEventListener('click', () => { const stage = handwritingToolStage(); if (stage) clearHandwritingBoard(stage); }); resizeHandwritingBoard('first'); updateHandwritingStatus('first'); }
function handwritingHasStroke(stage) { return handwritingLogic.hasInk(handwritingBoards[stage]); }
function firstKeyboardInputState(stage = 'first') {
  if (stage === 'first' && currentModule === 'verb') {
    const inputs = [...document.querySelectorAll('.sentence-input')];
    const values = inputs.map(input => input.value);
    return { hasAny: values.some(value => normalization.normalizeAnswer(value)), complete: values.length === 2 && values.every(value => normalization.normalizeAnswer(value)), values };
  }
  if (practiceLogic.isSentenceCard(current)) {
    const values = sentenceValues(stage);
    return { hasAny: values.some(value => normalization.normalizeAnswer(value)), complete: values.length > 0 && values.every(value => normalization.normalizeAnswer(value)), values };
  }
  syncLetters(stage);
  const cells = [...document.querySelectorAll(`${stage === 'first' ? '#letterInputs' : '#secondLetterInputs'} .letter-cell`)];
  const value = $$(stage === 'first' ? '#vocabInput' : '#secondVocabInput')?.value || '';
  return { hasAny: cells.some(cell => cell.value), complete: cells.length > 0 && cells.every(cell => cell.value), values: [value] };
}
function clearFirstVocabInput() { if (practiceLogic.isSentenceCard(current)) $$('#sentenceFirstInputs').querySelectorAll('.sentence-card-input').forEach(input => { input.value = ''; input.disabled = false; }); else renderLetterInputs(0, 'first'); clearHandwritingBoard('first'); }
function renderVocabInputMode() { const sentence = practiceLogic.isSentenceCard(current); $$('#wordQuestionView').classList.toggle('hidden', sentence); $$('#sentenceQuestionView').classList.toggle('hidden', !sentence); if (sentence) renderSentenceInputs('first'); else renderLetterInputs(0, 'first'); resizeHandwritingBoard('first'); updateHandwritingStatus('first'); }
function selfAssessmentIds(module = currentModule) { return module === 'verb' ? { panel: '#verbHandwritingSelfAssessment', correct: '#verbHandwritingFirstCorrectButton', needsCorrection: '#verbHandwritingFirstNeedsCorrectionButton', status: '#verbHandwritingSelfAssessmentStatus' } : { panel: '#handwritingSelfAssessment', correct: '#handwritingFirstCorrectButton', needsCorrection: '#handwritingFirstNeedsCorrectionButton', status: '#handwritingSelfAssessmentStatus' }; }
function setSelfAssessmentVisible(visible) { const ids = selfAssessmentIds(); $$(ids.panel)?.classList.toggle('hidden', !visible); }
function resetSelfAssessment() { handwritingFirstSelfAssessment = null; for (const module of ['verb', 'school', 'houhai']) { const ids = selfAssessmentIds(module); $$(ids.correct)?.removeAttribute('disabled'); $$(ids.needsCorrection)?.removeAttribute('disabled'); if ($$(ids.status)) { $$(ids.status).textContent = ''; $$(ids.status).className = 'message'; } $$(ids.panel)?.classList.add('hidden'); } }
function resetReveal() { checked = false; firstAnswerSource = ''; currentQuestionCorrect = false; secondAnswerSubmitted = false; secondQuestionCorrect = false; resetSelfAssessment(); clearHandwritingBoard('first'); clearHandwritingBoard('second'); $$('#answerReveal').classList.add('hidden'); $$('#revealAnswerButton').classList.remove('hidden'); $$('#verbAnswerContent').classList.toggle('hidden', currentModule !== 'verb'); $$('#vocabAnswerContent').classList.toggle('hidden', currentModule === 'verb'); $$('#vocabSecondCheck')?.classList.add('hidden'); $$('#vocabRatingTitle')?.classList.add('hidden'); $$('#vocabRatings')?.classList.add('hidden'); $$('#finishMetrics').classList.add('hidden'); $$('#ratingBlock').classList.remove('hidden'); $$('#nextQuestionButton').classList.add('hidden'); const input = $$('#vocabInput'); if (input) { input.disabled = false; input.classList.remove('correct', 'incorrect'); } const secondInput = $$('#secondVocabInput'); if (secondInput) { secondInput.disabled = false; secondInput.value = ''; } $$('#secondAnswerResult').textContent = ''; $$('#secondAnswerResult').className = 'message'; }
function studyMetrics() { const elapsed = sessionMetrics?.elapsedSeconds || Math.max(1, Math.round((Date.now() - sessionStartedAt) / 1000)); const correct = sessionMetrics?.correctCount ?? sessionAnswers.filter(answer => answer.correct).length; return { elapsedSeconds: Math.max(1, elapsed), speed: Math.round((20 * 60 / Math.max(1, elapsed)) * 10) / 10, accuracy: Math.round(correct / 20 * 100), correctCount: correct }; }
function setMetrics(metrics, target = 'finishMetrics') { const element = $$('#' + target); if (!element) return; if (target === 'finishMetrics') { $$('#elapsedMetric').textContent = metrics.elapsedSeconds; $$('#speedMetric').textContent = metrics.speed.toFixed(1); $$('#accuracyMetric').textContent = metrics.accuracy; } else { element.innerHTML = `<div><span>用时</span><strong>${metrics.elapsedSeconds}</strong><small>秒</small></div><div><span>速度</span><strong>${metrics.speed.toFixed(1)}</strong><small>题 / 分</small></div><div><span>正确率</span><strong>${metrics.accuracy}</strong><small>%</small></div>`; } element.classList.remove('hidden'); }
function prepareVerbCard() { const verb = current; $$('#questionLabel').textContent = '根据例句回忆两种变化'; $$('#verbQuestionView').classList.remove('hidden'); $$('#vocabQuestionView').classList.add('hidden'); $$('#baseWord').textContent = verb.base; $$('#promptText').textContent = '在两个空格中输入答案；也可以用 Apple Pencil 在学习页空白处书写，再点击检查'; $$('#resultText').textContent = '键盘输入优先；键盘为空时，手写至少一笔即可检查。'; $$('#resultText').className = ''; renderMemoryExamples(verb); resizeHandwritingBoard('first'); updateHandwritingStatus('first'); $$('.sentence-input')?.focus(); }
function prepareVocabCard() {
  const sentence = practiceLogic.isSentenceCard(current);
  $$('#vocabRatingTitle').textContent = sentence ? '这道句式记住了吗？' : '这个单词记住了吗？';
  $$('#questionLabel').textContent = MODULE_LABELS[currentModule] + (sentence ? ' · 看中文写句子' : ' · 看中文写英文');
  $$('#verbQuestionView').classList.add('hidden');
  $$('#vocabQuestionView').classList.remove('hidden');
  $$('#frontMetadata').innerHTML = metadataHtml(current, currentModule, true);
  $$('#wordQuestionView').classList.toggle('hidden', sentence);
  $$('#sentenceQuestionView').classList.toggle('hidden', !sentence);
  if (sentence) renderSentenceInputs('first');
  else {
    $$('#vocabMeaning').textContent = current.meaning;
  }
  currentReviewId = crypto.randomUUID();
  $$('#vocabSaveStatus').textContent = '';
  $$('#vocabRatings').classList.add('hidden');
  renderVocabInputMode();
}
function showNext() { if (!queue.length) { showComplete(); return; } current = queue.shift(); currentQuestionNumber = sessionAnswers.length + 1; resetReveal(); $$('#handwritingTools').classList.remove('hidden'); $$('#handwritingOverlay').classList.remove('hidden'); $$('#card').classList.remove('hidden'); $$('#completeState').classList.add('hidden'); $$('#studyCount').textContent = `${MODULE_LABELS[currentModule]} · 第 ${currentQuestionNumber} / 20`; $$('#timerText').textContent = '计时中'; if (currentModule === 'verb') prepareVerbCard(); else prepareVocabCard(); }
function startModule(module) { if (vocabSaving) return; if (accountUser && module !== 'verb' && !vocabReady) { openAuth(); setMessage('词汇复习安排还未同步，请稍后重试或刷新页面。', 'error'); return; } if (!accountUser) { openAuth(); setMessage('请先登录，才能保存学习记录。'); return; } const nextQueue = module === 'verb' ? buildVerbQueue() : buildVocabQueue(module); if (nextQueue.length < 20) { setMessage('词库不足以开始本次 20 题学习。', 'error'); return; } currentModule = module; queue = nextQueue; sessionScopes = module === 'verb' ? [] : scopesForEntries(nextQueue); sessionStartedAt = Date.now(); sessionCompletedAt = 0; sessionId = crypto.randomUUID(); sessionAnswers = []; sessionMetrics = null; sessionSaved = false; hideHome(false); showNext(); }
function setSessionMetrics() { if (!sessionMetrics && sessionAnswers.length >= 20) { const elapsedSeconds = Math.max(1, Math.round((Date.now() - sessionStartedAt) / 1000)); const correctCount = sessionAnswers.filter(answer => answer.correct).length; sessionCompletedAt = Date.now(); sessionMetrics = { elapsedSeconds, correctCount, speed: Math.round((20 * 60 / elapsedSeconds) * 10) / 10, accuracy: Math.round(correctCount / 20 * 100) }; } if (sessionMetrics) setMetrics(sessionMetrics); }
async function persistCurrentSession() { if (sessionSaved || sessionAnswers.length !== 20) return true; setSessionMetrics(); const payload = { sessionId, module: currentModule, studyDate: studyDateForSession(), startedAt: new Date(sessionStartedAt).toISOString(), completedAt: new Date(sessionCompletedAt || Date.now()).toISOString(), elapsedSeconds: sessionMetrics.elapsedSeconds, answers: sessionAnswers, scopes: sessionScopes }; const saved = await saveSession(payload); sessionSaved = saved; if (!saved) setMessage('本次打卡暂时离线保存，将在下次登录时自动重试。', 'error'); return saved; }
function revealVerbAnswer() {
  if (checked || !current) return;
  const keyboard = firstKeyboardInputState('first');
  const handwritten = handwritingHasStroke('first');
  if (keyboard.hasAny && !keyboard.complete) {
    $$('#resultText').textContent = '请完成两个键盘答案，或清空键盘后用 Apple Pencil 书写。';
    $$('#resultText').className = 'wrong';
    document.querySelector('.sentence-input:not(:disabled)')?.focus();
    return;
  }
  if (!keyboard.hasAny && !handwritten) {
    $$('#resultText').textContent = '请先输入两个键盘答案，或在学习页空白处用 Apple Pencil 写至少一笔。';
    $$('#resultText').className = 'wrong';
    document.querySelector('.sentence-input:not(:disabled)')?.focus();
    return;
  }
  checked = true;
  if (keyboard.hasAny) {
    firstAnswerSource = 'keyboard';
    const pastCorrect = judgeSentenceInput('past', exampleAnswers(current, 'past'));
    const participleCorrect = judgeSentenceInput('participle', exampleAnswers(current, 'participle'));
    currentQuestionCorrect = pastCorrect && participleCorrect;
    handwritingFirstSelfAssessment = currentQuestionCorrect;
    $$('#resultText').textContent = currentQuestionCorrect ? '两个答案都正确！再选择这张卡的真实难度。' : `${pastCorrect ? '过去式正确' : '过去式需要再看'}，${participleCorrect ? '过去分词正确' : '过去分词需要再看'}。`;
    $$('#resultText').className = currentQuestionCorrect ? 'right' : 'wrong';
  } else {
    firstAnswerSource = 'handwriting';
    currentQuestionCorrect = false;
    document.querySelectorAll('.sentence-input').forEach(input => { input.disabled = true; });
    $$('#resultText').textContent = '答案已显示。请明确选择第一次手写是否正确，再选择复习难度。';
    $$('#resultText').className = '';
  }
  $$('#revealPast').textContent = current.past;
  $$('#revealParticiple').textContent = current.participle;
  $$('#revealBase').textContent = current.base;
  $$('#revealMeaning').textContent = meanings[current.base];
  renderMemoryExamples(current, true);
  renderRelated(current);
  $$('#revealAnswerButton').classList.add('hidden');
  $$('#answerReveal').classList.remove('hidden');
  setSelfAssessmentVisible(firstAnswerSource === 'handwriting');
  $$('#ratingBlock').classList.toggle('hidden', firstAnswerSource === 'handwriting');
  resizeHandwritingBoard('first');
  updateHandwritingStatus('first');
}
async function rateCard(rating) { if (!current || !checked || (firstAnswerSource === 'handwriting' && handwritingFirstSelfAssessment === null)) return; document.querySelectorAll('[data-rating]').forEach(button => { button.disabled = true; }); try { const response = await fetch('/api/progress', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ verb: current.base, rating, date: studyDateForSession() }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); progress[current.base] = data.card; if (data.dailyStat) dailyHistory[data.studyDate] = { learned: Number(data.dailyStat.learned), uniqueLearned: Number(data.dailyStat.uniqueLearned), remembered: Number(data.dailyStat.remembered) }; else { const day = dailyHistory[data.studyDate] || { learned: 0, uniqueLearned: 0, remembered: 0 }; day.learned += 1; day.uniqueLearned += 1; if (['good', 'easy'].includes(rating)) day.remembered += 1; dailyHistory[data.studyDate] = day; } totalReviewCount += 1; sessionAnswers.push({ questionId: `verb:${current.base}`, correct: Boolean(currentQuestionCorrect) }); if (sessionAnswers.length === 20) { await persistCurrentSession(); showComplete(); } else showNext(); } catch (error) { setMessage(error.message || '保存失败，请稍后再试。', 'error'); } finally { document.querySelectorAll('[data-rating]').forEach(button => { button.disabled = false; }); } }
function sentenceAnswers(part) { return Array.isArray(part?.answers) && part.answers.length ? part.answers : [part?.answer || '']; }
function sentenceValues(stage) { return [...document.querySelectorAll(`#${stage === 'first' ? 'sentenceFirstInputs' : 'sentenceSecondInputs'} .sentence-card-input`)].map(input => input.value); }
function sentenceResults(entry, values) { return practiceLogic.sentenceParts(entry).map((part, index) => sentenceAnswers(part).some(answer => normalization.normalizeAnswer(answer) === normalization.normalizeAnswer(values[index] || ''))); }
function renderSentenceInputs(stage) {
  const target = $$(`#${stage === 'first' ? 'sentenceFirstInputs' : 'sentenceSecondInputs'}`);
  if (!target) return;
  const parts = practiceLogic.sentenceParts(current);
  target.innerHTML = parts.map((part, index) => {
    const maxLength = Math.max(1, ...sentenceAnswers(part).map(answer => String(answer).length)) + 4;
    return `<div class="sentence-card-row"><label for="${stage}SentenceInput${index}">${escapeHtml(part.prompt)}</label><input id="${stage}SentenceInput${index}" class="sentence-card-input" data-sentence-stage="${stage}" data-part-index="${index}" type="text" maxlength="${maxLength}" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="请输入英文句子" /></div>`;
  }).join('');
  target.querySelectorAll('.sentence-card-input').forEach(input => input.addEventListener('keydown', event => {
    if (event.isComposing || event.key !== 'Enter') return;
    event.preventDefault();
    if (stage === 'first') revealVocabAnswer(); else submitVocabSecond();
  }));
  target.querySelector('.sentence-card-input')?.focus();
}
function renderSentenceAnswers(entry) {
  const target = $$('#sentenceAnswerList');
  if (!target) return;
  target.innerHTML = practiceLogic.sentenceParts(entry).map(part => `<article class="sentence-answer"><strong>${sentenceAnswers(part).map(escapeHtml).join(' / ')}</strong><span>${escapeHtml(part.prompt)}</span></article>`).join('');
}
function renderSecondInput() {
  const sentence = practiceLogic.isSentenceCard(current);
  $$('#vocabSecondCheck').classList.remove('hidden');
  $$('#secondAnswerResult').textContent = '';
  $$('#secondAnswerButton').disabled = handwritingFirstSelfAssessment === null;
  clearHandwritingBoard('second');
  if (sentence) {
    $$('#secondLetterInputs').classList.add('hidden');
    $$('#secondSpellingVariants').innerHTML = '';
    $$('#sentenceSecondInputs').classList.remove('hidden');
    renderSentenceInputs('second');
  } else {
    $$('#sentenceSecondInputs').classList.add('hidden');
    $$('#secondSpellingVariants').innerHTML = '';
    $$('#secondLetterInputs').classList.remove('hidden');
    renderLetterInputs(0, 'second');
  }
}
function selectHandwritingSelfAssessment(correct) {
  if (!checked || firstAnswerSource !== 'handwriting' || handwritingFirstSelfAssessment !== null) return;
  handwritingFirstSelfAssessment = Boolean(correct);
  currentQuestionCorrect = handwritingFirstSelfAssessment;
  const ids = selfAssessmentIds();
  $$(ids.correct).disabled = true;
  $$(ids.needsCorrection).disabled = true;
  $$(ids.status).textContent = currentModule === 'verb'
    ? (handwritingFirstSelfAssessment ? '已记录：第一次手写正确，可以选择复习难度。' : '已记录：第一次需要订正，可以选择复习难度。')
    : (handwritingFirstSelfAssessment ? '已记录：第一次手写正确，可以直接选择复习难度。' : '已记录：第一次需要订正，请重新输入一次。');
  $$(ids.status).className = `message ${handwritingFirstSelfAssessment ? 'success' : ''}`.trim();
  if (currentModule === 'verb') {
    $$('#ratingBlock').classList.remove('hidden');
  } else if (handwritingFirstSelfAssessment) {
    $$('#vocabSecondCheck').classList.add('hidden');
    $$('#vocabRatingTitle').classList.remove('hidden');
    $$('#vocabRatings').classList.remove('hidden');
    resizeHandwritingBoard('first');
    updateHandwritingStatus('first');
  } else renderSecondInput();
}
function focusFirstBlank(stage) {
  const selector = stage === 'first' ? '#sentenceFirstInputs .sentence-card-input' : '#sentenceSecondInputs .sentence-card-input';
  document.querySelector(selector + ':not(:disabled)')?.focus();
}
function revealVocabAnswer() {
  if (checked || !current) return;
  const sentence = practiceLogic.isSentenceCard(current);
  const keyboard = firstKeyboardInputState('first');
  const handwritten = handwritingHasStroke('first');
  let values = keyboard.values;
  if (keyboard.hasAny && !keyboard.complete) {
    $$('#resultText').textContent = sentence ? '请完成所有键盘句子，或清空键盘后用 Apple Pencil 书写。' : '请完成键盘输入，或清空键盘后用 Apple Pencil 书写。';
    $$('#resultText').className = 'wrong';
    if (sentence) focusFirstBlank('first'); else document.querySelector('#letterInputs .letter-cell')?.focus();
    return;
  }
  if (!keyboard.hasAny && !handwritten) {
    $$('#resultText').textContent = '请先输入键盘答案，或在学习页空白处用 Apple Pencil 写至少一笔。';
    $$('#resultText').className = 'wrong';
    if (sentence) focusFirstBlank('first'); else document.querySelector('#letterInputs .letter-cell')?.focus();
    return;
  }
  if (keyboard.hasAny) {
    firstAnswerSource = 'keyboard';
    if (sentence) document.querySelectorAll('#sentenceFirstInputs .sentence-card-input').forEach(input => { input.disabled = true; });
    else document.querySelectorAll('#letterInputs .letter-cell, #spellingVariants button').forEach(input => { input.disabled = true; });
  } else {
    firstAnswerSource = 'handwriting';
    values = [];
  }
  checked = true;
  if (firstAnswerSource === 'keyboard') {
    const results = sentence ? sentenceResults(current, values) : [normalization.matches(currentModule, current, values[0])];
    currentQuestionCorrect = results.every(Boolean);
    handwritingFirstSelfAssessment = currentQuestionCorrect;
    if (!sentence) $$('#letterInputs').classList.add(currentQuestionCorrect ? 'correct' : 'incorrect');
    $$('#resultText').textContent = currentQuestionCorrect ? '首次回答正确！可以直接选择复习难度。' : '首次回答有误。请对照完整答案，再输入一次。';
    $$('#resultText').className = currentQuestionCorrect ? 'right' : 'wrong';
  } else {
    $$('#resultText').textContent = '答案已显示。请确认第一次手写是否正确；只有写错时才需要订正。';
    $$('#resultText').className = '';
    document.querySelectorAll('#sentenceFirstInputs .sentence-card-input, #letterInputs .letter-cell, #spellingVariants button').forEach(input => { input.disabled = true; });
  }
  $$('#vocabWord').textContent = current.word;
  $$('#vocabPronunciation').textContent = `${current.pronunciation || '—'} · ${current.partOfSpeech || '—'}`;
  $$('#vocabEnglishExample').textContent = current.englishExample;
  $$('#vocabChineseExampleAnswer').textContent = current.chineseExample || '—';
  $$('#backMetadata').innerHTML = metadataHtml(current, currentModule, false);
  $$('#vocabBack').classList.toggle('hidden', sentence);
  $$('#sentenceBack').classList.toggle('hidden', !sentence);
  if (sentence) renderSentenceAnswers(current);
  $$('#revealAnswerButton').classList.add('hidden');
  $$('#answerReveal').classList.remove('hidden');
  $$('#vocabAnswerContent').classList.remove('hidden');
  $$('#vocabRatings').classList.add('hidden');
  setSelfAssessmentVisible(firstAnswerSource === 'handwriting');
  if (firstAnswerSource === 'keyboard' && !currentQuestionCorrect) renderSecondInput();
  else if (firstAnswerSource === 'keyboard') {
    $$('#vocabSecondCheck').classList.add('hidden');
    $$('#vocabRatingTitle').classList.remove('hidden');
    $$('#vocabRatings').classList.remove('hidden');
    resizeHandwritingBoard('first');
    updateHandwritingStatus('first');
  }
  else {
    $$('#vocabSecondCheck').classList.add('hidden');
    resizeHandwritingBoard('first');
    updateHandwritingStatus('first');
  }
}
function submitVocabSecond() {
  if (!checked || secondAnswerSubmitted || !current) return;
  const sentence = practiceLogic.isSentenceCard(current);
  if (handwritingFirstSelfAssessment === null) {
    $$('#secondAnswerResult').textContent = '请先选择“第一次写对了”或“需要订正”。';
    $$('#secondAnswerResult').className = 'message error';
    return;
  }
  const keyboard = firstKeyboardInputState('second');
  const handwritten = handwritingHasStroke('second');
  if (keyboard.hasAny && !keyboard.complete) {
    $$('#secondAnswerResult').textContent = sentence ? '请完成所有第二次键盘句子，或清空键盘后用 Apple Pencil 书写。' : '请完成第二次键盘输入，或清空键盘后用 Apple Pencil 书写。';
    $$('#secondAnswerResult').className = 'message error';
    if (sentence) focusFirstBlank('second'); else document.querySelector('#secondLetterInputs .letter-cell')?.focus();
    return;
  }
  if (!keyboard.hasAny && !handwritten) {
    $$('#secondAnswerResult').textContent = '请完成第二次键盘输入，或在学习页空白处用 Apple Pencil 写至少一笔。';
    $$('#secondAnswerResult').className = 'message error';
    if (sentence) focusFirstBlank('second'); else document.querySelector('#secondLetterInputs .letter-cell')?.focus();
    return;
  }
  let values = keyboard.values;
  if (keyboard.hasAny) {
    if (sentence) document.querySelectorAll('#sentenceSecondInputs .sentence-card-input').forEach(input => { input.disabled = true; });
    else document.querySelectorAll('#secondLetterInputs .letter-cell, #secondSpellingVariants button').forEach(input => { input.disabled = true; });
    const results = sentence ? sentenceResults(current, values) : [normalization.matches(currentModule, current, values[0])];
    secondQuestionCorrect = results.every(Boolean);
  } else {
    values = [];
    secondQuestionCorrect = null;
  }
  secondAnswerSubmitted = true;
  $$('#secondAnswerResult').textContent = keyboard.hasAny ? (secondQuestionCorrect ? '第二次输入正确，可以选择复习难度。' : '第二次输入已提交，请对照答案后选择复习难度。') : '第二次手写已提交，可以选择复习难度。';
  $$('#secondAnswerResult').className = !keyboard.hasAny || secondQuestionCorrect ? 'message success' : 'message';
  $$('#secondAnswerButton').disabled = true;
  $$('#vocabRatingTitle').classList.remove('hidden');
  $$('#vocabRatings').classList.remove('hidden');
}
function hideAndClearHandwriting() { handwritingLogic.clear(handwritingBoards.first); handwritingLogic.clear(handwritingBoards.second); const canvas = $$('#handwritingOverlay'); canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height); $$('#handwritingTools')?.classList.add('hidden'); canvas?.classList.add('hidden'); }
function showComplete() { const metrics = sessionMetrics || studyMetrics(); hideAndClearHandwriting(); $$('#card').classList.add('hidden'); $$('#completeState').classList.remove('hidden'); $$('#completeTitle').textContent = `${MODULE_LABELS[currentModule]}完成！`; $$('#completeSummary').textContent = sessionSaved ? '本次 20 题已记录，继续保持。' : '本次 20 题已完成，记录将在网络恢复后保存。'; setMetrics(metrics, 'completeMetrics'); $$('#timerText').textContent = `${metrics.elapsedSeconds} 秒`; renderDashboard(); }
function nextQuestion() { if (!checked) return; if (currentQuestionNumber === 20) showComplete(); else showNext(); }
function leaveStudy() { if (vocabSaving) return; hideAndClearHandwriting(); queue = []; current = null; hideHome(true); renderDashboard(); }

async function loadVocabProgress() {
  vocabReady = false;
  vocabProgress = {};
  try {
    const response = await fetch('/api/vocab-progress');
    const data = await response.json();
    if (!response.ok) throw Error(data.error);
    vocabProgress = Object.fromEntries(data.cards.map(card => [card.itemId, card]));
    vocabReady = true;
  } catch { setMessage('词汇复习安排暂时无法同步，请刷新后重试。', 'error'); }
}
function letterStageIds(stage) { return stage === 'first' ? { input: '#vocabInput', box: '#letterInputs', variants: '#spellingVariants', hint: '#letterHint' } : { input: '#secondVocabInput', box: '#secondLetterInputs', variants: '#secondSpellingVariants', hint: '#secondAnswerPrompt' }; }
function syncLetters(stage = 'first') {
  const ids = letterStageIds(stage);
  const cells = [...document.querySelectorAll(`${ids.box} .letter-cell`)];
  let index = 0;
  const template = stage === 'first' ? letterTemplate : secondLetterTemplate;
  $$(ids.input).value = [...template].map(char => /[a-z0-9]/i.test(char) ? cells[index++].value || '' : char).join('');
}
function renderLetterInputs(variantIndex, stage = 'first') {
  const ids = letterStageIds(stage);
  const variants = normalization.variantsFor(currentModule, current);
  const template = variants[variantIndex] || variants[0] || '';
  if (stage === 'first') letterTemplate = template; else secondLetterTemplate = template;
  $$(ids.input).value = '';
  const variantsBox = $$(ids.variants);
  variantsBox.innerHTML = variants.length > 1 ? variants.map((variant, index) => '<button type="button" aria-pressed="' + (index === variantIndex) + '" data-variant="' + index + '">写法 ' + (index + 1) + ' · ' + (variant.match(/[a-z0-9]/gi) || []).length + ' 格</button>').join('') : '';
  variantsBox.querySelectorAll('button').forEach(button => button.addEventListener('click', () => renderLetterInputs(Number(button.dataset.variant), stage)));
  let index = 0;
  const box = $$(ids.box);
  box.className = 'letter-inputs';
  box.innerHTML = template.split(' ').map(word => '<span class="letter-word">' + [...word].map(char => /[a-z0-9]/i.test(char)
    ? '<input class="letter-cell" type="text" maxlength="1" aria-label="第 ' + (++index) + ' 个字母" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="text" />'
    : '<span class="letter-punctuation">' + escapeHtml(char) + '</span>').join('') + '</span>').join('');
  if (stage === 'first') $$('#letterHint').textContent = index + ' 个字母格 · 自动跳格，支持粘贴；回车检查';
  const cells = [...box.querySelectorAll('.letter-cell')];
  cells.forEach((cell, position) => {
    cell.addEventListener('focus', () => cell.select());
    cell.addEventListener('input', event => {
      if (event.isComposing) return;
      cell.value = cell.value.normalize('NFKC').replace(/[^a-z0-9]/gi, '').slice(-1);
      syncLetters(stage);
      if (cell.value) cells[position + 1]?.focus();
    });
    cell.addEventListener('paste', event => {
      event.preventDefault();
      const pasted = event.clipboardData.getData('text').normalize('NFKC');
      const letters = [...pasted.replace(/[^a-z0-9]/gi, '')];
      if (letters.length > cells.length - position) {
        $$(ids.hint).textContent = '粘贴内容超出字母格数，请检查拼写或切换写法。';
        return;
      }
      letters.forEach((letter, offset) => { cells[position + offset].value = letter; });
      syncLetters(stage);
      cells[Math.min(cells.length - 1, position + letters.length)]?.focus();
    });
    cell.addEventListener('keydown', event => {
      if (event.isComposing) return;
      if (event.key === 'Enter') { event.preventDefault(); if (stage === 'first') revealVocabAnswer(); else submitVocabSecond(); }
      else if (event.key === 'Backspace' && !cell.value && position > 0) { event.preventDefault(); cells[position - 1].value = ''; cells[position - 1].focus(); syncLetters(stage); }
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); cells[position + (event.key === 'ArrowLeft' ? -1 : 1)]?.focus(); }
    });
  });
  cells[0]?.focus();
}
async function rateVocab(rating) {
  if (!current || vocabSaving || !practiceLogic.canRateVocabulary(currentModule, checked, currentQuestionCorrect, secondAnswerSubmitted)) return;
  vocabSaving = true;
  const buttons = [...document.querySelectorAll('[data-vocab-rating], #backButton, #accountButton')];
  buttons.forEach(button => { button.disabled = true; });
  $$('#vocabSaveStatus').textContent = '正在保存记忆反馈…';
  try {
    const response = await fetch('/api/vocab-progress', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ reviewId: currentReviewId, itemId: current.id, rating }) });
    const data = await response.json();
    if (!response.ok) throw Error(data.error || '保存失败');
    vocabProgress[current.id] = data.card;
    sessionAnswers.push({ questionId: current.id, correct: currentQuestionCorrect });
    if (sessionAnswers.length === 20) {
      await persistCurrentSession();
      showComplete();
    } else {
      // Reorder only the remaining questions: forgot words already in a later
      // round come forward, remembered words move back. Total stays at 20.
      const due = word => Date.parse(vocabProgress[word.id]?.dueAt || '') || 0;
      queue.sort((a, b) => due(a) - due(b));
      if (queue.length > 1 && queue[0].id === current.id) {
        const other = queue.findIndex(word => word.id !== current.id);
        if (other > 0) [queue[0], queue[other]] = [queue[other], queue[0]];
      }
      showNext();
    }
  } catch (error) {
    $$('#vocabSaveStatus').textContent = (error.message || '保存失败') + '。请重新点击同一评分重试；本题暂不跳过。';
    $$('#vocabSaveStatus').className = 'message error';
  } finally {
    vocabSaving = false;
    buttons.forEach(button => { button.disabled = false; });
  }
}
document.querySelectorAll('[data-vocab-rating]').forEach(button => button.addEventListener('click', () => rateVocab(button.dataset.vocabRating)));
$$('#secondAnswerButton').addEventListener('click', submitVocabSecond);
$$('#handwritingFirstCorrectButton').addEventListener('click', () => selectHandwritingSelfAssessment(true));
$$('#handwritingFirstNeedsCorrectionButton').addEventListener('click', () => selectHandwritingSelfAssessment(false));
$$('#verbHandwritingFirstCorrectButton').addEventListener('click', () => selectHandwritingSelfAssessment(true));
$$('#verbHandwritingFirstNeedsCorrectionButton').addEventListener('click', () => selectHandwritingSelfAssessment(false));
setupHandwritingOverlay();

$$('#accountButton').addEventListener('click', openAuth); $$('#closeAuthButton').addEventListener('click', closeAuth); $$('#authForm').addEventListener('submit', event => { event.preventDefault(); submitAuth('login'); }); $$('#registerButton').addEventListener('click', () => submitAuth('register')); $$('#logoutButton').addEventListener('click', async () => { await fetch('/api/auth', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) }); leaveStudy(); vocabProgress = {}; vocabReady = false; accountUser = null; progress = {}; dailyHistory = {}; totalReviewCount = 0; checkins = []; updateAccountUI(); renderDashboard(); });
$$('#startVerbButton').addEventListener('click', () => startModule('verb')); $$('#startSchoolButton').addEventListener('click', () => startModule('school')); $$('#startHouhaiButton').addEventListener('click', () => startModule('houhai')); $$('#revealAnswerButton').addEventListener('click', () => currentModule === 'verb' ? revealVerbAnswer() : revealVocabAnswer()); $$('#nextQuestionButton').addEventListener('click', nextQuestion); $$('#card').addEventListener('keydown', event => { if (event.isComposing || event.key !== 'Enter') return; if (event.target.matches('.sentence-input')) { event.preventDefault(); revealVerbAnswer(); } if (event.target.matches('#vocabInput')) { event.preventDefault(); revealVocabAnswer(); } if (event.target.matches('.sentence-card-input[data-sentence-stage="first"]')) { event.preventDefault(); revealVocabAnswer(); } if (event.target.matches('.sentence-card-input[data-sentence-stage="second"]')) { event.preventDefault(); submitVocabSecond(); } }); document.querySelectorAll('[data-rating]').forEach(button => button.addEventListener('click', () => rateCard(button.dataset.rating))); $$('#studyOrderToggle')?.addEventListener('change', event => setStudyOrder(event.target.checked ? 'random' : 'sequential')); $$('#backButton').addEventListener('click', leaveStudy); $$('#completeBackButton').addEventListener('click', leaveStudy); renderFilters('school'); renderFilters('houhai'); updateStudyOrderUI(); renderDashboard(); loadAuth(); window.addEventListener('resize', () => { renderCharts(); resizeHandwritingBoard(visibleHandwritingStage()); });

globalThis.__englishPractice = { buildVerbQueue, buildVocabQueue, wordsFor, dateRange, studyMetrics, normalizeAnswer: normalization.normalizeAnswer, scopesForEntries, sessionScopesForDisplay, canRateVocabulary: practiceLogic.canRateVocabulary, sentenceResults };
