import { useEffect, useState } from 'react'
import { fetchVideos } from '../services/videos'
import { resolveAssetUrl } from '../utils/asset'
import { useAuth } from '../utils/auth-context'

export default function DashboardPage() {
  const { user } = useAuth()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos().then(setVideos).catch(() => setVideos([]))
  }, [])

  return (
    <main className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Your AS DANCE Premium Bundle</h1>
          <p className="section-sub">Step-by-step lessons sorted by level.</p>
        </div>
        {!user?.unlockedBundle && (
          <div className="glass-card locked-note">
            <h3>Bundle locked</h3>
            <p>Complete payment to unlock the full library.</p>
          </div>
        )}
        <div className="video-grid">
          {videos.map((video) => (
            <div className="video-card" key={video.id}>
              <div className="video-thumb" style={{ backgroundImage: `url(${resolveAssetUrl(video.thumbnailUrl)})` }}>
                <span className="video-level">{video.level}</span>
                {(video.locked || !user?.unlockedBundle) && <span className="lock">LOCK</span>}
              </div>
              <div className="video-body">
                <h4>{video.title}</h4>
                <p>{video.duration || '1 min'}</p>
                {user?.unlockedBundle && video.videoUrl && (
                  <a className="btn btn-ghost" data-magnetic href={resolveAssetUrl(video.videoUrl)} target="_blank" rel="noreferrer">
                    Watch now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

