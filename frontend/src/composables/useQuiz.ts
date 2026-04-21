import { readonly, ref } from "vue";
import { useData } from "./useData";
import type { Question } from "../types/questions";
import type { PeriodicElement } from "../types/periodicElement";

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
const gameCurrentQuestion = ref(0);
const gameConqueredElements = ref<PeriodicElement[]>([]);
const gameCurrentZone = ref(0);

const { elementQuestions } = useData();

export function useQuiz() {

    /**
     * Reset the game to its initial state
     */
    function resetGame() {
        gameState.value = GameState.Starting;
        gameCurrentQuestion.value = 0;
        gameConqueredElements.value = [];
        gameCurrentZone.value = 0;
        gameQuestions.value = [];
    }

    /**
     *
     * @param
     */
    function startGame() { 
        gameState.value = GameState.ShowingQuestion;
    }

    /**
     *
     * @param
     */
    function chooseRandomQuestions() { }

    /**
     * 
     * @param answer 
     */
    function handleAnswer(answer: number) { }

    /**
     * 
     */
    function isGameOver(): boolean { return false }

    /**
     * 
     */
    function isZoneCompleted(): boolean { return false }

    /**
     * 
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
                if (isGameOver()) {
                    gameState.value = GameState.GameOver;
                } else if (isZoneCompleted()) {
                    gameState.value = GameState.ShowingZoneSummary;
                } else {
                    gameState.value = GameState.ShowingQuestion;
                }
                break;
            case GameState.ShowingZoneSummary:
                gameState.value = GameState.ShowingQuestion;
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
        gameCurrentQuestion: readonly(gameCurrentQuestion),
        gameConqueredElements: readonly(gameConqueredElements),
        gameCurrentZone: readonly(gameCurrentZone),
        gameState: readonly(gameState),
        handleInput,
        startGame,
        resetGame,
    };
}
