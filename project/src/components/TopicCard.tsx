import React from 'react';
import { Topic } from '../types';
import { ChevronRight, Target, CheckCircle, Clock } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  onTopicClick: (topicId: string) => void;
}

export function TopicCard({ topic, onTopicClick }: TopicCardProps) {
  const totalQuestions = topic.questions.length;
  const solvedCount = topic.questions.filter(q => q.status === 'solved').length;
  const attemptedCount = topic.questions.filter(q => q.status === 'attempted').length;
  const notStartedCount = topic.questions.filter(q => q.status === 'not-started').length;
  
  const progressPercentage = totalQuestions > 0 ? (solvedCount / totalQuestions) * 100 : 0;

  const getDifficultyCount = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    return topic.questions.filter(q => q.difficulty === difficulty).length;
  };

  const getDifficultySolvedCount = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    return topic.questions.filter(q => q.difficulty === difficulty && q.status === 'solved').length;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group"
      onClick={() => onTopicClick(topic.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {topic.name}
        </h3>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      
      {topic.description && (
        <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
      )}
      
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{solvedCount}/{totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Status Counts */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">Solved:</span>
            <span className="font-medium text-green-600">{solvedCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-gray-600">Attempted:</span>
            <span className="font-medium text-orange-600">{attemptedCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Remaining:</span>
            <span className="font-medium text-gray-600">{notStartedCount}</span>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-xs">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
            <span className="text-gray-600">Easy: </span>
            <span className="font-medium">{getDifficultySolvedCount('Easy')}/{getDifficultyCount('Easy')}</span>
          </div>
          <div className="text-xs">
            <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>
            <span className="text-gray-600">Medium: </span>
            <span className="font-medium">{getDifficultySolvedCount('Medium')}/{getDifficultyCount('Medium')}</span>
          </div>
          <div className="text-xs">
            <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-1"></span>
            <span className="text-gray-600">Hard: </span>
            <span className="font-medium">{getDifficultySolvedCount('Hard')}/{getDifficultyCount('Hard')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}