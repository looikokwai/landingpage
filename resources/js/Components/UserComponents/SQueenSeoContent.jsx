import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { desktopViewColors } from '../../theme'

const SQueenSeoContent = () => {
  // 游戏内容数据，6个独立的游戏内容
  const gameContent = [
    {
      image: '/images/seo/seo-1.png',
      title: 'Sports Betting',
      description: 'Sports betting in Malaysia is more thrilling with SQUEEN VIP & Partnership, offering secure platforms, real-time odds, and countless markets. From football to esports, enjoy seamless play and local payment options. Plus, explore Top Malaysia Free Credit No Deposit Casino Games - your perfect way to start betting smarter, risk-free, and with confidence today.'
    },
    {
      image: '/images/seo/seo-2.png',
      title: 'Live Casino',
      description: 'Sports betting in Malaysia is more thrilling with SQUEEN VIP & Partnership, offering secure platforms, real-time odds, and countless markets. From football to esports, enjoy seamless play and local payment options. Plus, explore Top Malaysia Free Credit No Deposit Casino Games - your perfect way to start betting smarter, risk-free, and with confidence today.'
    },
    {
      image: '/images/seo/seo-3.png',
      title: 'Online Slots',
      description: 'Enjoy premium online slots with SQUEEN VIP & Partnership, Malaysia\'s trusted choice for endless spinning fun. Explore titles from top providers like Pragmatic Play, JILI, and Playtech with high RTPs, jackpots, and mobile-friendly play. Plus, discover Top Malaysia Free Credit No Deposit Casino Games - giving you risk-free spins and real chances to win.'
    },
    {
      image: '/images/seo/seo-4.png',
      title: 'Fishing',
      description: 'Dive into Fishing excitement with SQUEEN VIP & Partnership, Malaysia\'s go-to for thrilling fish shooting games. Powered by JILI, CQ9, and Spadegaming, enjoy arcade-style action, bonus rounds, and explosive rewards. Combine skill and luck while exploring Top Malaysia Free Credit No Deposit Casino Games - perfect for casual players and high rollers chasing real-money wins.'
    },
    {
      image: '/images/seo/seo-5.png',
      title: 'Lottery',
      description: 'Play Lottery with SQUEEN VIP & Partnership, Malaysia\'s trusted hub for fast draws and instant wins. Featuring QQKeno, Funky Games, and TC Gaming, enjoy secure number-based games anytime. From classic picks to digital lotteries, explore Top Malaysia Free Credit No Deposit Casino Games for risk-free fun, real-money rewards, and 24/7 entertainment.'
    },
    {
      image: '/images/seo/seo-6.png',
      title: 'Esports',
      description: 'Step into esports with SQUEEN VIP & Partnership, Malaysia\'s trusted platform for competitive gaming bets. Powered by TF Gaming and IM Esports, wager on Dota 2, Valorant, CS:GO, and more with live odds and fast updates. Plus, explore Top Malaysia Free Credit No Deposit Casino Games - giving you risk-free play and real winning chances.'
    }
  ]

  return (
    <Container maxWidth='lg' sx={{ py: 6, backgroundColor: '#fdfdfd' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* 主标题 */}
        <Typography
          sx={{
            lineHeight: '39px',
            letterSpacing: 0,
            color: '#a90000',
            fontSize: { xs: '24px', md: '32px' },
            fontWeight: 700,
            mb: 3
          }}
        >
          SQUEEN VIP: Malaysia Top Free Credit No Deposit Casino Games
        </Typography>

        {/* 描述文本 */}
        <Typography
          sx={{
            textAlign: 'center',
            letterSpacing: 0,
            color: '#000000',
            fontSize: { xs: '14px', md: '16px' },
            mb: 4,
            px: 2
          }}
        >
        Find top casino games at SQUEEN VIP with Free Credit No Deposit. Start
        playing slot free credit games today with no upfront cost in Malaysia.
        <br />
        <br />
          At SQUEEN VIP, players in Malaysia can explore one of the widest selections
          of top-rated online casino games in 2025. From high-quality online slots and
          immersive live dealer games to classic table games like blackjack, roulette,
          and baccarat - SQUEEN VIP & PARTNERSHIP delivers an unmatched gaming
          experience. All games are powered by leading providers, ensuring fairness,
          fast loading times, and mobile compatibility. Whether you're chasing big
          jackpots or just looking to unwind, SQUEEN VIP & PARTNERSHIP has the perfect
          game for every type of player.
        </Typography>

        {/* 游戏内容区域 - 6个独立游戏内容，3行2列布局 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, md: 3 },
            mt: 4
          }}
        >
          {gameContent.map((content, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                textAlign: 'start'
              }}
            >
              {/* 图片 */}
              {content.image ? (
                <Box
                  component="img"
                  src={content.image}
                  sx={{
                    borderRadius: '15px',
                    width: { xs: '100%', md: '500px' },
                    height: { xs: '200px', md: '250px' },
                    objectFit: 'cover',
                    mb: 2
                  }}
                />
              ) : (
                <Box
                  sx={{
                    borderRadius: '15px',
                    background: '#d9d9d9',
                    width: { xs: '100%', md: '500px' },
                    height: { xs: '200px', md: '250px' },
                    mb: 2
                  }}
                />
              )}

              {/* 文本内容 */}
              <Box
                sx={{
                  width: { xs: '100%', md: '500px' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  mb: 3
                }}
              >
                <Typography
                  sx={{
                    letterSpacing: 0,
                    color: '#000000',
                    fontSize: { xs: '18px', md: '20px' },
                    fontWeight: 700,
                    mb: 2
                  }}
                >
                  {content.title}
                </Typography>
                <Typography
                  sx={{
                    letterSpacing: 0,
                    color: '#000000',
                    fontSize: { xs: '14px', md: '16px' },
                    lineHeight: '24px'
                  }}
                >
                  {content.description}
                </Typography>
              </Box>

              {/* 每个游戏独立的按钮 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '100px',
                  background: '#f5c600',
                  padding: '12px 16px 13px 17px',
                  cursor: 'pointer'
                }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    letterSpacing: 0,
                    color: '#000000',
                    fontSize: { xs: '16px', md: '18px' },
                    fontWeight: 800
                  }}
                >
                  Play Now
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default SQueenSeoContent
