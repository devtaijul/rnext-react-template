import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useMe } from "../hooks/useMe";

export const EditProfile = () => {
  const { api } = useAuth();
  const { me, loading, error, refetch } = useMe(); // ✅ fresh user
  const fileRef = useRef(null);

  console.log(me, "me");

  // ---------- Profile Form ----------
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: pErrors, isSubmitting: pSubmitting },
    watch: watchProfile,
    reset: resetProfile,
  } = useForm({
    defaultValues: { website: "", bio: "", gender: "Prefer not to say" },
  });

  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/users/user-1.png"
  );
  const [profileMsg, setProfileMsg] = useState("");

  // hydrate form when `me` changes
  useEffect(() => {
    if (!me) return;
    resetProfile({
      website: me.website || "",
      bio: me.bio || "",
      gender: me.gender || "Prefer not to say",
    });
    setAvatarPreview(me.avatar || "/assets/users/user-1.png");
  }, [me, resetProfile]);

  const onPickAvatar = () => fileRef.current?.click();
  const onAvatarChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarPreview(URL.createObjectURL(f));
  };

  const onSubmitProfile = async (values) => {
    setProfileMsg("");
    try {
      // 1) avatar আপলোড
      if (fileRef.current?.files?.[0]) {
        const fd = new FormData();
        fd.append("avatar", fileRef.current.files[0]);
        await api.post("/users/me/avatar", fd);
      }
      // 2) profile fields আপডেট
      await api.patch("/users/me", {
        website: values.website?.trim(),
        bio: values.bio?.trim(),
        gender: values.gender,
      });
      setProfileMsg("Profile updated successfully.");
      await refetch(); // ✅ UI refresh with fresh /users/me
    } catch (err) {
      setProfileMsg(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update profile"
      );
    }
  };

  // ---------- Password Form ----------
  const {
    register: registerPw,
    handleSubmit: handleSubmitPw,
    formState: { errors: pwErrors, isSubmitting: pwSubmitting },
    watch: watchPw,
    setError: setPwError,
    reset: resetPw,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCon, setShowCon] = useState(false);
  const [pwMsg, setPwMsg] = useState("");

  const newPassword = watchPw("newPassword");

  // strength: 0–4 (red→orange→yellow→green)
  const scorePw = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(s, 4);
  };
  const strength = useMemo(() => scorePw(newPassword), [newPassword]);

  const onSubmitPassword = async (values) => {
    setPwMsg("");
    if (values.newPassword !== values.confirmPassword) {
      setPwError("confirmPassword", {
        type: "mismatch",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      await api.post("/auth/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      setPwMsg("Password changed successfully.");
      resetPw();
    } catch (err) {
      setPwMsg(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to change password"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-zinc-400">
        Loading profile…
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-red-400">
        Failed to load: {error}
      </div>
    );
  }

  return (
    <div className="edit-container">
      <h1 className="text-2xl font-bold mb-8">Edit profile</h1>

      {/* PROFILE SECTION */}
      <form
        onSubmit={handleSubmitProfile(onSubmitProfile)}
        className="space-y-6"
      >
        {/* Profile Picture */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img
                src={avatarPreview}
                alt={me?.name || "User"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-base">
                {me?.name || "Your Name"}
              </h2>
              <p className="text-gray-500">@{me?.username || "username"}</p>
            </div>
            <button
              type="button"
              onClick={onPickAvatar}
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition"
            >
              Change photo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarChange}
            />
          </div>
        </div>

        {/* Website */}
        <div className="bg-white rounded-lg p-6">
          <label className="block mb-2 font-medium">Website</label>
          <input
            type="url"
            className="form-input mb-2"
            placeholder="https://your.site"
            {...registerProfile("website", {
              pattern: {
                value:
                  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/,
                message: "Enter a valid URL",
              },
            })}
          />
          {pErrors.website && (
            <p className="text-xs text-red-500">{pErrors.website.message}</p>
          )}
          <p className="text-gray-500 text-xs">
            Editing your links is only available on mobile. Visit the PhotoBooth
            app and edit your profile to change the websites in your bio.
          </p>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-lg p-6">
          <label className="block mb-2 font-medium">Bio</label>
          <textarea
            className="form-input resize-none h-24 mb-1"
            maxLength={150}
            placeholder="Write something about you…"
            {...registerProfile("bio", {
              maxLength: { value: 150, message: "Max 150 characters" },
            })}
          />
          <div className="flex justify-between">
            {pErrors.bio ? (
              <span className="text-xs text-red-500">
                {pErrors.bio.message}
              </span>
            ) : (
              <span className="text-gray-500 text-xs">
                {(watchProfile("bio") || "").length} / 150
              </span>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="bg-white rounded-lg p-6">
          <label className="block mb-2 font-medium">Gender</label>
          <div className="relative">
            <select
              className="form-input appearance-none pr-8"
              {...registerProfile("gender")}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
              <option>Custom</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            This won't be part of your public profile.
          </p>
        </div>

        {/* Profile Save */}
        {profileMsg && (
          <div
            className={`text-sm px-3 py-2 rounded ${
              profileMsg.includes("success")
                ? "bg-green-500/10 text-green-600 border border-green-500/30"
                : "bg-red-500/10 text-red-500 border border-red-500/30"
            }`}
          >
            {profileMsg}
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="bg-blue-100 text-blue-500 px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition disabled:opacity-60"
            disabled={pSubmitting}
          >
            {pSubmitting ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>

      {/* CHANGE PASSWORD */}
      <form onSubmit={handleSubmitPw(onSubmitPassword)} className="mt-6">
        <div className="bg-white rounded-lg p-6">
          <h2 className="font-medium text-lg mb-4">Change Password</h2>

          {/* Current Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm">Current Password</label>
            <div className="relative">
              <input
                type={showCur ? "text" : "password"}
                className="form-input pr-10"
                placeholder="Enter your current password"
                {...registerPw("currentPassword", {
                  required: "Current password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowCur((s) => !s)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm"
                tabIndex={-1}
              >
                {showCur ? "Hide" : "Show"}
              </button>
            </div>
            {pwErrors.currentPassword && (
              <p className="text-xs text-red-500 mt-1">
                {pwErrors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                className="form-input pr-10 mb-2"
                placeholder="Enter new password"
                {...registerPw("newPassword", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm"
                tabIndex={-1}
              >
                {showNew ? "Hide" : "Show"}
              </button>
            </div>

            {/* Strength Meter */}
            <div className="flex w-full h-1 mb-1 gap-1">
              <span
                className={`flex-1 rounded ${
                  strength >= 1 ? "bg-red-500" : "bg-gray-200"
                }`}
              />
              <span
                className={`flex-1 rounded ${
                  strength >= 2 ? "bg-orange-500" : "bg-gray-200"
                }`}
              />
              <span
                className={`flex-1 rounded ${
                  strength >= 3 ? "bg-yellow-500" : "bg-gray-200"
                }`}
              />
              <span
                className={`flex-1 rounded ${
                  strength >= 4 ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            </div>
            <p className="text-xs text-gray-500 mb-3">
              For a strong password, use at least 8 characters with a mix of
              letters, numbers, and symbols.
            </p>
            {pwErrors.newPassword && (
              <p className="text-xs text-red-500 -mt-2 mb-2">
                {pwErrors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm">Confirm New Password</label>
            <div className="relative">
              <input
                type={showCon ? "text" : "password"}
                className="form-input pr-10"
                placeholder="Confirm new password"
                {...registerPw("confirmPassword", {
                  required: "Confirm your new password",
                })}
              />
              <button
                type="button"
                onClick={() => setShowCon((s) => !s)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm"
                tabIndex={-1}
              >
                {showCon ? "Hide" : "Show"}
              </button>
            </div>
            {pwErrors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {pwErrors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Footer */}
          {pwMsg && (
            <div
              className={`text-sm px-3 py-2 rounded mb-3 ${
                pwMsg.includes("success")
                  ? "bg-green-500/10 text-green-600 border border-green-500/30"
                  : "bg-red-500/10 text-red-500 border border-red-500/30"
              }`}
            >
              {pwMsg}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition disabled:opacity-60"
            disabled={pwSubmitting}
          >
            {pwSubmitting ? "Changing..." : "Change Password"}
          </button>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              After changing your password, you'll be logged out of all devices
              except the ones you're using now.
            </p>
          </div>
        </div>
      </form>

      {/* Privacy Note */}
      <div className="mb-6 mt-6">
        <p className="text-gray-500 text-sm">
          Certain profile info, like your name, bio and links, is visible to
          everyone.{" "}
          <a href="#" className="text-blue-500">
            See what profile info is visible
          </a>
        </p>
      </div>
    </div>
  );
};
