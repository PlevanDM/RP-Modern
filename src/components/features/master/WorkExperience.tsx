import React, { useState } from 'react';
import { WorkExperience } from '../../../types/models';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface WorkExperienceProps {
  experience: WorkExperience[];
  isEditing: boolean;
  onExperienceChange: (experience: WorkExperience[]) => void;
}

export const WorkExperienceSection: React.FC<WorkExperienceProps> = ({ experience, isEditing, onExperienceChange }) => {
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);

  const handleAddNew = () => {
    setEditingExperience({
      id: `new-${Date.now()}`,
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleEdit = (exp: WorkExperience) => {
    setEditingExperience(exp);
  };

  const handleSave = () => {
    if (!editingExperience) return;

    const isNew = editingExperience.id.startsWith('new-');
    let updatedExperience;

    if (isNew) {
      updatedExperience = [...experience, { ...editingExperience, id: `exp-${Date.now()}` }];
    } else {
      updatedExperience = experience.map(exp =>
        exp.id === editingExperience.id ? editingExperience : exp
      );
    }

    onExperienceChange(updatedExperience);
    setEditingExperience(null);
  };

  const handleDelete = (id: string) => {
    const updatedExperience = experience.filter(exp => exp.id !== id);
    onExperienceChange(updatedExperience);
  };

  const handleCancel = () => {
    setEditingExperience(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingExperience) return;
    const { name, value } = e.target;
    setEditingExperience({ ...editingExperience, [name]: value });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-semibold text-gray-600 uppercase">Досвід роботи</label>
        {isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
          >
            <AddIcon sx={{ fontSize: 18 }} />
            Додати
          </button>
        )}
      </div>

      <div className="space-y-4">
        {experience.map(exp => (
          <div key={exp.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800">{exp.role}</p>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {exp.startDate} - {exp.endDate || 'Теперішній час'}
                </p>
                <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-blue-500 hover:text-blue-700"
                    data-testid={`edit-button-${exp.id}`}
                  >
                    <EditIcon sx={{ fontSize: 20 }} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-500 hover:text-red-700"
                    data-testid={`delete-button-${exp.id}`}
                  >
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {experience.length === 0 && !isEditing && (
          <p className="text-gray-500 text-sm">Немає досвіду роботи</p>
        )}
      </div>

      {/* Edit/Add Modal */}
      {editingExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingExperience.id.startsWith('new-') ? 'Додати досвід роботи' : 'Редагувати досвід роботи'}
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                name="role"
                value={editingExperience.role}
                onChange={handleInputChange}
                placeholder="Посада"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="company"
                value={editingExperience.company}
                onChange={handleInputChange}
                placeholder="Компанія"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="startDate"
                  value={editingExperience.startDate}
                  onChange={handleInputChange}
                  placeholder="Дата початку (напр., 2020)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  name="endDate"
                  value={editingExperience.endDate}
                  onChange={handleInputChange}
                  placeholder="Дата закінчення (або пусто)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <textarea
                name="description"
                value={editingExperience.description}
                onChange={handleInputChange}
                placeholder="Опис"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
              >
                <SaveIcon sx={{ fontSize: 20 }} />
                Зберегти
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition font-medium"
              >
                 <CloseIcon sx={{ fontSize: 20 }} />
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
