import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle, XCircle, Award } from 'lucide-react-native';
import { QuizQuestion } from '@/data/lessons';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (scorePercentage: number) => void;
  pointsReward: number;
}

export function Quiz({ questions, onComplete, pointsReward }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const allAnswered = questions.every((_, idx) => selectedAnswers[idx] !== undefined);

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    setIsSubmitted(true);
    onComplete(score);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  return (
    <View className="mt-6 pt-6 border-t border-slate-800">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-extrabold text-white">Lesson Quiz</Text>
        <View className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
          <Text className="text-xs font-bold text-evermore-cyan">Earn +{pointsReward} pts</Text>
        </View>
      </View>

      <Text className="text-xs text-slate-400 mb-5">
        Answer all questions below to verify your learning and claim your completion points.
      </Text>

      {questions.map((question, qIdx) => {
        const selectedOpt = selectedAnswers[qIdx];
        const isAnswered = selectedOpt !== undefined;

        return (
          <View key={qIdx} className="bg-evermore-surface border border-evermore-border rounded-2xl p-4 mb-4">
            <Text className="text-sm font-bold text-white mb-3">
              {qIdx + 1}. {question.question}
            </Text>

            <View className="space-y-2">
              {question.options.map((option, oIdx) => {
                const isOptionSelected = selectedOpt === oIdx;
                const isCorrect = question.correctIndex === oIdx;

                let optBorder = 'border-slate-800 bg-slate-900/60';
                let textColor = 'text-slate-300';

                if (isSubmitted) {
                  if (isCorrect) {
                    optBorder = 'border-emerald-500/60 bg-emerald-500/10';
                    textColor = 'text-emerald-300';
                  } else if (isOptionSelected && !isCorrect) {
                    optBorder = 'border-rose-500/60 bg-rose-500/10';
                    textColor = 'text-rose-300';
                  }
                } else if (isOptionSelected) {
                  optBorder = 'border-evermore-cyan bg-cyan-500/10';
                  textColor = 'text-white';
                }

                return (
                  <TouchableOpacity
                    key={oIdx}
                    disabled={isSubmitted}
                    onPress={() => handleSelect(qIdx, oIdx)}
                    activeOpacity={0.7}
                    className={`flex-row items-center justify-between p-3 rounded-xl border mb-2 ${optBorder}`}
                  >
                    <Text className={`text-xs font-medium flex-1 pr-2 ${textColor}`}>
                      {option}
                    </Text>

                    {isSubmitted && isCorrect && <CheckCircle size={16} color="#34D399" />}
                    {isSubmitted && isOptionSelected && !isCorrect && <XCircle size={16} color="#F43F5E" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      {isSubmitted ? (
        <View className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 items-center mt-2 mb-6">
          <Award size={32} color="#34D399" />
          <Text className="text-base font-bold text-white mt-2">Lesson Completed!</Text>
          <Text className="text-xs text-slate-300 mt-1 text-center">
            You scored {calculateScore()}% and collected {pointsReward} EverPoints.
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!allAnswered}
          activeOpacity={0.85}
          className={`py-3.5 rounded-xl items-center justify-center mt-2 mb-6 ${
            allAnswered ? 'bg-evermore-cyan shadow-lg shadow-cyan-500/20' : 'bg-slate-800'
          }`}
        >
          <Text
            className={`font-bold text-sm ${
              allAnswered ? 'text-slate-950' : 'text-slate-500'
            }`}
          >
            {allAnswered ? 'Submit Quiz & Claim Points' : 'Select All Answers to Submit'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
