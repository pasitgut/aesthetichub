"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

interface Clinic {
  id: string;
  name: string;
  address: string;
  city?: string;
  phone?: string;
  description?: string;
  rating: number;
  review_count: number;
  cover_image_url?: string;
}

interface ClinicForm {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  description: string;
  cover_image_url: string;
  highlights: string[];
}

const emptyForm: ClinicForm = { name: "", address: "", city: "", state: "", zip_code: "", phone: "", description: "", cover_image_url: "", highlights: [] };

export default function AdminClinicsPage() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ClinicForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [highlightInput, setHighlightInput] = useState("");

  const fetchClinics = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("limit", "50");
    const res = await api.get<Clinic[]>(`/api/v1/clinics?${params.toString()}`);
    if (res.success && res.data) setClinics(res.data);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    const t = setTimeout(fetchClinics, 300);
    return () => clearTimeout(t);
  }, [fetchClinics]);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setHighlightInput(""); setShowModal(true); };
  const openEdit = (c: Clinic) => {
    setEditId(c.id);
    setForm({ name: c.name, address: c.address, city: c.city || "", state: "", zip_code: "", phone: c.phone || "", description: c.description || "", cover_image_url: c.cover_image_url || "", highlights: [] });
    setHighlightInput("");
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editId) {
      await api.put(`/api/v1/admin/clinics/${editId}`, form);
    } else {
      await api.post("/api/v1/admin/clinics", { ...form, highlights: form.highlights });
    }
    setSaving(false);
    setShowModal(false);
    fetchClinics();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await api.del(`/api/v1/admin/clinics/${deleteId}`);
    setDeleteId(null);
    fetchClinics();
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setForm({ ...form, highlights: [...form.highlights, highlightInput.trim()] });
      setHighlightInput("");
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">Clinics Directory</h1>
          <p className="text-gray-500 font-medium">Manage and monitor all clinic listings</p>
        </div>
        <button onClick={openCreate} className="bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-md shadow-pink-100 flex items-center gap-2 whitespace-nowrap hidden sm:flex">
          <span className="text-xl leading-none">+</span> Add New Clinic
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full sm:w-96">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search clinics by name or area..." value={search} onChange={(e) => setSearch(e.target.value)} className="text-gray-900 w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" />
          </div>
          <button onClick={openCreate} className="w-full sm:hidden bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white px-6 py-3.5 rounded-2xl font-bold transition-all flex justify-center items-center gap-2">
            <span className="text-xl leading-none">+</span> Add Clinic
          </button>
        </div>

        {loading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
             <div className="w-8 h-8 border-4 border-[#f1c3c9]/30 border-t-[#f1c3c9] rounded-full animate-spin"></div>
             <p className="text-gray-400 font-medium">Loading clinics...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white border-b border-gray-50 text-left text-gray-400 text-xs uppercase tracking-wider font-bold">
                  <th className="px-8 py-5">Clinic Name</th>
                  <th className="px-8 py-5">Location</th>
                  <th className="px-8 py-5">Rating</th>
                  <th className="px-8 py-5">Reviews</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {clinics.map((c) => (
                  <tr key={c.id} className="hover:bg-[#fdf4f5]/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="font-bold text-gray-900 group-hover:text-[#dbaeb4] transition-colors">{c.name}</div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">{c.address}</div>
                    </td>
                    <td className="px-8 py-5 font-medium text-gray-600">{c.city || "—"}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5 bg-yellow-50 w-fit px-2.5 py-1 rounded-full border border-yellow-100/50">
                        <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span className="font-bold text-yellow-700">{c.rating?.toFixed(1) || "5.0"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium text-gray-500">{c.review_count}</td>
                    <td className="px-8 py-5 text-right">
                      <button onClick={() => openEdit(c)} className="w-8 h-8 inline-flex items-center justify-center rounded-xl text-gray-400 hover:text-[#dbaeb4] hover:bg-[#fdf4f5] transition-all mr-2" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button onClick={() => setDeleteId(c.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {clinics.length === 0 && (
                  <tr><td colSpan={5} className="px-8 py-16 text-center text-gray-400 font-medium">No clinics found matching your criteria.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden ring-1 ring-gray-100">
            <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center shrink-0 bg-white">
              <h2 className="text-2xl font-bold font-serif text-gray-900">{editId ? "Edit Clinic Details" : "Add New Clinic"}</h2>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto flex-1 bg-gray-50/30">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2">Basic Info</h3>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Clinic Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="text-gray-900 w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="Enter clinic name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
                  <input type="url" value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} className="text-gray-900 w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="text-gray-900 w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all resize-none" placeholder="Brief description of the clinic..." />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                 <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2">Location & Contact</h3>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Street Address *</label>
                  <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="text-gray-900 w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="123 Example St" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="text-gray-900 w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="Bangkok" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                    <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="text-gray-900 w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="02-123-4567" />
                  </div>
                </div>
              </div>

              {!editId && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2">Highlights</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Add Feature / Highlight</label>
                    <div className="flex gap-3 mb-4">
                      <input type="text" value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())} className="text-gray-900 flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="e.g. Board-Certified Specialists" />
                      <button onClick={addHighlight} className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-bold transition-colors">Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.highlights.map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-[#fdf4f5] border border-pink-100 text-[#dbaeb4] font-bold rounded-lg text-xs">
                          {h}
                          <button onClick={() => setForm({ ...form, highlights: form.highlights.filter((_, j) => j !== i) })} className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[#dbaeb4] hover:bg-red-50 hover:text-red-500 transition-colors">&times;</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-8 py-5 border-t border-gray-50 flex justify-end gap-3 shrink-0 bg-white">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name || !form.address} className="px-8 py-3 bg-[#f1c3c9] text-white rounded-xl text-sm font-bold hover:bg-[#e4b2b8] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-md shadow-pink-100">{saving ? "Saving..." : editId ? "Update Clinic" : "Create Clinic"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={() => setDeleteId(null)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl p-8 text-center ring-1 ring-gray-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-red-500 text-3xl">
              ⚠️
            </div>
            <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">Delete Clinic?</h3>
            <p className="text-sm font-medium text-gray-500 mb-8 px-4">This action cannot be undone. All treatments and reviews associated will be removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 shadow-md shadow-red-100 transition-colors">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
