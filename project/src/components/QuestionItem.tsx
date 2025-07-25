import React, { useState } from 'react';
import { Question } from '../types';
import { ExternalLink, Edit3, Save, X, CheckCircle, Clock, Circle } from 'lucide-react';

interface QuestionItemProps {
  question: Question;
  onUpdateQuestion: (questionId: string, updates: Partial<Question>) => void;
}

export function QuestionItem({ question, onUpdateQuestion }: QuestionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNotes, setEditNotes] = useState(question.notes || '');

  const handleStatusChange = (newStatus: Question['status']) => {
    onUpdateQuestion(question.id, { 
      status: newStatus,
      lastModified: new Date().toISOString()
    });
  };

  const handleSaveNotes = () => {
    onUpdateQuestion(question.id, { 
      notes: editNotes,
      lastModified: new Date().toISOString()
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditNotes(question.notes || '');
    setIsEditing(false);
  };

  const getStatusIcon = () => {
    switch (question.status) {
      case 'solved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'attempted':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm hover:border-blue-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => handleStatusChange(
              question.status === 'solved' 
                ? 'not-started' 
                : question.status === 'attempted' 
                  ? 'solved' 
                  : 'attempted'
            )}
            className="mt-1 hover:scale-110 transition-transform"
          >
            {getStatusIcon()}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-medium text-gray-900">{question.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor()}`}>
                {question.difficulty}
              </span>
              {question.link && (
                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Status Buttons */}
        <div className="flex items-center space-x-2">
          <select
            value={question.status}
            onChange={(e) => handleStatusChange(e.target.value as Question['status'])}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="not-started">Not Started</option>
            <option value="attempted">Attempted</option>
            <option value="solved">Solved</option>
          </select>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Notes</span>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Add your notes here..."
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 min-h-[20px]">
            {question.notes || 'No notes added yet...'}
          </p>
        )}
      </div>
    </div>
  );
}