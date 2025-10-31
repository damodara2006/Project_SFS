import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const PAGE_SIZE = 10

// Fetches and displays student's submissions in a paginated table.
// Columns: Submission ID, Problem Statement Title, Submission Date, Status, Feedback
// Shows a friendly message when there are no submissions and a button to submit a new solution.
function useSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    // Dummy data for local/dev use
    const dummyData = [
      { id: 's1', title: 'Two Sum', submittedAt: Date.now() - 1000 * 60 * 60 * 24, status: 'Accepted', feedback: 'Well done!' },
      { id: 's2', title: 'Reverse Linked List', submittedAt: Date.now() - 1000 * 60 * 60 * 48, status: 'Rejected', feedback: 'Edge cases failing' },
      { id: 's3', title: 'Binary Search', submittedAt: Date.now() - 1000 * 60 * 60 * 72, status: 'Pending', feedback: null },
      { id: 's4', title: 'Merge Sort', submittedAt: Date.now() - 1000 * 60 * 60 * 96, status: 'Accepted', feedback: 'Optimal solution' }
    ]

    // Simulate async load (no API call; using dummy data)
    const timer = setTimeout(() => {
      if (!mounted) return
      setSubmissions(dummyData)
      setError(null)
      setLoading(false)
    }, 100) // small delay to mimic network/loading

    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [])

  return { submissions, loading, error, setSubmissions }
}

/* Upload component (now a lightweight component without its own backdrop/card).
   Render it inside a parent popup/backdrop (as Student_submitions does). */
const Upload = ({ onClose } = {}) => {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [files])

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...selected])
    setProgress(0)
    setStatus(null)
    e.target.value = null
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const dropped = Array.from(e.dataTransfer.files)
    if (dropped.length) {
      setFiles((prev) => [...prev, ...dropped])
      setProgress(0)
      setStatus(null)
    }
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = () => {
    if (files.length === 0) {
      setStatus({ type: 'error', msg: 'No files selected' })
      return
    }

    const form = new FormData()
    files.forEach((f) => form.append('files', f))

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/upload')

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setStatus({ type: 'success', msg: 'Upload successful' })
        setFiles([])
        if (inputRef.current) inputRef.current.value = null
      } else {
        setStatus({ type: 'error', msg: `Upload failed (${xhr.status})` })
      }
      setProgress(0)
    }

    xhr.onerror = () => {
      setStatus({ type: 'error', msg: 'Network error during upload' })
      setProgress(0)
    }

    xhr.send(form)
    setStatus({ type: 'info', msg: 'Uploading...' })
  }

  const clearAll = () => {
    setFiles([])
    setProgress(0)
    setStatus(null)
    if (inputRef.current) inputRef.current.value = null
  }

  // Lightweight container: no full-screen background or outer card.
  // Parent should provide backdrop/centering.
  return (
    <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close upload"
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow z-10"
        >
          ✕
        </button>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Left: Dropzone */}
        <div className="md:w-1/2 p-4 md:p-8 flex flex-col items-center justify-center">
          <div
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={() => setDragActive(false)}
            className={`w-full h-56 rounded-xl border-2 transition-all duration-150 flex flex-col items-center justify-center text-center px-6 ${
              dragActive ? 'border-orange-400 bg-orange-50/40 shadow-inner' : 'border-dashed border-gray-200 bg-transparent'
            }`}
            onClick={() => inputRef.current && inputRef.current.click()}
            role="button"
            tabIndex={0}
          >
            <svg
              className="w-12 h-12 text-orange-500 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 16v4a1 1 0 001 1h8a1 1 0 001-1v-4M12 3v13" />
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 8l4-4 4 4" />
            </svg>

            <div className="text-sm text-gray-600 mb-2">Drag & drop files here or click to browse</div>
          </div>

          <div className="text-xs text-gray-400 mt-2">Supports multiple files • Max single file size as configured on backend</div>

          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload files"
          />

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={uploadFiles}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5" />
              </svg>
              Upload
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="px-4 py-2 border rounded-full bg-white hover:bg-gray-50 transition text-sm"
            >
              Clear
            </button>
          </div>

          {status && (
            <div
              className={`mt-4 text-sm ${status.type === 'error' ? 'text-red-600' : status.type === 'success' ? 'text-green-600' : 'text-gray-600'}`}
              role="status"
            >
              {status.msg}
            </div>
          )}
        </div>

        {/* Right: Files preview */}
        <div className="md:w-1/2 p-4 md:p-6 border-l hidden md:block bg-transparent">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Selected Files</h2>

          {files.length === 0 ? (
            <div className="text-sm text-gray-400">No files selected</div>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:shadow-sm transition bg-transparent"
                >
                  <div className="w-16 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                    {f.type && f.type.startsWith('image/') ? (
                      <img src={previews[i]} alt={f.name} className="object-cover w-full h-full" />
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 7v10" />
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 7v10" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-800 truncate">{f.name}</div>
                      <div className="text-xs text-gray-400">{(f.size / 1024).toFixed(1)} KB</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{f.type || 'Unknown type'}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFile(i)}
                      className="text-red-500 hover:text-red-600 text-sm"
                      aria-label={`Remove ${f.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {progress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-orange-400 to-orange-600 transition-width"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-2">{progress}% uploaded</div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile file list */}
      <div className="md:hidden border-t p-4 bg-transparent">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Files</h3>
        {files.length === 0 ? (
          <div className="text-sm text-gray-400">No files selected</div>
        ) : (
          <div className="flex gap-2 overflow-x-auto">
            {files.map((f, i) => (
              <div key={i} className="min-w-[140px] p-2 bg-white/80 border rounded-lg">
                <div className="text-sm font-medium truncate">{f.name}</div>
                <div className="text-xs text-gray-400">{(f.size / 1024).toFixed(1)} KB</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Student_submitions() {
  const navigate = useNavigate()
  const { submissions, loading, error } = useSubmissions()
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const modalRef = useRef(null)

  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadTarget, setUploadTarget] = useState(null)

  const total = submissions.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = submissions.slice(start, start + PAGE_SIZE)

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  // open popup instead of navigating to detail page
  const openDetailPopup = (id) => {
    const item = submissions.find((s) => s.id === id || s.submissionId === id)
    setSelected(item || null)
    setModalOpen(true)
  }

  const openUploadPopup = (id) => {
    const item = submissions.find((s) => s.id === id || s.submissionId === id)
    setUploadTarget(item || null)
    setUploadOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    // small delay to let animation finish if needed
    setTimeout(() => setSelected(null), 200)
  }

  const closeUpload = () => {
    setUploadOpen(false)
    setTimeout(() => setUploadTarget(null), 200)
  }

  // close on Escape for detail modal
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  // close on Escape for upload modal
  useEffect(() => {
    if (!uploadOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeUpload()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [uploadOpen])

  const goToSubmit = () => navigate('/student/submit') // adjust route as your app expects

  return (
    <div className="p-4 sm:p-6" style={{ color: '#4a4a4a' }}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold leading-tight m-0" style={{ color: '#4a4a4a' }}>
          Your Submissions
        </h2>

        <button
          onClick={goToSubmit}
          className="inline-flex items-center px-4 py-2 rounded-md shadow-sm hover:opacity-95 transition"
          style={{ backgroundColor: '#fc8f00', color: '#ffffff' }}
        >
          Submit Solution
        </button>
      </div>

      {loading && <div className="text-sm text-gray-500">Loading submissions...</div>}
      {error && <div className="text-sm text-red-600">Error: {error}</div>}

      {!loading && total === 0 && (
        <div className="border rounded-md p-6 flex flex-col items-start gap-3" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
          <p className="text-base" style={{ color: '#4a4a4a' }}>No submissions have been made yet.</p>
          <button
            onClick={goToSubmit}
            className="px-4 py-2 rounded-md shadow-sm hover:opacity-95 transition"
            style={{ backgroundColor: '#fc8f00', color: '#ffffff' }}
          >
            Create first submission
          </button>
        </div>
      )}

      {!loading && total > 0 && (
        <div className="bg-white shadow-sm border rounded-md overflow-hidden" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4a4a4a' }}>Submission ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4a4a4a' }}>Problem Statement Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4a4a4a' }}>Submission Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4a4a4a' }}>Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4a4a4a' }}>Feedback</th>
                  <th className="px-4 py-3 text-sm font-medium text-right" style={{ color: '#4a4a4a' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pageItems.map((s) => (
                  <tr key={s.id ?? s.submissionId} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm" style={{ color: '#4a4a4a' }}>{s.id ?? s.submissionId}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#4a4a4a' }}>{s.title ?? s.problemTitle ?? '—'}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#4a4a4a' }}>{s.submittedAt ? new Date(s.submittedAt).toLocaleString() : '—'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className="font-medium"
                        style={{
                          color:
                            s.status === 'Accepted' ? '#16a34a' : s.status === 'Rejected' ? '#dc2626' : '#f59e0b'
                        }}
                      >
                        {s.status ?? 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#4a4a4a' }}>{s.feedback ?? '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDetailPopup(s.id ?? s.submissionId)}
                          className="px-3 py-1 text-sm rounded-md border"
                          style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#4a4a4a' }}
                        >
                          View
                        </button>

                        <button
                          onClick={() => openUploadPopup(s.id ?? s.submissionId)}
                          className="px-3 py-1 text-sm rounded-md"
                          style={{ backgroundColor: '#fc8f00', color: '#ffffff' }}
                        >
                          Upload
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ borderColor: '#e5e7eb' }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md text-sm border"
            style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#4a4a4a' }}
          >
            Prev
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="px-3 py-1 rounded-md text-sm"
                style={
                  p === page
                    ? { backgroundColor: '#fc8f00', color: '#ffffff', fontWeight: 600 }
                    : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderStyle: 'solid', borderWidth: '1px', color: '#4a4a4a' }
                }
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md text-sm border"
            style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#4a4a4a' }}
          >
            Next
          </button>

          <div className="ml-auto text-sm" style={{ color: '#4a4a4a' }}>
            Showing {start + 1} - {Math.min(start + PAGE_SIZE, total)} of {total}
          </div>
        </div>
      )}

      {/* Popup / slide-down modal for details */}
      {modalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center">
          <div
            className="fixed inset-0"
            onClick={closeModal}
            aria-hidden="true"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          />

          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className={
              'mt-8 w-full max-w-2xl rounded-lg shadow-lg transform transition-all duration-300 ' +
              (modalOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0')
            }
            style={{ zIndex: 60, backgroundColor: '#ffffff' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#e5e7eb' }}>
              <div className="text-lg font-semibold" style={{ color: '#4a4a4a' }}>
                {selected.title ?? selected.problemTitle ?? 'Submission'}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: '#4a4a4a', marginRight: 8 }}>ID: {selected.id ?? selected.submissionId}</span>
                <button
                  onClick={closeModal}
                  className="px-3 py-1 text-sm rounded-md border"
                  style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#4a4a4a' }}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <div className="text-xs" style={{ color: '#6b7280' }}>Submitted At</div>
                <div className="text-sm" style={{ color: '#4a4a4a' }}>{selected.submittedAt ? new Date(selected.submittedAt).toLocaleString() : '—'}</div>
              </div>

              <div>
                <div className="text-xs" style={{ color: '#6b7280' }}>Status</div>
                <div className={'text-sm font-medium'} style={{ color: selected.status === 'Accepted' ? '#16a34a' : selected.status === 'Rejected' ? '#dc2626' : '#f59e0b' }}>
                  {selected.status ?? 'Pending'}
                </div>
              </div>

              <div>
                <div className="text-xs" style={{ color: '#6b7280' }}>Feedback</div>
                <div className="text-sm" style={{ color: '#4a4a4a' }}>{selected.feedback ?? 'No feedback yet.'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0"
            onClick={closeUpload}
            aria-hidden="true"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          />
          <div className="relative z-60 max-w-6xl w-full mx-4">
            {uploadTarget && (
              <div className="mb-3 text-sm" style={{ color: '#4a4a4a' }}>
                Upload files for: <span className="font-medium">{uploadTarget.title ?? uploadTarget.problemTitle ?? uploadTarget.id}</span>
              </div>
            )}
            <Upload onClose={closeUpload} />
          </div>
        </div>
      )}
    </div>
  )
}


export default Student_submitions;