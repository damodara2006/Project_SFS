import Samplepdf from "../../assets/sample.pdf"
function Student_submitions() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4a4a4a] text-[#ffffff] font-semibold">
      <div className="w-[90%] max-w-5xl rounded-2xl shadow-xl p-6 md:p-10 bg-white/5 border border-white/6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#ffffff]">Submission Details</h1>
          <span className="inline-flex items-center gap-2 text-sm bg-[#fc8f00] text-[#ffffff] px-3 py-1 rounded-full font-semibold">
            Submitted
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex">
              <div className="min-w-[30%] text-sm text-white/80">Problem ID</div>
              <div className="w-[10%] text-center text-white/60">:</div>
              <div className="flex-1 text-sm text-[#ffffff]">P001</div>
            </div>

            <div className="flex">
              <div className="min-w-[30%] text-sm text-white/80">Title</div>
              <div className="w-[10%] text-center text-white/60">:</div>
              <div className="flex-1 text-sm text-[#ffffff]">
                Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases in Rural Northeast India
              </div>
            </div>

            <div className="flex">
              <div className="min-w-[30%] text-sm text-white/80">Approval Status</div>
              <div className="w-[10%] text-center text-white/60">:</div>
              <div className="flex-1 text-sm text-yellow-400 font-bold">Pending</div>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="min-w-[30%] text-sm text-white/80 mb-2">Submitted Solution</label>
            <div className="w-full h-96 rounded-lg overflow-hidden border border-white/10 bg-[#ffffff]">
              <object data={Samplepdf} type="application/pdf" className="w-full h-full" aria-label="Submitted solution" />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button className="px-4 py-2 rounded-md bg-transparent border border-white/20 text-white/90 hover:bg-white/5">
                Download
              </button>
              <button className="px-4 py-2 rounded-md bg-[#fc8f00] text-[#ffffff] hover:brightness-95">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Student_submitions