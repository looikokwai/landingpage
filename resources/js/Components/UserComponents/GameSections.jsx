import React from 'react'
import GameSectionSwiper from './GameSectionSwiper'

const GameSections = () => {
  const popularGamesData = [
    {
      image: '/images/games/slot-1.png',
      name: 'Gates of Olympus',
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'New',
    },
    {
      image: '/images/games/slot-2.png',
      name: 'Gates of Olympus 1000',
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'New',
    },
    {
      image: '/images/games/slot-3.png',
      name: '5 Lions Megaway',
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'Hot',
    },
    {
      image: '/images/games/slot-4.png',
      name: "Caishen's Cash",
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'New',
    },
    {
      image: '/images/games/slot-5.png',
      name: '5 Lions Megaway',
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'Hot',
    },
    {
      image: '/images/games/slot-6.png',
      name: '5 Lions Megaway',
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'New',
    },
    {
      image: '/images/games/slot-7.png',
      name: 'Candy Village',
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'Hot',
    },
    {
      image: '/images/games/slot-1.png',
      name: 'Tree of Riches',
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'New',
    },
    {
      image: '/images/games/slot-2.png',
      name: 'Waves of Poseidon',
      provider: 'Pragmatic Play',
      rtp: 'RTP 96.36',
      status: 'Hot',
    },
    {
      image: '/images/games/slot-3.png',
      name: 'Lightning Baccarat',
      provider: 'Evolution Gaming',
      rtp: 'RTP 96.36',
      status: 'New',
    },
  ]

  const jackpotGamesData = [
    {
      image: '/images/games/slot-4.png',
      name: 'Mega Moolah',
      provider: 'Microgaming',
      rtp: 'RTP 90.00',
      status: 'Hot',
    },
    {
      image: '/images/games/slot-5.png',
      name: 'Divine Fortune',
      provider: 'NetEnt',
      rtp: 'RTP 96.59',
      status: 'New',
    },
    {
      image: '/images/games/slot-6.png',
      name: 'Hall of Gods',
      provider: 'NetEnt',
      rtp: 'RTP 95.50',
      status: 'Hot',
    },
    {
      image: '/images/games/slot-7.png',
      name: 'Major Millions',
      provider: 'Microgaming',
      rtp: 'RTP 89.37',
      status: 'New',
    },
    {
      image: '/images/games/slot-7.png',
      name: 'Major Millions',
      provider: 'Microgaming',
      rtp: 'RTP 89.37',
      status: 'New',
    },
    {
      image: '/images/games/slot-7.png',
      name: 'Major Millions',
      provider: 'Microgaming',
      rtp: 'RTP 89.37',
      status: 'New',
    },
  ]

  const liveCasinoData = [
    {
      image: '/images/games/live-1.png',
      name: 'Lightning Roulette',
      provider: 'Evolution Gaming',
      rtp: 'RTP 97.30',
      status: 'Hot',
    },
    {
      image: '/images/games/live-2.png',
      name: 'Crazy Time',
      provider: 'Evolution Gaming',
      rtp: 'RTP 96.08',
      status: 'New',
    },
    {
      image: '/images/games/live-3.png',
      name: 'Monopoly Live',
      provider: 'Evolution Gaming',
      rtp: 'RTP 96.23',
      status: 'Hot',
    },
    {
      image: '/images/games/live-4.png',
      name: 'Dream Catcher',
      provider: 'Evolution Gaming',
      rtp: 'RTP 96.58',
      status: 'New',
    },
    {
        image: '/images/games/live-4.png',
        name: 'Dream Catcher',
        provider: 'Evolution Gaming',
        rtp: 'RTP 96.58',
        status: 'New',
      },
      {
        image: '/images/games/live-4.png',
        name: 'Dream Catcher',
        provider: 'Evolution Gaming',
        rtp: 'RTP 96.58',
        status: 'New',
      },
  ]

  const paymentGatewayData = [
    {
      image: '/images/payments/payment-1.png',
      name: 'VISA',
      provider: 'Global Payments',
      rtp: 'Fast',
      status: 'New',
    },
    {
      image: '/images/payments/payment-2.png',
      name: 'MasterCard',
      provider: 'Global Payments',
      rtp: 'Fast',
      status: 'Hot',
    },
    {
      image: '/images/payments/payment-3.png',
      name: 'PayPal',
      provider: 'Online Wallets',
      rtp: 'Instant',
      status: 'New',
    },
    {
      image: '/images/payments/payment-4.png',
      name: 'Skrill',
      provider: 'Online Wallets',
      rtp: 'Instant',
      status: 'Hot',
    },
    {
      image: '/images/payments/payment-4.png',
      name: 'Skrill',
      provider: 'Online Wallets',
      rtp: 'Instant',
      status: 'New',
    },
    {
      image: '/images/payments/payment-4.png',
      name: 'Skrill',
      provider: 'Online Wallets',
      rtp: 'Instant',
      status: 'New',
    },
  ]

  const gamingProviderData = [
    {
      image: '/images/providers/provider-1.png',
      name: 'Pragmatic Play',
      provider: 'Slots',
      rtp: 'High',
      status: 'New',
    },
    {
      image: '/images/providers/provider-2.png',
      name: 'Evolution Gaming',
      provider: 'Live Casino',
      rtp: 'High',
      status: 'Hot',
    },
    {
      image: '/images/providers/provider-3.png',
      name: 'Microgaming',
      provider: 'Slots',
      rtp: 'Medium',
      status: 'New',
    },
    {
      image: '/images/providers/provider-4.png',
      name: 'NetEnt',
      provider: 'Slots',
      rtp: 'High',
      status: 'Hot',
    },
    {
      image: '/images/providers/provider-4.png',
      name: 'NetEnt',
      provider: 'Slots',
      rtp: 'High',
      status: 'New',
    },
    {
      image: '/images/providers/provider-4.png',
      name: 'NetEnt',
      provider: 'Slots',
      rtp: 'High',
      status: 'New',
    },
  ]

  return (
    <>
      <GameSectionSwiper title='Popular Games User Love of the Week' games={popularGamesData} />
      <GameSectionSwiper title='Jackpot Games Going to Break Soon' games={jackpotGamesData} />
      <GameSectionSwiper title='Best Live Casino in Town' games={liveCasinoData} />
      <GameSectionSwiper title='Payment Gateway of the Month' games={paymentGatewayData} displayDetails={false} />
      <GameSectionSwiper title='Gaming Provider & Partner' games={gamingProviderData} displayDetails={false} />
    </>
  )
}

export default GameSections
