import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { View, useWindowDimensions } from 'react-native';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { DrawerAppContent } from '@material/react-drawer';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-layout-grid/dist/layout-grid.css';
import '@material/react-material-icon/dist/material-icon.css';
import LocalizedStrings from 'react-localization';

import MaterialTopAppBar from '../../components/horizontal-prototype/MaterialTopAppBar';
import MaterialDrawer from '../../components/horizontal-prototype/MaterialDrawer';
import MaterialFab from '../../components/horizontal-prototype/MaterialFab';
import MaterialSnackbar from '../../components/horizontal-prototype/MaterialSnackbar';
import UsersDialog from '../../components/horizontal-prototype/UsersDialog';
import UsersListCard from '../../components/horizontal-prototype/UsersListCard';

import { apiUrl } from '../../url';

let strings = new LocalizedStrings({
  en: {
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session', 'userID']);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [intolerances, setIntolerances] = useState([]);
  const [toast, setToast] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // dummySetup();
    load();
  }, []);

  const dummySetup = () => {
    // TODO: hard code users array
    setUsers([
      {
        key: 1,
        primaryText: 'User 1 ',
        secondaryText: 'role',
      },
      {
        key: 2,
        primaryText: 'User 2 ',
        secondaryText: 'role 2',
      }
    ]);
  };

  const load = async () => {
    await fetch(apiUrl + '/v3/users?session=' + cookies.session, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status + ' ' + res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      let users = [];
      data.forEach((item) => users.push({
        key: item.userID,
        primaryText: item.name,
        secondaryText: item.role,
      }));
      setUsers(users);
    })
    .catch((error) => setToast(error.toString()));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleDelete = () => {
    // @todo
  };

  const handleSubmission = async (value) => {
    toggleDialog();
    if (value === 'confirm') {
      await fetch(apiUrl + '/v3/users', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: cookies.session,
          name: name,
          role: role,
          intolerances: intolerances,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.status + ' ' + res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setCookie('userID', data.userID, {
            path: '/horizontal-prototype/',
            // httpOnly: true,
            // expires: new Date(data.expires_ts),
          });
        })
        .catch(console.log);
      window.location.reload();
    }
  };

  return (
    <>
      <View className='drawer-container'>
        <MaterialTopAppBar
          title={strings.users}
          onClick1={toggleDrawer}
        ></MaterialTopAppBar>
        <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
          <MaterialDrawer
            open={drawerOpen}
            selectedIndex={5}
            onClose={toggleDrawer}
          ></MaterialDrawer>
          <DrawerAppContent className='drawer-app-content'>
            <Grid style={{ height: useWindowDimensions().height - 64 }}>
              {users.length > 0 && (
              <Row>
                <Cell columns={12}>
                  <UsersListCard
                    items={users}
                    // handleSelect={handleDelete}
                  ></UsersListCard>
                </Cell>
              </Row>
              )}
            </Grid>
          </DrawerAppContent>
          {toast && (
          <MaterialSnackbar message={toast} onClose={() => setToast('')} />
          )}
          <MaterialFab
            icon={<MaterialIcon icon='person_add'/>}
            style={{ position: 'absolute', right: 16, bottom: 16 }}
            onClick={toggleDialog}
          ></MaterialFab>
        </TopAppBarFixedAdjust>
      </View>
      <UsersDialog
        open={dialogOpen}
        name={name}
        role={role}
        intolerances={intolerances}
        onChange1={(e) => setName(e.target.value)}
        onChange2={(e) => setRole(e.target.value)}
        onChange3={(e) => setIntolerances(e.target.value)}
        onTrailingIconSelect1={() => setName('')}
        onTrailingIconSelect2={() => setRole('')}
        onTrailingIconSelect3={() => setIntolerances('')}
        onClose={handleSubmission}
      ></UsersDialog>
    </>
  );
};
