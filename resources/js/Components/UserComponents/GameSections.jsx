import React from 'react'
import GameSectionSwiper from './GameSectionSwiper'

const GameSections = ({ gameSections }) => {
  // 如果没有传入数据，返回空数组
  const sections = gameSections && gameSections.length > 0 ? gameSections : [];

  // 如果没有数据，不渲染任何内容
  if (sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => (
        <GameSectionSwiper
          key={index}
          title={section.section_name}
          games={section.games_data}
          displayDetails={section.section_type !== 'payment_gateway' && section.section_type !== 'gaming_provider'}
        />
      ))}
    </>
  )
}

export default GameSections
