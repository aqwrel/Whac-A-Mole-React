import { useEffect, useState } from 'react'
import './styles/app.scss'
import Input from './components/Input/Input'
import Button from './components/Button/Button'
import Field from './components/Field/Field'
import Modal from './components/Modal/Modal'

import { FILED_SIZE, FIELD_STATE, POINTS_TO_WIN } from './constants'
import { getRandomEmptyIndex, generateField } from './utils'

function App() {
    const [fieldState, setFieldState] = useState(() => generateField())
    const [hasStarted, setHasStarted] = useState(false)
    const [timer, setTimer] = useState(false)
    const [activeField, setActiveField] = useState(null)
    const [delay, setDelay] = useState('800')

    const [playerPoints, setPlayerPoints] = useState(0)
    const [opponentPoints, setOpponentPoints] = useState(0)

    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const startGame = () => {
        setHasStarted(true)
    }

    const checkWin = () => playerPoints >= POINTS_TO_WIN || opponentPoints >= POINTS_TO_WIN

    const getRandomEmptyFieldIndex = () => {
        clearTimeout(timer)
        if(checkWin()) {
            setShowModal(true)
            if(playerPoints > opponentPoints) {
                setModalMessage('Ви виграли 🏆')
            } else {
                setModalMessage('Ви програли 😢')
            }
            return
        }
        const index = getRandomEmptyIndex(fieldState)
        setActiveField(index);
    }

    const playerTurn = (index) => {
        if (index !== activeField) return
        clearTimeout(timer)
        setFieldState((oldV) => {
            const newArr = [...oldV]
            newArr.splice(activeField, 1, FIELD_STATE.player)
            return newArr
        })
        setPlayerPoints(playerPoints + 1)
    }

    const opponentTurn = () => {
        setFieldState((oldV) => {
            const newArr = [...oldV]
            newArr.splice(activeField, 1, FIELD_STATE.opponent)
            return newArr
        })
        setOpponentPoints(opponentPoints + 1)
    }

    const resetState = () => {
        setHasStarted(false)
        setShowModal(false)
        setFieldState(generateField())
        setPlayerPoints(0)
        setOpponentPoints(0)
    }

    useEffect(() => {
        getRandomEmptyFieldIndex()
    }, [fieldState])

    useEffect(() => {
        if(activeField === null || !hasStarted) return
        const timerID = setTimeout(() => {
            opponentTurn()
        }, Number(delay));
        setTimer(timerID)
    }, [activeField, hasStarted])

    return (
        <div className="wrapper">
            <header className="header">
                <p className="title">Міні-гра</p>
            </header>

            <section className="actions">
                <div>
                    <Input 
                        label="Delay" 
                        value={delay}
                        onChange={(e) => setDelay(e.target.value)} 
                        disabled={hasStarted}
                    />
                </div>
                <div>
                    <Button 
                        onClick={() => { startGame() }}
                        label="Почати" 
                        disabled={hasStarted}
                    />
                </div>
            </section>

            <section 
                className={`game-field ${hasStarted ? '' : 'game-field--disabled'}`}
                style={{gridTemplateColumns: `repeat(${FILED_SIZE}, 1fr)`}}
            >
                {fieldState.map((item, i) => (
                    <Field 
                        key={i} 
                        onClick={() => { playerTurn(i) }} 
                        isActive={activeField === i}
                        isPlayer={item === FIELD_STATE.player}
                        isOpponent={item === FIELD_STATE.opponent}
                    />
                ))}
            </section>

            <section className='score'>
                <div className='score_item'>
                    <span>You:</span>
                    <span>{playerPoints}</span>
                </div>

                <div className='score_item'>
                    <span>Opponent:</span>
                    <span>{opponentPoints}</span>
                </div>
            </section>

            <Modal 
                openModal={showModal}
                closeModal={() => resetState()}
            >
                <p>{modalMessage}</p>
            </Modal>
        </div>
    )
}

export default App
