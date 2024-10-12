import Tetris from "react-tetris";
import {Button} from "../components/button/button.tsx";
import {RotateCw} from "lucide-react";


const AboutPage = () => {
    return (
        <div className="p-4">
            <h1>
                About
            </h1>
            <p className="text-md">
                ETH Overflow is a Q&A platform built by ETH students, for ETH students, to tackle all your academic questions. Whether you're stuck on exercises, prepping for exams, or need clarity on courses, this is the place to get fast, reliable help from your peers.
                Created during the 2024 VISCON Hackathon, ETH Overflow is designed to streamline your learning experience. Ask, answer, and collaborate on everything ETH—from lecture topics to tricky assignments—while building a knowledge base that benefits the whole community.

                Jump in, contribute, and make ETH easier for everyone!
            </p>

            <Tetris
                keyboardControls={{
                    // Default values shown here. These will be used if no
                    // `keyboardControls` prop is provided.
                    down: 'MOVE_DOWN',
                    left: 'MOVE_LEFT',
                    right: 'MOVE_RIGHT',
                    space: 'HARD_DROP',
                    z: 'FLIP_COUNTERCLOCKWISE',
                    x: 'FLIP_CLOCKWISE',
                    up: 'FLIP_CLOCKWISE',
                    p: 'TOGGLE_PAUSE',
                    c: 'HOLD',
                    shift: 'HOLD'
                }}
            >
                {({
                      HeldPiece,
                      Gameboard,
                      PieceQueue,
                      points,
                      linesCleared,
                      state,
                      controller
                  }) => (
                    <div className="flex flex-row">
                        <div className="flex gap-5">
                            <Gameboard/>
                            <PieceQueue/>
                        </div>
                        <div className="bg-slate-200 font-semibold p-2">
                            <p>Points: {points}</p>
                            <p>Lines Cleared: {linesCleared}</p>
                            {state === 'LOST' && (
                                <div className="mt-4 border border-dashed border-black text-black p-2">
                                    <h2>Game Over</h2>
                                    <Button onClick={controller.restart} variant="destructive" className="mt-4 text-white font-bold gap-4">
                                        <RotateCw className="text-white"/>
                                        New Game</Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Tetris>

        </div>
    );
}

export default AboutPage;