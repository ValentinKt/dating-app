import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultPage = () => {
    const { state } = useLocation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useEffect(() => {
        if (!state) {
            setError("Aucune donnée de profil trouvée");
            setLoading(false);
            return;
        }

        const fetchProfiles = async () => {
            try {
                setLoading(true);
                // Determine the opposite gender for matches
                let targetGender = '';
                if (state.gender === 'male') {
                    targetGender = 'female';
                } else if (state.gender === 'female') {
                    targetGender = 'male';
                } else {
                    // For 'autre', show both genders
                    targetGender = Math.random() > 0.5 ? 'male' : 'female';
                }

                const response = await fetch(`https://randomuser.me/api/?gender=${targetGender}&results=6&nat=fr&inc=name,location,dob,picture&noinfo`);
                const data = await response.json();
                
                if (data.results) {
                    setResults(data.results);
                } else {
                    setError("Erreur lors du chargement des profils");
                }
            } catch (err) {
                setError("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [state]);
        
        

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
                    <div className="text-6xl mb-4">😔</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Oups !</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link 
                        to="/form" 
                        className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform duration-200"
                    >
                        Réessayer
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
                    >
                        ← Retour à l'accueil
                    </Link>
                    <div className="text-5xl mb-4">💕</div>
                    <h2 className="text-4xl font-extrabold text-pink-600 mb-2">
                        Vos matches parfaits !
                    </h2>
                    {state && (
                        <p className="text-lg text-gray-600">
                            Bonjour {state.prenom} ! Voici des profils qui pourraient vous intéresser
                        </p>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
                            <p className="text-xl text-gray-600">Recherche de vos matches parfaits...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {results.map((person, idx) => (
                              <div 
                                  key={idx} 
                                  className="profile-card shadow-lg rounded-2xl overflow-hidden animate-fadeInUp"
                                  style={{ animationDelay: `${idx * 0.1}s` }}
                              >
                                <div className="relative">
                                    <img
                                        src={person.picture.large}
                                        alt={`${person.name.first} ${person.name.last}`}
                                        className="w-full h-64 object-cover filter brightness-105 contrast-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${person.name.first}+${person.name.last}&size=400&background=random&color=fff&format=png`;
                                        }}
                                    />
                                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                                        <span className="text-2xl">💖</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                     <div className="flex items-center justify-between mb-3">
                                         <h3 className="font-bold text-xl text-gray-800">
                                             {person.name.first} {person.name.last}
                                         </h3>
                                         <div className="flex items-center space-x-1">
                                             <span className="text-green-500 text-sm">●</span>
                                             <span className="text-xs text-gray-500">En ligne</span>
                                         </div>
                                     </div>
                                     <div className="space-y-2 mb-4">
                                         <p className="text-gray-600 flex items-center">
                                             <span className="mr-2">📍</span>
                                             {person.location.city}, {person.location.country}
                                         </p>
                                         <p className="text-gray-600 flex items-center">
                                             <span className="mr-2">🎂</span>
                                             {person.dob.age} ans
                                         </p>
                                         <div className="flex items-center space-x-2 mt-3">
                                             <div className="flex space-x-1">
                                                 {[1,2,3,4,5].map((star) => (
                                                     <span key={star} className="text-yellow-400 text-sm">⭐</span>
                                                 ))}
                                             </div>
                                             <span className="text-xs text-gray-500">(4.8/5)</span>
                                         </div>
                                     </div>
                                    <button 
                                         onClick={() => showNotification(`Message envoyé à ${person.name.first} ! 💕`)}
                                         className="w-full btn-shimmer text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                                     >
                                          💌 Envoyer un message
                                      </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && results.length === 0 && !error && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Aucun profil trouvé</h3>
                        <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
                        <Link 
                            to="/form" 
                            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform duration-200"
                        >
                            Modifier mon profil
                        </Link>
                    </div>
                )}

                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInUp">
                        <div className="flex items-center space-x-2">
                            <span>✅</span>
                            <span>{toastMessage}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultPage;

