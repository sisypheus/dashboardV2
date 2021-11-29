import React, { useEffect } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../index.css';
import RGL, { WidthProvider } from 'react-grid-layout';
import Weather from './widgets/Weather';
import Currency from './widgets/Currency';
import Github from './widgets/Github';

const Widgets = ({ settings }) => {
  const ReactGridLayout = WidthProvider(RGL);

  const layout = [
    { i: 'weather', x: 0, y: 0, w: 5, h: 7 },
    { i: 'currency', x: 5, y: 0, w: 4, h: 5 },
    { i: 'github', x: 9, y: 0, w: settings?.github?.widget === 'Contributions' ? 11 : (settings?.github?.widget === 'Pinned' ? 6 : 4 ), h: settings?.github?.widget === 'Contributions' ? 5 : (settings?.github?.widget === 'Profile' ? 9 : 14) },
  ]

  const defaultLayout = [
    { i: 'weather', x: 0, y: 0, w: 4, h: 4 },
    { i: 'currency', x: 4, y: 0, w: 3, h: 3 },
  ]

  const getLayout = () => {
    if (settings !== null) {
      return layout;
    } else {
      return defaultLayout;
    }
  }

  return (
    <>
      <div className="w-full pt-4 px-3" >
      { !settings ? (
        <ReactGridLayout isBounded={true} className="layout" layout={getLayout()} cols={24} rowHeight={24}>
          <div key="weather">
            <Weather city={'Lille'} display={true}/>
          </div>
          <div key="currency">
            <Currency from={"USD"} to={"EUR"} display={true} />
          </div>
        </ReactGridLayout>
      ) : (
        <ReactGridLayout isBounded={true} className="layout" layout={getLayout()} cols={24} rowHeight={24}>
          <div key="weather">
            <Weather city={settings?.weather?.city} display={settings?.weather?.display}/>
          </div>
          <div key="currency">
            <Currency from={settings?.currency?.from} to={settings?.currency?.to} display={settings?.currency?.display} />
          </div>
          <div key="github">
            <Github token={settings?.github?.token} display={settings?.github?.display} widget={settings?.github?.widget}/>
          </div>
        </ReactGridLayout>
      )}
    </div>
    </>
  )
}

export default Widgets
