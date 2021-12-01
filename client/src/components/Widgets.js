import React, { useEffect } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../index.css';
import RGL, { WidthProvider } from 'react-grid-layout';
import Weather from './widgets/Weather';
import Currency from './widgets/Currency';
import Github from './widgets/Github';
import Nasa from './widgets/Nasa';
import { YoutubeLast, YoutubeStats } from './widgets/Youtube';
import { QuoteDay, QuoteRandom } from './widgets/Quote';
import Reddit from './widgets/Reddit';
import Intra from './widgets/Intra';

const Widgets = ({ settings }) => {
  const ReactGridLayout = WidthProvider(RGL);

  const layout = [
    { i: 'weather', x: 0, y: 0, w: 5, h: 7 },
    { i: 'currency', x: 5, y: 0, w: 4, h: 5 },
    { i: 'github', x: 9, y: 0, w: settings?.github?.widget === 'Contributions' ? 11 : (settings?.github?.widget === 'Pinned' ? 6 : 5 ), h: settings?.github?.widget === 'Contributions' ? 5 : (settings?.github?.widget === 'Profile' ? 4 : 11) },
    { i: 'nasa', x: 0, y:8, w: 6, h: 8 },
    { i: 'youtube_stats', x: 20, y: 0, w: 6, h: 7 },
    { i: 'youtube_last', x: 9, y: 8, w: 4, h: 5 },
    { i: 'reddit', x: 15, y: 5, w: 5, h: 7 },
    { i: 'intra', x: 5, y: 15, w: settings?.intranet?.widget === 'stats' ? 4 : 5, h: settings?.intranet?.widget === 'stats' ? 3 : 6},
    { i: 'quote_day', x: 9, y: 15, w: 4, h: 5 },
    { i: 'quote_random', x: 0, y: 22, w: 5, h: 5 },
  ];

  const defaultLayout = [
    { i: 'weather', x: 0, y: 0, w: 4, h: 7 },
    { i: 'currency', x: 4, y: 0, w: 3, h: 5 },
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
      <div className="w-full pt-1 px-2" >
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
        <ReactGridLayout isBounded={true} className="layout" margin={[15,15]} layout={getLayout()} cols={24} rowHeight={24}>
          <div key="weather">
            <Weather city={settings?.weather?.city} display={settings?.weather?.display}/>
          </div>
          <div key="currency">
            <Currency from={settings?.currency?.from} to={settings?.currency?.to} display={settings?.currency?.display} />
          </div>
          <div key="github">
            <Github token={settings?.github?.token} display={settings?.github?.display} widget={settings?.github?.widget}/>
          </div>
          <div key="nasa">
            <Nasa display={settings?.nasa?.display} widget={settings?.nasa?.widget}/>
          </div>
          <div key="intra">
            <Intra display={settings?.intranet?.display} widget={settings?.intranet?.widget} token={settings?.intranet?.token}/>
          </div>
          <div key="quote_random">
            <QuoteRandom display={settings?.quote?.random?.display} category={settings?.quote?.random?.category}/>
          </div>
          <div key="quote_day">
            <QuoteDay display={settings?.quote?.qod?.display} category={settings?.quote?.qod?.category}/>
          </div>
          <div key="reddit">
            <Reddit display={settings?.reddit?.display} subreddit={settings?.reddit?.subreddit} posts={settings?.reddit?.posts} token={settings?.reddit?.tokens}/>
          </div>
          <div key="youtube_stats">
            <YoutubeStats display={settings?.youtube?.stats?.display} channelId={settings?.youtube?.stats?.channelId} channel={settings?.youtube?.stats?.channel} token={settings?.youtube?.tokens}/>
          </div>
          <div key="youtube_last">
            <YoutubeLast display={settings?.youtube?.last?.display} channelId={settings?.youtube?.last?.channelId} channel={settings?.youtube?.last?.channel} token={settings?.youtube?.tokens}/>
          </div>
        </ReactGridLayout>
      )}
    </div>
    </>
  )
}

export default Widgets
