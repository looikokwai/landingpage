import React from 'react'
import { Box, Typography, Container, Grid } from '@mui/material'
import { desktopViewColors } from '../../theme'

const Testimonial = () => {
  // 用户评价数据
  const testimonials = [
    {
      title: 'Super fast withdrawals',
      content: 'SQueen VIP withdrawal is super fast. I was able to withdrawal my winning within 15 minutes. Thanks to the winning from SQueen VIP. I managed to settle my outstanding housing loan',
      rating: 5
    },
    {
      title: 'Highest payout you can get every!',
      content: 'The best platform I\'ve experienced! SQueen VIP has the highest payout rate and the most rewarding promotions',
      rating: 5
    },
    {
      title: 'The crypto casino of my choice',
      content: 'My experience of depositing and withdrawing cryptocurrency with SQueen VIP has been very smooth. Others Platforms have no such option for cryptocurrency.',
      rating: 5
    }
  ]

  // 生成星级评分
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Typography
        key={index}
        component="span"
        sx={{
          color: index < rating ? '#f5c600' : '#d9d9d9',
          fontSize: '16px',
          fontFamily: '"Font Awesome 5 Free", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
        }}
      >
        ★
      </Typography>
    ))
  }

  // 推荐卡片组件
  const TestimonialCard = ({ testimonial }) => (
    <Box
      sx={{
        height: '280px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid #e0e0e0'
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#000000',
            fontSize: { xs: '16px', md: '18px' },
            mb: 2,
            lineHeight: 1.3
          }}
        >
          {testimonial.title}
        </Typography>

        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: { xs: '12px', md: '14px' },
            fontWeight: 500,
            lineHeight: 1.5,
            mb: 2
          }}
        >
          {testimonial.content}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {renderStars(testimonial.rating)}
      </Box>
    </Box>
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 标题 */}
      <Typography
        variant="h4"
        sx={{
          color: desktopViewColors.primary.red,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: { xs: '20px', md: '25px' },
          fontWeight: 700,
          mb: 4,
          textAlign: 'left'
        }}
      >
        Testimonials:
      </Typography>

      {/* 推荐内容网格 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {testimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <TestimonialCard testimonial={testimonial} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Testimonial
