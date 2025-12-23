import { useEffect, useState } from 'react'
import {
  createVideo,
  deleteVideo,
  fetchAdminBundles,
  fetchAdminPayments,
  fetchAdminUsers,
  fetchAdminVideos,
  updateBundle,
  updateVideo
} from '../services/admin'

const emptyVideo = {
  title: '',
  level: 'EASY',
  duration: '',
  stepsCount: 0,
  thumbnailUrl: '',
  videoUrl: '',
  active: true
}

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [payments, setPayments] = useState([])
  const [videos, setVideos] = useState([])
  const [bundles, setBundles] = useState([])
  const [videoForm, setVideoForm] = useState(emptyVideo)
  const [editingId, setEditingId] = useState(null)

  const loadAll = () => {
    fetchAdminUsers().then(setUsers)
    fetchAdminPayments().then(setPayments)
    fetchAdminVideos().then(setVideos)
    fetchAdminBundles().then(setBundles)
  }

  useEffect(() => {
    loadAll()
  }, [])

  const onChange = (event) => {
    const { name, value } = event.target
    if (name === 'active') {
      setVideoForm({ ...videoForm, active: event.target.checked })
      return
    }
    if (name === 'stepsCount') {
      setVideoForm({ ...videoForm, stepsCount: Number(value) })
      return
    }
    setVideoForm({ ...videoForm, [name]: value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (editingId) {
      await updateVideo(editingId, videoForm)
    } else {
      await createVideo(videoForm)
    }
    setVideoForm(emptyVideo)
    setEditingId(null)
    loadAll()
  }

  const onEdit = (video) => {
    setEditingId(video.id)
    setVideoForm({
      title: video.title,
      level: video.level,
      duration: video.duration || '',
      stepsCount: video.stepsCount || 0,
      thumbnailUrl: video.thumbnailUrl,
      videoUrl: video.videoUrl || '',
      active: video.active
    })
  }

  const onDelete = async (id) => {
    await deleteVideo(id)
    loadAll()
  }

  const onBundleUpdate = async (bundle) => {
    await updateBundle(bundle.id, bundle)
    loadAll()
  }

  return (
    <main className="admin">
      <div className="container admin-grid">
        <div className="glass-card admin-panel">
          <h2>Video Manager</h2>
          <form onSubmit={onSubmit} className="admin-form">
            <input name="title" placeholder="Title" value={videoForm.title} onChange={onChange} />
            <input name="duration" placeholder="Duration" value={videoForm.duration} onChange={onChange} />
            <input name="stepsCount" placeholder="Steps" type="number" value={videoForm.stepsCount} onChange={onChange} />
            <input name="thumbnailUrl" placeholder="Thumbnail URL" value={videoForm.thumbnailUrl} onChange={onChange} />
            <input name="videoUrl" placeholder="Video URL" value={videoForm.videoUrl} onChange={onChange} />
            <select name="level" value={videoForm.level} onChange={onChange}>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
            <label className="checkbox">
              <input name="active" type="checkbox" checked={videoForm.active} onChange={onChange} /> Active
            </label>
            <button className="btn btn-cta" data-magnetic type="submit">{editingId ? 'Update' : 'Create'} Video</button>
          </form>
          <div className="admin-list">
            {videos.map((video) => (
              <div className="admin-item" key={video.id}>
                <div>
                  <strong>{video.title}</strong>
                  <span>{video.level}</span>
                </div>
                <div className="admin-actions">
                  <button className="btn btn-ghost" data-magnetic type="button" onClick={() => onEdit(video)}>Edit</button>
                  <button className="btn btn-ghost" data-magnetic type="button" onClick={() => onDelete(video.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card admin-panel">
          <h2>Bundles</h2>
          {bundles.map((bundle) => (
            <div className="admin-item" key={bundle.id}>
              <div>
                <strong>{bundle.name}</strong>
                <span>₹{bundle.price} / ₹{bundle.originalPrice}</span>
              </div>
              <button className="btn btn-ghost" data-magnetic type="button" onClick={() => onBundleUpdate({ ...bundle, active: !bundle.active })}>
                {bundle.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card admin-panel">
          <h2>Users</h2>
          <div className="admin-list">
            {users.map((user) => (
              <div className="admin-item" key={user.id}>
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <span>{user.unlockedBundle ? 'Unlocked' : 'Locked'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card admin-panel">
          <h2>Payments</h2>
          <div className="admin-list">
            {payments.map((payment) => (
              <div className="admin-item" key={payment.id}>
                <div>
                  <strong>{payment.userEmail}</strong>
                  <span>{payment.razorpayOrderId}</span>
                </div>
                <span>{payment.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}



