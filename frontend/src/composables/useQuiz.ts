import { readonly, ref, type Ref } from "vue";
import { useData } from "./useData";
import { WorkMemoryQuestion, type Question } from "../types/questions";
import type { PeriodicElement } from "../types/periodicElement";
import type { Work } from "../types/work";
import type { ElementQuestions } from "../types/questions";

const GameState = {
    Starting: "starting",
    ShowingQuestion: "showingQuestion",
    ShowingSuccess: "showingSuccess",
    ShowingFailure: "showingFailure",
    ShowingZoneSummary: "showingZoneSummary",
    GameOver: "gameOver",
} as const;

export { GameState };

const gameState = ref<(typeof GameState)[keyof typeof GameState]>(
    GameState.Starting,
);
const gameQuestions = ref<Question[]>([]);
const gameElements = ref<PeriodicElement[]>([]);
const gameZones = ref<number[]>([]);
const gamePathPositions = ref<number[]>([]);
const gameCursor = ref(0);
const gameConqueredElements = ref<PeriodicElement[]>([]);

const QUESTIONS_NUMBER = 12;
const MEMORY_QUESTIONS_NUMBER = 5;

type randFn = () => number

export function useQuiz(rand: randFn = Math.random) {
    const { elementQuestions, elements, works } = useData();

    /**
     * Reset the game to its initial state
     */
    function resetGame() {
        gameState.value = GameState.Starting;
        gameCursor.value = 0;
        gameConqueredElements.value = [];
        gameZones.value = [];
        gameElements.value = [];
        gamePathPositions.value = [];
        gameQuestions.value = [];
    }

    /**
     * Start the game
     */
    function startGame() {
        gameState.value = GameState.ShowingQuestion;
        chooseRandomQuestions();
    }

    /**
     * return a random integer between min (inclusive) and max (exclusive)
     * @param min 
     * @param max 
     */
    function randInt(min: number, max: number): number {
        return Math.floor(rand() * (max - min)) + min;
    }

    /**
     * generate a WorkMemoryQuestion for a given element,
     * ensuring the correct answer is included and the options are unique
     * @param element 
     * @returns a WorkMemoryQuestion instance related to the given element 
     */
    function generateWorkMemoryQuestion(element: PeriodicElement): Question {
        const options: Record<number, Work> = {};
        const correctWork = works.value.find(work => work.id === element.number);
        if (!correctWork) {
            throw new Error(`No work found for element ${element.name}`);
        }
        options[0] = correctWork;
        const otherWorks = works.value.filter(work => work.id !== element.number);
        while (Object.keys(options).length < MEMORY_QUESTIONS_NUMBER) {
            const randomWork = otherWorks[randInt(0, otherWorks.length)];
            if (!randomWork) continue;
            if (!Object.values(options).some(work => work.id === randomWork.id)) {
                options[Object.keys(options).length] = randomWork;
            }
        }
        return new WorkMemoryQuestion({ options, answer: randInt(0, MEMORY_QUESTIONS_NUMBER) });
    }

    /**
     * Choose a random set of questions for the game, 
     * ensuring that there is at most one question per 
     * element and that the correct number of memory 
     * questions is included
     */
    function chooseRandomQuestions() {
        const sortedElementQuestions = [...elementQuestions.value].sort((a, b) => a.game_order - b.game_order);
        const maxLength = Math.min(QUESTIONS_NUMBER, sortedElementQuestions.length);
        const selectedIndices = new Set<number>();
        const memoryQuestionIndices = new Set<number>();
        while (selectedIndices.size < maxLength) {
            const randomIndex = randInt(0, sortedElementQuestions.length);
            selectedIndices.add(randomIndex);
            if (memoryQuestionIndices.size < MEMORY_QUESTIONS_NUMBER) {
                memoryQuestionIndices.add(randomIndex);
            }
        }
        const indicesArray = Array.from(selectedIndices).sort((a, b) => a - b);
        for (const index of indicesArray) {
            const elementQuestion = sortedElementQuestions[index];
            if (!elementQuestion) continue;
            const questionIndex = randInt(0, elementQuestion.questions.length);
            const element = elements.value.find((e) => e.number === elementQuestion.element_id);
            if (!element) continue;
            gameZones.value.push(elementQuestion.game_zone);
            gameElements.value.push(element);
            if (!elementQuestion.questions[questionIndex]) continue;
            if (memoryQuestionIndices.has(index)) {
                gameQuestions.value.push(generateWorkMemoryQuestion(element));
            } else {
                gameQuestions.value.push(elementQuestion.questions[questionIndex]);
            }
            gamePathPositions.value.push(elementQuestion.game_order);
        }
    }

    /**
     * Handle the player's answer to the current question,
     * updating the game state accordingly
     * @param answer 
     */
    function handleAnswer(answer: number) {
        const currentQuestion = gameQuestions.value[gameCursor.value];
        if (currentQuestion?.tryAnswer(answer)) {
            gameState.value = GameState.ShowingSuccess;
            const conqueredElement = gameElements.value[gameCursor.value];
            conqueredElement ? gameConqueredElements.value.push(conqueredElement) : null;
        } else {
            gameState.value = GameState.ShowingFailure;
        }
    }

    /**
     * Checks if the game is over
     */
    function isGameOver(): boolean {
        return gameCursor.value >= gameQuestions.value.length - 1;
    }

    /**
     * Checks if the current zone is completed, 
     * i.e. if the next question belongs to a different
     * zone or if there are no more questions
     */
    function isZoneCompleted(): boolean {
        const currentZone = gameZones.value[gameCursor.value];
        const nextCursor = gameCursor.value + 1;
        if (nextCursor >= gameZones.value.length || gameZones.value[nextCursor] !== currentZone) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Handle the player's input, updating the game state accordingly
     * @param answer 
     */
    function handleInput(answer?: number, playAgain?: boolean) {
        switch (gameState.value) {
            case GameState.Starting:
                startGame();
                break;
            case GameState.ShowingQuestion:
                handleAnswer(answer!);
                break;
            case GameState.ShowingSuccess:
            case GameState.ShowingFailure:
                if (isZoneCompleted()) {
                    gameState.value = GameState.ShowingZoneSummary;
                } else {
                    gameState.value = GameState.ShowingQuestion;
                }
                gameCursor.value += 1;
                break;
            case GameState.ShowingZoneSummary:
                if (isGameOver()) {
                    gameState.value = GameState.GameOver;
                } else {
                    gameState.value = GameState.ShowingQuestion;
                }
                break;
            case GameState.GameOver:
                if (playAgain) {
                    startGame();
                }
                break;
        }
    }

    return {
        gameQuestions: readonly(gameQuestions),
        gameCursor: readonly(gameCursor),
        gameConqueredElements: readonly(gameConqueredElements),
        gameZones: readonly(gameZones),
        gameElements: readonly(gameElements),
        gamePathPositions: readonly(gamePathPositions),
        gameState: readonly(gameState),
        QUESTIONS_NUMBER,
        MEMORY_QUESTIONS_NUMBER,
        handleInput,
        startGame,
        resetGame,
    };
}
