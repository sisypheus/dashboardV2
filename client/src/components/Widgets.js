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
    { i: 'weather', x: 0, y: 0, w: 4, h: 4 },
    { i: 'currency', x: 4, y: 0, w: 3, h: 3 },
    { i: 'github', x: 7, y: 0, w: 3, h: 3 },
  ]

  const defaultLayout = [
    { i: 'weather', x: 0, y: 0, w: 4, h: 4 },
    { i: 'currency', x: 4, y: 0, w: 3, h: 3 },
  ]

  const getLayout = () => {
    //change this
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
        <ReactGridLayout isBounded={true} className="layout" layout={getLayout()} cols={12} rowHeight={48}>
          <div key="weather">
            <Weather city={'Lille'} display={true}/>
          </div>
          <div key="currency">
            <Currency from={"USD"} to={"EUR"} display={true} />
          </div>
        </ReactGridLayout>
      ) : (
        <ReactGridLayout isBounded={true} className="layout" layout={getLayout()} cols={12} rowHeight={48}>
          <div key="weather">
            <Weather city={settings?.weather?.city} display={settings?.weather?.display}/>
          </div>
          <div key="currency">
            <Currency from={settings?.currency?.from} to={settings?.currency?.to} display={settings?.currency?.display} />
          </div>
          <div key="github">
            <Github token={settings?.github?.token} display={settings?.github?.display} />
          </div>
        </ReactGridLayout>
      )}
    </div>
    </>
  )
}

export default Widgets
