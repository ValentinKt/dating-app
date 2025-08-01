import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        prenom: "",
        age: "",
        gender: "",
        bio: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Le nom est requis";
        if (!form.prenom.trim()) newErrors.prenom = "Le prénom est requis";
        if (!form.age || form.age < 18) newErrors.age = "Vous devez avoir au moins 18 ans";
        if (!form.gender) newErrors.gender = "Veuillez sélectionner votre genre";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            navigate("/result", { state: form });
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
            <div className="w-full max-w-md">
                <Link 
                    to="/" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
                >
                    ← Retour à l'accueil
                </Link>
                <form
                    className="bg-white p-8 rounded-2xl shadow-xl border border-blue-200 transform hover:scale-105 transition-all duration-300"
                    onSubmit={handleSubmit}
                >
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-2">💖</div>
                        <h2 className="text-3xl font-extrabold text-blue-600">Inscription</h2>
                        <p className="text-gray-600 mt-2">Créez votre profil en quelques étapes</p>
                    </div>
                <div className="mb-5">
                    <label className="block mb-2 font-semibold text-gray-700">Nom</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.name 
                                ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                                : 'border-blue-300 focus:ring-blue-400 hover:border-blue-400'
                        }`}
                        placeholder="Votre nom"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.name}</p>}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 font-semibold text-gray-700">Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        value={form.prenom}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.prenom 
                                ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                                : 'border-blue-300 focus:ring-blue-400 hover:border-blue-400'
                        }`}
                        placeholder="Votre prénom"
                    />
                    {errors.prenom && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.prenom}</p>}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 font-semibold text-gray-700">Âge</label>
                    <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.age 
                                ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                                : 'border-blue-300 focus:ring-blue-400 hover:border-blue-400'
                        }`}
                        min="18"
                        placeholder="Votre âge"
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.age}</p>}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 font-semibold text-gray-700">Genre</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.gender 
                                ? 'border-red-400 focus:ring-red-400 bg-red-50' 
                                : 'border-blue-300 focus:ring-blue-400 hover:border-blue-400'
                        }`}
                    >
                        <option value="">Sélectionner votre genre</option>
                        <option value="male">👨 Homme</option>
                        <option value="female">👩 Femme</option>
                        <option value="autre">🌈 Autre</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.gender}</p>}
                </div>
                <div className="mb-8">
                    <label className="block mb-2 font-semibold text-gray-700">Bio (optionnel)</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 transition-all duration-200 resize-none"
                        rows="4"
                        placeholder="Parlez-nous de vous... Vos passions, ce que vous recherchez... ✨"
                        maxLength="500"
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                        {form.bio.length}/500 caractères
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`block w-full py-4 rounded-xl text-center font-bold transition-all duration-300 transform shadow-lg ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'btn-shimmer text-white hover:scale-105 hover:shadow-xl hover:-translate-y-1'
                    }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Création en cours...
                        </div>
                    ) : (
                        '🚀 Créer mon profil'
                    )}
                </button>
                </form>
            </div>
        </div>
    );
};

export default FormPage;
