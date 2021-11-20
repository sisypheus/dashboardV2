import React, { useEffect } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../index.css';
import RGL, { WidthProvider } from 'react-grid-layout';
import Weather from './widgets/Weather';
import Currency from './widgets/Currency';

const Widgets = ({ settings }) => {
  const ReactGridLayout = WidthProvider(RGL);

  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ]

  const defaultLayout = [
    { i: 'weather', x: 0, y: 0, w: 4, h: 4 },
    { i: 'currency', x: 4, y: 0, w: 3, h: 3 },
  ]

  const getLayout = () => {
    //change this
    if (settings !== null) {
      return defaultLayout;
    } else {
      return layout;
    }
  }

  return (
    <>
      <div className="w-full pt-4 px-3" >
      { !settings ? (
        <ReactGridLayout isBounded={true} className="layout" layout={getLayout()} cols={5} rowHeight={48}>
          <div key="a" className="bg-green-400">a</div>
          <div key="b" className="bg-red-400">b</div>
          <div key="c" className="bg-blue-400">c</div>
        </ReactGridLayout>
      ) : (
        <ReactGridLayout isBounded={true} className="layout" layout={getLayout()} cols={12} rowHeight={48}>
          <div key="weather">
            <Weather city={settings?.weather?.city} display={settings?.weather?.display}/>
          </div>
          <div key="currency">
            <Currency from={settings?.currency?.from} to={settings?.currency?.to} display={settings?.currency?.display} />
          </div>
        </ReactGridLayout>
      )}
    </div>
    </>
  )
}

export default Widgets
