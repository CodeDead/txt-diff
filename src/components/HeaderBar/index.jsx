import React from 'react';
import {
  Container,
  Group,
  Burger,
  Title,
  useMantineColorScheme,
  Tooltip,
  Drawer,
  ScrollArea,
  Divider,
  rem,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconSunOff } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router';
import classes from './headerbar.module.css';

const HeaderBar = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure(false);
  const { pathname } = useLocation();

  /**
   * Change the color scheme
   */
  const changeTheme = () => {
    toggleColorScheme();
  };

  return (
    <Container size="xl" className={classes.inner}>
      <Title
        order={1}
        style={{ cursor: 'pointer' }}
        renderRoot={(props) => (
          <Link
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
            {...props}
          />
        )}
      >
        txt-diff
      </Title>
      <Group gap={5} visibleFrom="xs">
        <Link
          to="/"
          className={classes.link}
          data-active={pathname === '/' ? true : undefined}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={classes.link}
          data-active={pathname === '/about' ? true : undefined}
        >
          About
        </Link>
        <a
          href="https://codedead.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Privacy
        </a>
        <a
          href="https://codedead.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Contact
        </a>
      </Group>

      <Tooltip label="Light">
        <ActionIcon
          aria-label="Theme"
          variant="subtle"
          onClick={changeTheme}
          lightHidden
          visibleFrom="xs"
        >
          <IconSun style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Dark">
        <ActionIcon
          aria-label="Theme"
          variant="subtle"
          onClick={changeTheme}
          darkHidden
          visibleFrom="xs"
        >
          <IconSunOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>

      <Burger
        aria-label="Burger menu"
        opened={opened}
        onClick={toggle}
        hiddenFrom="xs"
        size="sm"
      />
      <Drawer
        opened={opened}
        onClose={() => toggle()}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Link
            to="/"
            className={classes.link}
            data-active={pathname === '/' ? true : undefined}
            onClick={toggle}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={classes.link}
            data-active={pathname === '/about' ? true : undefined}
            onClick={toggle}
          >
            About
          </Link>
          <a
            href="https://codedead.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
            onClick={toggle}
          >
            Contact
          </a>
          <a
            href="https://codedead.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
            onClick={toggle}
          >
            Privacy
          </a>
        </ScrollArea>
      </Drawer>
    </Container>
  );
};

export default HeaderBar;
