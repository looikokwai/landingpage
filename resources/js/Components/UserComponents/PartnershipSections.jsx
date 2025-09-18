import React from 'react'
import GameSectionSwiper from './GameSectionSwiper'

const PartnershipSections = () => {
  // 硬编码的合作伙伴数据，转换为游戏数据格式
  const partnershipSections = [
    {
      section_name: "Our Partnership:",
      section_type: "partnership",
      games_data: [
        {
          name: "SQueen GGR",
          image: "/images/partners/1.png",
          provider: "",
          rtp: "",
          status: "none"
        },
        {
          name: "Berjavasama",
          image: "/images/partners/2.png",
          provider: "",
          rtp: "",
          status: "none"
        },
        {
          name: "Syukur GGR",
          image: "/images/partners/3.png",
          provider: "",
          rtp: "",
          status: "none"
        },
        {
          name: "Sabasson",
          image: "/images/partners/4.png",
          provider: "",
          rtp: "",
          status: "none"
        }
      ]
    }
  ]

  return (
    <>
      {partnershipSections.map((section, index) => (
        <GameSectionSwiper
          key={index}
          title={section.section_name}
          games={section.games_data}
          displayDetails={false} // 合作伙伴不需要显示详细信息
          isPartnership={true} // 标识这是合作伙伴展示
        />
      ))}
    </>
  )
}

export default PartnershipSections
