import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Stack, Toolbar, Tooltip } from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';

import { useHotKeysDialog } from '@/sections/HotKeys/hooks';
import { useSidebar } from '@/sections/Sidebar/hooks';
import { useThemeMode } from '@/theme';

import { HotKeysButton } from './styled';
import { getRandomJoke } from './utils';

function Header() {
  const { themeMode, toggle: toggleThemeMode } = useThemeMode();
  const { open: openSidebar } = useSidebar();
  const { open: openHotKeysDialog } = useHotKeysDialog();
  const notifications = useNotifications();

  function showNotification() {
    notifications.show(getRandomJoke(), {
      autoHideDuration: 5000,
    });
  }

  function handleLogout() {
    // Remove access token from localStorage
    localStorage.removeItem('accessKey');
    localStorage.removeItem('refreshKey');

    console.log('User logged out');
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={2}
      data-pw={`theme-${themeMode}`}
      enableColorOnDark
    >
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flex={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="info"
              aria-label="menu"
              onClick={openSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={showNotification} color="info">
              Giá vàng
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Tooltip title="Hot keys" arrow>
              <HotKeysButton
                size="small"
                variant="outlined"
                aria-label="open hotkeys dialog"
                onClick={openHotKeysDialog}
              >
                alt + k
              </HotKeysButton>
            </Tooltip>

            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="info"
                edge="end"
                size="large"
                onClick={toggleThemeMode}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>

            <Button onClick={handleLogout} color="info" variant="outlined">
              Logout
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
