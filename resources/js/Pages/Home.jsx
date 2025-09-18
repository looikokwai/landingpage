import React from 'react'
import SEOHead from '../Components/SEOHead'
import BannerSection from '../Components/UserComponents/BannerSection'
import MarqueeWelcome from '../Components/UserComponents/MarqueeWelcome'
import GameSections from '../Components/UserComponents/GameSections'
import HowToRegister from '../Components/UserComponents/HowToRegister'
import WinnersLeaderboard from '../Components/UserComponents/WinnersLeaderboard'
import SQueenSeoContent from '../Components/UserComponents/SQueenSeoContent'
import PartnershipSections from '../Components/UserComponents/PartnershipSections'
import Testimonial from '../Components/UserComponents/Testimonial'
import FooterSeo from '../Components/UserComponents/FooterSeo'
import CTABanner from '../Components/UserComponents/CTABanner'





export default function Home({ seo, marqueeTexts, bannerImages, winnersData, gameSections }) {
  // 转换获奖者数据格式以匹配组件期望的格式
  const winnersLeaderboardData = {
    0: winnersData?.latest_winner?.map(item => ({
      game: item.game_name,
      player: item.player_name,
      bet: `RM ${parseFloat(item.bet_amount).toFixed(2)}`,
      multiplier: item.multiplier,
      winning: `+RM ${parseFloat(item.winning_amount).toFixed(2)}`,
      bg: item.background_color || '#f5f5f5'
    })) || [],
    1: winnersData?.high_roller?.map(item => ({
      game: item.game_name,
      player: item.player_name,
      bet: `RM ${parseFloat(item.bet_amount).toFixed(2)}`,
      multiplier: item.multiplier,
      winning: `+RM ${parseFloat(item.winning_amount).toFixed(2)}`,
      bg: item.background_color || '#f5f5f5'
    })) || [],
    2: winnersData?.wager_contest?.map(item => ({
      game: item.game_name,
      player: item.player_name,
      bet: `RM ${parseFloat(item.bet_amount).toFixed(2)}`,
      multiplier: item.multiplier,
      winning: `+RM ${parseFloat(item.winning_amount).toFixed(2)}`,
      bg: item.background_color || '#f5f5f5'
    })) || [],
  }
  return (
    <>
      <SEOHead {...seo} />
      <BannerSection bannerImages={bannerImages} />
      <MarqueeWelcome marqueeTexts={marqueeTexts} />
      <HowToRegister />
      <GameSections gameSections={gameSections} />
      <WinnersLeaderboard data={winnersLeaderboardData} />
      <SQueenSeoContent />
      <PartnershipSections />
      <Testimonial />
      <FooterSeo />
      <CTABanner />
    </>
  )
}
