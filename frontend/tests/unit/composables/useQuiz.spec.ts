import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useQuiz, GameState } from '../../../src/composables/useQuiz'
import { PeriodicElement } from '../../../src/types/periodicElement'
import { ElementQuestions, ClassicQuestion, WorkMemoryQuestion } from '../../../src/types/questions'
import periodicTableData from '../../../public/periodic_table.json'
import quizzesData from '../../../public/quizzes.json'
import worksData from '../../../public/works.json'
import { Work } from '../../../src/types/work'

vi.mock('../../../src/composables/useData', () => ({
    useData: () => {
        const mockElements = periodicTableData.elements.map(
            (data: any) => new PeriodicElement(data)
        )
        const mockElementQuestions = quizzesData.element_questions.map(
            (data: any) => new ElementQuestions(data)
        )
        const mockWorks = worksData.works.map(
            (data: any) => new Work(data)
        )

        return {
            elementQuestions: { value: mockElementQuestions },
            elements: { value: mockElements },
            works: { value: mockWorks },
        }
    }
}))

describe('useQuiz', () => {
    let quiz: ReturnType<typeof useQuiz>
    const sequence = [0.1, 0.5, 0.9, 0.3, 0.7, 0.2, 0.8, 0.4, 0.6, 0.05, 0.95, 0.15, 0.85, 0.25, 0.75, 0.35, 0.65, 0.45, 0.55, 0.12, 0.88]
    let i = 0
    const fakeRng = () => sequence[i++ % sequence.length]

    beforeEach(() => {
        i = 0
        quiz = useQuiz(fakeRng)
        quiz.resetGame()
    })

    function answerCurrentQuestionCorrectly() {
        const currentQuestion = quiz.gameQuestions.value[quiz.gameCursor.value]
        const correctAnswer = currentQuestion instanceof ClassicQuestion
            ? currentQuestion.answer
            : currentQuestion instanceof WorkMemoryQuestion
                ? currentQuestion.answer
                : 0
        quiz.handleInput(correctAnswer)
    }

    function answerCurrentQuestionWrongly() {
        const currentQuestion = quiz.gameQuestions.value[quiz.gameCursor.value]
        const wrongAnswer = currentQuestion instanceof ClassicQuestion
            ? (currentQuestion.answer + 1) % Object.keys(currentQuestion.options).length
            : currentQuestion instanceof WorkMemoryQuestion
                ? (currentQuestion.answer + 1) % Object.keys(currentQuestion.options).length
                : 0
        quiz.handleInput(wrongAnswer)
    }

    it('starts from GameState.Starting', () => {
        expect(quiz.gameState.value).toBe(GameState.Starting)
    })

    it('starts with no conquered elements', () => {
        expect(quiz.gameConqueredElements.value).toEqual([])
    })

    it('starts with gameCursor at position 0', () => {
        expect(quiz.gameCursor.value).toBe(0)
    })

    it('goes to GameState.ShowingQuestion after startGame', () => {
        quiz.startGame()
        expect(quiz.gameState.value).toBe(GameState.ShowingQuestion)
    })

    it('chooses the right number of questions when starting the game', () => {
        quiz.startGame()
        const questions = quiz.gameQuestions.value
        expect(questions.length).toBe(quiz.QUESTIONS_NUMBER)

    })

    it('chooses one question per element', () => {
        quiz.startGame()
        const questions = quiz.gameQuestions.value
        const elements = quiz.gameElements.value
        const elementIds = new Set(elements.map(q => q.number))
        expect(elementIds.size).toBe(questions.length)
    })

    it('chooses the right number of memory questions', () => {
        quiz.startGame()
        const memoryQuestions = quiz.gameQuestions.value.filter(q => q instanceof WorkMemoryQuestion)
        expect(memoryQuestions.length).toBe(quiz.MEMORY_QUESTIONS_NUMBER)
    })

    it('chooses element questions with a progressive path position', () => {
        quiz.startGame()
        const pathPositions = quiz.gamePathPositions.value
        expect(pathPositions).toStrictEqual(pathPositions.slice().sort((a, b) => a - b))
    })

    it('chooses element questions with a progressive game zone', () => {
        quiz.startGame()
        const gameZones = quiz.gameZones.value
        expect(gameZones).toStrictEqual(gameZones.slice().sort((a, b) => a - b))
    })

    it('goes to GameState.ShowingSuccess after a correct answer', () => {
        quiz.startGame()
        answerCurrentQuestionCorrectly()
        expect(quiz.gameState.value).toBe(GameState.ShowingSuccess)
    })

    it('goes to GameState.ShowingFailure after a wrong answer', () => {
        quiz.startGame()
        answerCurrentQuestionWrongly()
        expect(quiz.gameState.value).toBe(GameState.ShowingFailure)
    })

    it('conquers the element after a correct answer', () => {
        quiz.startGame()
        answerCurrentQuestionCorrectly()
        expect(quiz.gameConqueredElements.value.length).toBe(1)
    })

    it('does not conquer the element after a wrong answer', () => {
        quiz.startGame()
        answerCurrentQuestionWrongly()
        expect(quiz.gameConqueredElements.value.length).toBe(0)
    })

    it('increments the game cursor after handling input in ShowingSuccess or ShowingFailure if not game over', () => {
        quiz.startGame()
        const initialCursor = quiz.gameCursor.value
        answerCurrentQuestionCorrectly()
        quiz.handleInput()
        expect(quiz.gameCursor.value).toBe(initialCursor + 1)
    })


    it('goes to GameState.ShowingQuestion after handling input in ShowingSuccess if not game over and not zone completed', () => {
        quiz.startGame()
        answerCurrentQuestionCorrectly()
        expect(quiz.gameState.value).toBe(GameState.ShowingSuccess)
        quiz.handleInput()
        expect(quiz.gameState.value).toBe(GameState.ShowingQuestion)
    })

    it('goes to GameState.ShowingQuestion after handling input in ShowingFailure if not zone completed', () => {
        quiz.startGame()
        answerCurrentQuestionWrongly()
        expect(quiz.gameState.value).toBe(GameState.ShowingFailure)
        quiz.handleInput()
        expect(quiz.gameState.value).toBe(GameState.ShowingQuestion)
    })

    it('goes to GameState.ShowingZoneSummary after handling input in ShowingSuccess or ShowingFailure if zone completed', () => {
        quiz.startGame()
        console.log(quiz.gameZones.value)
        const firstZoneQuestions = quiz.gameQuestions.value.filter((q, index) => quiz.gameZones.value[index] === 1)
        console.log(firstZoneQuestions.length)
        for (let i = 0; i < firstZoneQuestions.length; i++) {
            answerCurrentQuestionCorrectly()
            quiz.handleInput()
        }
        expect(quiz.gameState.value).toBe(GameState.ShowingZoneSummary)
    })

    it('goes to GameState.GameOver after handling input in ShowingZoneSummary if game over', () => {
        quiz.startGame()
        const totalQuestions = quiz.gameQuestions.value.length
        for (let i = 0; i < totalQuestions; i++) {
            answerCurrentQuestionCorrectly()
            quiz.handleInput()
        }
        quiz.handleInput()
        expect(quiz.gameState.value).toBe(GameState.GameOver)
    })
})