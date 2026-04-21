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


})