import React, { useState } from 'react';
import { Topic, Question } from '../types';
import { QuestionItem } from './QuestionItem';
import { AddQuestionModal } from './AddQuestionModal';
import { ArrowLeft, Plus, Filter, CheckCircle, Clock, Circle } from 'lucide-react';

interface QuestionsPageProps {
  topic: Topic;
  onBackToTopics: () => void;
  onUpdateQuestion: (questionId: string, updates: Partial<Question>) => void;
  onAddQuestion: (question: Omit<Question, 'id' | 'dateAdded' | 'lastModified'>) => void;
}

export function QuestionsPage({ topic, onBackToTopics, onUpdateQuestion, onAddQuestion }: QuestionsPageProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'not-started' | 'attempted' | 'solved'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');

  const filteredQuestions = topic.questions.filter(question => {
    const statusMatch = filter === 'all' || question.status === filter;
    const difficultyMatch = difficultyFilter === 'all' || question.difficulty === difficultyFilter;
    return statusMatch && difficultyMatch;
  });

  const getStatusCount = (status: Question['status']) => {
    return topic.questions.filter(q => q.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBackToTopics}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Topics</span>
                </button>
                <div className="border-l border-gray-300 h-6"></div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{topic.name}</h1>
                  {topic.description && (
                    <p className="mt-1 text-gray-600">{topic.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Status Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <Circle className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">{topic.questions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Solved</p>
                <p className="text-xl font-bold text-green-600">{getStatusCount('solved')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Attempted</p>
                <p className="text-xl font-bold text-orange-600">{getStatusCount('attempted')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <Circle className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Not Started</p>
                <p className="text-xl font-bold text-gray-600">{getStatusCount('not-started')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex items-center space-x-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">Status:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All</option>
                  <option value="not-started">Not Started</option>
                  <option value="attempted">Attempted</option>
                  <option value="solved">Solved</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">Difficulty:</label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as typeof difficultyFilter)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onUpdateQuestion={onUpdateQuestion}
            />
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <Circle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {topic.questions.length === 0 ? 'No questions yet' : 'No questions match your filters'}
            </h3>
            <p className="text-gray-600 mb-4">
              {topic.questions.length === 0 
                ? 'Get started by adding your first question' 
                : 'Try adjusting your filters or add a new question'
              }
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Question
            </button>
          </div>
        )}
      </div>

      <AddQuestionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddQuestion={onAddQuestion}
      />
    </div>
  );
}