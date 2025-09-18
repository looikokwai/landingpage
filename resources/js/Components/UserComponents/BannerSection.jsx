import React from 'react'
import { Box } from '@mui/material'
import { desktopViewColors } from '../../theme'

export default function BannerSectionComponent({ bannerImages }) {
  // 如果没有数据，不渲染任何内容
  if (!bannerImages || bannerImages.length === 0) {
    return null;
  }

  // 获取第一个横幅图片作为默认背景
  const defaultBanner = bannerImages[0];

  return (
    <Box
      sx={{
        height: '400px',
        backgroundImage: defaultBanner.image_path ? `url("${defaultBanner.image_path}")` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      }}
    >
      {/* Banner Selection Dots - positioned at bottom right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 23,
          right: 311,
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {bannerImages.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: index === 0 ? 35 : 12,
              height: 12,
              borderRadius: '100px',
              backgroundColor: index === 0 ? desktopViewColors.gold.bright : 'rgba(255, 255, 255, 0.75)',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
