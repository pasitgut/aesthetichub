"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

interface Treatment {
  id: string;
  name: string;
  clinic_name: string;
  clinic_id: string;
  price: number;
  duration_minutes: number;
  rating: number;
  review_count: number;
  risk_level?: string;
}

interface Clinic {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
  category: string;
}

interface TreatmentForm {
  clinic_id: string;
  name: string;
  overview: string;
  price: number;
  duration_minutes: number;
  downtime_days: string;
  results_duration: string;
  risk_level: string;
  best_for: string;
  expected_timeline: string;
  expected_outcome: string;
  is_combo_package: boolean;
  tag_ids: string[];
  care_instructions: { phase: string; instruction: string }[];
}

const emptyForm: TreatmentForm = { clinic_id: "", name: "", overview: "", price: 0, duration_minutes: 30, downtime_days: "", results_duration: "", risk_level: "Low", best_for: "", expected_timeline: "", expected_outcome: "", is_combo_package: false, tag_ids: [], care_instructions: [] };

export default function AdminTreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<TreatmentForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [carePhase, setCarePhase] = useState("BEFORE");
  const [careText, setCareText] = useState("");

  const fetchTreatments = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("limit", "50");
    const res = await api.get<Treatment[]>(`/api/v1/treatments?${params.toString()}`);
    if (res.success && res.data) setTreatments(res.data);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    const t = setTimeout(fetchTreatments, 300);
    return () => clearTimeout(t);
  }, [fetchTreatments]);

  useEffect(() => {
    api.get<Clinic[]>("/api/v1/clinics?limit=100").then((res) => { if (res.success && res.data) setClinics(res.data); });
    api.get<Tag[]>("/api/v1/tags").then((res) => { if (res.success && res.data) setTags(res.data); });
  }, []);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (t: Treatment) => {
    setEditId(t.id);
    setForm({ ...emptyForm, clinic_id: t.clinic_id, name: t.name, price: t.price, duration_minutes: t.duration_minutes, risk_level: t.risk_level || "Low" });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editId) {
      const { clinic_id, tag_ids, care_instructions, ...updateData } = form;
      void clinic_id; void tag_ids; void care_instructions;
      await api.put(`/api/v1/admin/treatments/${editId}`, updateData);
    } else {
      await api.post("/api/v1/admin/treatments", form);
    }
    setSaving(false);
    setShowModal(false);
    fetchTreatments();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await api.del(`/api/v1/admin/treatments/${deleteId}`);
    setDeleteId(null);
    fetchTreatments();
  };

  const addCareInstruction = () => {
    if (careText.trim()) {
      setForm({ ...form, care_instructions: [...form.care_instructions, { phase: carePhase, instruction: careText.trim() }] });
      setCareText("");
    }
  };

  const toggleTag = (tagId: string) => {
    setForm({ ...form, tag_ids: form.tag_ids.includes(tagId) ? form.tag_ids.filter((id) => id !== tagId) : [...form.tag_ids, tagId] });
  };

  const getRiskBadge = (risk?: string) => {
    const r = (risk || "low").toLowerCase();
    if (r === "low") return "bg-green-50 border-green-200 text-green-700";
    if (r === "medium") return "bg-yellow-50 border-yellow-200 text-yellow-700";
    return "bg-red-50 border-red-200 text-red-700";
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">Treatments</h1>
          <p className="text-gray-500 font-medium">Manage treatment options and pricing</p>
        </div>
        <button onClick={openCreate} className="bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-md shadow-pink-100 flex items-center gap-2 whitespace-nowrap hidden sm:flex">
          <span className="text-xl leading-none">+</span> Add New Treatment
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full sm:w-96">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search treatments..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" />
          </div>
          <button onClick={openCreate} className="w-full sm:hidden bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white px-6 py-3.5 rounded-2xl font-bold transition-all flex justify-center items-center gap-2">
            <span className="text-xl leading-none">+</span> Add Treatment
          </button>
        </div>

        {loading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
             <div className="w-8 h-8 border-4 border-[#f1c3c9]/30 border-t-[#f1c3c9] rounded-full animate-spin"></div>
             <p className="text-gray-400 font-medium">Loading treatments...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white border-b border-gray-50 text-left text-gray-400 text-xs uppercase tracking-wider font-bold">
                  <th className="px-8 py-5">Treatment</th>
                  <th className="px-8 py-5">Clinic</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5">Duration</th>
                  <th className="px-8 py-5">Risk</th>
                  <th className="px-8 py-5">Rating</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {treatments.map((t) => (
                  <tr key={t.id} className="hover:bg-[#fdf4f5]/50 transition-colors group">
                    <td className="px-8 py-5 font-bold text-gray-900 group-hover:text-[#dbaeb4] transition-colors">{t.name}</td>
                    <td className="px-8 py-5 font-medium text-gray-500">{t.clinic_name || "—"}</td>
                    <td className="px-8 py-5 font-bold text-gray-900">฿{t.price?.toLocaleString()}</td>
                    <td className="px-8 py-5 font-medium text-gray-500">{t.duration_minutes}min</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold uppercase tracking-wide ${getRiskBadge(t.risk_level)}`}>{t.risk_level || "Low"}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5 bg-yellow-50 w-fit px-2.5 py-1 rounded-full border border-yellow-100/50">
                        <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span className="font-bold text-yellow-700">{t.rating?.toFixed(1) || "5.0"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right whitespace-nowrap">
                      <button onClick={() => openEdit(t)} className="w-8 h-8 inline-flex items-center justify-center rounded-xl text-gray-400 hover:text-[#dbaeb4] hover:bg-[#fdf4f5] transition-all mr-2" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button onClick={() => setDeleteId(t.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {treatments.length === 0 && (
                  <tr><td colSpan={7} className="px-8 py-16 text-center text-gray-400 font-medium">No treatments found matching your criteria.</td></tr>
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
          <div className="relative bg-white rounded-[2rem] w-full max-w-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden ring-1 ring-gray-100">
            <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center shrink-0 bg-white">
              <h2 className="text-2xl font-bold font-serif text-gray-900">{editId ? "Edit Treatment" : "Add New Treatment"}</h2>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto flex-1 bg-gray-50/30">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2">Basic Information</h3>
                {!editId && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Clinic *</label>
                    <select value={form.clinic_id} onChange={(e) => setForm({ ...form, clinic_id: e.target.value })} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all text-gray-700">
                      <option value="">-- Choose a clinic --</option>
                      {clinics.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Treatment Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="e.g. Premium Botox Injection" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Overview / Description</label>
                  <textarea rows={3} value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all resize-none" placeholder="Detailed explanation of the treatment..." />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2">Details & Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price (฿) *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">฿</span>
                      <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Duration (min) *</label>
                     <div className="relative">
                      <input type="number" value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: parseInt(e.target.value) || 0 })} className="w-full px-4 pr-12 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent text-sm font-bold">min</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Risk Level</label>
                    <select value={form.risk_level} onChange={(e) => setForm({ ...form, risk_level: e.target.value })} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all text-gray-700">
                      <option value="Low">🟢 Low</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="High">🔴 High</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Downtime</label>
                    <input type="text" value={form.downtime_days} onChange={(e) => setForm({ ...form, downtime_days: e.target.value })} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="e.g. 2-3 days, None" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Results Duration</label>
                    <input type="text" value={form.results_duration} onChange={(e) => setForm({ ...form, results_duration: e.target.value })} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="e.g. 6-12 months" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Best For</label>
                  <input type="text" value={form.best_for} onChange={(e) => setForm({ ...form, best_for: e.target.value })} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="e.g. Fine lines, wrinkles, acne scars" />
                </div>
              </div>

              {/* Tags Section */}
              {!editId && tags.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2">Categorization Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                      const isSelected = form.tag_ids.includes(tag.id);
                      return (
                        <button key={tag.id} onClick={() => toggleTag(tag.id)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${isSelected ? "bg-[#fdf4f5] border-[#f1c3c9] text-[#dbaeb4] shadow-sm" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                          {isSelected && <span className="mr-1.5">✓</span>}{tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Care Instructions */}
              {!editId && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-2">Care Instructions</h3>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <select value={carePhase} onChange={(e) => setCarePhase(e.target.value)} className="px-4 py-3 border border-gray-200 bg-gray-50/50 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent">
                      <option value="BEFORE">PRE-CARE</option>
                      <option value="AFTER">POST-CARE</option>
                    </select>
                    <input type="text" value={careText} onChange={(e) => setCareText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCareInstruction())} className="flex-1 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all" placeholder="Instruction details..." />
                    <button onClick={addCareInstruction} className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-bold transition-colors">Add Rule</button>
                  </div>
                  <div className="space-y-2">
                    {form.care_instructions.map((ci, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${ci.phase === "BEFORE" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{ci.phase}</span>
                        <span className="text-sm font-medium text-gray-700 flex-1">{ci.instruction}</span>
                        <button onClick={() => setForm({ ...form, care_instructions: form.care_instructions.filter((_, j) => j !== i) })} className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors shrink-0">&times;</button>
                      </div>
                    ))}
                    {form.care_instructions.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-4 italic">No care instructions added yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-8 py-5 border-t border-gray-50 flex justify-end gap-3 shrink-0 bg-white">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name || (!editId && !form.clinic_id)} className="px-8 py-3 bg-[#f1c3c9] text-white rounded-xl text-sm font-bold hover:bg-[#e4b2b8] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-md shadow-pink-100">{saving ? "Saving..." : editId ? "Update Treatment" : "Create Treatment"}</button>
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
            <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">Delete Treatment?</h3>
            <p className="text-sm font-medium text-gray-500 mb-8 px-4">This action cannot be undone. All related data will be removed.</p>
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
