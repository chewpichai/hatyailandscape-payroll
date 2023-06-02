import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";

const pages = [
  ["employee", "พนักงาน"],
  ["payroll", "ค่าจ้าง"],
];

const adminPages = [
  ["bonus", "โบนัส"],
  ["user", "ผู้ใช้งาน"],
];

function ResponsiveAppBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const auth = useAuth();
  const [menus, setMenus] = useState<string[][]>();

  useEffect(() => {
    if (auth?.user?.type === "admin") setMenus(pages.concat(adminPages));
    else setMenus(pages);
  }, [auth?.user]);

  function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleCloseNavMenu(page: string) {
    router.push(`/${page}`);
    setAnchorElNav(null);
  }

  return (
    <AppBar position="static" className="bg-white mb-8">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            {auth?.user ? (
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon color="primary" />
              </IconButton>
            ) : (
              "&nbsp;"
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              {menus?.map(([page, label]) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "flex", sm: "none" }, flexGrow: 1 }}>
            <Logo />
          </Box>

          <Box
            className="ml-2"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            {auth?.user ? (
              <>
                {menus?.map(([page, label]) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ my: 2, display: "block" }}
                  >
                    {label}
                  </Button>
                ))}
              </>
            ) : (
              ""
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auth?.user ? (
              <Button onClick={auth?.logout}>ออกจากระบบ</Button>
            ) : (
              "&npsp;"
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.webp" alt="Hatyai Landscape" width={50} height={50} />
    </Link>
  );
}

export default ResponsiveAppBar;
