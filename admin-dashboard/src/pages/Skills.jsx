import React, { useEffect, useState } from 'react';
import { profileAPI } from '../services/api';
import toast from 'react-hot-toast';

const Skills = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'frontend',
    icon: 'fa-code',
    proficiency: 80
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await profileAPI.get();
      setProfile(response.data);
      setSkills(response.data.skills || []);
    } catch (error) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    try {
      const updatedProfile = {
        ...profile,
        skills: [...skills, newSkill]
      };
      
      await profileAPI.update(updatedProfile);
      toast.success('Skill added!');
      
      setNewSkill({ name: '', category: 'frontend', icon: 'fa-code', proficiency: 80 });
      setIsAdding(false);
      loadSkills();
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (index) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Delete this skill?')) return;
    
    try {
      const updatedSkills = skills.filter((_, i) => i !== index);
      const updatedProfile = { ...profile, skills: updatedSkills };
      
      await profileAPI.update(updatedProfile);
      toast.success('Skill deleted!');
      loadSkills();
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const iconOptions = [
    { value: 'fa-html5', label: 'HTML5' },
    { value: 'fa-css3-alt', label: 'CSS3' },
    { value: 'fa-js', label: 'JavaScript' },
    { value: 'fa-react', label: 'React' },
    { value: 'fa-node', label: 'Node.js' },
    { value: 'fa-python', label: 'Python' },
    { value: 'fa-java', label: 'Java' },
    { value: 'fa-database', label: 'Database' },
    { value: 'fa-git-alt', label: 'Git' },
    { value: 'fa-docker', label: 'Docker' },
    { value: 'fa-code', label: 'Code (Default)' }
  ];

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Skills</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-primary"
        >
          + Add Skill
        </button>
      </div>

      {isAdding && (
        <div className="card mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Skill</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Skill Name</label>
              <input
                className="input"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g., React, Python, Docker"
              />
            </div>
            <div>
              <label className="label">Category</label>
              <select
                className="input"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="tools">Tools</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Icon</label>
              <select
                className="input"
                value={newSkill.icon}
                onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Proficiency (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="input"
                value={newSkill.proficiency}
                onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAddSkill} className="btn btn-primary">Save Skill</button>
            <button onClick={() => setIsAdding(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
                <span className="text-sm text-gray-600 capitalize">{skill.category}</span>
              </div>
              <i className={`fas ${skill.icon} text-2xl text-blue-600`}></i>
            </div>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{skill.proficiency}%</span>
            </div>
            <button
              onClick={() => handleDeleteSkill(index)}
              className="text-red-600 hover:text-red-700 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && !isAdding && (
        <div className="text-center py-12 text-gray-500">
          No skills added yet. Click "Add Skill" to get started.
        </div>
      )}
    </div>
  );
};

export default Skills;
