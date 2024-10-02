import { useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { menuIcon, gridIcon, globeIcon, gearIcon, mapMarkerIcon } from '@progress/kendo-svg-icons';
import AvatarIcon from '@/assets/avatar.png'

export const items = [
  {
    text: 'Dashboard',
    selected: true,
    route: '/',
    svgIcon: gridIcon
  },
  { separator: true },
  {
    text: 'Performance',
    selected: false,
    route: '/performance',
    svgIcon: globeIcon
  },
  { separator: true },
  {
    text: 'Floor Plan',
    selected: false,
    route: '/floor-plan',
    svgIcon: mapMarkerIcon
  },
  { separator: true },
  {
    text: 'Settings',
    selected: false,
    route: '/settings',
    svgIcon: gearIcon,
  }
];

const DrawerContainer = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const handleClick = () => setExpanded(!expanded);

  const onSelect = (e: any) => navigate(e.itemTarget.props.route);

  const setSelectedItem = (pathName: any) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath && currentPath.text) {
      return currentPath.text;
    }
  };

  const selected = setSelectedItem(location.pathname);

  return (
    <div>
      <div className="custom-toolbar">
        <Button svgIcon={menuIcon} onClick={handleClick} />
        <span className="overview">{selected === 'Dashboard' ? 'Dashboard' : selected}</span>
      </div>
      <div>
        <div className='user-container mb-3' >
          <img src={AvatarIcon} alt="user avatar" />
          <h1>John Doe</h1>
          <div className="user-email">johndoe@neogen.com</div>
        </div>
        <Drawer
          expanded={expanded}
          position={'start'}
          mode={'push'}
          width={240}
          items={items.map((item) => ({
            ...item,
            selected: item.text === selected,
          }))}
          onSelect={onSelect}
          className="drawer"
        >
          <DrawerContent style={{ height: '100vh' }}>
            {props.children}
            <Outlet /> 
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default DrawerContainer;