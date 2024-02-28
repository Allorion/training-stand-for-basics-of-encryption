import React, {FC} from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import CreatingRoomTemplate from "../creating-room/CreatingRoomTemplate";
import ConnectingToRoomTemplate from "../connecting-to-room/ConnectingToRoomTemplate";
import {generateRSAKeys} from "../../functions/rsa/generateRSAKeys";
import AddStateGostkey from "../../functions/gost/AddStateGostKey";

interface IProps {

}

const NavBar: FC<IProps> = ({}) => {

    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCreateKeyRSA = () => {
        generateRSAKeys()
    }

    return (
        <AppBar position="static" className={'nav-bar'} sx={{zIndex: 999, position: 'fixed'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem onClick={() => {
                                navigate('/')
                            }}>
                                <Typography textAlign="center">Главная</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                navigate('/list-rooms/')
                            }}>
                                <Typography textAlign="center">Комнаты</Typography>
                            </MenuItem>
                            <CreatingRoomTemplate button={'phone'}/>
                            <ConnectingToRoomTemplate button={'phone'}/>
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={() => {
                                navigate('/')
                            }}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Главная
                        </Button>
                        <Button
                            onClick={() => {
                                navigate('/list-rooms/')
                            }}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Комнаты
                        </Button>
                        <CreatingRoomTemplate button={'desktop'}/>
                        <ConnectingToRoomTemplate button={'desktop'}/>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Иконка пользователя" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCreateKeyRSA}>
                                <Typography textAlign="center">Генерация ключей RSA</Typography>
                            </MenuItem>
                            <AddStateGostkey/>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Выход</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default NavBar;