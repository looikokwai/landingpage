import React, { useMemo } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LanguageIcon from '@mui/icons-material/Language'
import PeopleIcon from '@mui/icons-material/People'
import PaidIcon from '@mui/icons-material/Paid'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Icon Mapper - 使用 useMemo 优化图标渲染
const IconMapper = React.memo(({ iconName, className }) => {
    const iconStyle = useMemo(() => ({ className }), [className]);

    const icons = useMemo(() => ({
        dashboard: <DashboardIcon {...iconStyle} />,
        website: <LanguageIcon {...iconStyle} />,
        users: <PeopleIcon {...iconStyle} />,
        transaction: <PaidIcon {...iconStyle} />,
        gamepad: <SportsEsportsIcon {...iconStyle} />,
        admin: <AdminPanelSettingsIcon {...iconStyle} />,
        shield: <SecurityIcon {...iconStyle} />,
        settings: <SettingsIcon {...iconStyle} />,
        assignment: <AssignmentIcon {...iconStyle} />,
        default: <ChevronRightIcon {...iconStyle} />,
    }), [iconStyle]);

    return icons[iconName] || icons.default;
});

IconMapper.displayName = 'IconMapper'

export default IconMapper
