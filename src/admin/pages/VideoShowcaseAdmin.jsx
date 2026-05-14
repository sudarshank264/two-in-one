import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSave, FiTrash2, FiPlayCircle, FiPlus } from 'react-icons/fi';

const VideoShowcaseAdmin = ({ websiteType }) => {
    const [showcase, setShowcase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        buttonText: 'Book Appointment',
        buttonLink: '/appointment',
        relatedText: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const API_URL = 'http://localhost:5001/api/video-showcase';

    useEffect(() => {
        fetchShowcase();
    }, [websiteType]);

    const fetchShowcase = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/type/${websiteType}`);
            if (response.data.success && response.data.data) {
                setShowcase(response.data.data);
                setFormData({
                    title: response.data.data.title || '',
                    description: response.data.data.description || '',
                    videoUrl: response.data.data.videoUrl || '',
                    buttonText: response.data.data.buttonText || '',
                    buttonLink: response.data.data.buttonLink || '',
                    relatedText: response.data.data.relatedText || ''
                });
                setIsEditing(true);
            }
        } catch (error) {
            // If 404, it means no showcase exists yet, which is fine
            if (error.response && error.response.status === 404) {
                setShowcase(null);
                setIsEditing(false);
            } else {
                console.error("Error fetching video showcase:", error);
                setError("Failed to load video showcase data.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const dataToSubmit = { ...formData, websiteType, isActive: true };

            if (showcase && showcase._id) {
                // Update
                const res = await axios.put(`${API_URL}/${showcase._id}`, dataToSubmit, getAuthHeaders());
                setShowcase(res.data.data);
                setSuccess('Video showcase updated successfully!');
            } else {
                // Create
                const res = await axios.post(API_URL, dataToSubmit, getAuthHeaders());
                setShowcase(res.data.data);
                setIsEditing(true);
                setSuccess('Video showcase created successfully!');
            }
        } catch (error) {
            console.error("Error saving video showcase:", error);
            setError(error.response?.data?.message || 'Failed to save video showcase');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this video showcase?')) return;
        
        try {
            await axios.delete(`${API_URL}/${showcase._id}`, getAuthHeaders());
            setShowcase(null);
            setFormData({
                title: '',
                description: '',
                videoUrl: '',
                buttonText: 'Book Appointment',
                buttonLink: '/appointment',
                relatedText: ''
            });
            setIsEditing(false);
            setSuccess('Video showcase deleted successfully!');
        } catch (error) {
            console.error("Error deleting video showcase:", error);
            setError('Failed to delete video showcase');
        }
    };

    const extractYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (loading) return <div className="admin-loading">Loading...</div>;

    return (
        <div className="admin-content-inner">
            <div className="admin-header">
                <h2>{websiteType === 'doctor' ? 'Doctor' : "Let's Play Zone"} Video Showcase</h2>
            </div>

            {error && <div className="admin-error-message">{error}</div>}
            {success && <div className="admin-success-message">{success}</div>}

            <div className="admin-card">
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Title *</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="e.g. Welcome to Our Clinic"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleInputChange} 
                            required 
                            rows="4"
                            placeholder="Enter description text here..."
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Video URL (YouTube) *</label>
                        <input 
                            type="text" 
                            name="videoUrl" 
                            value={formData.videoUrl} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                        {formData.videoUrl && extractYouTubeId(formData.videoUrl) && (
                            <div style={{ marginTop: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                                <iframe 
                                    width="100%" 
                                    height="200" 
                                    src={`https://www.youtube.com/embed/${extractYouTubeId(formData.videoUrl)}`} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>

                    <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Button Text</label>
                            <input 
                                type="text" 
                                name="buttonText" 
                                value={formData.buttonText} 
                                onChange={handleInputChange} 
                                placeholder="e.g. Book Appointment"
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Button Link</label>
                            <input 
                                type="text" 
                                name="buttonLink" 
                                value={formData.buttonLink} 
                                onChange={handleInputChange} 
                                placeholder="e.g. /appointment"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Related Text (Optional small text below button)</label>
                        <input 
                            type="text" 
                            name="relatedText" 
                            value={formData.relatedText} 
                            onChange={handleInputChange} 
                            placeholder="e.g. 100% Secure & Confidential"
                        />
                    </div>

                    <div className="admin-form-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="admin-btn-primary">
                            <FiSave /> {isEditing ? 'Update Showcase' : 'Save Showcase'}
                        </button>
                        {isEditing && (
                            <button type="button" className="admin-btn-danger" onClick={handleDelete}>
                                <FiTrash2 /> Delete
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VideoShowcaseAdmin;
