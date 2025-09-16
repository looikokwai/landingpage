import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card as MuiCard,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CasinoIcon from '@mui/icons-material/Casino'

export default function WinnersLeaderboard({ data }) {
  const [activeTab, setActiveTab] = React.useState(0)
  const theme = useTheme()

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // 标签配置
  const tabs = [
    { id: 0, label: 'Latest Winner', icon: <EmojiEventsIcon /> },
    { id: 1, label: 'High Roller', icon: <TrendingUpIcon /> },
    { id: 2, label: 'Wager Contest', icon: <CasinoIcon /> }
  ]

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Title outside the card */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontSize: '25px',
          fontWeight: 700,
          color: '#a90000',
          fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          lineHeight: '30px',
          mb: 3,
        }}
      >
        Latest Winners & Leaderboard
      </Typography>

      <MuiCard sx={{
        boxShadow: 'none',
        borderRadius: 0,
        border: '1px solid #e0e0e0'
      }}>
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {/* Tab Navigation */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
                p: 2,
                backgroundColor: '#f5f5f5',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, md: 0 },
              }}
            >

              {/* Tab Navigation */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  backgroundColor: '#f5f5f5',
                  flexDirection: { xs: 'column', sm: 'row' },
                  width: { xs: '100%', md: 'auto' },
                  p: 1,
                }}
              >
                {tabs.map((tab) => (
                  <Box
                    key={tab.id}
                    onClick={() => handleTabChange(null, tab.id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '10px',
                      backgroundColor: activeTab === tab.id ? '#d9d9d9' : 'transparent',
                      padding: '17px 20px 16px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      mx: 0.5
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: activeTab === tab.id ? 700 : 400,
                        color: '#000000',
                        fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {tab.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Data Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 0 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#d9d9d9' }}>
                    <TableCell sx={{
                      fontWeight: 700,
                      color: '#000000',
                      fontSize: '14px',
                      fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                    }}>
                      Game
                    </TableCell>
                    <TableCell sx={{
                      fontWeight: 700,
                      color: '#000000',
                      fontSize: '14px',
                      fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                    }}>
                      Player
                    </TableCell>
                    <TableCell sx={{
                      fontWeight: 700,
                      color: '#000000',
                      fontSize: '14px',
                      fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                    }}>
                      Bet Amount
                    </TableCell>
                    <TableCell sx={{
                      fontWeight: 700,
                      color: '#000000',
                      fontSize: '14px',
                      fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                    }}>
                      Multiplier
                    </TableCell>
                    <TableCell sx={{
                      fontWeight: 700,
                      color: '#000000',
                      fontSize: '14px',
                      fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                    }}>
                      Winning
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data[activeTab].map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: row.bg || (index % 2 === 0 ? '#ffffff' : '#f9f9f9'),
                      }}
                    >
                      <TableCell sx={{
                        fontSize: '14px',
                        color: '#000000',
                        fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                      }}>
                        {row.game}
                      </TableCell>
                      <TableCell sx={{
                        fontSize: '14px',
                        color: '#000000',
                        fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                      }}>
                        {row.player}
                      </TableCell>
                      <TableCell sx={{
                        fontSize: '14px',
                        color: '#000000',
                        fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                      }}>
                        {row.bet}
                      </TableCell>
                      <TableCell sx={{
                        fontSize: '14px',
                        color: '#000000',
                        fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                      }}>
                        {row.multiplier}
                      </TableCell>
                      <TableCell sx={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#000000',
                        fontFamily: 'Montserrat, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                      }}>
                        {row.winning}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </MuiCard>
    </Container>
  )
}
