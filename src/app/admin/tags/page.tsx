"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface Tag {
  id: string;
  name: string;
  category: string;
}

const CATEGORIES = [
  { value: "SKIN_TYPE", label: "Skin Type", color: "bg-blue-50 border-blue-100 text-blue-600", active: "bg-blue-500 text-white shadow-blue-200" },
  { value: "CONCERN", label: "Concern", color: "bg-purple-50 border-purple-100 text-purple-600", active: "bg-purple-500 text-white shadow-purple-200" },
  { value: "TREATMENT_TYPE", label: "Treatment Type", color: "bg-emerald-50 border-emerald-100 text-emerald-600", active: "bg-emerald-500 text-white shadow-emerald-200" },
];

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("SKIN_TYPE");
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const fetchTags = async () => {
    setLoading(true);
    const res = await api.get<Tag[]>("/api/v1/tags");
    if (res.success && res.data) setTags(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchTags(); }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setSaving(true);
    await api.post("/api/v1/admin/tags", { name: name.trim(), category });
    setSaving(false);
    setShowModal(false);
    setName("");
    fetchTags();
  };

  const getCategoryInfo = (cat: string) => CATEGORIES.find((c) => c.value === cat) || { value: cat, label: cat, color: "bg-gray-50 border-gray-200 text-gray-600", active: "bg-gray-600 text-white" };

  const filteredTags = filter === "ALL" ? tags : tags.filter((t) => t.category === filter);
  const grouped = CATEGORIES.map((c) => ({ ...c, tags: filteredTags.filter((t) => t.category === c.value) })).filter((g) => g.tags.length > 0 || filter === "ALL");

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">Tag Management</h1>
          <p className="text-gray-500 font-medium">Create and organize taxonomy for filtering</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-md shadow-pink-100 flex items-center justify-center gap-2 whitespace-nowrap">
          <span className="text-xl leading-none">+</span> Create New Tag
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
        <button onClick={() => setFilter("ALL")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${filter === "ALL" ? "bg-gray-900 text-white shadow-md shadow-gray-200" : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>Every Category</button>
        <div className="w-px h-8 bg-gray-100 self-center hidden sm:block mx-1"></div>
        {CATEGORIES.map((c) => (
          <button key={c.value} onClick={() => setFilter(c.value)} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${filter === c.value ? "bg-gray-900 text-white shadow-md shadow-gray-200" : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>{c.label}</button>
        ))}
      </div>

      {loading ? (
        <div className="p-20 text-center flex flex-col items-center justify-center gap-4 bg-white rounded-[2rem] border border-gray-50 shadow-sm">
           <div className="w-8 h-8 border-4 border-[#f1c3c9]/30 border-t-[#f1c3c9] rounded-full animate-spin"></div>
           <p className="text-gray-400 font-medium">Loading tags...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map((group) => (
            <div key={group.value} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
              <div className="p-6 md:p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                  <div className={`w-3 h-8 rounded-full ${group.color.split(' ')[0]}`}></div>
                  <h2 className="text-xl font-bold font-serif text-gray-900">{group.label}</h2>
                 </div>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-400 border border-gray-100 shadow-sm">{group.tags.length} TAGS</span>
              </div>
              <div className="p-6 md:p-8">
                {group.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {group.tags.map((tag) => (
                      <div key={tag.id} className={`inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-xl text-sm font-bold transition-all hover:scale-[1.02] cursor-default shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] ${group.color}`}>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-400 py-6 text-center italic">No tags associated with this category yet</p>
                )}
              </div>
            </div>
          ))}

          {filteredTags.length === 0 && filter === "ALL" && (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-pink-200">
              <div className="w-20 h-20 bg-[#fdf4f5] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🏷️</div>
              <h3 className="text-2xl font-bold text-gray-900 font-serif mb-2">Your Taxonomy is Empty</h3>
              <p className="text-gray-500 font-medium mb-6">Create your first tag to start categorizing treatments.</p>
              <button onClick={() => setShowModal(true)} className="bg-[#f1c3c9] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#e4b2b8] transition-all shadow-md shadow-pink-100">Create First Tag</button>
            </div>
          )}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden ring-1 ring-gray-100">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white shrink-0">
              <h2 className="text-2xl font-bold font-serif text-gray-900">Create New Tag</h2>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            
            <div className="p-8 space-y-6 bg-gray-50/30">
               <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category Segment *</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {CATEGORIES.map((c) => (
                    <button 
                      key={c.value} 
                      onClick={() => setCategory(c.value)} 
                      className={`px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between border-2 ${category === c.value ? `border-[#f1c3c9] bg-[#fdf4f5] text-gray-900 shadow-sm` : `border-transparent bg-white text-gray-500 hover:border-gray-100 hover:bg-gray-50`}`}
                    >
                      {c.label}
                      {category === c.value && <div className="w-2.5 h-2.5 rounded-full bg-[#f1c3c9]"></div>}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Display Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] focus:border-transparent text-sm font-medium transition-all shadow-sm" placeholder="e.g. Sensitive Skin, Acne Scarring" />
              </div>
             
              <div className="p-4 bg-white rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Preview</span>
                <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold border ${getCategoryInfo(category).color}`}>
                  {name || "Your Tag Name"}
                </span>
              </div>
            </div>

            <div className="p-6 border-t border-gray-50 flex justify-end gap-3 bg-white">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors w-1/3">Cancel</button>
              <button onClick={handleCreate} disabled={saving || !name.trim()} className="px-8 py-3 bg-[#f1c3c9] text-white rounded-xl text-sm font-bold hover:bg-[#e4b2b8] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-md shadow-pink-100 flex-1">{saving ? "Creating..." : "Save Tag"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
