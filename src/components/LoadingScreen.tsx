import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>

        {/* Loading Text */}
        <h2 className="text-white text-2xl font-bold mb-2">Memuat...</h2>
        <p className="text-blue-100">Sedang mempersiapkan konten untuk Anda</p>

        {/* School Logo or Icon */}
        <div className="mt-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-school text-white text-3xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
