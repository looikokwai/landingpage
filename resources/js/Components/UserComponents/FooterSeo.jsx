import React, { useState } from 'react'
import { Box, Typography, Container, Grid, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { desktopViewColors } from '../../theme'

const FooterSeo = () => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const featureCards = [
    {
      icon: '/images/icons/security-icon.png',
      title: 'Security',
      description: 'Gaming Curacao, 2FA, 128-Encrypted'
    },
    {
      icon: '/images/icons/minimum-deposit-icon.png',
      title: 'Minimum Deposit',
      description: 'RM10 (QRPay > Pay Essence)'
    },
    {
      icon: '/images/icons/banking-icon.png',
      title: 'Banking Method',
      description: 'Quickpay, Bank Transfer, QRPay, Cryptocurrency, E-Wallet'
    },
    {
      icon: '/images/icons/bonus-icon.png',
      title: 'Bonus & Promotion',
      description: 'Welcome Bonus, Reload Bonus, Cash Back'
    }
  ]

  const faqData = [
    {
      question: 'Which online casino offers the best Top Malaysia Free Credit No Deposit Casino Games?',
      answer: 'SQUEEN VIP & Partnership is a leading choice, offering daily free credit promotions, high RTP slots, and trusted partnerships with licensed providers. Players choose it for transparency, faster payouts, and rewarding gameplay.'
    },
    {
      question: 'How can I win with Free Credit No Deposit Casino Games in Malaysia?',
      answer: 'Start by choosing licensed casinos like SQUEEN VIP & Partnership. Use free credits to test games, play high RTP slots, and manage your bankroll wisely. Bonuses can boost your chances, but discipline and strategy are key.'
    },
    {
      question: 'Is SQUEEN VIP & Partnership legal in Malaysia and Asia?',
      answer: 'Yes. SQUEEN VIP & Partnership is fully licensed under the Government of the Autonomous Island of Anjouan, Union of Comoros. It also follows international fair play standards, making it a safe and legal platform for Asian players.'
    },
    {
      question: 'What is the safest online casino for Malaysian players?',
      answer: 'The safest casinos are those with proper licensing, SSL encryption, and independent game testing. SQUEEN VIP & Partnership meets all these requirements and processes 92% of withdrawals within 15 minutes, ensuring a secure experience.'
    },
    {
      question: 'Is it safe to play with free credit no deposit offers?',
      answer: 'Yes - as long as you choose a trusted casino. Free credit is a way for licensed casinos to let you try their games. SQUEEN VIP & Partnership ensures all free credits come with transparent terms and fair withdrawal conditions.'
    },
    {
      question: 'How do I register an account with SQUEEN VIP & Partnership?',
      answer: 'Simply visit the official website, click on "Register," and fill in your details. Registration takes just minutes, and you\'ll be eligible to claim free credit no deposit promotions once verified.'
    },
    {
      question: 'What is a Welcome Bonus and how do I claim it?',
      answer: 'A Welcome Bonus is a reward given to new members on their first deposit. At SQUEEN VIP & Partnership, new players can claim exclusive free credits, slot spins, and deposit match bonuses by following the promotion\'s simple claim steps.'
    },
    {
      question: 'How can I deposit or withdraw funds at SQUEEN VIP & Partnership?',
      answer: 'Deposits and withdrawals are supported via local bank transfers, e-wallets, and cryptocurrency. On average, 92% of withdrawals are processed within 15 minutes — faster than most competitors in Malaysia.'
    },
    {
      question: 'What is the SQUEEN VIP App and how do I download it?',
      answer: 'The SQUEEN VIP App is a mobile-friendly application that lets you play Top Malaysia Free Credit No Deposit Casino Games anytime. Download directly from the official site for Android and iOS, ensuring a safe and smooth installation.'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          borderRadius: '10px',
          background: desktopViewColors.background.card,
          p: { xs: 3, md: 6 },
          minHeight: '100vh'
        }}
      >
        {/* Main Title */}
        <Typography
          sx={{
            textAlign: 'center',
            mb: 2,
            letterSpacing: 0,
            color: desktopViewColors.primary.red,
            fontSize: '25px',
            fontWeight: 700,
            lineHeight: '30px'
          }}
        >
          WHY CHOOSE SQUEEN VIP?
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            textAlign: 'center',
            mb: 4,
            letterSpacing: 0,
            color: desktopViewColors.text.primary,
            fontSize: '16px',
            lineHeight: '20px'
          }}
        >
          Welcome to SQUEEN VIP - Trusted Online Casino in Malaysia since 2012
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            textAlign: 'center',
            mb: 6,
            letterSpacing: 0,
            color: desktopViewColors.text.primary,
            fontSize: '16px',
            maxWidth: '1046px',
            mx: 'auto'
          }}
        >
          Malaysian players prefer SQUEEN VIP & Partnership for Top Malaysia Free Credit No Deposit Casino Games, offering higher RTP,
          faster withdrawals, and exclusive promos compared to Winbox, KK8, and ECLBET. With certified fair play, advanced security, and
          wider gaming options, SQUEEN VIP & Partnership ensures a safer, more rewarding experience for online casino fans nationwide.
        </Typography>

        {/* Feature Cards */}
        <Grid container spacing={3} sx={{ mb: 8, justifyContent: 'center' }}>
          {featureCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '250px',
                  width: '100%',
                  maxWidth: '240px',
                  borderRadius: '10px',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto', // 水平居中对齐
                }}
              >
                <Box sx={{ mb: 2, height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={card.icon}
                    alt={card.title}
                    style={{ width: '240px', height: '250px', objectFit: 'contain', paddingBottom: '20px' }}
                  />

                </Box>
                <Typography
                  sx={{
                    mb: 1,
                    letterSpacing: 0,
                    color: desktopViewColors.text.primary,
                    fontSize: '20px',
                    fontWeight: 700
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  sx={{
                    letterSpacing: 0,
                    color: desktopViewColors.text.primary,
                    fontSize: '16px',
                    lineHeight: 1.5
                  }}
                >
                  {card.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Licensing Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            sx={{
              mb: 2,
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '20px',
              fontWeight: 700
            }}
          >
            SQUEEN VIP & Partnership Licensing, Regulation, and Certified Fair Play
          </Typography>
          <Typography
            sx={{
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '16px',
              lineHeight: 1.6
            }}
          >
            SQUEEN VIP & Partnership is a licensed and regulated online casino, authorized by the Government of the Autonomous Island
            of Anjouan, Mega Technology Ltd, under License No. ALSI-202409020-FI2. With certifications from BMM Testlabs, iTech Labs,
            and Gaming Laboratories International (GLI), all games are tested for fairness and comply with responsible gambling frameworks.
          </Typography>
        </Box>

        {/* Competition Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            sx={{
              mb: 2,
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '20px',
              fontWeight: 700
            }}
          >
            Why Players Trust SQUEEN VIP & Partnership Over Competitors
          </Typography>
          <Typography
            sx={{
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '16px',
              lineHeight: 1.6,
              mb: 2
            }}
          >
            When it comes to Top Malaysia Free Credit No Deposit Casino Games, SQUEEN VIP & Partnership consistently outshines
            competitors like Winbox, KK8, We1Win, ECLBET, and Surewin. Players enjoy higher RTP, better odds, faster withdrawals,
            and more exclusive free credit promotions.
          </Typography>
          <Typography
            sx={{
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '16px',
              lineHeight: 1.6
            }}
          >
            While others restrict their coverage, SQUEEN VIP & Partnership provides broader sportsbook access, diverse live casino tables,
            high RTP slots, and transparent gaming practices. This commitment to fairness and player satisfaction makes SQUEEN VIP &
            Partnership one of the most reliable choices for online casino players in Malaysia. Our platform is protected with SSL
            encryption and advanced data security, ensuring safe transactions at every step. On average, 92% of withdrawals are processed
            within 15 minutes, giving players their winnings much faster compared to competing sites.
          </Typography>
        </Box>

        {/* Promotions Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            sx={{
              mb: 2,
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '20px',
              fontWeight: 700
            }}
          >
            Exclusive SQUEEN VIP & Partnership Promotions
          </Typography>
          <Typography
            sx={{
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '16px',
              lineHeight: 1.6,
              mb: 2
            }}
          >
            Kickstart your journey with the 365% "Play Free, Win Big" Welcome Bonus, offering up to MYR3,650 with a 35x turnover
            requirement. Members also receive 200 free spins on slots and ongoing seasonal rewards, such as the SQUEEN VIP Sports
            2025 Asia Cup Promotion.
          </Typography>
          <Typography
            sx={{
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '16px',
              lineHeight: 1.6
            }}
          >
            Compared to other casinos, SQUEEN VIP & Partnership stands out clearly. While SQUEEN VIP offers a 365% bonus up to MYR3,650
            and processes 92% of withdrawals in under 15 minutes across sports, live casino, slots, and crypto games - Winbox only offers
            a 150% bonus up to MYR800 with withdrawals taking two to six hours. KK8 slightly improves with a 120% bonus up to MYR1,000,
            but payouts stretch between four and twelve hours, with fewer gaming options available. This unmatched combination of free
            credit offers, generous promotions, faster payouts, and wider coverage explains why Malaysian players consistently choose
            SQUEEN VIP & Partnership for Top Malaysia Free Credit No Deposit Casino Games.
          </Typography>
        </Box>

        {/* FAQ Section */}
        <Box>
          <Typography
            sx={{
              mb: 4,
              letterSpacing: 0,
              color: desktopViewColors.text.primary,
              fontSize: '25px',
              fontWeight: 700,
              lineHeight: '30px'
            }}
          >
            Frequently Asked Questions
          </Typography>

          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                borderRadius: '20px !important',
                background: '#d9d9d9',
                boxShadow: 'none',
                '&:before': {
                  display: 'none'
                },
                '&.Mui-expanded': {
                  margin: '0 0 16px 0'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 4,
                  py: 2,
                  minHeight: '66px !important',
                  '&.Mui-expanded': {
                    minHeight: '66px !important'
                  }
                }}
              >
                <Typography
                  sx={{
                    letterSpacing: 0,
                    color: desktopViewColors.text.primary,
                    fontSize: '18px',
                    fontWeight: 700
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 4,
                  pb: 3
                }}
              >
                <Typography
                  sx={{
                    letterSpacing: 0,
                    color: desktopViewColors.text.primary,
                    fontSize: '16px',
                    lineHeight: 1.6
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default FooterSeo
