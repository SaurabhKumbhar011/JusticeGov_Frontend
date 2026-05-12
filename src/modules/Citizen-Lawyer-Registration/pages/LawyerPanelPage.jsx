import { useState } from 'react';
import LawyerPanel from '../lawyer/LawyerPanel';
import { Link } from 'react-router-dom';

export default function LawyerPanelPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="relative rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:flex sm:items-center sm:justify-between">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="absolute left-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:bg-slate-100"
            aria-label="Open menu"
          >
            •••
          </button>
          {menuOpen && (
            <div className="absolute left-0 top-14 z-10 w-64 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
              <Link
                to="/register/my-profile"
                className="block rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                Registration Profile
              </Link>
              <Link
                to="/register/case-filing"
                className="mt-1 block rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                Case Filing
              </Link>
              <Link
                to="/register/document"
                className="mt-1 block rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                Document Upload
              </Link>
            </div>
          )}
          <div className="pl-14 sm:pl-0">
            <h4 className="text-2xl font-semibold text-slate-900">Lawyer Panel</h4>
            <p className="mt-2 text-sm text-slate-500">View, manage and update registered lawyers and keep case filing ready.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
          <Link
            to="/register/case-filing"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-emerald-600"
          >
            + File a Case
          </Link>
          <Link
            to="/register/lawyer"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            + Register New Lawyer
          </Link>
        </div>
      </div>
      <div className="rounded-3xl bg-slate-50 p-6 shadow-inner shadow-slate-100">
        <LawyerPanel />
      </div>
    </div>
  );
}
