import React, { useEffect, useState } from 'react';
import { profileAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
      await profileAPI.update(profile);
      toast.success('Profile updated!');
    } catch (error) {
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

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
