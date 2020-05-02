import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { View, useWindowDimensions } from 'react-native';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { DrawerAppContent } from '@material/react-drawer';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import LocalizedStrings from 'react-localization';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialDrawer from '../../components/horizontal-prototype/MaterialDrawer';
import ConsumptionCard from '../../components/horizontal-prototype/ConsumptionCard';

let strings = new LocalizedStrings({
  en: {
    consumption: 'Consumption',
    view_details: 'View details',
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session']);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    // TODO: fetch
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View className='drawer-container'>
      <MaterialTopAppBarDialog
        title={strings.consumption}
        onClick1={toggleDrawer}
        //onClick2={() => window.location.href = './' }
        icon2='view_week'
      ></MaterialTopAppBarDialog>
      <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
        <MaterialDrawer
          open={drawerOpen}
          selectedIndex={3}
          onClose={toggleDrawer}
        ></MaterialDrawer>
        <DrawerAppContent className='drawer-app-content'>
          <Grid style={{ height: useWindowDimensions().height - 64 }}>
            <Row>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
                <ConsumptionCard
                  userText1='user'
                  userText2='role'
                  mainText='Above is a chart for the last 30 days. This text describes how user did compared to average person only on calories.'
                  actionText1={strings.view_details}
                  //onClickUser={() => alert('user')}
                  onClickMain={() => { window.location.href = './consumption/view?id=' }}
                  onClickAction1={() => { window.location.href = './consumption/view?id=' }}
                  mainImage={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAALQCAYAAADPfd1WAAAgAElEQVR4nOzdWY8jWXqY4S+CS6619TI93RqNJMvWha3FsqwrA5YNyLB/hm/8u/wXZMGGbwTIkGFfeGzJgBZ4Rj2jwWh6me6uJfeFZIRxgmRVVnUtWdFd3Rkfn2eQU12ZrMhkJMlgvDznsGrbtg0AAAAAIKXarxUAAAAA8hIAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhv75bJZ2udc28ptAAAAAEhLAGSjzOeLaBaLaJomqrqO0WgUdV13HwAAAAAZCYBslA8//El8+Lc/jg9//Hfx3nvvxm//9m/GBx+8H/fu3XVDAAAAAFISANkoP/jBn8cf/dF/iR/877+If/Br34//8B/+fWxtbQmAAAAAQFrmPbJRmraJ7Z3tuLW/F9/5zndid3cnxuORGwEAAACQlgDIRilr/00mo27U3/7+XkwmE+v/AQAAAKkpH2wUb/gBAAAAbBolhI1S+XUDAAAAG0YABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAAAAAASEwABAAAAIDEBEAA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AEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAAAAAEhMAAQAAACAxARAAGDQWr8+AAB4KQEQAAAAABITAAGAQar82gAA4FoEQABgkNZTf4VAAAB4ubH9w6ZrGqtHbYp29atuSy6o6oi2eXzNW6+HvNRy11XdvhNb+qmurFTXVhFNtbrNlRvmkxunBe1epn2yv9qmjUXTRF1F1JVbZR9lv5WP1o3ua1B1r6u3V4K048qrdcfj1e2vrZd7rl3fn596bLzy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'}
                ></ConsumptionCard>
              </Cell>
            </Row>
          </Grid>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
