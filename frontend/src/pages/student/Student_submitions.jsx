import Samplepdf from "../../assets/sample.pdf"

function Student_submitions() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-semibold">
      <div className="w-[90%] max-w-5xl rounded-2xl shadow-xl p-6 md:p-10 bg-white border border-gray-200">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Submission Details</h1>

          <div className="inline-flex flex-col items-end gap-2">
            <span className="inline-flex items-center gap-2 text-sm bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold">
              Submitted
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1  gap-6">
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="min-w-[30%] text-sm text-gray-600">Problem ID</div>
                <div className="w-[10%] text-center text-gray-300">:</div>
                <div className="text-sm">P001</div>
              </div>
              <div className="text-sm text-gray-600">Submitted on: 2025-10-31</div>
            </div>

            <div className="flex">
              <div className="min-w-[30%] text-sm text-gray-600">Title</div>
              <div className="w-[10%] text-center text-gray-300">:</div>
              <div className="flex-1 text-sm">
                Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases in Rural Northeast India
              </div>
            </div>

            <div className="flex">
              <div className="min-w-[30%] text-sm text-gray-600">Approval Status</div>
              <div className="w-[10%] text-center text-gray-300">:</div>
              <div className="flex-1 text-sm text-yellow-600 font-bold">Pending</div>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            {/* Placeholder for any additional metadata or actions if needed */}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm text-gray-600 mb-2 inline-block">Submitted Solution</label>
          <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <object data={Samplepdf} type="application/pdf" className="w-full h-full" aria-label="Submitted solution" />
          </div>

          <div className="mt-4 flex justify-end">
            <a
              href={Samplepdf}
              download
              className="px-4 py-2 rounded-md bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Student_submitions
