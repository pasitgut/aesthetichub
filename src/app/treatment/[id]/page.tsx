"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface TreatmentDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  rating: number;
  review_count: number;
  image_url: string;
  clinic_name: string;
  clinic_id: string;
  category: string;
  downtime_days: string;
  results_duration: string;
  best_for: string;
  tags: string[];
  care_instructions: { phase: string; instruction: string }[];
}

interface Review {
  id: string;
  user_name: string;
  avatar_url: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function TreatmentDetailsPage() {
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const [treatment, setTreatment] = useState<TreatmentDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (params.id) {
      api.get<TreatmentDetail>(`/api/v1/treatments/${params.id}`).then((res) => {
        if (res.success && res.data) setTreatment(res.data);
        setLoading(false);
      });
      api.get<Review[]>(`/api/v1/treatments/${params.id}/reviews`).then((res) => {
        if (res.success && res.data) setReviews(res.data);
      });
    }
  }, [params.id]);

  const submitReview = async () => {
    if (!isAuthenticated) { window.location.href = "/login"; return; }
    if (!reviewText.trim()) return;
    setSubmitting(true);
    const res = await api.post("/api/v1/reviews", {
      treatment_id: params.id,
      rating: reviewRating,
      comment: reviewText,
    });
    if (res.success) {
      setReviewText("");
      setShowReviewForm(false);
      // Refresh reviews
      const updated = await api.get<Review[]>(`/api/v1/treatments/${params.id}/reviews`);
      if (updated.success && updated.data) setReviews(updated.data);
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-white py-10 px-4 flex items-center justify-center"><div className="animate-pulse text-gray-400 font-serif text-lg">Loading treatment...</div></div>;
  }
  if (!treatment) {
    return <div className="min-h-screen bg-white py-10 px-4 flex items-center justify-center"><div className="text-gray-500 font-serif text-lg">Treatment not found</div></div>;
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 1) return "Today";
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
  };

  console.log("Treatments: ", treatment);
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm">
              {treatment.image_url ? (
                <Image src={treatment.image_url} alt={treatment.name} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#fdf4f5] to-[#f1c3c9] flex items-center justify-center"><span className="text-6xl">💆</span></div>
              )}
            </div>

            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">{treatment.name}</h1>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-600 font-medium">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-1.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 fill-current ${i < Math.round(treatment.rating || 0) ? "" : "text-gray-200"}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-900 font-bold mr-1">{treatment.rating?.toFixed(1) || "0.0"}</span>
                  <span className="text-gray-400 font-normal">({treatment.review_count || 0} reviews)</span>
                </div>
                {treatment.duration_minutes && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {treatment.duration_minutes}
                  </div>
                )}
                {treatment.clinic_name && (
                  <Link href={`/clinic/${treatment.clinic_id}`} className="flex items-center text-[#dcb5b9] font-semibold hover:underline">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" />
                    </svg>
                    {treatment.clinic_name}
                  </Link>
                )}
              </div>
            </div>

            {/* Overview */}
            {treatment.description && (
              <div>
                <h2 className="text-xl font-bold font-serif mb-4 text-gray-900">Treatment Overview</h2>
                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">{treatment.description}</div>
              </div>
            )}

            {/* Tags */}
            {treatment.tags && treatment.tags.length > 0 && (
              <div>
                <h2 className="text-xl font-bold font-serif mb-4 text-gray-900">Suitable For</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {treatment.tags.map((tag, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-3 sm:p-4 bg-[#fdf4f5]/50 border border-pink-100/50 rounded-2xl hover:bg-white hover:shadow-sm hover:border-pink-200 transition-all text-center group cursor-default">
                      <span className="text-xl sm:text-2xl mb-1.5 opacity-80 group-hover:scale-110 transition-transform">{["💧", "✨", "🌟", "🛡️", "⚡"][i % 5]}</span>
                      <span className="font-medium text-gray-700">
                        {typeof tag === 'string' ? tag : (tag as any).name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Care Instructions */}
            {treatment.care_instructions && treatment.care_instructions.length > 0 && (
              <div>
                <h2 className="text-xl font-bold font-serif mb-4 text-gray-900">Precautions & Post-Treatment Care</h2>
                <div className="space-y-4">
                  {treatment.care_instructions.map((ci, i) => (
                    <div key={i} className={`p-6 rounded-2xl border ${ci.phase === "before" ? "bg-[#fffbeb] border-yellow-100" : "bg-[#eff6ff] border-blue-100"}`}>
                      <h3 className="font-bold text-gray-900 mb-2">{ci.phase === "before" ? "Before Treatment" : "After Treatment"}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{ci.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-bold font-serif mb-6 text-gray-900">Patient Reviews</h2>
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => { if (!isAuthenticated) { window.location.href = "/login"; return; } setShowReviewForm(!showReviewForm); }} className="bg-[#f5ced2] hover:bg-[#ebb8bd] text-white px-6 py-2 rounded-lg font-serif transition-colors">
                  Write review
                </button>
              </div>

              {showReviewForm && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-600 font-medium">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setReviewRating(star)} className={`text-xl ${star <= reviewRating ? "text-yellow-400" : "text-gray-200"}`}>★</button>
                    ))}
                  </div>
                  <textarea rows={4} placeholder="Write your review..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f5ced2] focus:border-transparent resize-none mb-3 font-serif placeholder:italic" />
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setShowReviewForm(false)} className="bg-black hover:bg-gray-800 text-white px-8 py-2.5 rounded-lg font-serif transition-colors">Cancel</button>
                    <button onClick={submitReview} disabled={submitting} className="bg-[#f5ced2] hover:bg-[#ebb8bd] disabled:bg-gray-300 text-white px-8 py-2.5 rounded-lg font-serif transition-colors">{submitting ? "Submitting..." : "Done"}</button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#f1c3c9] flex items-center justify-center text-white font-bold">{review.user_name?.charAt(0).toUpperCase() || "U"}</div>
                      <div>
                        <h4 className="font-bold text-gray-900">{review.user_name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-3.5 h-3.5 fill-current ${i < review.rating ? "" : "text-gray-200"}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{review.comment}</p>
                  </div>
                ))}
                {reviews.length === 0 && <p className="text-gray-400 text-center py-8 font-serif">No reviews yet. Be the first to review!</p>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#faf8f6] rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-1">Starting from</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">฿{treatment.price?.toLocaleString()}</h3>
                <p className="text-gray-400 text-xs">Per treatment area</p>
              </div>
              <Link href={`/compare?ids=${treatment.id}`} className="w-full bg-[#f5ced2] hover:bg-[#ebb8bd] text-white py-3 rounded-xl font-serif text-lg transition-colors shadow-sm mb-8 block text-center">Compare</Link>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-sm font-serif">Treatment Details</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between items-center border-b border-gray-200/60 pb-3"><span className="text-gray-500">Duration</span><span className="font-medium text-gray-900">{treatment.duration_minutes || "N/A"}</span></li>
                  <li className="flex justify-between items-center border-b border-gray-200/60 pb-3"><span className="text-gray-500">Downtime</span><span className="font-medium text-gray-900">{treatment.downtime_days || "None"}</span></li>
                  <li className="flex justify-between items-center border-b border-gray-200/60 pb-3"><span className="text-gray-500">Results Last</span><span className="font-medium text-gray-900">{treatment.results_duration || "N/A"}</span></li>
                  <li className="flex justify-between items-center"><span className="text-gray-500">Best For</span><span className="font-medium text-gray-900">{treatment.best_for || "All skin types"}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
