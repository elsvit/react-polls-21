import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import MenuIcon from '@material-ui/icons/Menu';
import cn from 'classnames';
import React, {useState, ReactElement} from 'react';
import {Link} from 'react-router-dom';

import {ROUTES} from '~/constants';
import './drawerWrapper.scss';

interface IDrawerItem {
  item?: {
    label: string;
    link: string;
    Icon: typeof SvgIcon;
  };
  divider?: boolean;
}

const ITEMS: IDrawerItem[] = [
  {
    item: {
      label: 'Questions',
      link: ROUTES.QUESTIONS,
      Icon: QuestionAnswer
    }
  }
];

interface IOwnProps {
  rootLink?: string;
  children: ReactElement;
}

type DraweWrapperProps = IOwnProps;

const DrawerWrapper = ({rootLink, children}:DraweWrapperProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpenMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={'drawer-wrapper'}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={cn('drawer-app-bar', {'drawer-app-bar-shift': isOpen})}
      >
        <Toolbar disableGutters={!isOpen}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleOpenMenu}
            className={cn('drawer-menu-button', {hide: isOpen})}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap className="drawer-title">
              Test App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={cn('drawer', {'drawer-open': isOpen})}
        classes={{
          paper: cn({
            'drawer-open': isOpen,
            'drawer-close': !isOpen
          })
        }}
        open={isOpen}
      >
        <div className={'drawer-toolbar'}>
          <IconButton onClick={toggleOpenMenu}>
            {!isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {ITEMS.map((i: IDrawerItem, idx: number) => {
            if (i.divider) {
              return <Divider key={idx} />;
            }

            const {item} = i;

            if (!item) {
              return null;
            }

            const DrawerIcon = item.Icon;

            return (
              <Link to={item.link} key={item.link}>
                <Tooltip title={item.label} placement="right">
                  <ListItem button selected={item.link === rootLink}>
                    <ListItemIcon>
                      <DrawerIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.label} className="drawer-item-label"/>
                  </ListItem>
                </Tooltip>
              </Link>
            );
          })}
        </List>
      </Drawer>
      <div className={'drawer-content'}>{children}</div>
    </div>
  );
};

export default DrawerWrapper;