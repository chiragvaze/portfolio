import React, { useEffect, useState } from 'react';
import { profileAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await profileAPI.get();
      setProfile(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update profile data first
      await profileAPI.update(profile);
      
      // Upload resume if selected
      if (resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/profile/resume`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });
        
        if (!response.ok) throw new Error('Resume upload failed');
        
        const data = await response.json();
        setProfile({ ...profile, resumeUrl: data.resumeUrl });
        setResumeFile(null);
        toast.success('Profile and resume updated!');
      } else {
        toast.success('Profile updated!');
      }
      
      loadProfile(); // Reload to get updated data
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Update failed');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Name</label>
              <input
                className="input"
                value={profile?.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Title</label>
              <input
                className="input"
                value={profile?.title || ''}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="label">Hero Description</label>
            <textarea
              className="input"
              rows="3"
              value={profile?.heroDescription || ''}
              onChange={(e) => setProfile({ ...profile, heroDescription: e.target.value })}
            />
          </div>

          <div>
            <label className="label">About Text</label>
            <textarea
              className="input"
              rows="4"
              value={profile?.aboutText || ''}
              onChange={(e) => setProfile({ ...profile, aboutText: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                value={profile?.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                className="input"
                value={profile?.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Social Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">GitHub</label>
                <input
                  className="input"
                  value={profile?.socialLinks?.github || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, github: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="label">LinkedIn</label>
                <input
                  className="input"
                  value={profile?.socialLinks?.linkedin || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, linkedin: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Statistics (About Section)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label">Projects Completed</label>
                <input
                  type="number"
                  className="input"
                  value={profile?.stats?.projectsCompleted || 10}
                  onChange={(e) => setProfile({
                    ...profile,
                    stats: { ...profile.stats, projectsCompleted: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>
              <div>
                <label className="label">Technologies</label>
                <input
                  type="number"
                  className="input"
                  value={profile?.stats?.technologies || 8}
                  onChange={(e) => setProfile({
                    ...profile,
                    stats: { ...profile.stats, technologies: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>
              <div>
                <label className="label">Years Learning</label>
                <input
                  type="number"
                  className="input"
                  value={profile?.stats?.yearsLearning || 2}
                  onChange={(e) => setProfile({
                    ...profile,
                    stats: { ...profile.stats, yearsLearning: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Resume Upload</h3>
            <div>
              <label className="label">Upload Resume (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                className="input"
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
              {profile?.resumeUrl && (
                <p className="text-sm text-gray-600 mt-2">
                  Current resume: <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume</a>
                </p>
              )}
              {resumeFile && (
                <p className="text-sm text-green-600 mt-2">
                  Ready to upload: {resumeFile.name}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
