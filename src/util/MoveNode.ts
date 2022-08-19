import { IDirections, IMoveVector, NodeName, Position } from "../sharedTypes"
import MoveTree, { Player } from "./MoveTree"

export default class MoveNode {
    /**
     * Returns a deep copy of a 2D Array
     * @param {number[][]} arr - The Array to be cloned.
     * @return {number[][]}
     */
    private static clone(arr: number[][]): number[][] {
        return arr.map((a) => a.slice(0))
    }

    public boardScore: number
    public currentPlayer: Player
    public name: NodeName

    private internalBoard: number[][]
    private children: MoveNode[]

    /**
     * Creates new MoveNode
     * @param {Name} name - How to get to this point from the parent MoveNode.
     * @param {number[][]} startBoard -  The board at this point.
     * @param {1 | 2} player - The player whose turn it is at this point.
     */
    constructor(name: NodeName, startBoard: number[][], player: Player) {
        if (!(player === Player.PLAYER_1 || player === Player.PLAYER_2)) {
            throw new Error(`Cannot create MoveNode with player=${player}. player must be 1 or 2.`)
        }
        /**
         * The current board
         * @type {number[][]}
         */
        this.internalBoard = MoveNode.clone(startBoard)
        /**
         * Holds the child MoveNode(s) of this MoveNode.
         * Each child is a valid move that can be made
         *  by the current_player on the board.
         * @private
         * @type {MoveNode[]}
         */
        this.children = []
        /**
         * The move that was made to get to
         *  this point from the parents node
         * @type {number[][]}
         */
        this.name = name
        /**
         * The player whose turn it currently is,
         * and whose valid moves are in this.children
         * @type {number}
         */
        this.currentPlayer = player
        /**
         * The score of this MoveNode's board alone,
         *  non-relative to this MoveNode's children.
         * @type {number}
         */
        this.boardScore = (() => {
            const opponent: Player = this.currentPlayer === 1 ? 2 : 1
            let playerScore: number = 0
            let opponentScore: number = 0

            for (const row of this.internalBoard) {
                for (const pos of row) {
                    switch (pos) {
                        case this.currentPlayer:
                            playerScore += 1.1
                            break
                        case this.currentPlayer + 0.1:
                            playerScore += 3.1
                            break
                        case opponent:
                            opponentScore++
                            break
                        case opponent + 0.1:
                            opponentScore += 3
                            break
                        default:
                            break
                    }
                }
            }
            return playerScore - opponentScore
        })()
    }
    /**
     * Returns this MoveNode's board.
     * @return {number[][]}
     */
    public get board(): number[][] {
        // return MoveNode.clone(this._board);
        return this.internalBoard
    }
    /**
     * Returns whether or not this node is a leaf in the MoveTree
     * @return {boolean}
     */
    public get is_leaf(): boolean {
        return this.children.length === 0
    }

    /**
     * Yields all of the children of this MoveNode.
     * @yields {MoveNode}
     */
    public *getAllChildren(): IterableIterator<MoveNode> {
        for (const child of this.children) {
            yield child
        }
    }
    /**
     * Deletes all the children of this MoveNode
     * @return {void}
     */
    public deleteChildren(): void {
        this.children = []
    }
    /**
     * Returns the child of this.head with the given name.
     * Returns null if no such child exists.
     * @param {NodeName} name - The name of the child being looked for.
     * @return {MoveNode|null}
     */
    public getChild(name: NodeName): MoveNode | null {
        /*cool one-liner (but slightly less efficient)
            return this._children.filter(c => namesAreEqual(c.name, name))[0] || null;*/
        for (const child of this.children) {
            if (this.nameAreEqual(child.name, name)) {
                return child
            }
        }
        return null
    }
    /**
     * @override
     * @return {string} A string representation of this MoveNode.
     */
    public toString(): string {
        return `name: ${JSON.stringify(this.name)}\n` + `number of children: ${this.children.length}`
    }
    /**
     * Creates all the children of this MoveNode.
     * The created children are stored in this._children.
     * @return {void}
     */
    public createChildren(): void {
        // don't recreate the children once they've already be created
        if (!this.is_leaf) {
            return
        }

        let noJumps: boolean = true
        // loop through all the peices and get the moves from them
        for (const piece of this.getAllPieces()) {
            // get the directions this piece can move
            const dirs = this.validMoveDirections(piece)
            // get any jumps this piece can make
            const jumps = this.getJumpsFrom(piece, MoveNode.clone(this.internalBoard), dirs)
            // this._children.push(jumps);
            if (jumps.length === 0 && noJumps) {
                // no jumps were found, so check for normal moves
                this.children = this.children.concat(
                    this.getNormMovesFrom(piece, MoveNode.clone(this.internalBoard), dirs),
                )
            } else {
                // console.log("jump found");
                /*the first time a jump is found,
                    make sure _children is empty so that only jumps will be in it*/
                if (noJumps) {
                    this.children = []
                    // A jump has been found: no longer check for normal moves
                    noJumps = false
                }

                // add jumps to moves
                this.children = this.children.concat(jumps)
            }
        }
    }
    /**
     * Returns all the directions a given piece can move on the current board.
     * @param {Position} piece The piece whose move directions are being looked for.
     * @return {IMoveVector[]} All the directions a given piece can move on the current board.
     */
    private validMoveDirections([row, col]: Position): IMoveVector[] {
        /**
         * All the directions a piece can be moved.
         * A kinged piece can move in all the directions listed
         */
        const DIRECTIONS: IDirections = {
            1: [
                // the directions non-kinged Player 1 can move
                { x: 1, y: -1 }, // down-left
                { x: 1, y: 1 }, // down-right
            ],
            2: [
                // the directiond non-kinged Player 2 can move
                { x: -1, y: -1 }, // up-left
                { x: -1, y: 1 }, // up-right
            ],
        }
        // get the player at pos
        const player: Player = Math.trunc(this.internalBoard[row][col])
        // check if that player is kinged
        const isKinged: boolean = this.internalBoard[row][col] > this.currentPlayer

        // retrive the directions the player can move
        let dirs: IMoveVector[] = DIRECTIONS[player]

        // if the piece is kinged than it can move in all directions
        if (isKinged) {
            // this piece is kinged so add the opposite player's
            //   move directions to the existing ones
            if (player === 1) {
                dirs = dirs.concat(DIRECTIONS[2])
            } else {
                dirs = dirs.concat(DIRECTIONS[1])
            }
        }
        return dirs
    }
    /**
     * Generates all the pieces for the
     *  current player on this node's board.
     * @yields {Position}
     */
    private *getAllPieces(): IterableIterator<Position> {
        for (let row = 0; row < this.internalBoard.length; row++) {
            for (let col = 0; col < this.internalBoard.length; col++) {
                if (Math.trunc(this.internalBoard[row][col]) === this.currentPlayer) {
                    yield [row, col]
                }
            }
        }
    }
    /**
     * Returns an Array of MoveNodes representing all the
     *  jumps a given piece can make on a given board.
     * @param {Position} piece - The [row, col] of the piece making the jump.
     * @param {number[][]} board - The board on which the jump will be made.
     * @param {IMoveVector[]} dirs - The direction array for the piece making the jump.
     * @return {MoveNode[]}
     */
    private getJumpsFrom([row, col]: Position, board: number[][], dirs: IMoveVector[]): MoveNode[] {
        // console.log(row + ", " + col);
        const player: Player = Math.trunc(board[row][col])
        const allJumps: MoveNode[] = []

        // in each direction...
        for (const direction of dirs) {
            // see if a jump is open
            const jumpedRow = row + direction.x
            const jumpedCol = col + direction.y

            // make sure jumped_row and jumped_col are on the board
            if (!this.onBoard(jumpedRow, jumpedCol)) {
                continue
            }
            // get what is in the square that will be jumped
            const jumpedSquare = Math.trunc(board[jumpedRow][jumpedCol])
            // make sure the space holds an enemy piece
            if (jumpedSquare === player || jumpedSquare === Player.EMPTY) {
                continue
            }
            const endRow = row + direction.x * 2
            const endCol = col + direction.y * 2

            // make sure endRow and endCol are on the board
            if (!this.onBoard(endRow, endCol)) {
                continue
            }
            // get what is at the landing point of the jump
            const endSquare = Math.trunc(board[endRow][endCol])
            // make sure the square is empty
            if (endSquare !== 0) {
                continue
            }

            // A jump is open so take it

            // make a deep copy of board so it won't really get changed
            const boardCopy: number[][] = MoveNode.clone(board)

            // make a move on the board copy
            boardCopy[endRow][endCol] = board[row][col]
            boardCopy[jumpedRow][jumpedCol] = 0
            boardCopy[row][col] = 0

            // check if the piece should be kinged
            if (!this.onBoard(endRow + direction.x, endCol)) {
                boardCopy[endRow][endCol] = Math.trunc(board[row][col]) + 0.1
            }

            const jumpPath: Position[] = [
                [row, col],
                [endRow, endCol],
            ]

            const additionalJumps: MoveNode[] = this.getJumpsFrom([endRow, endCol], boardCopy, dirs)

            if (additionalJumps.length !== 0) {
                for (const jump of additionalJumps) {
                    jump.name.unshift(jumpPath[0])
                    allJumps.push(jump)
                }
            } else {
                allJumps.push(new MoveNode(jumpPath, boardCopy, MoveTree.otherPlayer(player)))
            }
        }
        return allJumps
    }
    /**
     * Returns an Array of MoveNodes representing all the normal moves
     *  (i.e. non-jumps) that the given piece can make on the given board.
     * @param {number[]} piece - The [row, col] of the piece making the move.
     * @param {numbr[][]} board - The board the piece is moving on.
     * @param {Object[]} dirs - The dirrection array for the piece moving.
     * @return {MoveNode[]}
     */
    private getNormMovesFrom([row, col]: Position, board: number[][], dirs: IMoveVector[]): MoveNode[] {
        const moves: MoveNode[] = []
        // check each direction to see if the piece can be moves there
        for (const direction of dirs) {
            // get the position the piece will end up if moved in the current direction
            const newRow = row + direction.x
            const newCol = col + direction.y

            // make sure new_row & new_col are on the board
            if (!this.onBoard(newRow, newCol)) {
                continue
            }
            // make sure that position is empty
            if (board[newRow][newCol] === 0) {
                // this is a vadil move...

                const boardCopy: number[][] = MoveNode.clone(board)
                boardCopy[newRow][newCol] = board[row][col]
                boardCopy[row][col] = 0

                // check if the piece should be kinged
                if (!this.onBoard(newRow + direction.x, newCol)) {
                    boardCopy[newRow][newCol] = Math.trunc(board[row][col]) + 0.1
                }

                const movePath: Position[] = [
                    [row, col],
                    [newRow, newCol],
                ]
                const oppositePlayer = MoveTree.otherPlayer(Math.trunc(board[row][col]))
                // add it to the array of moves to be returned
                moves.push(new MoveNode(movePath, boardCopy, oppositePlayer))
            }
        }
        return moves
    }
    /**
     * Returns whether a given position is on the board
     * @param row - The row index
     * @param col - The column index
     */
    private onBoard(row: number, col: number): boolean {
        const HEIGHT = 8
        const WIDTH = 8
        return row >= 0 && row < HEIGHT && col >= 0 && col < WIDTH
    }
    /**
     * Checks if two NodeNames are the same
     * @param n1 - The first NodeName being compared
     * @param n2 - The second NodeName being compared
     */
    private nameAreEqual(n1: NodeName, n2: NodeName): boolean {
        return JSON.stringify(n1) === JSON.stringify(n2)
    }
}
