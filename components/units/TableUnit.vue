<template>
  <section class="table">
    <h2 class="table__title">
      {{ $t('table_unit_title') }}
    </h2>
    <div class="table__content">
      <table>
        <thead>
          <tr>
            <th
              v-for="(item, itemIndex) in tableHeader"
              :key="`header-item-${itemIndex}`"
              :class="{'wide': item.is_wide}"
            >
              {{ item.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in infoRows"
            :key="`row-${rowIndex}`"
          >
            <td>{{ row.name }}</td>
            <td>{{ row.taker }}</td>
            <td>{{ row.maker }}</td>
            <td>{{ row.foundation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
const { t, locale } = useI18n({ useScope: 'global' })

const tableHeader = reactive([
  { name: t('table_unit_name'), is_wide: false },
  { name: t('table_unit_taker_commision'), is_wide: false },
  { name: t('table_unit_maker_commision'), is_wide: false },
  { name: t('table_unit_foundation'), is_wide: false }
])

const rowsData = [
  {
    name: 'Binance',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2017',
    bonuses: {
      en: 'Welcome bonus of $100',
      ru: 'Приветственный бонус 100$'
    },
    score: '3.74 from 78 votes',
    link: 'https://accounts.binance.com/register?ref=16309267'
  },
  {
    name: 'Bybit',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2018',
    bonuses: {
      en: '5,000 USDT Deposit Blast-Off Rewards',
      ru: 'Новичкам везёт: награды за задания до 5 000 USDT'
    },
    score: '3.57 from 61 votes',
    link: 'https://www.bybit.com/invite?ref=50YGKK%230'
  },
  {
    name: 'Okx',
    taker: '0.1%',
    maker: '0.08%',
    foundation: '2017',
    bonuses: {
      en: 'Mystery Box up to $10,000',
      ru: 'Mystery Box на сумму до 10 000$'
    },
    score: '3.76 from 59 votes',
    link: 'https://www.okx.com/join/84565032'
  },
  {
    name: 'Mexc',
    taker: '0.0%',
    maker: '0.0%',
    foundation: '2018',
    bonuses: {
      en: 'Get a bonus of $1,000 USDT for tasks',
      ru: 'Получите бонусные 1,000 USDT за задания'
    },
    score: '3.55 from 58 votes',
    link: 'https://www.mexc.com/register?inviteCode=1bKSg'
  },
  {
    name: 'Yobit',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2015',
    bonuses: {
      en: 'Get 4,700 Fast USD for free!',
      ru: 'Получите 4700 Fast USD бесплатно!'
    },
    score: '3.65 from 51 votes',
    link: 'https://yobit.biz/?bonus=qTsvK'
  },
  {
    name: 'Gate',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2013',
    bonuses: {
      en: 'Complete tasks and receive $100 Points and $5,500 trial fund',
      ru: 'Выполняйте задания и получите $100 Point и $5500 пробного фонда'
    },
    score: '3.59 from 54 votes',
    link: 'https://www.gate.io/signup/13269425'
  },
  {
    name: 'Kucoin',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2017',
    bonuses: {
      en: '6 KCS on KuCoin account = 50% daily bonus from exchange profits.',
      ru: '6 KCS на счету KuCoin = 50% ежедневный бонус от доходов биржи.'
    },
    score: '3.72 from 46 votes',
    link: 'https://www.kucoin.com/r/rf/QBSAZMKP'
  },
  {
    name: 'Lbank',
    taker: '>0.2%',
    maker: '>0.2%',
    foundation: '2015',
    bonuses: {
      en: 'Complete various tasks and receive $245 USDT',
      ru: 'Выполняйте различные задания и получайте 245 USDT'
    },
    score: '3.55 from 47 votes',
    link: 'https://www.lbank.com/login/?icode=2ZSSS'
  },
  {
    name: 'Bitget',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2018',
    bonuses: {
      en: 'Daily draw for $888 USDT, rewards up to $5,000 for first account replenishment',
      ru: 'Ежедневный розыгрыш 888 USDT, вознаграждения на сумму до 5000 долларов за первое пополнение счёта'
    },
    score: '3.41 from 49 votes',
    link: 'https://www.bitget.com/ru/referral/register?from=referral&clacCode=PUVQGXJU'
  },
  {
    name: 'Huobi',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2013',
    bonuses: {
      en: 'Complete tasks to win up to $5,672 USDT',
      ru: 'Выполняйте задания, чтобы выиграть до 5672 USDT'
    },
    score: '3.51 from 43 votes',
    link: 'https://www.huobi.com/ru-ru/v/register/double-invite/?inviter_id=11345710&invite_code=f3nr7223'
  },
  {
    name: 'Phemex',
    taker: '0.06%',
    maker: '0.01%',
    foundation: '2019',
    bonuses: {
      en: 'Welcome rewards: Airdrop of 100 million xPT and $50',
      ru: 'Приветственные вознаграждения: Аирдроп на 100 миллионов xPT и $50'
    },
    score: '3.61 from 46 votes',
    link: 'https://phemex.com/ru/register?referralCode=G57JJ5'
  },
  {
    name: 'Pexpay',
    taker: '0.0%',
    maker: '0.0%',
    foundation: '2019',
    bonuses: {
      en: 'Complete tasks and earn points that can be converted into USDT',
      ru: 'Выполняйте задания и получайте баллы, которые можно конвертировать в USDT'
    },
    score: '3.39 from 38 votes',
    link: 'https://accounts.pexpay.com/ru/register?ref=15177346'
  },
  {
    name: 'Bingx',
    taker: '0.020%',
    maker: '0.045%',
    foundation: '2018',
    bonuses: {
      en: 'Make your first trade and receive a bonus of $100 USDT, welcome gift of 100,000 VST and $125 for tasks',
      ru: 'Совершите первую сделку и получите бонусные 100 USDT, приветственный подарок в размере 100,000 VST и 125 USDT за задания'
    },
    score: '3.49 from 37 votes',
    link: 'https://bingx.com/invite/EAKPUS'
  },
  {
    name: 'Ascendex',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2018',
    bonuses: {
      en: 'Complete tasks, earn SAT that can be converted into USDT',
      ru: 'Выполняйте задания, зарабатывайте SAT, которые можно конвертировать в USDT'
    },
    score: '3.5 from 36 votes',
    link: 'https://ascendex.com/ru/register?inviteCode=NUPLPYJG9PQZA'
  },
  {
    name: 'Bkex',
    taker: '0.20%',
    maker: '0.15%',
    foundation: '2018',
    bonuses: {
      en: 'Complete tasks and guaranteed to receive $185 USDT and a chance to win 1BTC & iPhone 14 pro max',
      ru: 'Выполняйте задания гарантированно получите 185 USDT  и возможность выиграть 1BTC & iphone14 pro max'
    },
    score: '3.59 from 34 votes',
    link: 'https://www.bkex.com/register/P8FRESQ5'
  },
  {
    name: 'Digifinex',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2017',
    bonuses: {
      en: 'Get up to $300 USDT for tasks.',
      ru: 'Получите до 300 USDT за задания'
    },
    score: '3.5 from 34 votes',
    link: 'https://www.digifinex.com/en-ww/from/FUD9Qf?channelCode=ljaUPp'
  },
  {
    name: 'Probit',
    taker: '0.19%',
    maker: '0.19%',
    foundation: '2018',
    bonuses: {
      en: 'Complete tasks to get over $30,000',
      ru: 'Выполняйте задания, чтобы получить более 30 000$'
    },
    score: '3.61 from 36 votes',
    link: 'https://www.probit.com/r/93022902'
  },
  {
    name: 'Poloniex',
    taker: '0.075%',
    maker: '0.01%',
    foundation: '2014',
    bonuses: {
      en: 'Complete tasks to win up to $1,000 USDT',
      ru: 'Выполняйте задания, чтобы выиграть до 1000 USDT'
    },
    score: '3.67 from 36 votes',
    link: 'https://poloniex.com/signup?c=MRMAC9YK'
  },
  {
    name: 'Bithumb',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2014',
    bonuses: {
      en: 'Get a discount coupon for mileage commission',
      ru: 'Получите скидочный купон на комиссию за мили'
    },
    score: '3.39 from 38 votes',
    link: ''
  },
  {
    name: 'Crypto.com',
    taker: '0.075%',
    maker: '0.075%',
    foundation: '2016',
    bonuses: {
      en: '2% bonus paid in CRO for any cryptocurrency deposits',
      ru: 'Бонус в размере 2%, выплачиваемый в CRO за любые криптовалютные депозиты'
    },
    score: '3.5 from 38 votes',
    link: ''
  },
  {
    name: 'BItmart',
    taker: '0.06%',
    maker: '0.04%',
    foundation: '2017',
    bonuses: {
      en: 'Get up to $3,265 by being a futures user',
      ru: 'Получите до 3265$ став пользователем фьючерсов'
    },
    score: '3.45 from 40 votes',
    link: ''
  },
  {
    name: 'Btcturk',
    taker: '0.09%',
    maker: '0.05%',
    foundation: '2013',
    bonuses: {
      en: 'Find exchange vulnerabilities and receive from $100 USDT',
      ru: 'Найдите уязвимости биржи и получите от 100 USDT'
    },
    score: '3.53 from 38 votes',
    link: ''
  },
  {
    name: 'Coinbase',
    taker: '0.6%',
    maker: '0.4%',
    foundation: '2012',
    bonuses: {
      en: 'Stake cryptocurrency and receive rewards',
      ru: 'Стейкай криптовалюту и получай вознаграждение'
    },
    score: '3.57 from 42 votes',
    link: ''
  },
  {
    name: 'bitFlyer',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2014',
    bonuses: {
      en: 'Referral program: $15 in BTC for you and whoever you refer',
      ru: 'Реферальная программа: по 15 долларов в BTC вам, и тому, кого вы пригласите'
    },
    score: '3 from 4 votes',
    link: ''
  },
  {
    name: 'gemini',
    taker: '0.4%',
    maker: '0.2%',
    foundation: '2009',
    bonuses: {
      en: 'Referral program: $15 in crypto for you and whoever you refer',
      ru: 'Реферальная программа: по 15 долларов в крипто вам, и тому, кого вы пригласите'
    },
    score: '3 from 4 votes',
    link: ''
  },
  {
    name: 'bitforex',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2018',
    bonuses: {
      en: 'Invite Your Friends GET 30% Rebate',
      ru: 'Пригласите друзей и получите скидку 30%'
    },
    score: '2.8 from 5 votes',
    link: 'https://www.bitforex.com/en/register?inviterId=3143965'
  },
  {
    name: 'upbit',
    taker: '0.25%',
    maker: '0.25%',
    foundation: '2017',
    bonuses: {
      en: 'Referral program: Reward is 50.00% of the trade fee your friends pay',
      ru: 'Реферальная программа: Вознаграждение составляет 50,00% от торговой комиссии, которую платят ваши друзья.'
    },
    score: '3 from 4 votes',
    link: 'https://id.upbit.com/?ref=Z94086'
  },
  {
    name: 'kraken',
    taker: '0.16%',
    maker: '0.26%',
    foundation: '2011',
    bonuses: {
      en: '"Invite friends to Kraken and you’ll\neach get $10 in BTC."',
      ru: '"Пригласите друзей на Kraken и вы\nполучите по 10 долларов в BTC"'
    },
    score: '3.2 from 5 votes',
    link: ''
  },
  {
    name: 'exmo',
    taker: '0.4%',
    maker: '0.4%',
    foundation: '2014',
    bonuses: {
      en: 'Get a Welcome bonus for registering and verifying your account',
      ru: 'Получите Welcome bonus за регистраию и верификацию аккаунта'
    },
    score: '2.6 from 5 votes',
    link: 'https://exmo.me/?ref=2310789'
  },
  {
    name: 'btcex',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2021',
    bonuses: {
      en: 'Complete Tasks to Get $25 in Rewards!',
      ru: 'Выполняйте задания, чтобы получить награду в размере 25 долларов!'
    },
    score: '2.75 from 4 votes',
    link: 'https://www.btcex.com/en-us/register?i=g8dbatg1'
  },
  {
    name: 'biconomy',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2021',
    bonuses: {
      en: 'Win up to 3800 USDT after completing tasks',
      ru: 'Выиграйте до 3800 USDT после выполнения заданий'
    },
    score: '2.8 from 5 votes',
    link: 'https://www.biconomy.com/sign-up?r_user_id=W7G770PV8'
  },
  {
    name: 'p2pb2b',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2018',
    bonuses: {
      en: 'Users who stake PACT may participate in Exclusive Airdrop only',
      ru: 'Пользователи, которые стейкают PACT, могут участвовать в эксклюзивном Airdrop'
    },
    score: '3 from 4 votes',
    link: 'https://p2pb2b.com?referral=f7309d5a'
  },
  {
    name: 'korbit',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2013',
    bonuses: {
      en: 'Complete daily tasks and get KRW',
      ru: 'Выполняйте ежедневные задания и получити KRW'
    },
    score: '2.4 from 5 votes',
    link: ''
  },
  {
    name: 'cointr.pro',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2022',
    bonuses: {
      en: 'Complete tasks in the reward center and get prizes',
      ru: 'Выполняйте задания в центре наград и получайте призы'
    },
    score: '2.75 from 4 votes',
    link: 'https://www.cointr.pro/en-us/register/invite?code=3387eCTA'
  },
  {
    name: 'toobit',
    taker: '0.2%',
    maker: '-0.05%',
    foundation: '2022',
    bonuses: {
      en: 'Invite friends to earn together Up to 40% commission',
      ru: 'Приглашайте друзей, чтобы зарабатывать вместе До 40% комиссии'
    },
    score: '3.4 from 5 votes',
    link: 'https://www.toobit.com/ru-RU/register?invite_code=aNhwSg'
  },
  {
    name: 'bitfinex',
    taker: '0.2%',
    maker: '0.1%',
    foundation: '2014',
    bonuses: {
      en: 'Up to 10% per annum staking reward for supported digital tokens.',
      ru: 'Вознаграждение за стейкинг до 10% в год для поддерживаемых цифровых токенов.'
    },
    score: '2.2 from 5 votes',
    link: 'https://www.bitfinex.com/sign-up?refcode=hTwFfBSph'
  },
  {
    name: 'whitebit',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2018',
    bonuses: {
      en: 'Trade on WhiteBIT using GoodCrypto’s PRO trading tools to share $7,000 prize pool!',
      ru: 'Используйте GoodCrypto PRO, чтобы занять первое место в лидерборде и выигать до 7000 долларов!'
    },
    score: '3 from 5 votes',
    link: 'https://whitebit.com/referral/2e345243-2d8f-4f32-a86b-9ac464939b32'
  },
  {
    name: 'weex',
    taker: '0.06%',
    maker: '0.02%',
    foundation: '2018',
    bonuses: {
      en: 'For New Users: 50,000U, futures bonus of 5-100 USDT, Trading Battle: Win $5,000',
      ru: 'Для новых пользователей: 50 000U, фьючерсный бонус от 5 до 100 USDT, Битва трейдеров: Выиграйте до 5000 долларов'
    },
    score: '2.67 from 6 votes',
    link: ''
  },
  {
    name: 'hotcoin',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2017',
    bonuses: {
      en: 'Complete tasks at the reward center and receive vouchers for a futures trading rebate of 5% and vouchers for 100 USDT.',
      ru: 'Выполняйте задания в центре наград и получайте ваучеры на скидку при торговле фьючерсами в 5%, и ваучеры на 100 USDT'
    },
    score: '2.75 from 4 votes',
    link: 'https://hotcoin.com/register?icCode=a727c7b&hotcoinid=1'
  },
  {
    name: 'trbinance',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2017',
    bonuses: {
      en: 'Invite Your Friends to the Crypto World and share the 50,000 USDT Prize Pool!',
      ru: 'Пригласите своих друзей в мир криптовалюты и разделите призовой фонд в 50 000 USDT!'
    },
    score: '2.6 from 5 votes',
    link: ''
  },
  {
    name: 'bitrue',
    taker: '0.098%',
    maker: '0.098%',
    foundation: '2017',
    bonuses: {
      en: 'Complete tasks in the reward center and get bonuses',
      ru: 'Выполняйте задания в центре наград и получайте награды'
    },
    score: '2.6 from 5 votes',
    link: 'https://www.bitrue.com/activity/kol/landing?cn=600000&inviteCode=WQHQTET'
  },
  {
    name: 'coinone',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2014',
    bonuses: {
      en: `Invite friends and get rewards: 10,000 won and 20% for each friend's transaction`,
      ru: 'Приглашайте друзей и получайте особые награды: 10 000 вон и 20% за каждую транзакию друга'
    },
    score: '2.8 from 5 votes',
    link: ''
  },
  {
    name: 'indoex',
    taker: '0.15%',
    maker: '0.15%',
    foundation: '2019',
    bonuses: {
      en: 'Participate in various trading competitions and win rewards',
      ru: 'Участвуйте в различных соревнованиях трейдеров и выигрываете награды'
    },
    score: '2.8 from 5 votes',
    link: ''
  },
  {
    name: 'dcoin',
    taker: '0.20%',
    maker: '0.20%',
    foundation: '2018',
    bonuses: {
      en: 'Complete Task to Claim 205USDT as a reward',
      ru: 'Выполните задание, чтобы получить 205 USDT в качестве награды.'
    },
    score: '2.6 from 5 votes',
    link: 'https://www.dcoin.com/register?iv=EH54ZE'
  },
  {
    name: 'pionex',
    taker: '0.05%',
    maker: '0.05%',
    foundation: '2019',
    bonuses: {
      en: 'Trial fund 1288 to all new users',
      ru: 'Пробный фонд 1288 всем новым пользователям'
    },
    score: '2.5 from 6 votes',
    link: 'https://www.pionex.com/ru/sign/ref/VT0idaMb'
  },
  {
    name: 'coinw',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2017',
    bonuses: {
      en: 'Complete tasks and receive USDT to your account',
      ru: 'Выполняйте задания и получайте USDT на свой счёт'
    },
    score: '3 from 4 votes',
    link: 'https://www.coinw.com/front/invitePublicity?r=2208036&language=ru_RU'
  },
  {
    name: 'tapbit',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2021',
    bonuses: {
      en: 'Complete tasks and take up to 320 USDT',
      ru: 'Выполняйте задания и получайте до 320 USDT'
    },
    score: '2.6 from 5 votes',
    link: 'https://www.tapbit.com/auth/JYJGGSK'
  },
  {
    name: 'xt',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2018',
    bonuses: {
      en: 'Bitcoin Pizza Day participate in other campaigns and win bonuses and coupons for USDT and other rewards',
      ru: 'День биткоин-пиццы учавствуйте и в других кампаниях и выигрываете бонусы и купоны на USDT и другие награды'
    },
    score: '3.17 from 6 votes',
    link: 'https://www.xt.com/ru/accounts/register?ref=EVPYKA'
  },
  {
    name: 'paribu',
    taker: '0.35%',
    maker: '0.35%',
    foundation: '2017',
    bonuses: {
      en: `Trade on one of Turkey's most popular exchanges`,
      ru: 'Торгуйте на одной из самых популярных Турецких бирж'
    },
    score: '2.6 from 5 votes',
    link: ''
  },
  {
    name: 'indodax',
    taker: '0.30%',
    maker: '0.00%',
    foundation: '2014',
    bonuses: {
      en: 'Get rewards from it every day and stake-unstake your coins anytime you want',
      ru: 'Получайте от него награды каждый день и стейкайте свои монеты в любое время, когда захотите.'
    },
    score: '2.6 from 5 votes',
    link: ''
  },
  {
    name: 'bitpanda',
    taker: '1.49%',
    maker: '1.29%',
    foundation: '2014',
    bonuses: {
      en: 'Tell a friend about Bitpanda and earn up to €100 each',
      ru: 'Расскажите другу о Bitpanda и заработайте до 100 евро каждый'
    },
    score: '2.83 from 6 votes',
    link: 'https://www.bitpanda.com/en?utm_referrer=https://www.google.com/#'
  },
  {
    name: 'fameex',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2018',
    bonuses: {
      en: 'Sign up to win 1000 usdt, complite tasks',
      ru: 'Зарегистрируйтесь, чтобы выиграть 1000 долларов США, выполняйте задания'
    },
    score: '2.67 from 6 votes',
    link: 'https://www.fameex.com/en-US/commissiondispense?code=VCV5CV&language=en-US'
  },
  {
    name: 'txbit',
    taker: '0.2%',
    maker: '0.2%',
    foundation: '2019',
    bonuses: {
      en: 'Referral program: you get 25% of the trading commission from your friend',
      ru: 'Реферальная программа: вы получаете 25% от торговой комиссии, вашего друга'
    },
    score: '3 from 6 votes',
    link: 'https://txbit.io/?r=7c687'
  },
  {
    name: 'tokocrypto',
    taker: '0.1%',
    maker: '0.1%',
    foundation: '2018',
    bonuses: {
      en: 'Complete daily missions to earn FREE TKO every day!',
      ru: 'Выполняйте ежедневные миссии, чтобы зарабатывать БЕСПЛАТНЫЕ TKO каждый день!'
    },
    score: '2.67 from 6 votes',
    link: 'https://www.tokocrypto.com/account/signup?ref=AYL5M254'
  },
  {
    name: 'bitvavo',
    taker: '0.25%',
    maker: '0.15%',
    foundation: '2018',
    bonuses: {
      en: 'The off-chain staking services gives you the option to earn rewards!',
      ru: 'Стейкинг вне цепочки позволяют вам зарабатывать вознаграждения!'
    },
    score: '2.83 from 6 votes',
    link: 'https://bitvavo.com/invite?a=28550039B8'
  },
  {
    name: 'deepcoin',
    taker: '0.04%',
    maker: '0.02%',
    foundation: '2018',
    bonuses: {
      en: 'Complete tasks to earn rewards!',
      ru: 'Выполняйте задания, чтобы получать награды!'
    },
    score: '2.83 from 6 votes',
    link: ''
  },
  {
    name: 'coincheck',
    taker: '0.00%',
    maker: '0.00%',
    foundation: '2012',
    bonuses: {
      en: 'Rebate program: receive a rebate on leveraged trading',
      ru: 'Программа скидок: получайте скидку на торговлю с кредитным плечом'
    },
    score: '2.71 from 7 votes',
    link: ''
  },
  {
    name: 'dex-trade',
    taker: '0.2%',
    maker: '0.1%',
    foundation: '2017',
    bonuses: {
      en: 'Follow simple conditions and get free Satoxcoins',
      ru: 'Выполните простые условия и получите бесплатные монеты Satoxcoin'
    },
    score: '2.83 from 6 votes',
    link: 'https://dex-trade.com/refcode/ay4iem'
  },
  {
    name: 'bitstamp',
    taker: '0.5%',
    maker: '0.5%',
    foundation: '2011',
    bonuses: {
      en: 'Earn and get bonuses for Crypto Staking and Lending',
      ru: 'Зарабатывайте и получайте бонусы за стейкинг и кредитование криптовалюты'
    },
    score: '2.88 from 8 votes',
    link: ''
  },
  {
    name: 'bit2me',
    taker: '0.26%',
    maker: '0.16%',
    foundation: '2014',
    bonuses: {
      en: 'Get rewards by staking your cryptocurrencies in an easy and secure way.',
      ru: 'Получайте вознаграждение, стейкая свои криптовалюты простым и безопасным способом.'
    },
    score: '2.89 from 9 votes',
    link: 'https://bit2me.com/join?ref=IX1-1YO-G6N&mkt_kind=referral&prm=5DH100'
  },
  {
    name: 'novadax',
    taker: '0.5%',
    maker: '0.5%',
    foundation: '2018',
    bonuses: {
      en: 'Earn points and get a commission discount',
      ru: 'Зарабатывайте баллы и получайте скидку на комиссию'
    },
    score: '2.63 from 8 votes',
    link: 'https://novadax.info/2QYB7GH2dnpYudo79'
  },
  {
    name: 'bitay',
    taker: '0.28%',
    maker: '0.2%',
    foundation: '2018',
    bonuses: {
      en: 'gift up to 250 tl special for your first deposit',
      ru: 'подарок до 250 турецких лир на первый депозит'
    },
    score: '2.55 from 11 votes',
    link: ''
  }
]
const infoRows = computed(() => rowsData.map((item) => { return { ...item, bonuses: item.bonuses[locale.value] } }))
</script>

<style lang="scss" scoped>
.table{
    &__title{
        margin-bottom: 24px;
    }
    &__content{
        max-width: 100%;
        overflow-x: auto;
        thead{
            width: 100%;
            height: 52px;
            background: var(--bg-table);
        }
        tbody{
            tr{
                height: 60px;
                border-top: 1px solid #000;
                background: var(--box-color);
            }
        }
        tr{
            @include text-xs-mixin;
            th{
                min-width: 160px;
                padding: 8px 20px;
                &:first-child{
                    border-radius: 16px 0px 0px 0px;
                }
                &:last-child{
                    border-radius: 0px 16px 0px 0px;
                }
            }
            td{
                text-align: center;
                min-width: 160px;
                padding: 16px 20px;
            }
            .wide{
                min-width: 200px;
            }
        }
    }
}
</style>
