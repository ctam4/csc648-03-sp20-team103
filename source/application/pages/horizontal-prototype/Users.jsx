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
import UserDialog from '../../components/horizontal-prototype/UserDialog';
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
  const [toast, setToast] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dummySetup();
    load();
  }, []);

  const dummySetup = () => {
    // TODO: hard code users array
    setUsers([
      {
        primaryText: 'User 1 ',
        secondaryText: 'role',
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
      data.foreach((item) => users.push({
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

  const handleRemoveUser = () => {
    // @todo
  };

  const handleSubmission = () => {
    // @todo
    toggleDialog();
    window.location.reload();
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
              <Row>
              {users.map((item) => (
                <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4} Cell columns={12}>
                  <UsersListCard
                  primaryText={item.title}
                  secondaryText={item.role}
                  list1={[{ primaryText: 'item 1'}]}
                ></UsersListCard>
                </Cell>
              ))}
              </Row>
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
      <UserDialog
        open={dialogOpen}
        name={name}
        role={role}
        onChange1={(e) => setName(e.target.value)}
        onChange2={(e) => setRole(e.target.value)}
        onTrailingIconSelect1={() => setName('')}
        onTrailingIconSelect2={() => setRole('')}
        onClose={handleSubmission}
      ></UserDialog>
    </>
  );
};

//{users.map((item) => (
   // ))}


/*                  <ConsumptionCard
                    userText1={item.title}
                    userText2={item.subtitle}
                    mainText={item.content}
                    actionText1={strings.edit_details}
                    actionText2={strings.remove_user}
                    //onClickUser={() => alert('user')}
                    onClickMain={() => { window.location.href = './consumption/view?id=' }}
                    //onClickAction1={() => { window.location.href = './users/view?id=' }}
                    onClickAction2={handleRemoveUser}
                    mainImage={item.image}
                  ></ConsumptionCard>*/
