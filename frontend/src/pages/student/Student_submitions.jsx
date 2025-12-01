import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { URL } from "../../Utils";
import samplePdf from "../../assets/sample.pdf";

const statusColor = (s) => {
  const st = (s || "").toString().toUpperCase();
  if (st.includes("APPROV")) return "bg-status-green text-white";
  if (st.includes("REJ")) return "bg-red-500 text-white";
  if (st.includes("PEND")) return "bg-status-yellow text-black";
  return "bg-gray-200 text-black";
};

const mapSubmission = (row = {}) => ({
  id: row.id ?? row.SUBMISSION_ID ?? row.SUB_ID ?? row.submissionId ?? row.SUBMISSION_ID,
  problemId: row.PROBLEM_ID ?? row.problemId ?? "-",
  teamId: row.TEAM_ID ?? row.teamId ?? "-",
  title: row.SOL_TITLE ?? row.title ?? "Untitled Submission",
  description: row.SOL_DESCRIPTION ?? row.description ?? "",
  submittedAt: row.SUB_DATE ?? row.submittedAt ?? null,
  status: row.STATUS ?? row.status ?? "PENDING",
  pdfLink: row.SOL_LINK ?? row.pdfLink ?? "",
});

function FriendlyDate({ value }) {
  if (!value) return <span className="text-text-tertiary">—</span>;
  const d = new Date(value + (value.length === 10 ? 'T00:00:00' : ''));
  return <time dateTime={d.toISOString()}>{d.toLocaleDateString()}</time>;
}

export default function Student_submitions({ submission: propSubmission }) {
  const [submission, setSubmission] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showViewer, setShowViewer] = useState(false);

  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const submissionId = query.get("submissionId");
  const teamId = query.get("teamId");

  useEffect(() => {
    if (propSubmission) {
      setSubmission(mapSubmission(propSubmission));
      return;
    }

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        let api = `${URL}/submissions`;
        if (submissionId) api += `?submissionId=${submissionId}`;
        else if (teamId) api += `?teamId=${teamId}`;

        const res = await axios.get(api, { timeout: 5000 });
        const data = res.data;
        if (Array.isArray(data)) {
          const first = data[0] ?? null;
          setSubmission(mapSubmission(first));
        } else if (data) {
          setSubmission(mapSubmission(data));
        } else {
          setSubmission(null);
        }
      } catch (err) {
        setError("Could not load submission. Showing preview.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [propSubmission, submissionId, teamId]);

  const s = submission || mapSubmission({
    PROBLEM_ID: "P001",
    TEAM_ID: "T100",
    SOL_TITLE: "Smart Community Health Monitoring and Early Warning System",
    SOL_DESCRIPTION:
      "A cross-disciplinary solution combining IoT sensors, community reporting and ML-based early warnings to reduce outbreaks of water-borne diseases.",
    SUB_DATE: "2025-10-31",
    STATUS: "PENDING",
    SOL_LINK: samplePdf,
  });

  const pdfSrc = s.pdfLink || samplePdf;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light px-4 py-8">
      <div className="w-full max-w-5xl rounded-2xl shadow-card p-6 md:p-10 bg-background-white border border-border-color transition-shadow hover:shadow-card-hover">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Submission Details</h1>
            <p className="text-sm text-text-secondary mt-1">Problem • <span className="font-medium">{s.problemId}</span> — Team <span className="font-medium">{s.teamId}</span></p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${statusColor(s.status)} font-semibold`}> 
              <span className="text-sm">{s.status?.toString().toUpperCase()}</span>
            </div>

            <div className="text-right text-sm text-text-tertiary">Submitted: <FriendlyDate value={s.submittedAt} /></div>
          </div>
        </header>

        <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">{s.title}</h2>
            <div className="text-sm text-text-secondary leading-relaxed">
              {expanded ? s.description : (s.description?.slice(0, 220) + (s.description?.length > 220 ? '...' : ''))}
            </div>
            {s.description && s.description.length > 220 && (
              <button onClick={() => setExpanded((v) => !v)} className="text-sm text-action-blue font-medium">
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setShowViewer(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-accent text-white font-semibold shadow-sm hover:opacity-95"
              >
                View PDF
              </button>

              <a
                href={pdfSrc}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border-color text-text-primary bg-white hover:bg-gray-50"
              >
                Download
              </a>

              <button
                onClick={() => window.open(pdfSrc, '_blank')}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm text-text-secondary bg-gray-50 border border-border-color"
              >
                Open in new tab
              </button>
            </div>
          </section>

          <aside className="md:col-span-1 bg-background-light rounded-xl p-4 border border-border-color">
            <div className="text-sm text-text-secondary mb-3">Submission metadata</div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between"><span className="text-text-secondary">Problem ID</span><span className="font-medium">{s.problemId}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Team ID</span><span className="font-medium">{s.teamId}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Status</span><span className="font-medium">{s.status}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Submitted</span><span className="font-medium"><FriendlyDate value={s.submittedAt} /></span></div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-text-secondary">Preview</label>
              <div className="w-full h-44 mt-2 rounded-md overflow-hidden border border-border-color bg-gray-50">
                <iframe
                  src={pdfSrc}
                  title="Submission preview"
                  className="w-full h-full border-0"
                />
                {/* fallback link when iframe cannot display */}
                <div className="flex items-center justify-center h-full text-text-tertiary invisible">
                  <a href={pdfSrc} target="_blank" rel="noreferrer" className="text-action-blue">Open PDF</a>
                </div>
              </div>
            </div>
          </aside>
        </main>

        {loading && <div className="mt-6 text-sm text-text-secondary">Loading submission...</div>}
        {error && <div className="mt-6 text-sm text-red-500">{error}</div>}
      </div>

      {/* Modal viewer */}
      {showViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="w-full max-w-6xl h-[90vh] bg-white rounded-lg overflow-hidden relative shadow-lg">
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => setShowViewer(false)}
                className="px-3 py-1 bg-white rounded border"
              >
                Close
              </button>
            </div>
            <iframe
              src={pdfSrc}
              title="PDF viewer"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
