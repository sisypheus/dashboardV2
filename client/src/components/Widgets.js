import React, { useEffect } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../index.css';
import RGL, { WidthProvider } from 'react-grid-layout';

const Widgets = ({ user }) => {
  const ReactGridLayout = WidthProvider(RGL);

  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 }
  ]

  return (
    <div className="w-full pt-4 px-3" >
      <ReactGridLayout isBounded={true} className="layout" layout={layout} cols={5} rowHeight={48}  >
        <div key="a" className="bg-blue-300">a</div>
        <div key="b" className="bg-red-400">b</div>
        <div key="c" className="bg-green-400">c</div>
      </ReactGridLayout>
    </div>
  )
}

export default Widgets
