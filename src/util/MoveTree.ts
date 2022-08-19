import { NodeName, Position } from "../sharedTypes"
import MoveNode from "./MoveNode"

const startingBoard = [
    // 0   1   2   3   4   5   6   7
    [0, 1, 0, 1, 0, 1, 0, 1], // 0
    [1, 0, 1, 0, 1, 0, 1, 0], // 1
    [0, 1, 0, 1, 0, 1, 0, 1], // 2
    [0, 0, 0, 0, 0, 0, 0, 0], // 3
    [0, 0, 0, 0, 0, 0, 0, 0], // 4
    [2, 0, 2, 0, 2, 0, 2, 0], // 5
    [0, 2, 0, 2, 0, 2, 0, 2], // 6
    [2, 0, 2, 0, 2, 0, 2, 0], // 7,
]

// const starting_board  = [
//     //0   1   2   3   4   5   6   7
//     [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//0
//     [1.1, 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//1
//     [ 0 , 2 , 0 , 0 , 0 , 0 , 0 , 0 ],//2
//     [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//3
//     [ 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 ],//4
//     [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],//5
//     [ 0 , 0 , 0 , 2 , 0 , 0 , 0 , 0 ],//6
//     [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]//7,
// ];

export enum Player {
    EMPTY, // 0
    PLAYER_1, // 1
    PLAYER_2, // 2
}

export default class MoveTree {
    /**
     * Returns the player who is not the one passed.
     * 0 => 0,
     * 1 => 2,
     * 2 => 1
     * @param {Player} player
     * @throws When an invalid value is passed as player.
     */
    public static otherPlayer(player: Player): Player {
        switch (player) {
            case Player.EMPTY:
                return Player.EMPTY
            case Player.PLAYER_1:
                return Player.PLAYER_2
            case Player.PLAYER_2:
                return Player.PLAYER_1
            default:
                throw new Error(`${player} is not a valid player number. Must be 1 or 2.`)
        }
    }

    private head: MoveNode
    private internalLevels: number
    /**
     * Creates a new MoveTree
     * @param {number[][]} [board] - The board to build the MoveTree of.
     * @param {number} [player] - The player whose turn it is.
     * @param {number} [levels=3] - How many levels the tree should be created with.
     */
    constructor(board: number[][] | null, player: Player = Player.PLAYER_1, levels: number = 3) {
        this.head = new MoveNode([], board === null ? startingBoard : board, player)
        this.internalLevels = levels > 0 ? levels : 1
        this.fillTree()
    }
    /**
     * Sets the number of levels this tree should have.
     * @param {number} num The new number of levels the tree should have.
     */
    public set levels(num: number) {
        if (num > 0) {
            this.internalLevels = num
            this.fillTree()
        }
    }
    /**
     * Returns a deep copy of the head's board.
     * @see this._head.board
     * @return {number[][]}
     */
    public get current_board(): number[][] {
        return this.head.board
    }
    /**
     * Returns the number player whose turn it currently is
     * (i.e. who is allowed to make a move).
     * @return {Player}
     */
    public get current_player(): Player {
        return this.head.currentPlayer
    }
    /**
     * Returns whether this game is over.
     * The game is over whan there are no moves
     *  left for the current player to make.
     * @return {boolean}
     */
    public get game_over(): boolean {
        if (this.head.is_leaf) {
            this.fillTree()
        }
        return this.head.is_leaf
    }
    /**
     * Returns an Array of all the valid moves on the current_board
     * @return {NodeName[]}
     */
    public getValidMoves(): NodeName[] {
        /*converts the getAllCHildren generator into an array
            of MoveNodes, and the maps the results to a new array
            of each of the MoveNode's names*/
        return [...this.head.getAllChildren()].map((c) => c.name)
    }
    /**
     * Returns the best move for the current player.
     * @return {NodeName}
     */
    public getBestMove(): NodeName {
        /**
         * Uses a min-max approach to assign a score to a given MoveNode,
         * based the the scores of it's children.
         * The higher the score, the better the move should be.
         * @param {MoveNode} node
         * @return {NodeName}
         */
        const relativeScore = (node: MoveNode): number => {
            const findMax = node.currentPlayer === this.head.currentPlayer
            const scores: number[] = []

            for (const child of node.getAllChildren()) {
                if (child.is_leaf) {
                    scores.push(child.boardScore)
                } else {
                    scores.push(relativeScore(child))
                }
            }
            if (findMax) {
                return Math.max(...scores)
            } else {
                return Math.min(...scores)
            }
        }

        let maxScore: number = -Infinity
        let maxNode: MoveNode | null = null
        for (const child of this.head.getAllChildren()) {
            // console.log("move:" + JSON.stringify(child.name));

            // get the relatviveScore of all the head's children
            const moveScore = relativeScore(child)
            // console.log("score: " + moveScore);
            if (moveScore >= maxScore) {
                maxScore = moveScore
                if (maxNode === null) {
                    maxNode = child
                } else if (moveScore === maxScore) {
                    /*when two MoveNodes have the same relativeScore,
                    choose the MoveNode with the higher board_score*/
                    const maxNodeScore = maxNode.boardScore
                    const childScore = child.boardScore
                    if (childScore > maxNodeScore) {
                        maxNode = child
                    }
                    // if the two board_scores are equal, pick one at random
                    else if (childScore === maxNodeScore) {
                        maxNode = Math.random() > 0.5 ? maxNode : child
                    }
                } else {
                    maxNode = child
                }
            }
        }
        // console.log("best move: " + JSON.stringify((maxNode as MoveNode).name));
        // console.log("score: " + maxScore);
        return (maxNode as MoveNode).name
    }
    public getResultingTree(move: NodeName): MoveTree | null {
        const node = this.head.getChild(move)

        if (node === null) {
            return null
        }

        return new MoveTree(node.board, MoveTree.otherPlayer(this.current_player), this.internalLevels)
    }
    /**
     * Returns if the given move is valid on this tree's head node
     * @param {NodeName} path
     * @return {boolean}
     */
    public isValidMove(path: NodeName): boolean {
        return this.head.getChild(path) !== null
    }
    /**
     * Tries to make a move on the MoveTree.
     * Returns a Object literal with whether the move was successful,
     *  and if the game is now over.
     * @param {NodeName} move - The move that will be made on the MoveTree.
     * @return {{success: boolean, game_over: boolean}}
     */
    public makeMove(move: NodeName): { success: boolean; game_over: boolean } {
        const child = this.head.getChild(move)
        if (child === null) {
            return { success: false, game_over: this.game_over }
        }
        this.head = child
        this.fillTree()
        this.head.name = []
        return { success: true, game_over: this.game_over }
    }
    public pieceAt([row, col]: Position): number {
        return this.head.board[row][col]
    }
    /**
     * Recursively fills the MoveTree with the
     *  number of levels given in _levels.
     * @return {void}
     */
    private fillTree(): void {
        const LEVELS: number = this.internalLevels
        /**
         * Recursively generates all the children of a given MoveNode,
         *  so that the MOveTree has the correct number of levels.
         * @param {MoveNode} head - The MoveNode whose children will be generated.
         * @param {number} current_level - The current level in the MoveTree.
         * @return {void}
         */
        ;(function generateSubTree(head: MoveNode, currentLevel: number): void {
            if (head.is_leaf) {
                head.createChildren()
            }
            // base case
            if (currentLevel + 1 === LEVELS || head.is_leaf) {
                head.deleteChildren()
            } else {
                for (const child of head.getAllChildren()) {
                    generateSubTree(child, currentLevel + 1)
                }
            }
        })(this.head, 0)
        // console.log("tree filled");
    }
}
