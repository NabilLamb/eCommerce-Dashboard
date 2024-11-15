import React, { useState } from 'react';
import Board, { moveCard, moveColumn, removeCard, addCard } from '@asseinfo/react-kanban';
import "@asseinfo/react-kanban/dist/styles.css";
import useBoard from '../../store/Board';
import "./Board.css";
import { RxCross2 } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';
import { FaPencilAlt } from "react-icons/fa";
import AddCardModal from '../../components/Kanban/AddCardModal/AddCardModal';
import UpdateCardModal from '../../components/Kanban/UpdateCardModal/UpdateCardModal';
import { useTranslation } from "react-i18next";

const BoardPage = () => {
    const { t } = useTranslation();
    const { board, setBoard } = useBoard();
    const [modalOpened, setModalOpened] = useState(false);
    const [updateModalOpened, setUpdateModalOpened] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [targetColumn, setTargetColumn] = useState(null);


    const handleColumnMove = (_card, source, destination) => {
        const updatedBoard = moveColumn(board, source, destination);
        setBoard(updatedBoard);
    };

    const handleCardMove = (_card, source, destination) => {
        const updatedBoard = moveCard(board, source, destination);
        setBoard(updatedBoard);
    };

    const getColumn = (card) => {
        const column = board.columns.find((column) => column.cards.includes(card));
        return column;
    };

    const translate = {
        "TODO": t("kanban.todo"),
        "Doing": t("kanban.doing"),
        "Completed": t("kanban.completed"),
        "Backlog": t("kanban.backlog"),
    };

    const getGradient = (card) => {
        const column = getColumn(card);
        const title = column.title;
        if (title === "TODO") {
            return {
                background:
                    "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 189, 220) 163.54%)",
            };
        } else if (title === "Doing") {
            return {
                background:
                    "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(220, 48, 48) 163.54%)",
            };
        } else if (title === "Completed") {
            return {
                background:
                    "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 220, 86) 163.54%)",
            };
        } else if (title === "Backlog") {
            return {
                background:
                    "linear-gradient(65.35deg, rgba(65, 65,65, 0.67) -1.72%,rgba(134, 48, 220) 163.54%)",
            };
        }
    };

    const handleCardUpdate = (id, title, description) => {
        const updatedBoard = {
            ...board,
            columns: board.columns.map(column => ({
                ...column,
                cards: column.cards.map(card => 
                    card.id === id ? { ...card, title, description } : card
                )
            }))
        };
        setBoard(updatedBoard);
    };

    const handleCardAdd = (title, detail, column) => {
        const card = {
            id: new Date().getTime(),
            title, 
            description: detail
        };

        const updatedBoard = addCard(board, column, card);
        setBoard(updatedBoard);
        setModalOpened(false);
    };

    return (
        <div className="board-container">
            <span></span>
            <Board
                allowAddColumn
                allowRenameColumn
                allowRemoveCard
                onCardDragEnd={handleCardMove}
                onColumnDragEnd={handleColumnMove}
                renderCard={(props) => (
                    <div className='kanban-card' style={getGradient(props)} key={props.id}>
                        <div>
                            <button className='update-button' type='button'
                                onClick={() => {
                                    setSelectedCard(props);
                                    setUpdateModalOpened(true);
                                }}
                            >
                                <FaPencilAlt color="white" size={15} />
                            </button>
                            <button className='remove-button' type='button'
                                onClick={() => {
                                    const updatedBoard = removeCard(board, getColumn(props), props);
                                    setBoard(updatedBoard);
                                }}
                            >
                                <RxCross2 color="white" size={15} />
                            </button>
                        </div>
                        <span>{props.title}</span>
                        <span>{props.description}</span>
                    </div>
                )}
                renderColumnHeader={(props) => (
                    <div className='column-header' key={props.id}>
                        <span>{translate[props.title]}</span>
                        <IoMdAdd
                            color="white"
                            size={25} title={t("kanban.addCard")}
                            onClick={() => {
                                setTargetColumn(props); // Set target column
                                setModalOpened(true);
                            }}
                        />
                    </div>
                )}
                renderColumn={(props) => (
                    <div 
                        key={props.id}
                    >
                        {props.children}
                    </div>
                )}
            >
                {board}
            </Board>
            {modalOpened && (
                <AddCardModal 
                    visible={modalOpened} 
                    handleCardAdd={(title, detail) => handleCardAdd(title, detail, targetColumn)}
                    onClose={() => setModalOpened(false)} 
                />
            )}
            {selectedCard && (
                <UpdateCardModal 
                    visible={updateModalOpened} 
                    card={selectedCard}
                    handleCardUpdate={handleCardUpdate}
                    onClose={() => setUpdateModalOpened(false)} 
                />
            )}
        </div>
    );
};

export default BoardPage;
