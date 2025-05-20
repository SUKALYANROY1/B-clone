"use client";
import React from "react";

export default function LoginModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <button className="mb-2" onClick={onClose}>←</button>
        <div className="text-center mb-4">
          <h2 className="font-bold text-lg mt-2">India's last minute app</h2>
          <p className="text-sm text-gray-500">Log in or Sign up</p>
        </div>
        <input
          type="tel"
          placeholder="Enter mobile number"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <button className="w-full bg-gray-400 text-white py-2 rounded">Continue</button>
        <p className="text-xs text-gray-400 mt-2">
          By continuing, you agree to our Terms of service & Privacy policy
        </p>
      </div>
    </div>
  );
} 