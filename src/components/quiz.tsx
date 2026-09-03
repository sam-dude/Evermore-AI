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
    <View style={{ marginTop: 24, paddingTop: 24, borderTopWidth: 1, borderTopColor: '#1E293B' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#FFFFFF' }}>Lesson Quiz</Text>
        <View
          style={{
            backgroundColor: 'rgba(0, 229, 255, 0.1)',
            borderWidth: 1,
            borderColor: 'rgba(0, 229, 255, 0.3)',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#00E5FF' }}>Earn +{pointsReward} pts</Text>
        </View>
      </View>

      <Text style={{ fontSize: 12, color: '#94A3B8', marginBottom: 20, lineHeight: 18 }}>
        Answer all questions below to verify your learning and claim your completion points.
      </Text>

      {questions.map((question, qIdx) => {
        const selectedOpt = selectedAnswers[qIdx];

        return (
          <View
            key={qIdx}
            style={{
              backgroundColor: '#0A1628',
              borderWidth: 1,
              borderColor: '#1E3A5F',
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, lineHeight: 20 }}>
              {qIdx + 1}. {question.question}
            </Text>

            <View>
              {question.options.map((option, oIdx) => {
                const isOptionSelected = selectedOpt === oIdx;
                const isCorrect = question.correctIndex === oIdx;

                // Native style calculation
                let borderColor = '#1E293B';
                let backgroundColor = 'rgba(15, 23, 42, 0.6)';
                let textColor = '#CBD5E1';

                if (isSubmitted) {
                  if (isCorrect) {
                    borderColor = 'rgba(52, 211, 153, 0.6)';
                    backgroundColor = 'rgba(52, 211, 153, 0.12)';
                    textColor = '#6EE7B7';
                  } else if (isOptionSelected && !isCorrect) {
                    borderColor = 'rgba(244, 63, 94, 0.6)';
                    backgroundColor = 'rgba(244, 63, 94, 0.12)';
                    textColor = '#FDA4AF';
                  }
                } else if (isOptionSelected) {
                  borderColor = '#00E5FF';
                  backgroundColor = 'rgba(0, 229, 255, 0.12)';
                  textColor = '#FFFFFF';
                }

                return (
                  <TouchableOpacity
                    key={oIdx}
                    disabled={isSubmitted}
                    onPress={() => handleSelect(qIdx, oIdx)}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 13,
                      borderRadius: 14,
                      borderWidth: 1.5,
                      borderColor,
                      backgroundColor,
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        flex: 1,
                        paddingRight: 8,
                        color: textColor,
                      }}
                    >
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
        <View
          style={{
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
            borderWidth: 1,
            borderColor: 'rgba(52, 211, 153, 0.3)',
            borderRadius: 16,
            padding: 16,
            alignItems: 'center',
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          <Award size={32} color="#34D399" />
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginTop: 8 }}>
            Lesson Completed!
          </Text>
          <Text style={{ fontSize: 12, color: '#CBD5E1', marginTop: 4, textAlign: 'center' }}>
            You scored {calculateScore()}% and collected {pointsReward} EverPoints.
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!allAnswered}
          activeOpacity={0.85}
          style={{
            backgroundColor: allAnswered ? '#00E5FF' : '#1E293B',
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontWeight: '800',
              fontSize: 14,
              color: allAnswered ? '#050B14' : '#64748B',
            }}
          >
            {allAnswered ? 'Submit Quiz & Claim Points' : 'Select All Answers to Submit'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
