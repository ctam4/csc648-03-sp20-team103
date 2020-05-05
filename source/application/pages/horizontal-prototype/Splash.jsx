import React, { useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import { splashReducer, initialState } from '../../reducers/horizontal-prototype/Splash';
import { setSerialNumber, setPIN } from '../../actions/horizontal-prototype/Splash';

import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import LocalizedStrings from 'react-localization';

import { Headline1 } from '../../components/horizontal-prototype/MaterialTypography';
import MaterialOutlinedTextField from '../../components/horizontal-prototype/MaterialOutlinedTextField';
import MaterialButton from '../../components/horizontal-prototype/MaterialButton';

let apiUrl = location.protocol + '//' + (process.env.API_HOST || location.hostname);
if (process.env.API_PORT) {
  apiUrl += ':' + process.env.API_PORT;
}

let strings = new LocalizedStrings({
  en: {
    continue: 'Continue',
    serial_number: 'Serial number',
    serial_number_helper: 'This is located in the front of interior or exterior of your fridge.',
    pin: 'PIN',
    pin_helper: 'This is the PIN number to log-in to your fridge.',
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['Session']);
  const [state, dispatch] = useReducer(splashReducer, initialState);

  useEffect(() => {
    dummySetup();
  }, []);

  const dummySetup = async () => {
    // for dummy fridge
    return await fetch(apiUrl + '/v2/fridges', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      dispatch(setSerialNumber(data.serialNumber));
      dispatch(setPIN(data.pin));
    })
    .catch(console.log);
  };

  const handleAuth = async () => {
    await fetch(apiUrl + '/v2/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serialNumber: state.serial_number,
        pin: state.pin,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json()
    })
    .then((data) => {
      setCookie('session', data.session, {
        //httpOnly: true,
        expires: new Date(data.expires_ts),
      });
      console.log('Login successful.');
      window.location.href = './inventory';
      //window.location.href = './auth';
    })
    .catch(console.log);
  }

  return (
    <Grid>
      <Row>
        <Cell columns={12}>
          <Headline1 style={{ color: 'rgba(65,117,5,1)' }}>STOCKUP</Headline1>
        </Cell>
      </Row>
      <Row>
        <Cell columns={12}>
          <MaterialOutlinedTextField
            label={strings.serial_number}
            helperText={strings.serial_number_helper}
            value={state.serial_number}
            onChange={(e) => dispatch(setSerialNumber(e.target.value))}
            onTrailingIconSelect={() => dispatch(setSerialNumber(''))}
          ></MaterialOutlinedTextField>
        </Cell>
        <Cell columns={12}>
          <MaterialOutlinedTextField
            label={strings.pin}
            helperText={strings.pin_helper}
            value={state.pin}
            onChange={(e) => dispatch(setPIN(e.target.value))}
            onTrailingIconSelect={() => dispatch(setPIN(''))}
          ></MaterialOutlinedTextField>
        </Cell>
      </Row>
      <Row>
        <Cell columns={12}>
          <MaterialButton onClick={handleAuth} raised style={{ width: '100%' }}>{strings.continue}</MaterialButton>
        </Cell>
      </Row>
    </Grid>
  );
};
