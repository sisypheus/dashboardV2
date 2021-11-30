import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Github = ({ display, token, widget }) => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (display && token) {
      return getGithub()
    }
  }, [])

  const getGithub = async () => {
    if (widget == 'Contributions') {
      const type = 'contributions'
      const res = await axios.get(process.env.REACT_APP_API + `/service/github/${type}/?token=${token}`);
      setUsername(res.data.username)
    } else if (widget == 'Pinned') {
      const type = 'pinned'
      const res = await axios.get(process.env.REACT_APP_API + `/service/github/${type}/?token=${token}`);
      setRepos(res.data.data.user.pinnedItems.edges);
    } else if (widget == 'Profile') {
      const type = 'profile'
      const res = await axios.get(process.env.REACT_APP_API + `/service/github/${type}/?token=${token}`);
      setProfile(res.data.data.user);
    }
  };

  const displayWidget = (widget) => {
    if (widget === 'Contributions' && !username)
      return;
    switch (widget) {
      case 'Contributions':
        return <img className="px-2 py-1" src={`https://ghchart.rshah.org/${username}`} alt="Github chart" />
      case 'Pinned':
        return (
          <div>
          <div className="pt-2 grid grid-cols-2 justify-center space-x-2 px-4">
            {repos.map((repo, index) => {
              console.log(repo);
              return (
                <div key={index} className="flex flex-col items-center px-2 py-2">
                  <p className="text-green">{repo.node.name}</p>
                  <p className="text-text text-center italic text-sm">{repo.node?.description?.length > 70 ? repo.node.description.substr(0, 70) + '...' : repo.node.description}</p>
                  <div className="text-text text-sm flex items-center justify-center text-center space-x-2">
                    <p><span className="text-green">{repo.node.stargazerCount}</span> star(s)</p>
                    <p><span className="text-green">{repo.node.forks.totalCount}</span> fork(s)</p>
                  </div>
                </div>
              )
            })}
          </div>
          </div>
        )
      case 'Profile':
        return (
          <>
            <p className="text-lg font-medium">{profile?.name}</p>
            <p className="px-4 text-center">{profile?.bio}</p>
            <div className="flex items-center justify-center mt-1 space-x-4">
              <p className="pt-2 text-text"><span className="text-green">{profile?.starredRepositories?.totalCount}</span> star(s)</p>
              <p className="pt-2 text-text"><span className="text-green">{profile?.followers?.totalCount}</span> follower(s)</p>
              <p className="pt-2 text-text"><span className="text-green">{profile?.following?.totalCount}</span> following</p>
            </div>
          </>
        )
    }
  }

  return (
    <>
      {display &&
        <div key="github" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-green text-2xl tracking-widest font-black">Github</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export default Github
