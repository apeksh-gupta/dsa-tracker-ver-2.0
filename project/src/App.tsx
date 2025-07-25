import React, { useState } from 'react';
import { DSAData, Topic, Question } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { sampleData } from './data/sampleData';
import { TopicsPage } from './components/TopicsPage';
import { QuestionsPage } from './components/QuestionsPage';

function App() {
  const [data, setData] = useLocalStorage<DSAData>('dsa-tracker-data', sampleData);
  const [currentView, setCurrentView] = useState<'topics' | 'questions'>('topics');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const updateData = (newData: DSAData) => {
    setData({
      ...newData,
      lastUpdated: new Date().toISOString(),
    });
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentView('questions');
  };

  const handleBackToTopics = () => {
    setCurrentView('topics');
    setSelectedTopicId(null);
  };

  const handleAddTopic = (name: string, description: string) => {
    const newTopic: Topic = {
      id: Date.now().toString(),
      name,
      description,
      questions: [],
      dateAdded: new Date().toISOString(),
    };

    updateData({
      ...data,
      topics: [...data.topics, newTopic],
    });
  };

  const handleAddQuestion = (questionData: Omit<Question, 'id' | 'dateAdded' | 'lastModified'>) => {
    if (!selectedTopicId) return;

    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    const updatedTopics = data.topics.map(topic =>
      topic.id === selectedTopicId
        ? { ...topic, questions: [...topic.questions, newQuestion] }
        : topic
    );

    updateData({
      ...data,
      topics: updatedTopics,
    });
  };

  const handleUpdateQuestion = (questionId: string, updates: Partial<Question>) => {
    if (!selectedTopicId) return;

    const updatedTopics = data.topics.map(topic =>
      topic.id === selectedTopicId
        ? {
            ...topic,
            questions: topic.questions.map(question =>
              question.id === questionId
                ? { ...question, ...updates }
                : question
            ),
          }
        : topic
    );

    updateData({
      ...data,
      topics: updatedTopics,
    });
  };

  const selectedTopic = selectedTopicId
    ? data.topics.find(topic => topic.id === selectedTopicId)
    : null;

  if (currentView === 'questions' && selectedTopic) {
    return (
      <QuestionsPage
        topic={selectedTopic}
        onBackToTopics={handleBackToTopics}
        onUpdateQuestion={handleUpdateQuestion}
        onAddQuestion={handleAddQuestion}
      />
    );
  }

  return (
    <TopicsPage
      topics={data.topics}
      onTopicClick={handleTopicClick}
      onAddTopic={handleAddTopic}
    />
  );
}

export default App;