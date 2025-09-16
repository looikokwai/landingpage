import React from 'react'
import SEOHead from '../Components/SEOHead'
import BannerSection from '../Components/UserComponents/BannerSection'
import MarqueeWelcome from '../Components/UserComponents/MarqueeWelcome'
import GameSections from '../Components/UserComponents/GameSections'
import HowToRegister from '../Components/UserComponents/HowToRegister'
import WinnersLeaderboard from '../Components/UserComponents/WinnersLeaderboard'

export default function Home({ seo }) {
  const winnersLeaderboardData = {
    0: [
      // Latest Winner
      { game: 'Gate of Olympus', player: 'Ja**g*8*', bet: 'RM  50.00', multiplier: '0.95x', winning: '+RM 97.50', bg: '#f5f5f5' },
      { game: 'Lightning Baccarat', player: 'Ev**e*e*', bet: 'RM  100.00', multiplier: '8.00x', winning: '+RM 900.00', bg: '#fdfdfd' },
      { game: 'Gate of Olympus', player: 'Ja**g*8*', bet: 'RM  50.00', multiplier: '0.95x', winning: '+RM 97.50', bg: '#f5f5f5' },
      { game: 'Lightning Baccarat', player: 'Ev**e*e*', bet: 'RM  100.00', multiplier: '8.00x', winning: '+RM 900.00', bg: '#fdfdfd' },
      { game: 'Gate of Olympus', player: 'Ja**g*8*', bet: 'RM  50.00', multiplier: '0.95x', winning: '+RM 97.50', bg: '#f5f5f5' },
    ],
    1: [
      // High Roller
      { game: 'Lightning Baccarat', player: 'Hi**R*ll*', bet: 'RM  5000.00', multiplier: '12.5x', winning: '+RM 62500.00', bg: '#f5f5f5' },
      { game: 'Gate of Olympus', player: 'Bi**W*n*', bet: 'RM  2500.00', multiplier: '15.0x', winning: '+RM 37500.00', bg: '#fdfdfd' },
      { game: 'Lightning Baccarat', player: 'Vip**Pl*', bet: 'RM  3000.00', multiplier: '10.0x', winning: '+RM 30000.00', bg: '#f5f5f5' },
      { game: 'Gate of Olympus', player: 'Lu**Ky*', bet: 'RM  1500.00', multiplier: '18.5x', winning: '+RM 27750.00', bg: '#fdfdfd' },
      { game: 'Gate of Olympus', player: 'Go**De*', bet: 'RM  2000.00', multiplier: '11.2x', winning: '+RM 22400.00', bg: '#f5f5f5' },
    ],
    2: [
      // Wager Contest
      { game: 'Gate of Olympus', player: 'Co**Te*', bet: 'RM  800.00', multiplier: '25.0x', winning: '+RM 20000.00', bg: '#f5f5f5' },
      { game: 'Lightning Baccarat', player: 'Wa**Ge*', bet: 'RM  600.00', multiplier: '30.0x', winning: '+RM 18000.00', bg: '#fdfdfd' },
      { game: 'Gate of Olympus', player: 'Ch**Mp*', bet: 'RM  500.00', multiplier: '32.0x', winning: '+RM 16000.00', bg: '#f5f5f5' },
      { game: 'Lightning Baccarat', player: 'Wi**Ne*', bet: 'RM  750.00', multiplier: '20.0x', winning: '+RM 15000.00', bg: '#fdfdfd' },
      { game: 'Gate of Olympus', player: 'Pr**Ze*', bet: 'RM  400.00', multiplier: '35.0x', winning: '+RM 14000.00', bg: '#f5f5f5' },
    ],
  }
  return (
    <>
      <SEOHead {...seo} />
      <BannerSection />
      <MarqueeWelcome />
      <HowToRegister />
      <GameSections />
      <WinnersLeaderboard data={winnersLeaderboardData} />
    </>
  )
}
