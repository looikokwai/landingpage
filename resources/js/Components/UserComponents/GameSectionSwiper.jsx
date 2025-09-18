import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { Box, Container, Typography, Card, CardMedia, CardContent, Button, useTheme, useMediaQuery, Chip } from '@mui/material'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

const GameSectionSwiper = ({ title, games, displayDetails = true, isPartnership = false }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Container maxWidth='lg'>
      <Typography
        variant='h4'
        component='h2'
        align='left'
        gutterBottom
        sx={{
          mb: 1,
          pt: 1,
          fontWeight: 700,
          fontSize: { xs: '18px', md: '20px' },
          color: '#a90000',
        }}
      >
        {title}
      </Typography>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={isPartnership ? 20 : 15}
        slidesPerView={isPartnership ? 2 : 2.5}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        loop={!isPartnership}
        breakpoints={isPartnership ? {
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 60,
          },
        } : {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        style={{ paddingBottom: '10px' }}
      >
        {games.map((game, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              {/* 游戏图片容器 */}
              <Box sx={{ position: 'relative', mb: 1 }}>
                <CardMedia
                  component='img'
                  image={game.image}
                  alt={game.name}
                  sx={{
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* RTP 标签 */}
                {displayDetails && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 5,
                      left: 5,
                      backgroundColor: '#ff0000',
                      color: '#ffffff',
                      borderRadius: '5px',
                      padding: '4px 14px',
                      fontSize: '10px',
                      fontWeight: 700,
                      boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                    }}
                  >
                    {game.rtp}
                  </Box>
                )}
              </Box>

              {/* 游戏信息 */}
              {displayDetails && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#000000',
                      lineHeight: '17px',
                    }}
                  >
                    {game.name}
                  </Typography>

                  {/* 状态标签 */}
                  {game.status !== 'none' && (
                    <Box
                      sx={{
                        backgroundColor: game.status === 'hot' ? '#ff0000' : '#a90000', // hot: 鲜红色, new: 暗红色
                        color: '#ffffff',
                        borderRadius: '100px',
                        padding: '3px 8px 5px',
                        fontSize: '10px',
                        fontWeight: 700,
                        ml: 1,
                        textTransform: 'uppercase',
                      }}
                    >
                      {game.status}
                    </Box>
                  )}
                </Box>
              )}

              {/* 开发商名称 */}
              {displayDetails && (
                <Typography
                  variant='body2'
                  sx={{
                    opacity: 0.5,
                    fontSize: '12px',
                    color: '#000000',
                    lineHeight: '15px',
                  }}
                >
                  {game.provider}
                </Typography>
              )}
            </Box>
          </SwiperSlide>
        ))}

        {/* 自定义导航按钮 */}
        {!isMobile && (
          <>
            <Box
              className='swiper-button-prev'
              sx={{
                backgroundImage: 'url("/images/icons/arrow-left.svg") !important',
                backgroundRepeat: 'no-repeat !important',
                backgroundPosition: 'center !important',
                backgroundSize: '40px 40px !important',
                width: '40px !important',
                height: '40px !important',
                backgroundColor: 'white !important',
                borderRadius: '50% !important',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15) !important',
                transition: 'all 0.3s ease !important',
                '&:hover': {
                  transform: 'scale(1.1) !important',
                },
              }}
            />
            <Box
              className='swiper-button-next'
              sx={{
                backgroundImage: 'url("/images/icons/arrow-right.svg") !important',
                backgroundRepeat: 'no-repeat !important',
                backgroundPosition: 'center !important',
                backgroundSize: '40px 40px !important',
                width: '40px !important',
                height: '40px !important',
                backgroundColor: 'white !important',
                borderRadius: '50% !important',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15) !important',
                transition: 'all 0.3s ease !important',
                '&:hover': {
                  transform: 'scale(1.1) !important',
                },
              }}
            />
          </>
        )}
      </Swiper>

      {/* Custom pagination styles applied via CSS injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .swiper-pagination {
            bottom: 10px !important;
          }

          .swiper-pagination-bullet {
            background: ${theme.palette.primary.main} !important;
            opacity: 0.3 !important;
          }

          .swiper-pagination-bullet-active {
            opacity: 1 !important;
          }
        .swiper-button-next::after, .swiper-button-prev::after {
        display: none !important;
        }
        .swiper-button-next svg, .swiper-button-prev svg {
            display: none !important;
        }        `,
        }}
      />
    </Container>
  )
}

export default GameSectionSwiper
