import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full border border-purple-200 text-center transform hover:scale-105 transition-all duration-300">
        <div className="mb-6">
          <div className="text-6xl mb-4 animate-pulse-heart">💕</div>
          <h1 className="text-4xl font-extrabold text-purple-600 mb-4">
            Bienvenue sur <span className="text-pink-500">Dating App</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            L'application qui te fera rencontrer l'Amour ✨
          </p>
        </div>
        <Link
          to="/form"
          className="inline-block btn-shimmer text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          🚀 Commencer l'aventure
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          Rejoignez des milliers de célibataires
        </p>
      </div>
    </div>
  );
}
