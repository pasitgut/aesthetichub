"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Assessment {
  id: string;
  title: string;
  created_at: string;
  status: string;
  concerns: string;
  skin_type: string;
}

interface SavedClinic {
  id: string;
  clinic_id: string;
  name: string;
  location: string;
  rating: number;
}

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, refreshUser } = useAuth();
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [savedClinics, setSavedClinics] = useState<SavedClinic[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    if (isAuthenticated) {
      Promise.all([
        api.get<UserProfile>("/api/v1/profile"),
        api.get<Assessment[]>("/api/v1/assessments"),
        api.get<SavedClinic[]>("/api/v1/saved-clinics"),
      ]).then(([profileRes, assessRes, clinicsRes]) => {
        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
          setFirstName(profileRes.data.first_name);
          setLastName(profileRes.data.last_name);
        }
        if (assessRes.success && assessRes.data) setAssessments(assessRes.data);
        if (clinicsRes.success && clinicsRes.data) setSavedClinics(clinicsRes.data);
        setLoading(false);
      });
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSaveProfile = async () => {
    setSaving(true);
    const res = await api.put("/api/v1/profile", { first_name: firstName, last_name: lastName });
    if (res.success) {
      setEditMode(false);
      await refreshUser();
    }
    setSaving(false);
  };

  const handleUnsaveClinic = async (clinicId: string) => {
    await api.del(`/api/v1/saved-clinics/${clinicId}`);
    setSavedClinics(savedClinics.filter((c) => c.clinic_id !== clinicId));
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-[#f8f7f5] py-10 flex items-center justify-center"><div className="animate-pulse text-gray-400 font-serif text-lg">Loading profile...</div></div>;
  }

  const displayName = profile ? `${profile.first_name} ${profile.last_name}` : user?.first_name || "User";

  return (
    <div className="min-h-screen bg-[#f8f7f5] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-2/3 order-2 lg:order-1 space-y-8">
          {/* Assessment History */}
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif tracking-wide">Assessment History</h2>
            <div className="space-y-6">
              {assessments.length > 0 ? assessments.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{item.title || "Assessment"}</h3>
                      <p className="text-sm text-gray-500 mt-1">Completed on {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#e6fcf0] text-[#1e884e]">{item.status || "Completed"}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-5 mt-4">
                    {item.concerns && (<><span className="font-medium text-gray-700">Primary concerns:</span> {item.concerns}<span className="mx-2 text-gray-300">|</span></>)}
                    {item.skin_type && (<><span className="font-medium text-gray-700">Skin type:</span> {item.skin_type}</>)}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/assessment`} className="flex-1 bg-[#e8aeb2] hover:bg-[#d89ba0] text-white font-medium py-2.5 rounded-lg transition-colors text-center shadow-sm">View Results</Link>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 text-gray-400">
                  <p className="font-serif">No assessments yet.</p>
                  <Link href="/assessment" className="text-[#f1c3c9] hover:underline text-sm mt-2 inline-block">Take your first assessment →</Link>
                </div>
              )}
            </div>
          </section>

          {/* Saved Clinics */}
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif tracking-wide">Saved Clinics</h2>
            <div className="space-y-4">
              {savedClinics.length > 0 ? savedClinics.map((clinic) => (
                <div key={clinic.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#fdf4f5] text-[#f1c3c9] flex items-center justify-center shrink-0 font-bold text-lg">
                      {clinic.name?.charAt(0).toUpperCase() || "C"}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{clinic.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{clinic.location}</p>
                      <div className="flex items-center text-sm font-medium text-gray-700">
                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {clinic.rating?.toFixed(1) || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/clinic/${clinic.clinic_id}`} className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">View</Link>
                    <button onClick={() => handleUnsaveClinic(clinic.clinic_id)} className="border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500 px-3 py-2 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 text-gray-400">
                  <p className="font-serif">No saved clinics yet.</p>
                  <Link href="/clinic" className="text-[#f1c3c9] hover:underline text-sm mt-2 inline-block">Browse clinics →</Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/3 order-1 lg:order-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-4">
              <div className="w-full h-full rounded-full bg-[#f1c3c9] flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                {profile?.first_name?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>

            {editMode ? (
              <div className="w-full space-y-3 mb-4">
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] text-gray-700 text-sm text-center" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f1c3c9] text-gray-700 text-sm text-center" />
                <div className="flex gap-2">
                  <button onClick={() => setEditMode(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium">Cancel</button>
                  <button onClick={handleSaveProfile} disabled={saving} className="flex-1 py-2 bg-[#f1c3c9] hover:bg-[#e4b2b8] text-white rounded-lg text-sm font-medium disabled:bg-gray-300">{saving ? "Saving..." : "Save"}</button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
                <p className="text-gray-500 text-sm mb-6">{profile?.email || user?.email}</p>
                <button onClick={() => setEditMode(true)} className="w-full py-2 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  Edit Profile
                </button>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/assessment" className="flex items-center gap-3 w-full p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group">
                <div className="text-[#e8aeb2] bg-[#fdf4f5] p-2 rounded-lg group-hover:bg-[#f1c3c9] group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <span className="font-medium text-gray-700">New Assessment</span>
              </Link>
              <Link href="/clinic" className="flex items-center gap-3 w-full p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group">
                <div className="text-[#e8aeb2] bg-[#fdf4f5] p-2 rounded-lg group-hover:bg-[#f1c3c9] group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <span className="font-medium text-gray-700">Browse Clinics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
