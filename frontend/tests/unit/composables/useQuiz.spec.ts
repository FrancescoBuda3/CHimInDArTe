import { describe, it, expect, beforeEach } from 'vitest'
import { useQuiz, GameState } from '../../../src/composables/useQuiz'

describe('useQuiz', () => {
  let quiz: ReturnType<typeof useQuiz>

  beforeEach(() => {
    quiz = useQuiz()
    quiz.resetGame()
  })

  it('starts from GameState.Starting', () => {
    expect(quiz.gameState.value).toBe(GameState.Starting)
  })

  it('goes to GameState.ShowingQuestion after startGame', () => {
    quiz.startGame()
    expect(quiz.gameState.value).toBe(GameState.ShowingQuestion)
  })
})